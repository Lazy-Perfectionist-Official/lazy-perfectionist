---
title: 2026-11-04 - Numbers that stay put under search
description: The margin numerals on /music and /writing were the filtered list's position, so searching printed 01 for the third release. They now come from the catalog's own order.
commit: pending
author: Samuel Lee
date: 2026-11-04
category: 🐛 Fix
impact: /music, /writing
---

# 📅 2026-11-04 - Numbers That Stay Put Under Search

**Author**: Samuel Lee
**Category**: 🐛 Fix

## 🎯 Overview

`ReleaseRow` and `PostRow` print a two-digit numeral in the margin. The
plate screens passed the **filtered** array's index into those rows — so a
search for "orbit" on `/music` printed `01` beside a song the cover numbers
`03`. The count line said "1 of 3" while the row denied being the third.

The numeral is `aria-hidden` (the accessible name carries the title and the
action), so screen readers were never misled. It is the sighted reader, and
the tracklist idea itself, that the number has to be true for.

## 🧮 The catalog position

Both screens now pass the row's position in the unfiltered list
(`RELEASES.indexOf(release)`, `posts.posts.indexOf(post)`). Filtering and
tag-narrowing change which rows print, never what they are numbered — the
same guarantee the cover has by construction.

Writing is latent today (the archive holds one post), fixed now so the
first sync that lands a second post cannot introduce it.

## 🧪 Verified

- `tests/e2e/home.spec.ts` extends the plate-screen test: `/music?q=orbit`
  returns exactly one row under `release-orbit`, and its numeral reads
  `03`. All four projects pass; `npm run lint` clean.
- Full e2e suite: 76 passed, 4 by-design skips (3 narrow-viewport gates,
  1 WebKit tab-order gate), 0 failed. `npm run lint` clean.
