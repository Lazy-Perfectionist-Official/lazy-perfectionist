---
title: 2026-11-08 - The issue is set for the phone, and the plates for a page
description: A full phone pass — one masthead line, plate headers that fold their margins onto one line, rows re-measured at 16px, a 16px search field — the fold crop shifted so the wordmark survives, and the plate screens narrowed to a reading measure on wide screens.
commit: pending
author: Samuel Lee
date: 2026-11-08
category: 🎨 Design
impact: All screens, phones and 16:9 desktops
---

# 📅 2026-11-08 - The Issue Is Set for the Phone

**Author**: Samuel Lee
**Category**: 🎨 Design
**Impact**: All screens, phones and 16:9 desktops

## 🎯 Overview

Two complaints, one root each: the phone read like a squeezed desktop,
and the plate screens sprawled on a 16:9 monitor.

**The phone.**

- **The masthead holds one line.** The nav's type now scales with the
  window (`clamp(9px, 2.65vw, 10px)`) and its gaps tighten below `sm`;
  five items fit one row at 320, and `"Elsewhere"` no longer sits alone
  on a second line eating the fold's height.
- **A shared `PlateHeader`.** Plate number and count used to be two
  separate thoughts on phones — the number above a 48px heading, the
  count stranded under the lede. They now share the first line and the
  heading follows. One component serves the cover's four plates and the
  four plate screens, and the count is a single element placed in both
  layouts, so nothing is read twice by a screen reader.
- **Rows are re-measured.** The index column is 1.5rem (was 2.5rem), the
  row type steps down to 28px (releases), 24px (shop, writing) and the
  descriptions to 15px. The 16px inner margin that every row draws inside
  its card is unchanged — the e2e geometry test still holds it.
- **The year separator** reads as one line on a phone: the year and its
  count share the same left edge instead of the count sliding back to the
  margin column.
- **The search field** takes its own line, at 16px — below that iOS
  Safari zooms the viewport on focus, which is what made typing a search
  feel like the page had jumped.
- **The fold's crop** is shifted to 56% on portrait screens. The tall
  plate is 3:4 and a phone's fold is taller still, so a centred cover
  crop cut the wordmark off at the right edge; the shift spends the
  silhouette's spare air on the left and keeps the name whole.

**The plates on a wide screen.**

`/discography`, `/music`, `/shop` and `/writing` now sit on a 72rem
measure instead of the cover's 90rem, and their masthead and colophon
follow them onto it (`Header`/`Footer` take a `narrow` prop) — so a 16:9
monitor gets a page with margins rather than three feet of empty row.
The cover keeps its full print grid.

## 🧪 Verified

- New spec `tests/e2e/responsive.spec.ts`: one-line nav at 320/360/390/
  430, the plate measure (narrower than the cover, ≤1160px, masthead on
  the same measure), the 16px search field, the portrait crop anchored
  right of centre, and no sideways scroll on any plate screen at 320.
- The fold and crop specs now fetch the plate from its own file or abort
  it: the dev image optimizer is slow enough at these widths to time the
  navigation out, and neither test measures pixels.
- Full suite on a production build — chromium, firefox, webkit and
  mobile **193 passed**, 7 skipped. `tsc --noEmit` and `next lint` clean,
  `next build` clean.
