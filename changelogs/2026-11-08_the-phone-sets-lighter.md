---
title: 2026-11-08 - The phone sets lighter and the menu lands
description: The phone's type steps down a size across the masthead, plates, rows and fine print so the page has room to breathe, and the menu panel now drops in under the masthead with its five items following one another.
commit: pending
author: Samuel Lee
date: 2026-11-08
category: 🎨 Design
impact: All screens on phones
---

# 📅 2026-11-08 - The Phone Sets Lighter and the Menu Lands

**Author**: Samuel Lee
**Category**: 🎨 Design
**Impact**: All screens on phones

## 🎯 Overview

The phone edition was set at a size that filled its measure: a 44px
plate title, a 24px wordmark, 16px rows. The page read as type with
margins left over rather than as a sheet with type on it. This pass
sets the phone a size down across the board and gives the room
back — and the menu, which used to appear finished, now arrives.

## 🔠 The phone's new scale

| | before | after |
| --- | --- | --- |
| Wordmark | 24px | 22px |
| Announcement bar | 11px | 10px |
| Menu items | 12px | 11px |
| Plate label (eyebrow) | 12px | 11px |
| Plate title | 44px | 36px |
| Plate lede | 22px | 19px |
| Release row title | 28px | 24px |
| Shop row title | 24px | 22px |
| Writing row title | 24px | 21px |
| Row body / excerpt | 16px | 15px |
| Row indices, years, prices, cues | 11px | 10px |
| Tag chips, foot rows, counts | 11px | 10px |
| Footer liner note and colophon | 12px | 11px |
| Hero stamp | 12px | 11px |

Everything stays on the print's own scale — display, reading and
typewriter — just lighter on the page. The search field keeps its 16px
on purpose: below that, iOS zooms the page when it is focused, which
is the opposite of room.

**The room.** Rows gain a couple of pixels of padding on phones (the
writing index moves to `py-7`), the plate header sits a touch lower in
its air, and the line under a title keeps its spacing — so the smaller
type reads as more sheet between things, not as a smaller page.

## 🎞️ The menu lands

The panel now drops out from under the masthead's hairline over 200ms
while the five items follow one another by 30ms each, each rising four
pixels into place. Only opacity and transform animate, so the compositor
does the work and nothing repaints; a closed `<details>` keeps the list
unpainted, so the animation restarts cleanly each time the menu opens.
Under `prefers-reduced-motion: reduce` the menu is simply there.

## ✅ Verification

- Full suite on a production build: **213 passed, 7 skipped, 0 failed**
  across Chromium, Firefox, WebKit and the mobile project.
- New test: the menu's panel animates (`nav-drop`) and its items
  animate (`nav-item`) when open, and both are `none` under reduced
  motion.
- The phone fine-print test now guards a 10px meta floor (menu 11px,
  field 16px) — the type is smaller, still set at reading size rather
  than microprint.
- `tsc --noEmit`, `next lint`, `stylelint` clean.
- Screenshots at 393×852: fold, plate screen, menu closed, menu
  mid-arrival, menu at rest.

## 📝 Notes

- The mid-arrival frame shows the stagger doing its job: MUSIC nearly
  set, DISCOGRAPHY half in, SHOP faint, WRITING and ELSEWHERE not yet
  arrived — the menu is being set item by item, not popped.
- The wide sheet is untouched: every size above is the base phone size,
  with the `md` scale unchanged.
