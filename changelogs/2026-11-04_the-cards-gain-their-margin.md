---
title: 2026-11-04 - The cards gain their margin
description: Every list row now carries its own left and right padding — 16px on phones, 24px from md up — so the type, the art and the plate labels sit inside the card instead of on its edge; the hairlines stay on the full measure and the masthead keeps the page gutter.
commit: pending
author: Samuel Lee
date: 2026-11-04
category: 🎨 Design
impact: Layout
---

# 📅 2026-11-04 - The Cards Gain Their Margin

**Author**: Samuel Lee
**Category**: 🎨 Design

## 🎯 Overview

Request, verbatim: *"left right paddings on each cards are needed."*

The rows are the cards: at rest they are ruled list items, on hover the
`paper-deep` band spans the plate's whole measure. Until now their
content began exactly on the band's edge — the cover, the index and the
price all touched the same line the hover highlight started from, which
made the card read as a highlight on the type rather than a card holding
it.

The fix is padding inside each row, not a wider page: the row and its
plate header gain `px-4` (`16px`) on phones and `md:px-6` (`24px`) from
md up. The rules stay where they were — a border lies outside its own
padding — so the hairlines still run the full measure and the masthead
wordmark keeps the page gutter. The heading block and plate label move in
with the rows, so "Plate 02" still sits over the cover it labels.

## 📐 What moved

| At | Row box | Content starts | Plate label |
|---|---|---|---|
| 1440 | 40 → 1400 | 64 | 64 |
| 768 | 40 → 728 | 64 | 64 |
| 375 | 24 → 351 | 40 | 40 |

The page container is unchanged (`px-6 md:px-10`): the container sets
the plate's measure, the row padding sets the card's inner margin. All
four plates — Singles, Shop, Writing, Elsewhere — take both, including
Elsewhere's two-column rows. `scrollWidth - innerWidth` stays 0 at 1440,
768 and 375.

## ✅ Verification

- `npx tsc --noEmit`, `npm run lint`, `npm run lint:css` — clean.
- `npm run test:pipeline` — **42 passed, 0 failed** (3 skipped).
- `npm run test:mobile` — **15 passed, 0 failed** at 375x667.
- New test locks the card margin: each plate's first row and plate label
  must compute `padding-left`/`padding-right` of 24px on desktop and 16px
  on the phone project.
- Hover screenshots at 1440, 768 and 375: the `paper-deep` band spans
  gutter to gutter while the cover sits 24px inside it, and the ruled
  lines still meet the masthead's.

## 📝 Notes

- The alternative — letting the hover band extend past the type with a
  negative margin — was rejected: it changes nothing at rest, so the
  cards would only look padded under a cursor, never on a phone.
- The footer keeps the page gutter; it is a colophon band, not a card.
