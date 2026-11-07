---
title: 2026-11-04 - More at the foot, and air before the back cover
description: The page keeps 64px of paper on phones and 96px from md up between the last rule and the ink footer, and Releases, Shop and Writing each end with a More row that opens their full listing. Elsewhere gets none — it is the list of destinations itself.
commit: pending
author: Samuel Lee
date: 2026-11-04
category: 🎨 Design
impact: Layout
---

# 📅 2026-11-04 - More at the Foot, and Air Before the Back Cover

**Author**: Samuel Lee
**Category**: 🎨 Design

## 🎯 Overview

Request, verbatim: *"After all contents, before footer, need some padding.
Also if there are too much, make a more button for earch card."*

Two changes: the page stops running straight from the last hairline into
the ink footer, and the three plates that can grow end on an action rather
than on their last row.

## 📄 Air before the back cover

`<main>` carries `pb-16 md:pb-24` — 64px on phones, 96px from md up — so
the last rule of Elsewhere closes the plate, the paper keeps breathing for
a beat, and then the ink band starts. Nothing else moved: the plates' own
rhythm, the measured chrome and the fold are untouched.

## ↳ More at the foot

Releases, Shop and Writing now end with a **More** row: mono caps, right
aligned on the plate's measure, the same 16px/24px inner margin and hover
band as the rows above it, and its own hairline. Each hands off to the
full listing — `More releases on Spotify`, `More items on Ko-fi`, `More
posts on Medium` — and the visible word starts the accessible name, so
voice control can say it.

Elsewhere has no More row: it already *is* the list of destinations, with
no larger listing to open. Nothing is truncated: the rows are the
catalog, and hiding two of five products behind a button would make the
plate a teaser rather than a page.

The plate header keeps its own margin link (`All items ↗`, `All posts ↗`);
the foot row is the same hand-off placed where the reading ends.

## ✅ Verification

- `npx tsc --noEmit`, `npm run lint` — clean.
- `npm run test:pipeline` — **48 passed, 0 failed** (3 skipped).
- `npm run test:mobile` — **17 passed, 0 failed** at 375x667.
- New test: the three More rows carry their full-listing hrefs, and
  Elsewhere has no link named More.
- Screenshots at 1440 and 375: the gap below the last rule is 96px/64px,
  and the More row sits on the right margin under the list.
