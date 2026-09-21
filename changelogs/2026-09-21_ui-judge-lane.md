---
title: 2026-09-21 - Advisory UI-Judge Lane (test:judge)
description: New npm run test:judge walks visual baselines and asks the free GLM-4.6V-Flash vision model to score hierarchy/spacing/affordance/consistency — advisory findings, never a CI gate
commit: pending
author: Samuel Lee
category: 🧪 Testing
impact: Medium
date: 2026-09-21
---

# 📅 2026-09-21 - Advisory UI-Judge Lane

**Author**: Samuel Lee
**Category**: 🧪 Testing

## 🎯 Overview

Implements Phase 2 of `docs/UI-UX-VERIFICATION-PROPOSAL.md`: a recurring
"judge lane" that routes *visual design quality* (the thing deterministic
tests can't see) to a multimodal LLM. Backend: Z.AI **GLM-4.6V-Flash**,
verified free — paid models on the same zero-balance key return error 1113
while the flash vision model completes.

## ⚙️ What was built

- `scripts/judge-ui.ts` (run via `tsx`, zero new deps — Node fetch only):
  - Discovers all Playwright visual baselines (159 PNGs), picks **one
    canonical engine per shot** (chromium-desktop preferred) since
    cross-engine pixel identity is already the visual suite's job and
    design-quality questions are engine-invariant.
  - Excludes full-page homepage tallies (390×4745 shots downscale to mush;
    section crops cover the same UI at the right granularity).
  - Posts base64 PNG + a dimension prompt (visual hierarchy, spacing
    rhythm, affordance clarity, consistency) with `temperature: 0` and
    `thinking: {"type": "disabled"}` — the model is a reasoner and returns
    empty content without that flag (verified live).
  - **Congestion-hardened:** free tier throws HTTP 429 code 1305 often;
    retries (default 6×45s, configurable) and treats exhaustion as *skip*,
    never *fail*.
  - Key resolution: `ZAI_API_KEY`/`Z_AI_API_KEY` env → `~/.claude.json`
    zai-mcp-server entry; key never logged.
  - Emits `reports/judge/<timestamp>.md` + `latest.md` (gitignored):
    findings-to-triage section, summary table, raw verdicts.
- `npm run test:judge` wired in package.json; `AGENTS.md` gains the routing
  rule (countable → tests; visual → judge; taste → human).

## ✅ Verification

- Live runs against api.z.ai: retry loop survived 5 consecutive 429s and
  completed on attempt 6; judge read the actual screen (cited the real
  eyebrow, headline, CTA text, palette) — true perception, not
  hallucination. ~800 tokens per judgment, cost ¥0.
- Score parser handles the model's casing drift ("VISUAL Hierarchy") and
  markdown-bold formats (unit-tested against both observed shapes).
- Exit code is always 0 for judge outcomes — advisory by construction.

## 🔎 Notes & follow-ups

- Judge scores cluster high (all 5s on healthy sections) — consistent with
  arXiv 2510.08783; output is findings to triage, reproduce real defects
  deterministically before fixing.
- Side observation: the `contact-section` desktop baseline actually shows
  the hero (the visual test captures a 1920×1080 viewport from the top);
  worth re-scoping that capture to scroll to the form in a later pass.
- Local fallback (Qwen2.5-VL 7B via LM Studio) documented in the proposal
  but not yet wired — only needed if the free endpoint degrades.
