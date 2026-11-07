---
title: 2026-11-05 - The fold shows the whole print
description: The hero no longer crops the print to fill the screen — the whole 3:4 poster is laid on the sheet at the largest size the fold allows, foot on the fold, so the figure is in proportion instead of filling the first screen.
commit: pending
author: Samuel Lee
date: 2026-11-05
category: 🎨 Design
impact: Home hero
---

# 📅 2026-11-05 - The Fold Shows the Whole Print

**Author**: Samuel Lee
**Category**: 🎨 Design

## 🎯 Overview

The fold was the print at cover size: the artwork filled a 16:9 first screen
by zooming into the middle of the 1800×2400 plate. At 1920×1080 that window
was only the print's y 25.2%–62.3% — 37% of its height — so the figure's head
sat at poster scale on a desktop screen and swallowed the fold. On a phone the
same cover logic trimmed 118px off the sides of a 390-wide screen.

The print now sits on the sheet whole. It is drawn at the largest size the
fold allows — as tall as the fold, or as wide as the screen where the screen
is narrower than that — and is never cropped. Its foot lands on the fold, so
the plates below still follow it directly.

## 📐 The geometry

The 3:4 plate cannot fill a 16:9 fold without cropping: the fold is ~2.0 wide
to 1, the print 0.75. Filling the width would draw the print 2560px tall to
show 949px of it; the only way to show the whole picture is to stop filling
the width and fill the height instead.

| Viewport | Fold | Print | Filled | Paper above |
| --- | --- | --- | --- | --- |
| 1920×1080 | 1920×949 | 711.8×949 | height | 0 |
| 1440×900 | 1440×769 | 576.8×769 | height | 0 |
| 768×1024 | 768×893 | 669.8×893 | height | 0 |
| 390×844 | 390×678 | 390×520 | width | 158 |
| 375×667 | 375×501 | 375×500 | width | 1 |

At 16:9 the print fills the fold's height and paper takes the sides — the
same paper the print is printed on, so the only thing that ends is ink. On a
phone the print fills the width and the paper above it is likewise invisible
against the sheet.

## 🧩 What changed

- `Hero.tsx`: the `absolute inset-0` link is gone. The artwork is a 3:4 box,
  `w-[min(100cqw,75cqh)]`, bottom-aligned inside the fold with `items-end`.
  `75cqh` is the print's width when its height is the fold's height (3:4);
  `100cqw` caps it on phones. `next/image` still fills the box and keeps
  `object-cover`, which on a box of the print's own ratio is the whole
  picture, not a crop. `sizes` now names the drawn width: `75vh` on desktop,
  `100vw` on phones.
- `globals.css`: `.hero-print` stays — the fold is still a size container, and
  the container units are what keep the fold's height subtraction in one
  place. The `@container` corner patch from 856b010 is removed: there are no
  couplet tails to cover because nothing is trimmed any more.
- `tests/e2e/home.spec.ts`: the couplet-patch tests are replaced by the
  whole-print contract — 3:4, one axis filled, centred, foot on the fold,
  fold ends at the viewport bottom — plus a two-viewport test that a phone
  fills the width with paper above and a 1920×1080 desktop fills the height
  with paper at the sides.

## 🧪 Verified

- Rendered and measured in Chrome at 1920×1080, 1440×900, 1512×982, 768×1024,
  2560×800, 844×390, 390×844 and 375×667: ratio 0.75 at every size, exactly
  one axis filled, foot on the fold, no horizontal overflow.
- `npx tsc --noEmit`, `npm run lint`, `npm run lint:css` — clean.
- `npm run test:pipeline` — **59 passed, 0 failed** (4 skipped, chromium +
  firefox + webkit).
- `npm run test:mobile` — **21 passed, 0 failed**.

## 🔁 Supersedes

`changelogs/2026-11-05_the-fold-starts-on-paper.md` (856b010): the paper
corner that hid the couplets' sliced tails served the cover crop. The crop is
gone, so the patch went with it.
