---
title: 2026-11-06 - The plates gain a strike
description: Both plates were re-struck wider (3840×2160 and 2160×2880) so a 21:9 window is a downscale instead of an enlargement, the figure grows 5% against the name, and the sheet gets its own scrollbar.
commit: pending
author: Samuel Lee
date: 2026-11-06
category: 🎨 Design
impact: Home hero, whole site
---

# 📅 2026-11-06 - The Plates Gain a Strike

**Author**: Samuel Lee
**Category**: 🎨 Design

## 🎯 Overview

Three things, all of them the same complaint from different sides: the
fold is the print, so it should hold up wherever it is looked at, and
nothing around it should look like the browser's furniture rather than
the sheet's.

- At 21:9 the plate was being **enlarged** — 2400 device pixels stretched
  across a 3440px fold — and the halftone screen and the Didone both broke
  into mush. Both plates now carry a second strike wide enough that every
  fold is a downscale.
- The figure read a touch small against the name. It is 5% larger now, on
  both plates, anchored at the head so the extra growth goes down and
  outward into the wall, never up into the name.
- The page scrolled with the operating system's scrollbar. It now has the
  print's own: paper for the track, the hairline rule along its edge, a
  line-coloured thumb that turns rust under the cursor and pressed dark
  while dragged.

## 🖨️ The plates, re-struck

Same source, same luminance matte, same rotated CMYK halftone, same wall
band — only the strike size changed. `S` scales every constant, so the
composition is the same picture with more pixels in it.

| Plate | Was | Now | Bytes | Screen pitch |
| --- | --- | --- | --- | --- |
| `lusg-poster.jpg` | 1800×2400 | 2160×2880 | 1312KB | 4.32px |
| `lusg-poster-wide.jpg` | 2400×1350 | 3840×2160 | 1419KB | 5.76px |

- **The wide plate's job is 21:9.** Next's optimizer never enlarges, so
  the source has to be as wide as the widest fold it will meet. At 3440
  CSS px the browser now asks for `w=3840` and gets it: 3440 down from
  3840, not up from 2400. A 1920 desktop still resolves to the 1920
  variant (311KB), so ordinary screens pay nothing for the extra strike.
- **The tall plate covers retina tablets.** 2160×2880 means a 2048-device-
  pixel tablet is a downscale too; the phone still gets a 640w variant
  (38KB).
- **`FIG = 1.05`.** The person layer grows 5% against the type but keeps
  its head where it was (`PY = 323×S`, `575×S`), so the added height is
  clipped at the plate's foot and the wall, and the head never crowds the
  name. Ink positions against the sheet are otherwise unchanged: the wide
  name runs x 53.9–91.7%, y 25.9–59.4%; the tall name x 18.8–83.3%, y
  30.5–50.6%.
- **Paper unchanged.** Both still sample exactly `#f2e7d5` at the margins.

## 🧵 The scrollbar

`src/app/globals.css`, in `@layer base`:

- **Chromium and Safari** get `::-webkit-scrollbar`: a 13px paper track
  ruled on its left by `--color-line`, and a `--color-line` thumb with a
  3px paper border and a 7px radius — inset from the track's edge so the
  rule reads as a printed margin line rather than a border on the bar.
  Hover is `--color-rust`, dragging is `--color-press`.
- **Firefox** has no such pseudo-elements, so it takes
  `scrollbar-color: var(--color-line) var(--color-paper)` and a `thin`
  width. The two branches are written as exclusive `@supports
  selector(::-webkit-scrollbar)` / `@supports not …` pairs, because
  Chromium stops honouring `::-webkit-scrollbar` once `scrollbar-color`
  is set.
- Both rules sit inside `@supports`, so a browser that matches neither
  keeps its native bar rather than an unstyled one.

## 🧪 Verified

- 3440×1440: the fold is 3440×1309 and the plate resolves to the `w=3840`
  variant — 3440 device pixels painted from 3840, a downscale. The name is
  complete, the figure's head clear of it, the ember stamp above the foot.
- 1920×1080 and 390×844 re-checked against the full-bleed contract: the
  artwork box still equals the fold on all four sides, `object-fit: cover`,
  the right plate per orientation, `object-position: 100% 50%` on the wide
  plate.
- Scrollbar, headed Chromium at 1280×720: a 13px gutter
  (`innerWidth − clientWidth`), thumb line → rust on hover → press while
  dragged, paper track, `scrollWidth === innerWidth` (no horizontal
  overflow). Headless runs hide scrollbars, so this was measured in a
  windowed browser.
- `npx tsc --noEmit`, `npm run lint`, `npm run lint:css` — clean.
- `npm run test:pipeline` — **59 passed, 0 failed** (4 skipped, chromium +
  firefox + webkit).
- `npm run test:mobile` — **21 passed, 0 failed**.
- `tests/e2e/home.spec.ts` now records the plate's natural width and
  asserts, at 390, 1920 and 3440, that the fold is never painted from a
  plate narrower than itself — the 21:9 complaint, as a contract.

## 🔁 Built on

`changelogs/2026-11-05_the-fold-goes-full-bleed.md` (6cf7c11): the crop
windows and the name placement it measured still hold; this raises the
strike under them and enlarges the figure inside them.
