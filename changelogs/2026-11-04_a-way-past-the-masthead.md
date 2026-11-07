---
title: 2026-11-04 - A way past the masthead
description: Every screen now opens with a skip-to-content link — the first stop in the tab order, parked out of sight until it is focused, landing on the plates rather than the banner and nav.
commit: pending
author: Samuel Lee
date: 2026-11-04
category: ♿ Accessibility
impact: Every screen
---

# 📅 2026-11-04 - A Way Past the Masthead

**Author**: Samuel Lee
**Category**: ♿ Accessibility

## 🎯 Overview

The bellyband, the wordmark and the four nav items sit above every page's
content. A keyboard or screen-reader reader landing on `/`, `/music`, `/shop`
or `/writing` had to pass all of them — six or seven Tab presses — before
reaching the plate. That is WCAG 2.4.1 (Bypass Blocks), and the site had no
mechanism for it.

## 🔗 The first stop

`SkipLink` renders before the announcement bar, so it is the first thing in
the tab order. It is `sr-only` until focused, then pins to the top-left of
the viewport in the print's own mono caps and paper, over a hairline and a
soft shadow — the same language as the rest of the chrome.

It points at `#main`, and both `main` landmarks (`page.tsx` and
`CatalogPage.tsx`) now carry `id="main" tabIndex={-1}` so the fragment
navigation can take focus, not just scroll. The plates keep their own
`#music`, `#shop`, `#writing`, `#elsewhere` anchors unchanged.

## 🧪 Verified

- `tests/e2e/home.spec.ts`: the link is present and clipped to a pixel at
  rest; Tab reaches it before the bellyband; focusing reveals it; Enter
  lands the reading position at the top of `<main>`. Runs on all four
  projects (WebKit skips the tab-order half — its default macOS policy does
  not tab to links at all — but still checks the parked link).
- `npm run lint` clean.

## ⚠️ Notes

- No client JS added: the link is a plain fragment anchor.
- The cover and the plate screens share `CatalogPage`/`page.tsx`, so the
  bypass is on all four routes by construction.
