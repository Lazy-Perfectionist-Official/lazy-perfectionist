---
title: 2026-11-05 - The fold goes full-bleed
description: The hero print now fills the fold edge to edge on every screen. Both plates were struck again without the margin copy — no couplets, no ORIGINAL thumbnail — and the name was placed to survive the crop at any window size.
commit: pending
author: Samuel Lee
date: 2026-11-05
category: 🎨 Design
impact: Home hero
---

# 📅 2026-11-05 - The Fold Goes Full-Bleed

**Author**: Samuel Lee
**Category**: 🎨 Design

## 🎯 Overview

Showing the whole print on the fold left the print as an object — a
centred sheet with margins in it, couplets in the top-left, the source
photograph boxed and labelled `ORIGINAL` in the top-right, paper around it
all. On a phone that meant a picture with printed margins inside a page
with margins outside it: two frames doing one job.

Now the picture is the screen. The artwork's box is the fold itself, the
plate is scaled with `object-cover` and cropped by whatever the fold's
aspect happens to be, and the plates themselves were re-struck without the
margin copy: the couplets and the `ORIGINAL` thumbnail are gone, so the
sheet carries the photograph, the wall, and the name, nothing else.

## 🖨️ The plates, re-struck

Both plates were rendered again from the same source
(`feature/website-redesign:public/assets/img/hero-background.jpg`), same
luminance matte, same rotated CMYK halftone, same wall band. Only the
margins changed.

| Plate | Size | Bytes | Name |
| --- | --- | --- | --- |
| `lusg-poster.jpg` | 1800×2400 | 862KB | Lazy 286px / Perfectionist 244px |
| `lusg-poster-wide.jpg` | 2400×1350 | 599KB | Lazy 250px / Perfectionist 190px |

Three changes to the composition:

- **Margin copy removed.** The couplets ("The light stays on. / The room
  keeps time. / What the song leaves, / the body holds.") and the labelled
  `ORIGINAL` print were set in the sheet's corners. At full bleed the crop
  cuts the corners first — on a phone they would be half off-screen — so
  they left the plates rather than became accidents.
- **The name sits inside the crop.** It is the one thing that must survive
  every window, so its block was re-placed: on the 3:4 print the ink now
  runs x 18.9–83.3% (a 7% reduction from the print's scale, so the narrowest
  phone crop still gives it ~30px of air at each edge instead of 10px), and
  on the wide plate the right edge moved in from 94% to 91.7% — inside a
  3:2 fold's crop, which is the tightest the wide plate ever gets.
- **Paper unchanged.** Both sample `#f2e7d5` at every margin, exactly
  `--color-paper`, so the fold has no edge except where its ink ends.

## 🧭 The hero

`Hero.tsx` loses its aspect box and its container units. The anchor is
`absolute inset-0` inside the fold; both plates are `fill` +
`object-cover`, one shown per screen shape with the same
`portrait:`/`landscape:` variants and orientation-scoped `sizes` as before
(the plate that is not shown still costs a 640w thumbnail, ~13–75KB).

- **The wide plate is anchored right** (`object-right`). When a window is
  squarer than 16:9 the crop takes the figure's left edge, never the
  wordmark's right.
- **The stamp moved to the measure.** "Listen to LUSG ↗" now sits in an
  `inset-x-0` band with the page's own `max-w-[90rem] px-6 md:px-10`, so it
  lines up with the masthead and the plate labels below instead of the
  print's foot. It is `pointer-events-none`; the fold remains one link.
- **`hero-print` is gone.** Nothing is measured in `cqw`/`cqh` any more, so
  the section's `container-type: size` came out with it.

Cropped, not letterboxed — the visible window in plate coordinates:

| Viewport | Fold | Fold ratio | Plate | Visible |
| --- | --- | --- | --- | --- |
| 1920×1080 | 1920×949 | 2.02 | 16:9 | y 6.1–93.9% |
| 1366×768 | 1366×637 | 2.14 | 16:9 | y 8.5–91.5% |
| 1024×768 | 1024×637 | 1.61 | 16:9 | x 4.8–95.2% |
| 844×390 | 844×259 | 3.26 | 16:9 | y 22.7–77.3% |
| 768×1024 | 768×893 | 0.86 | 3:4 | y 6.4–93.6% |
| 390×844 | 390×678 | 0.58 | 3:4 | x 11.7–88.3% |
| 360×800 | 360×634 | 0.57 | 3:4 | x 12.2–87.8% |

The name's ink stays inside every one of those windows.

## 🧪 Verified

- Rendered both plates and measured them in the app at 1920×1080,
  1366×768, 1024×768, 844×390, 768×1024, 390×844 and 360×800: artwork box
  equal to the fold on all four sides, `object-fit: cover`, the matching
  plate fetched per screen shape, name fully visible at every size, paper
  `#f2e7d5` sampled from the encoded JPEGs.
- `npx tsc --noEmit`, `npm run lint`, `npm run lint:css` — clean.
- `npm run test:pipeline` — **59 passed, 0 failed** (4 skipped, chromium +
  firefox + webkit).
- `npm run test:mobile` — **21 passed, 0 failed**.

## 🔁 Built on

`changelogs/2026-11-05_the-fold-gets-a-wide-plate.md` (7cfdfc3): the two
plates and their type layer are still the ones it describes; this changes
where they stop being printed and how they meet the fold.
