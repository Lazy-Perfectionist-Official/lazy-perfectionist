---
title: 2026-11-06 - Elsewhere points at the right accounts
description: The YouTube and Instagram links carried the bare handle; the artist's accounts both live under the _official suffix, and the bare YouTube handle is another person's channel.
commit: pending
author: Samuel Lee
date: 2026-11-06
category: 🐛 Fix
impact: Elsewhere plate, structured data
---

# 📅 2026-11-06 - Elsewhere Points at the Right Accounts

**Author**: Samuel Lee
**Category**: 🐛 Fix

## 🎯 Overview

The plate's YouTube and Instagram rows went to `@lazyperfectionist` — the
handle without its suffix. Both accounts are actually
`lazyperfectionist_official`, so the rows were pointing at nothing of the
artist's.

- YouTube: `youtube.com/@lazyperfectionist` → **`www.youtube.com/@lazyperfectionist_official`**
- Instagram: `instagram.com/lazyperfectionist` → **`www.instagram.com/lazyperfectionist_official/`**

The YouTube case is the worse of the two: the bare handle is a live,
unrelated channel — `og:title` reads *"Matthew Hall"* — so a reader
following the row landed on a stranger's page, not a 404. Both URLs answer
200 either way, which is why nothing had flagged them.

## 🔧 The change

`src/lib/site.ts`, `LINKS` — two strings, single source; the Elsewhere
rows, the footer and the `sameAs` structured data all read from them, so
nothing else moved.

## 🧪 Verified

- `curl -L` on both new URLs: 200 at the URL given, no redirect.
- `og:title` of the new YouTube channel: *"Lazy Perfectionist"*; the old
  one: *"Matthew Hall"*.
- The rendered page carries exactly the two corrected `href`s (checked
  against the dev server's HTML).
- `tests/e2e/home.spec.ts` "elsewhere carries the writing and the tip jar"
  now pins the YouTube and Instagram hrefs alongside Medium and Ko-fi, so
  a dropped suffix fails the suite instead of shipping.
- `npx tsc --noEmit`, `npm run lint` — clean.
- `npm run test:pipeline` — **59 passed, 0 failed** (4 skipped).
- `npm run test:mobile` — **21 passed, 0 failed**.
