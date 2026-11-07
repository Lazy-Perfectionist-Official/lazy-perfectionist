---
title: 2026-11-04 - The Twitter link goes
description: Elsewhere no longer prints a Twitter row, and the structured data stops claiming an account that isn't there. The destinations left are the ones that resolve.
commit: pending
author: Samuel Lee
date: 2026-11-04
category: 🐛 Fix
impact: Content
---

# 📅 2026-11-04 - The Twitter Link Goes

**Author**: Samuel Lee
**Category**: 🐛 Fix

## 🎯 Overview

Note, verbatim: *"twitter is a false link, you can remove it."*

`LINKS.twitter` pointed at `twitter.com/lazyperfectionist`, which is not
an account. It was printed in Elsewhere and repeated in the home page's
`MusicGroup` structured data — two places telling a visitor and a crawler
that the band is somewhere it isn't.

## 🧹 What changed

- `LINKS.twitter` is gone from `src/lib/site.ts`.
- Elsewhere prints five destinations: Spotify, YouTube, Instagram,
  Medium, Ko-fi.
- The home page's `sameAs` array lists the same five, so the structured
  data no longer advertises a dead profile.

Nothing else moved: the rows, the measure and the footer are unchanged.
Instagram stays — its handle is still to be confirmed, which is a
different problem from a URL that 404s.

## ✅ Verification

- `npx tsc --noEmit`, `npm run lint` — clean.
- `npm run test:pipeline` — **56 passed, 0 failed** (4 skipped).
- `npm run test:mobile` — **20 passed, 0 failed**.
- `grep -rni "twitter"` over `src`, `tests`, `scripts`, `public` — no
  matches outside the card-type metadata in `layout.tsx`.
