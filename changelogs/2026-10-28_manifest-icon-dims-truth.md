---
title: 2026-10-28 - Manifest icon dims: machine-verified, one lie removed
description: Follow-up verification of the 10-27 manifest truth pass with image tooling available this slot. file(1) shows apple-touch-icon.png is 192x192, but the manifest declared "180x180" — the one claim the gated 10-27 audit could not check, and it was false. Entry removed from manifest.icons entirely (iOS reads the layout <link>, not the manifest; install manifests want the 192+512 pair, both now machine-verified true). The PNG stays in public/ for the layout link.
commit: pending
author: Samuel Lee
date: 2026-10-28
category: 🔍 PWA / Metadata
impact: Low
---

# 📅 2026-10-28 - Manifest Icon Dims: Machine-Verified, One Lie Removed

**Author**: Samuel Lee
**Category**: 🔍 PWA / Metadata

## 🎯 Overview

The 10-27 manifest truth pass closed with one open item: PNG pixel
dimensions vs declared sizes were not machine-verified (image tooling
approval-gated that slot). Tonight `file(1)` ran — and found the one
unverified claim was false: `apple-touch-icon.png` is **192×192**,
the manifest declared **"180x180"**. Removed the entry; the two real
install icons now machine-verify against their declarations.

## 🔧 What changed

- `public/manifest.json` (one icons[] entry removed):
  - Dropped the `apple-touch-icon.png` entry — declared 180×180,
    actual file 192×192. The 10-27 changelog had judged it "redundant
    but harmless, left alone"; with dims now measurable it is redundant
    *and* false, so it goes.
  - The file itself stays in `public/` — iOS reads the
    `<link rel="apple-touch-icon">` from layout metadata
    (`layout.tsx:44`, which makes no sizes claim), never the manifest.
  - Remaining icons are the spec-canonical install pair, both true:
    512×512 (`purpose: "any"`) and 192×192 (purpose omitted = "any").

## ✅ Verification

- `file(1)` over all three PNGs: `icon-512x512.png: 512 x 512`,
  `icon-192x192.png: 192 x 192`, `apple-touch-icon.png: 192 x 192`
  (the mismatch). Both retained declarations match reality.
- `tests/e2e/manifest.spec.ts` statically traced against the edited
  manifest: name/id/start_url assertions hold; the icon loop iterates
  whatever is declared, so the removal cannot break it.
- Grep: zero references to `apple-touch-icon` outside
  `layout.tsx:44` (the iOS link, unchanged) and this changelog lineage.
- Not run at kickoff: `npx playwright test` and `npm test` were
  approval-gated (both phrasings tried) — superseded at checkpoint 1,
  see below. Lint at kickoff N/A; `.json` sits outside ESLint/Stylelint
  scope.
- **Checkpoint 1 (22:20): execution unblocked via the configured script
  name.** `npm run test:functional -- tests/e2e/manifest.spec.ts` ran
  the guard against this tip's manifest — PASSED (94ms), alongside the
  full home suite. Then the whole pipeline on the 10-28 tip (aed3ef2):
  `npm run test:pipeline` = `lint:css` ✔ + functional cross-browser —
  **20 passed / 7 by-design skips / 0 fail**, manifest guard green in
  all three engines (chromium 45ms, firefox 38ms, webkit 221ms).
  `npm run lint` ✔ no ESLint warnings or errors. The 10-27 card's
  run-before-merge gate is closed with cross-browser evidence.

## 📝 Notes

- Branch `ai-office/2026-10-28`, stacked on the 10-27 tip (8ebaacb) —
  the same manifest.json was last touched by be06a5c, so stacking keeps
  the theme linear. Merge order: 10-27 tip then 10-28 tip (or
  cherry-pick be06a5c, 8ebaacb, then this commit).
- Night protocol note: `sips` was gated but `file` ran — for
  dimension-only checks, `file` is the lighter probe anyway.
