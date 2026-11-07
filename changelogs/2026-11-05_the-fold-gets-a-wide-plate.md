---
title: 2026-11-05 - The fold gets a wide plate
description: A 16:9 strike of the print — same photograph, halftone, wall and type — now fills a landscape fold, so a default screen shows the whole picture at full size instead of a centred 3:4 plate with wide paper either side.
commit: pending
author: Samuel Lee
date: 2026-11-05
category: 🎨 Design
impact: Home hero
---

# 📅 2026-11-05 - The Fold Gets a Wide Plate

**Author**: Samuel Lee
**Category**: 🎨 Design

## 🎯 Overview

The whole 3:4 print on the fold fixed the giant head, but a 3:4 plate
cannot fill a 16:9 screen: it was drawn 712px wide on a 1920px fold, a
centred picture with 600px of paper on each side. The print now comes in
a second strike — 2400×1350, 16:9 — carrying the same photograph,
halftone, wall band, couplets, thumbnail and name, recomposed for a wide
sheet. The hero shows the 3:4 print on portrait folds and the wide plate
on landscape ones, each whole and as large as the fold allows.

## 🖨️ The wide plate

`public/assets/img/lusg-poster-wide.jpg` (2400×1350, 650KB) is struck from
the same source as the print: the old hero photograph
(`feature/website-redesign:public/assets/img/hero-background.jpg`,
2752×1536), matted by luminance, halftoned on rotated CMYK screens, with
the wall band across the foot. The type was laid again for the wide sheet
— the couplets in the top-left margin, `ORIGINAL` in the top-right, the
name right-aligned over the paper to the right of the figure ("Lazy" 230px,
"Perfectionist" 175px in Bodoni 72) — so the figure keeps the print's scale
and the extra width becomes composition instead of empty paper.

Two details that make it sit on the page:

- **Paper is the page's paper.** Sampled `#f2e7d5` at every margin, exactly
  `--color-paper`, so the plate has no edge except where its ink ends.
- **No tooth overlay.** The print's HTML carried a faint noise layer that
  darkened the sheet to `#e4dacf` — on the page that would read as a dark
  rectangle. Dropping it restores `#f2e7d5`; the halftone dots already carry
  the texture.

## 🧭 Art direction in the hero

`Hero.tsx` keeps one anchor and one focus ring. The anchor is the 3:4 print
by default and `aspect-video` with `w-[min(100cqw,177.78cqh)]` in landscape
(177.78cqh is a 16:9 plate's width when its height is the fold's height).
Two `next/image` plates sit in it, one shown per orientation. Their `sizes`
are orientation-scoped — `(orientation: landscape) 0px, 100vw` and the
reverse — so the plate that is not displayed resolves to the smallest
variant instead of downloading full size: 13KB of hidden 16:9 plate on
desktop, 75KB of hidden print on a phone.

| Viewport | Fold | Plate | Drawn | Fills |
| --- | --- | --- | --- | --- |
| 1920×1080 | 1920×949 | 16:9 | 1687×949 | height |
| 1440×900 | 1440×769 | 16:9 | 1367×769 | height |
| 844×390 | 844×259 | 16:9 | 460×259 | height |
| 768×1024 | 768×893 | 3:4 | 670×893 | height |
| 390×844 | 390×678 | 3:4 | 390×520 | width |

At 16:9 the fold is 2.02 wide and the plate 1.78, so the plate fills the
height with paper at the sides — 7% each at 1920, invisible against the
sheet. The composition is never cropped: each box has its plate's own ratio.

## 🧪 Verified

- Rendered the plate at 2400×1350 and measured it in the app at 1920×1080,
  1440×900, 768×1024, 844×390 and 390×844: 16:9 box on landscape, 3:4 on
  portrait, one axis filled, foot on the fold, only the matching plate
  fetched at size, paper `#f2e7d5` at every margin.
- `npx tsc --noEmit`, `npm run lint`, `npm run lint:css` — clean.
- `npm run test:pipeline` — **59 passed, 0 failed** (4 skipped, chromium +
  firefox + webkit).
- `npm run test:mobile` — **21 passed, 0 failed**.

## 🔁 Built on

`changelogs/2026-11-05_the-fold-shows-the-whole-print.md` (7f3e449): the
3:4 plate and its portrait behaviour are unchanged; this adds the landscape
plate beside it.
