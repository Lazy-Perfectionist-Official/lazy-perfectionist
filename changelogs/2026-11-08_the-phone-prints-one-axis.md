---
title: 2026-11-08 - The phone prints one axis
description: Below md the masthead, the menu, the card titles and their small print now set on one text edge instead of five — the margin index folds above its title, the shop price joins the text column, and the discography year stops hanging off an empty margin.
commit: pending
author: Samuel Lee
date: 2026-11-08
category: 🎨 Design
impact: Phones; tablets and desktop unchanged
---

# 📅 2026-11-08 - The Phone Prints One Axis

**Author**: Samuel Lee
**Category**: 🎨 Design
**Impact**: Phones; tablets and desktop unchanged

## 🎯 Overview

The phone edition was setting its text on five different left edges:
the masthead at 16px, the plate headings and the card rules at 20/36,
the card titles at 72 (a 24px index column and its gap), the shop
titles at 96, and the discography's year at 72 for no reason at all.
Read down the page it looked ragged — the wordmark hung outside every
heading, a card's title was indented away from its own date, and the
menu's items stood 20px left of everything they opened onto.

Now the phone prints one text axis. The sheet's frame (the hairlines)
still runs on its 20px margin, and every word inside it — masthead,
menu, plate heading, card title, line, date, price, colophon — starts
on the one edge a card's inset gives it.

## 📐 What changed

- **The margin index folds above its title.** On a phone the 1.5rem
  margin column and its gap pushed every release and writing title
  36px right of its own date. The number now prints as a light eyebrow
  above the title, exactly as the plate headers fold their plate
  number on the same screen. From `md` it returns to the margin
  column, unchanged.
- **The menu sets on the page's axis.** The masthead and the panel's
  items move to the sheet's text edge; the items carry the card's
  inset as padding, so their rules still run to the sheet's frame like
  every row's rule below them. The `px-4 → px-9` shift also pulls the
  MENU toggle's right edge in line with the card content's.
- **The shop card's price joins its text column** instead of sitting
  under the art — the thumbnail holds the card's left edge, and every
  word on the card (title, line, price) starts to the right of it.
- **The discography's year separators** drop their empty margin
  column on the phone, so the year and its count print on the rows'
  own edge.
- **The masthead's gap becomes a floor rather than a fixed run**: at
  393 the line opens by `justify-between`, but at 320 the wordmark and
  MENU must still fit on one line, and a 16px gap no longer did.
- **The colophon** moves with the masthead: the back cover's small
  print starts on the same edge as the cards above it.

## ✅ Verification

- Full suite on a production build: **221 passed, 7 skipped, 0 failed**
  across Chromium, Firefox, WebKit and the mobile project.
- New test: at 393px the row's index, title, line and date, the shop's
  title, line and price, the wordmark, the plate heading, the first
  menu item and the discography year all measure the same left edge.
- Screenshots at 393×852 (home, open menu, discography) and 320×640.

## 📝 Notes

- Nothing moves from `md` up: the margin columns are the print's own
  grid and the desktop still has room for them.
- The 320px floor is the tight one — the wordmark and MENU share a
  line there with a handful of pixels to spare; the suite's sideways
  scroll check runs at 320 on every screen.
