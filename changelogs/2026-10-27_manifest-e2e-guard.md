---
title: 2026-10-27 - Manifest e2e guard
description: Companion to the manifest truth pass — a request-only Playwright spec asserting /manifest.json is served, parses, keeps its identity fields (name/start_url/id), and every declared icon src resolves 200 with spec-valid purpose tokens. Guards the rename/remove class of change (the public/ cleanup being the precedent) from silently breaking install metadata. NOT executed this slot — Playwright runs were approval-gated; verified by lint over the new file and inspection. Run once before merge.
commit: pending
author: Samuel Lee
date: 2026-10-27
category: 🧪 Tests
impact: Low
---

# 📅 2026-10-27 - Manifest E2E Guard

**Author**: Samuel Lee
**Category**: 🧪 Tests

## 🎯 Overview

The manifest truth pass fixed what ailed `manifest.json`; this guard
makes the regressions it caught impossible to reintroduce silently —
an icon file removed or renamed, the manifest going missing, or a
purpose token drifting back off-spec now fails CI instead of shipping.

## 🔧 What changed

- `tests/e2e/manifest.spec.ts` (new, request-only — no page context, so
  it runs identically in all four projects and adds no engine-specific
  surface):
  - `GET /manifest.json` → 200; body parses as JSON.
  - `name` contains "Lazy Perfectionist"; `start_url` and `id` are `/`.
  - Every `icons[].src` → 200 (assertion message names the src).
  - Any `purpose` tokens are within the spec set
    any/maskable/monochrome — catches "any maskable"-style drift.

## ✅ Verification

- `npm run lint` — ✔ No ESLint warnings or errors (spec included).
- **NOT executed**: `npx playwright test manifest.spec.ts` was
  approval-gated this slot. Inspection-verified only — run it once
  before merge. The spec relies on nothing exotic: `request` fixture,
  standard `expect` assertions, same patterns as `home.spec.ts`.

## 📝 Notes

- `public/` is served from disk per request in dev, so the spec is
  accurate against a live `:3000` server regardless of when it booted.
- Asserts `id: "/"`, which exists only from the manifest truth pass
  (`be06a5c`) — merge this commit with or after that one (same branch
  tip by default).
