---
title: 2026-11-08 - The phone keeps the row
description: Below md every card keeps the desktop row's three columns — the number in the margin beside the title's first line, the year or price on that same line at the right, the action closing the row at its foot — and the plate headings, the writing date and the discography year follow the same line.
commit: pending
author: Samuel Lee
date: 2026-11-08
category: 🎨 Design
impact: Phones; tablets and desktop unchanged
---

# 📅 2026-11-08 - The Phone Keeps the Row

**Author**: Samuel Lee
**Category**: 🎨 Design
**Impact**: Phones; tablets and desktop unchanged

## 🎯 Overview

The library prints its catalog as rows, and a row is read vertically:
the margin number, the title and the far-margin year start on one
line, the line sits under the title, and the action closes the row
beneath them. That is the desktop's design language, and it is why a
desktop row reads as one entry rather than a stack of small thoughts.

This revises the same day's one-axis pass, which folded the margin
number above its title and pulled every word onto one left edge. That
pass fixed the ragged edges but lost the row: the number no longer sat
beside the title it numbered, and each card set as a column of lines
instead of an entry.

The phone now keeps the row. Below `md` every card returns to three
columns — the margin, the content, and the far margin — and the small
type is set on the large type's line, optically centred by its size,
with the action given its own foot instead of crowding the
description.

## 📐 What changed

- **The number returns to the margin**, level with the title's first
  line. A 6px optical indent centres the 10px mono numeral on the
  caps of the 24px display title, the same relationship `md:pt-2`
  holds for the 48px desktop title.
- **The year, the price and the date start on the title's line** at
  the far right, top-aligned with the title's caps — not sunk to the
  bottom of the card.
- **The action closes the row on its own line**, right-aligned to the
  sheet's edge, below the description rather than beside it. On a
  desktop the meta column is 9rem wide; on a phone the description
  filled the card and the action sat against its last line.
- **The writing date sets in two lines on a phone** ("28 OCT" /
  "2025") in a narrow column, so the long date does not take the
  title's measure on a 320px screen; from `md` it prints on one line
  in the 9rem margin it always had.
- **The plate headings hang on the rows' title column**: the plate
  label holds the margin above, the title and the lede set at the
  rows' own left edge, and the count keeps the far margin. The lede
  may run into the meta column — prose, not a column element.
- **The discography's year separators** put the year back on the
  title column with the count centred against it at the sheet's right
  edge.
- **The masthead, the menu and the colophon** keep the sheet's margin
  (unchanged from the earlier pass); the menu label sits on the
  wordmark's baseline.

## ✅ Verification

- Full suite on a production build: **221 passed, 7 skipped, 0 failed**
  across Chromium, Firefox, WebKit and the mobile project.
- The replaced alignment test now measures ink, not boxes: at 393px
  the row's number and title share a line and the number's glyph
  centre lands within 2px of the title's caps centre; the year starts
  on that line; the action starts below the description and shares
  the year's right edge; the shop title clears the art with the price
  on its line and the Get at the foot; the writing date starts on the
  title's line and hangs on the sheet's right edge without taking the
  title's measure; the plate heading, the menu baseline and the
  discography separator are checked the same way.
- Screenshots at 393×852 and 320×640 on every plate screen, and
  393/768/1024/1920 regressions for the wide sheet.

## 📝 Notes

- Nothing moves from `md` up: the desktop's three columns, the 9rem
  margins and the meta column's top-and-bottom split are unchanged.
- The 320px floor remains the tight one — the writing poster's title
  sets to five lines there, and the one-line excerpt is a fragment;
  the full excerpt is on Medium either way.
- The WebKit image test for `/shop` stalled twice on a loaded server
  during the suite runs (the optimizer's known in-flight behaviour)
  and passed on the same build afterwards; the green run above is the
  same commit.
