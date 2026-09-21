#!/usr/bin/env tsx
/**
 * test:judge — the advisory MLLM UI-judge lane (docs/UI-UX-VERIFICATION-PROPOSAL.md §4 Phase 2).
 *
 * Walks the Playwright visual baselines, picks one canonical engine per shot
 * (cross-engine pixel identity is the visual suite's job; the judge lane asks
 * design-quality questions that are engine-invariant), and asks GLM-4.6V-Flash
 * (free tier) to score each screenshot on concrete dimensions.
 *
 * ADVISORY ONLY — never a CI gate. Judge output is findings to triage, not
 * pass/fail (see proposal §2.2: MLLM scores cluster; treat as a supplement).
 * Exit code is 0 even when the judge returns FINDINGS or the endpoint is busy.
 *
 * Operational facts baked in (verified 2026-09-21 live):
 * - glm-4.6v-flash is free (paid models on the same zero-balance key return
 *   error 1113; the flash vision model completes).
 * - It is a reasoning model: without "thinking": {"type": "disabled"} it burns
 *   the whole completion budget on reasoning_content and returns empty text.
 * - Free-tier congestion (HTTP 429, body code 1305) is common; retries with
 *   45s gaps succeed roughly 1-in-3 to 1-in-5 under load.
 *
 * Usage:
 *   npm run test:judge                    # all section/page shots, canonical engine
 *   npm run test:judge -- --limit 2       # quick smoke run
 *   npm run test:judge -- --name hero     # regex filter on shot name
 *   npm run test:judge -- --engine mobile-safari
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const API_URL = 'https://api.z.ai/api/paas/v4/chat/completions';
const MODEL = 'glm-4.6v-flash';

/** Playwright project suffixes used by this repo's snapshot filenames. */
const PROJECT_SUFFIXES = [
  'chromium-desktop',
  'webkit-desktop',
  'firefox-desktop',
  'visual-regression',
  'mobile-safari',
  'tablet-ipad',
  'mobile-chrome-small',
] as const;

/** Canonical engine preference when the same shot exists for several projects. */
const ENGINE_PREFERENCE: readonly string[] = [...PROJECT_SUFFIXES];

/**
 * Full-page homepage tallies: a 390x4745 PNG gets downscaled into uselessness
 * by the judge; the section shots cover the same UI at the right granularity.
 */
const EXCLUDED_SHOTS = new Set([
  'homepage-full',
  'homepage-large',
  'homepage-mobile',
  'homepage-tablet',
]);

const REPORT_DIR_DEFAULT = path.join(process.cwd(), 'reports', 'judge');

interface CliOptions {
  limit?: number;
  nameFilter?: RegExp;
  engine?: string;
  attempts: number;
  retryDelayMs: number;
  reportDir: string;
}

function parseArgs(argv: string[]): CliOptions {
  const opts: CliOptions = {
    attempts: 6,
    retryDelayMs: 45_000,
    reportDir: REPORT_DIR_DEFAULT,
  };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    switch (arg) {
      case '--limit':
        opts.limit = Number(argv[++i]);
        break;
      case '--name':
        opts.nameFilter = new RegExp(argv[++i], 'i');
        break;
      case '--engine':
        opts.engine = argv[++i];
        break;
      case '--attempts':
        opts.attempts = Number(argv[++i]);
        break;
      case '--retry-delay':
        opts.retryDelayMs = Number(argv[++i]) * 1000;
        break;
      case '--report-dir':
        opts.reportDir = argv[++i];
        break;
      default:
        throw new Error(`Unknown flag: ${arg}`);
    }
  }
  return opts;
}

// ---------------------------------------------------------------------------
// API key resolution (never logged)
// ---------------------------------------------------------------------------

function resolveApiKey(): { key: string; source: string } {
  if (process.env.ZAI_API_KEY) return { key: process.env.ZAI_API_KEY, source: 'env ZAI_API_KEY' };
  if (process.env.Z_AI_API_KEY) return { key: process.env.Z_AI_API_KEY, source: 'env Z_AI_API_KEY' };
  try {
    const claudeJson = JSON.parse(fs.readFileSync(path.join(os.homedir(), '.claude.json'), 'utf8'));
    const key = claudeJson?.mcpServers?.['zai-mcp-server']?.env?.Z_AI_API_KEY;
    if (typeof key === 'string' && key.length > 0) {
      return { key, source: '~/.claude.json (zai-mcp-server)' };
    }
  } catch {
    /* fall through */
  }
  throw new Error(
    'No Z.AI API key. Set ZAI_API_KEY (or Z_AI_API_KEY), or configure the ' +
      'zai-mcp-server entry in ~/.claude.json. Get a key at https://z.ai/manage-apikey'
  );
}

// ---------------------------------------------------------------------------
// Baseline discovery
// ---------------------------------------------------------------------------

interface Shot {
  /** Shot name with engine suffix stripped, e.g. "homepage-hero". */
  name: string;
  /** Engine this particular PNG was captured on. */
  engine: string;
  file: string;
}

function parseShot(filename: string): Shot | null {
  if (!filename.endsWith('.png') || filename.endsWith('-diff.png') || filename.endsWith('-stable.png')) {
    return null;
  }
  let stem = filename.slice(0, -'.png'.length);
  // Strip the host-platform suffix Playwright appends (darwin/linux/win32).
  const platform = stem.match(/-(darwin|linux|win32)$/);
  if (platform) stem = stem.slice(0, -platform[0].length);
  // Strip exactly one trailing project suffix; the remainder is the shot name
  // (shot names may themselves end in words like "mobile" — that's fine).
  for (const suffix of PROJECT_SUFFIXES) {
    if (stem.endsWith(`-${suffix}`)) {
      return { name: stem.slice(0, -suffix.length - 1), engine: suffix, file: filename };
    }
  }
  return null;
}

function discoverShots(visualRoot: string): Shot[] {
  const shots: Shot[] = [];
  for (const entry of fs.readdirSync(visualRoot, { withFileTypes: true })) {
    if (!entry.isDirectory() || !entry.name.endsWith('-snapshots')) continue;
    const dir = path.join(visualRoot, entry.name);
    for (const file of fs.readdirSync(dir)) {
      const shot = parseShot(file);
      if (shot) shots.push({ ...shot, file: path.join(dir, file) });
    }
  }
  return shots;
}

/** One PNG per shot name: the most preferred engine that has it. */
function pickCanonical(shots: Shot[], forcedEngine?: string): Map<string, Shot> {
  const byName = new Map<string, Shot[]>();
  for (const shot of shots) {
    const list = byName.get(shot.name) ?? [];
    list.push(shot);
    byName.set(shot.name, list);
  }
  const picked = new Map<string, Shot>();
  for (const [name, candidates] of byName) {
    let choice: Shot | undefined;
    if (forcedEngine) {
      choice = candidates.find((c) => c.engine === forcedEngine);
    } else {
      for (const engine of ENGINE_PREFERENCE) {
        choice = candidates.find((c) => c.engine === engine);
        if (choice) break;
      }
    }
    if (choice) picked.set(name, choice);
  }
  return picked;
}

// ---------------------------------------------------------------------------
// Judge
// ---------------------------------------------------------------------------

const DIMENSION_PROMPT = `You are a UI quality judge. Evaluate this screenshot of a music artist website (it may be a section, a full page, or an interaction state such as hover/focus/loading) on EXACTLY these dimensions:

1. VISUAL HIERARCHY: Is there a clear primary focal element? Do eyebrow -> headline -> body -> CTA (or that page's equivalent) read in order of decreasing visual weight?
2. SPACING RHYTHM: Is vertical spacing consistent and balanced, or erratic?
3. AFFORDANCE CLARITY: Are interactive elements obviously clickable, with one clearly dominant primary action?
4. CONSISTENCY: Any elements that break the established type scale, color palette, or alignment?

For each dimension give a score 1-5 and a one-sentence justification.
Then a final line: VERDICT: PASS if all >= 3 and no dimension justifies a fix, else VERDICT: FINDINGS.
Be specific and concrete; cite what you actually see.`;

interface JudgeResult {
  ok: boolean;
  content?: string;
  usage?: { prompt: number; completion: number; total: number };
  error?: string;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function judgeImage(
  apiKey: string,
  imagePath: string,
  attempts: number,
  retryDelayMs: number
): Promise<JudgeResult> {
  const b64 = fs.readFileSync(imagePath).toString('base64');
  const body = JSON.stringify({
    model: MODEL,
    messages: [
      {
        role: 'user',
        content: [
          { type: 'image_url', image_url: { url: `data:image/png;base64,${b64}` } },
          { type: 'text', text: DIMENSION_PROMPT },
        ],
      },
    ],
    temperature: 0,
    max_tokens: 4096,
    // Reasoning model: without this it spends the whole budget thinking and
    // returns empty content (verified live).
    thinking: { type: 'disabled' },
  });

  for (let attempt = 1; attempt <= attempts; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 120_000);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body,
        signal: controller.signal,
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        const code = json?.error?.code;
        const transient = res.status === 429 || res.status >= 500 || code === 1305;
        if (transient && attempt < attempts) {
          console.log(`    attempt ${attempt}: HTTP ${res.status} code ${code} — retrying in ${retryDelayMs / 1000}s`);
          await sleep(retryDelayMs);
          continue;
        }
        return { ok: false, error: `HTTP ${res.status} ${JSON.stringify(json?.error ?? {})}` };
      }
      const choice = json?.choices?.[0];
      const content: string | undefined = choice?.message?.content;
      if (!content || !content.trim()) {
        // Truncated reasoning or empty reply — retry once more is cheap.
        if (attempt < attempts) {
          await sleep(retryDelayMs);
          continue;
        }
        return { ok: false, error: 'empty content (finish=' + (choice?.finish_reason ?? '?') + ')' };
      }
      return {
        ok: true,
        content,
        usage: {
          prompt: json?.usage?.prompt_tokens ?? 0,
          completion: json?.usage?.completion_tokens ?? 0,
          total: json?.usage?.total_tokens ?? 0,
        },
      };
    } catch (err) {
      if (attempt < attempts) {
        console.log(`    attempt ${attempt}: ${(err as Error).message} — retrying`);
        await sleep(retryDelayMs);
        continue;
      }
      return { ok: false, error: (err as Error).message };
    } finally {
      clearTimeout(timer);
    }
  }
  return { ok: false, error: 'exhausted retries' };
}

// ---------------------------------------------------------------------------
// Report parsing
// ---------------------------------------------------------------------------

interface Verdict {
  scores: Record<string, number>;
  verdict: 'PASS' | 'FINDINGS' | 'UNPARSED';
  raw: string;
}

function parseVerdict(content: string): Verdict {
  const scores: Record<string, number> = {};
  // Tolerates the model's casing drift ("VISUAL Hierarchy"), markdown bold
  // ("**1. VISUAL HIERARCHY: 5**"), and "5/5" style scores.
  const scoreRe = /(\d)\.\s*\**\s*([A-Za-z][A-Za-z ]{2,}?):\**\s*([1-5])(?:\s*\/\s*5)?\b/g;
  let m: RegExpExecArray | null;
  while ((m = scoreRe.exec(content)) !== null) {
    scores[m[2].trim()] = Number(m[3]);
  }
  const verdictMatch = content.match(/VERDICT:\s*(PASS|FINDINGS)/i);
  const verdict = verdictMatch
    ? (verdictMatch[1].toUpperCase() as 'PASS' | 'FINDINGS')
    : 'UNPARSED';
  return { scores, verdict, raw: content };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const { key, source } = resolveApiKey();
  console.log(`test:judge — GLM-4.6V-Flash advisory UI judge (free tier)`);
  console.log(`key source: ${source}\n`);

  const visualRoot = path.join(process.cwd(), 'tests', 'e2e', 'visual');
  const all = discoverShots(visualRoot);
  let picked = pickCanonical(all, opts.engine);

  const skippedExcluded = [...picked.keys()].filter((n) => EXCLUDED_SHOTS.has(n));
  for (const name of skippedExcluded) picked.delete(name);
  let selected = [...picked.entries()].sort(([a], [b]) => a.localeCompare(b));
  if (opts.nameFilter) selected = selected.filter(([name]) => opts.nameFilter!.test(name));
  if (opts.limit !== undefined) selected = selected.slice(0, opts.limit);

  if (selected.length === 0) {
    console.error('No baselines matched. Nothing to judge.');
    process.exit(1);
  }

  console.log(
    `${all.length} PNGs found → ${selected.length} shot(s) to judge` +
      (skippedExcluded.length ? ` (excluded full-page tallies: ${[...new Set(skippedExcluded)].join(', ')})` : '') +
      '\n'
  );

  const results: Array<{ name: string; engine: string; result: JudgeResult; parsed?: Verdict }> = [];
  for (const [name, shot] of selected) {
    console.log(`▶ ${name} [${shot.engine}]`);
    const result = await judgeImage(key, shot.file, opts.attempts, opts.retryDelayMs);
    const parsed = result.ok ? parseVerdict(result.content!) : undefined;
    if (result.ok) {
      const scoreLine = Object.entries(parsed!.scores)
        .map(([dim, s]) => `${dim}=${s}`)
        .join(' ');
      console.log(`  ${parsed!.verdict}${scoreLine ? ' · ' + scoreLine : ''}`);
    } else {
      console.log(`  SKIPPED (${result.error})`);
    }
    results.push({ name, engine: shot.engine, result, parsed });
    // Brief pacing between images — the free tier is congested enough already.
    await sleep(5_000);
  }

  // ----- report -----
  const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  fs.mkdirSync(opts.reportDir, { recursive: true });
  const judged = results.filter((r) => r.result.ok);
  const skipped = results.filter((r) => !r.result.ok);
  const findings = judged.filter(
    (r) => r.parsed!.verdict !== 'PASS' || Object.values(r.parsed!.scores).some((s) => s <= 3)
  );
  const tokens = judged.reduce((sum, r) => sum + (r.result.usage?.total ?? 0), 0);

  const lines: string[] = [
    `# UI Judge Report — ${new Date().toISOString()}`,
    '',
    `Model: \`${MODEL}\` (free tier) · judged ${judged.length}/${results.length} shots · ${tokens} tokens · cost ¥0`,
    '',
    '> Advisory lane (proposal §2.2/§4): MLLM scores cluster and verdicts can flip across runs.',
    '> Triage anything below; verify real defects deterministically before fixing.',
    '',
    '## Findings to triage',
    '',
    ...(findings.length
      ? findings.flatMap((r) => [
          `### ${r.name} [${r.engine}] — ${r.parsed!.verdict}`,
          '',
          '```',
          r.parsed!.raw.trim(),
          '```',
          '',
        ])
      : ['None — all judged shots PASS with every dimension ≥ 4.', '']),
    '## All results',
    '',
    '| Shot | Engine | Hierarchy | Spacing | Affordance | Consistency | Verdict |',
    '|---|---|---|---|---|---|---|',
    ...judged.map((r) => {
      const s = r.parsed!.scores;
      const get = (k: string) => {
        const key = Object.keys(s).find((kk) => kk.toUpperCase().includes(k));
        return key ? String(s[key]) : '—';
      };
      return `| ${r.name} | ${r.engine} | ${get('HIERARCHY')} | ${get('SPACING')} | ${get('AFFORDANCE')} | ${get('CONSISTENCY')} | ${r.parsed!.verdict} |`;
    }),
    ...(skipped.length
      ? ['', '## Skipped (endpoint busy — advisory lane, not a failure)', '', ...skipped.map((r) => `- ${r.name} [${r.engine}]: ${r.result.error}`)]
      : []),
    '',
    '## Raw verdicts',
    '',
    ...judged.flatMap((r) => [`### ${r.name}`, '', '```', r.parsed!.raw.trim(), '```', '']),
  ];
  const reportPath = path.join(opts.reportDir, `${stamp}.md`);
  fs.writeFileSync(reportPath, lines.join('\n'));
  fs.writeFileSync(path.join(opts.reportDir, 'latest.md'), lines.join('\n'));

  console.log(`\nReport: ${reportPath} (and latest.md)`);
  console.log(
    `${judged.length} judged, ${findings.length} with findings to triage, ${skipped.length} skipped. Advisory lane — exiting 0.`
  );
}

main().catch((err) => {
  console.error(`Fatal: ${(err as Error).message}`);
  process.exit(1);
});
