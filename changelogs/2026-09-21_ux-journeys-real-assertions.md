---
title: 2026-09-21 - UX journeys assert real outcomes
description: user-journeys.spec.ts rewritten — every soft assertion (count>0, textContent, no-op hovers) replaced with failures-that-can-fail; surfaced that /store redirects to Ko-fi
commit: pending
author: Samuel Lee
category: 🧪 Testing
impact: Medium
date: 2026-09-21
---

# 📅 2026-09-21 - UX Journeys Assert Real Outcomes

**Author**: Samuel Lee
**Category**: 🧪 Testing

## 🎯 Overview

Phase 1.3: the ux suite was full of assertions that could not fail
(`elements.length > 0` on `expect`-less checks, `textContent` reads with no
expectation, hover with no state verified). Every journey now ends in an
assertion that fails when the experience breaks.

## ⚙️ What changed

- `tests/e2e/ux/user-journeys.spec.ts` rewritten:
  - shared `navLink()` helper opens the mobile drawer when present, then
    targets desktop/drawer testids;
  - discovery journeys assert `toHaveURL(/…$/, { timeout: 15000 })` (cold
    compile tolerance) instead of fire-and-forget clicks;
  - store journeys assert the real destination
    `toHaveURL(/^https:\/\/ko-fi\.com\//)` — **/store is a redirect page to
    Ko-fi**, which the old soft assertions never noticed;
  - keyboard journey asserts focus-visible at each tab stop and a real
    Enter navigation to /blog;
  - mobile journeys skip only without `hasTouch` and use real taps;
  - exploration journey asserts `sectionCount > 3` and `scrollY > 100`.

## ✅ Verification

- ux suite: 48 passed / 4 skipped (touch-only journeys on desktop
  projects) across all projects.

## 🔎 Notes

- The `/store` → Ko-fi redirect is intended (small merch shop) — now it is
  *documented by a test* instead of accidentally passing.
