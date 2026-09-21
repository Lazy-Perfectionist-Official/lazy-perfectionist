# UI/UX Engineering with Coding Agents — Best Practices & Verification Proposal

**Date:** 2026-09-21 · **Status:** Draft for review · **Scope:** lazy-perfectionist.com

---

## 1. The question

1. What are the general best practices for UI design / UI engineering when the
   builder is an LLM coding agent?
2. How can we *verify* — mechanically, repeatably — that this project's UI and
   UX are actually in place?

---

## 2. Research findings

### 2.1 Designing WITH agents: constraints beat prose

The strongest consensus across current sources (Builder.io, designproject.io):

| Principle | Why | Mechanism |
|---|---|---|
| **Rules files stay slim, point at code** | Long instruction files degrade silently; models weight *nearby code examples* over written rules | Keep AGENTS.md as a map; put truth in reference implementations |
| **A lint error is the only rule an agent can't skim past** | Agents run linters/compilers in a repair loop — stderr becomes the next prompt | ESLint `no-restricted-imports`, Stylelint token enforcement, TS discriminated unions |
| **Tokens, never raw values** | One repo with 40 hex greys becomes 41 the moment an agent generates a screen | Semantic tokens + `stylelint-declaration-strict-value` |
| **Golden directory** | Models copy known-good templates almost perfectly | `src/design-system/examples/` — real code that breaks in CI when APIs change |
| **Agents game checks** | Documented: `eslint-disable`, `as any`, even deleting failing tests | Meta-lint banning suppression comments; diff-check flags deleted/changed tests |
| **Green ≠ good design** | All of the above verifies *built correctly*, not *looks right / solves the problem* | That's what §2.2 is for |

Key quote that frames our whole proposal (Builder.io):
> "Rules stay as slim as possible and point to code. Code teaches the agent
> best practices. Deterministic checks constrain code outputs and let the
> agent iterate until it's right."

### 2.2 Verifying UI quality: route each judgment to the right evaluator

The most useful mental model (from the `mllm-ui-judge` applied-research repo):

```
code facts      → deterministic parser (lint, types, DOM assertions)
visual perception → screenshot judge (multimodal LLM)
taste           → human
```

Or: **"count what is countable, look at what is visual, let humans decide taste."**

Evidence for the middle lane (arXiv 2510.08783, benchmarking GPT-4o, Claude,
Llama against crowdsourced human UI ratings):

- MLLM scores land within ±1 Likert point of human means >75% of the time;
  correlation is moderate-to-strong.
- Best on factors with **concrete visual cues**: Visual Hierarchy, Trustworthiness.
- Pairwise judgments are reliable when screens differ meaningfully; weak when
  differences are subtle.
- Verdict: a legitimate **early-stage supplement**, never a replacement for
  human testing. Caveats from mllm-ui-judge: absolute scores cluster, pairwise
  has position bias, checklist verdicts flip across runs → run judges on
  *specific dimensions*, treat output as findings to triage, not a pass/fail gate.

### 2.3 The layer model for visual QA

Current tooling literature (Argos CI, Augment, TestSprite) converges on:
visual regression is a **layer on top of** a functional/a11y test
architecture — never a substitute. A mature pipeline stacks:

1. Functional correctness (flows, states, API behavior)
2. Accessibility (WCAG via axe + keyboard + touch)
3. Visual regression (pixel identity per viewport/engine)
4. Performance budgets (Lighthouse CI)
5. Heuristic/UX review (agents + human)

---

## 3. Where this project already stands

Honest inventory against that five-layer model:

| Layer | Status | Evidence |
|---|---|---|
| 1. Functional | ✅ Strong | `tests/e2e/functional/` — every button, form, API state, redirect; deterministic, no vacuous guards; `test:pipeline` green ×3 engines |
| 2. Accessibility | ✅ Strong (as of today) | AxeBuilder serious/critical gate, keyboard order, contrast, touch targets ≥44px (with sub-pixel tolerance), reduced-motion, 151→0 failure repair |
| 3. Visual regression | ✅ Strong | 226 tests × 7 projects; hover/active/focus/loading-state shots; baselines regenerated today |
| 4. Performance | ⚠️ Configured, not gated | `lighthouserc.json` + `tests/e2e/lighthouse` + `lighthouse:assert` script exist, but Lighthouse is **not part of `test:pipeline`** |
| 5. Heuristic/UX review | ⚠️ Weak | `tests/e2e/ux/user-journeys.spec.ts` is soft-assertion heavy (known); no heuristic evaluation pass; no screenshot-judge lane |
| Design-token discipline | ⚠️ By convention only | Oryzo tokens defined once in `globals.css` and used via Tailwind classes — but **nothing enforces them** (no Stylelint; ESLint has no token/import rules) |
| Agent guardrails | ⚠️ Partial | `AGENTS.md` exists; no golden-examples dir; no anti-gaming meta-lint; test:pipeline doesn't run lint at all |

**Verdict:** this repo is already in the top tier for layers 1–3 — most
agent-built UIs ship with none of that. The gaps are layers 4–5 and the
*enforcement* side of token discipline.

### 3.1 Proof-of-concept: screenshot judge on our own baselines

I read two existing baseline PNGs (desktop-full, mobile-safari-full) and ran
a heuristic critique — the exact lane proposed in Phase 2 below. Sample output:

- **Visual hierarchy (strong):** every section follows eyebrow → serif display
  heading → muted body → exactly one primary CTA; marquee bands act as
  consistent section separators; warm palette (canvas/cream/ember) never breaks.
- **Coverage gap found (real):** the a11y touch-target test samples only the
  *first 20* interactive elements in DOM order — the contact-footer social
  links (INSTAGRAM/TWITTER/YOUTUBE, small inline text links) are far beyond
  that and are **never size-checked**. A judge asking "which interactive
  elements might be under-sized?" surfaced in minutes what the sampling cap
  hid.
- **Forms:** long single-column contact form (4 fields + newsletter + CTA) is
  the right mobile pattern; field spacing consistent.

This demonstrates both the power (finds what deterministic tests don't look
for) and the correct role (its output became a *test-coverage finding* to
verify deterministically, not a vibe).

---

## 4. Proposal

### Phase 0 — One-time UI/UX audit (no code changes)
**Goal:** answer "is the UI/UX in place?" with evidence, today.

1. **Heuristic evaluation** of all 5 pages × 3 viewports against:
   - Nielsen's 10 usability heuristics (NN/g)
   - Deque's 10 accessibility heuristics
   - Project's own `docs/FIGMA-DESIGN-SPEC.md` as the source of truth
2. **Screenshot-judge pass** on existing visual baselines (no new captures
   needed) with dimension-specific prompts (hierarchy, consistency, spacing
   rhythm, affordance clarity) per §2.2 caveats.
3. Output: `docs/ui-ux-audit-2026-09-21.md` — findings triaged
   real-bug / coverage-gap / taste-deferred-to-human.

### Phase 1 — Deterministic hardening (close the gaps found above)
1. **Stylelint token enforcement** — `stylelint-declaration-strict-value` on
   color properties; raw hex/rgb in `src/**` fails. Start color-only (per
   Builder.io's rollout advice), extend to spacing later.
2. **Full-coverage touch targets** — replace first-20 sampling with an
   all-visible-elements loop (expect small inline links like the footer
   socials to fail; fix by adding tap-padding, e.g. `py-3` on each link).
3. **Fix `tests/e2e/ux/` soft assertions** — same treatment as the functional
   suite: every assertion must be able to fail.
4. **Wire Lighthouse into `test:pipeline`** (and define the missing
   `lighthouse:assert` script or drop it from `test:all`).

### Phase 2 — The agent verification lane (recurring)
1. **`npm run test:judge`** — **built 2026-09-21** (`scripts/judge-ui.ts`).
   Walks the visual baselines, picks one canonical engine per shot (cross-
   engine pixel identity is the visual suite's job; design-quality questions
   are engine-invariant), excludes full-page homepage tallies, and asks the
   judge for dimension scores. Emits `reports/judge/<timestamp>.md` +
   `latest.md` (gitignored). Advisory only: exit code is 0 even on FINDINGS
   or endpoint congestion — judges are supplements, not oracles. Useful
   flags: `--limit N`, `--name <regex>`, `--engine <project>`,
   `--attempts N`, `--retry-delay s`.
2. **Judge backend: GLM-4.6V-Flash (free endpoint), local model as offline
   fallback.** Verified 2026-09-21 against the live API:
   - **Primary: Z.AI `glm-4.6v-flash`** — listed **Free** on
     [docs.z.ai pricing](https://docs.z.ai/guides/overview/pricing) (input,
     cached input, storage, output all ¥0). OpenAI-compatible endpoint
     `POST https://api.z.ai/api/paas/v4/chat/completions`; image passed as a
     base64 `data:image/png` URL in an `image_url` content part. A Z.AI key
     already exists on this machine (the `zai-mcp-server` entry in
     `~/.claude.json`).
   - **Free confirmed by behavior, not just docs:** paid models on the same
     key (`glm-4.6v`, `glm-4.5v`, `glm-5.3-flash`) return error 1113
     "insufficient balance", while `glm-4.6v-flash` completes — the flash
     vision model is genuinely zero-cost on a zero-balance account.
   - **Live demo (2026-09-21):** judged the mobile hero baseline
     (`homepage-hero-mobile-chrome-small-darwin.png`) on hierarchy / spacing
     / affordance / consistency. The model read the actual screen — cited
     the real eyebrow ("LATEST SINGLE — LUSG"), headline, CTA ("Stream
     'LUSG' Now"), and palette — and returned 4 dimension scores with
     justifications + `VERDICT: PASS`. Cost: 805 tokens, ¥0. Score
     clustering at the top (all 5s) matches the research caveat in §2.2 —
     treat judge output as findings to triage, not a gate.
   - **It is a reasoning model:** with default settings it spends the whole
     completion budget on `reasoning_content` and returns empty `content`.
     Send `"thinking": {"type": "disabled"}` (and/or a ≥4k token ceiling) to
     get judge verdicts.
   - **Free-tier congestion is the tax:** HTTP 429 code 1305 "temporarily
     overloaded" on many attempts; observed success roughly 1-in-3 to
     1-in-5 under load, clearing after ~45–60 s gaps. The judge script must
     retry with backoff (e.g. 6 attempts × 45 s) and treat "endpoint
     unavailable" as *skip this run*, never *fail the run* — it stays an
     advisory lane.
   - **Offline fallback: Qwen2.5-VL 7B (MLX, ~6 GB) via LM Studio**
     (`lms server start` → `http://localhost:1234/v1`; `lms` CLI already
     installed on this machine) — strongest local model at reading text and
     layout structure; **light fallback: Gemma 3 4B (~3.3 GB)**, fits
     comfortably alongside the dev server + Playwright runs.
   - Evidence this size class suffices: the arXiv benchmark's
     Llama-3.2-11B-Vision (same class) scored within ±1 of human means >75%
     of the time, alongside GPT-4o and Claude — small VLMs are adequate for
     *dimension-specific* judging (hierarchy, spacing, affordance clarity).
   - **Judge the per-section baselines, not full-page tallies**: the visual
     suite already ships component/section shots (homepage-hero,
     contact-section, focus-state, button-hover…). A 390×4745 full-page PNG
     gets downscaled into uselessness by small models; section crops are the
     right granularity.
   - **Second opinion (optional):** OpenRouter's `:free` vision models
     (e.g., Qwen2.5-VL 72B :free; ~50 req/day) for a weekly deep pass.
     Google AI Studio's free tier has been cut repeatedly (2.5 Flash →
     ~20 req/day as of late 2025) — too thin for per-PR judging, viable
     only for occasional spot checks.
3. **Routing discipline** encoded in AGENTS.md: countable → tests; visual →
   judge; taste → human.
4. **Anti-gaming meta-lint** — ban `eslint-disable`/`test.skip` in changed
   files (warnings-as-errors agent config), plus a diff check flagging
   deleted/modified core test assertions for human review.

### Phase 3 — Make the design system agent-proof
1. **Golden examples dir** (`src/design-system/examples/`) — one canonical
   card, form, and page-section implementation, exercised by CI.
2. **Converge `FIGMA-DESIGN-SPEC.md` toward code** — spec stays, but canonical
   truth becomes tokens + examples (prose rots silently; code fails loudly).
3. Slim AGENTS.md into a *map* that points at the golden dir.

### What "UI/UX in place" then means (definition of done)

- ✅ Functional, a11y, visual layers green (already true)
- ✅ Lighthouse budgets asserted in pipeline
- ✅ Zero raw color values outside token definitions (lint-enforced)
- ✅ Touch targets verified across *all* visible interactive elements
- ✅ Heuristic audit run, findings closed or explicitly deferred
- ✅ Judge lane produces no unresolved real-bug findings
- Taste items explicitly listed for human decision

---

## 5. Sources

- [How to Make AI Agents Follow Your Design System — Builder.io](https://www.builder.io/blog/how-to-make-ai-agents-follow-your-design-system) (2026-06)
- [AI-ready Design System — The Design Project](https://designproject.io/blog/ai-ready-design-system/) (2026-05)
- [MLLMs as UI judges — arXiv 2510.08783](https://arxiv.org/pdf/2510.08783)
- [mllm-ui-judge — routing evaluators](https://github.com/CAPTH69/mllm-ui-judge)
- [Visual Testing for AI Coding Agents — Argos CI](https://argos-ci.com)
- [Ten Usability Heuristics — NN/g](https://www.nngroup.com/articles/ten-usability-heuristics)
- [Accessibility Heuristics — Deque](https://www.deque.com/blog/supporting-the-design-phase-with-accessibility-heuristics-evaluations)
- Research channels: agent-reach (Exa web search)
