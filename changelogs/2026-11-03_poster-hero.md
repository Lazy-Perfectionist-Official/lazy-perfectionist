---
title: 2026-11-03 - The print becomes the hero
description: The fold is now a full-screen letterpress-style poster — the band name in giant rust serif cut by the artist's figure, CMYK halftone with plate misregistration, and the original photo as a thumbnail — bled edge to edge to the fold. The cover-and-vinyl hero is gone.
commit: pending
author: Samuel Lee
date: 2026-11-03
category: 🎨 Design
impact: Medium
---

# 📅 2026-11-03 - The Print Becomes the Hero

**Author**: Samuel Lee
**Category**: 🎨 Design

## 🎯 Overview

Request, verbatim: a 3:4 vertical poetic vintage-print poster — warm-white
paper in the top third carrying a restrained typewriter couplet, a giant
high-contrast serif word across the middle, the photographic subject rising
from the lower scene through the word into the paper, CMYK halftone with
slight plate misregistration, the uncropped original as a small thumbnail
top-right, no extra titles or watermarks — followed by: *"use this as hero!"*
and, on clarification, *"no this is the prompt to make the photo. I need
this style of hero"*.

The prompt is a production brief, so the plate was built rather than
commissioned: the archived amber long-exposure portrait (the artist, from
`feature/website-redesign:public/assets/img/hero-background.jpg`) is cut
from its wall, matted, screened into CMYK and recomposed as a single
continuous print. The site's fold now shows that print instead of the
square cover, and the vinyl reveal it replaced is deleted.

Two follow-ups corrected the fold. First the type: *"of course the hero
need to say Lazy Perfectionist instead of lusg."* Eighteen characters
cannot be set at the 430px that carried four, so the name is two
right-aligned lines and the photograph is shifted 260px left: the head
crops into the paper's edge and rises through the `P` of `Perfectionist`,
leaving the name readable where the old `LUSG` lost its `L`. Then the
scale: *"And I think you need to make the hero a full screen thing."* The
print is now bled edge to edge — it fills the first screen beneath the
announcement bar and header, cropped by the viewport rather than framed,
and the catalog begins at the fold.

## 📦 What changed

| Area | Change |
|---|---|
| Plate | `public/assets/img/lusg-poster.jpg` — 1800×2400 (3:4), 705KB at q82. Warm paper `#f3e9d7`; subject matted from the source by luminance and screened at 3.6px pitch (5.4 device px at this raster) with rotated plates (C 15°, M 75°, Y 0°, K 45°) and per-plate offsets of ≤0.7px; wall band screened at 5px behind an organic, alpha-dithered dissolve starting at poster y 1050; the source thumbnail (15% of the width) sits top-right under an `ORIGINAL` caption. Re-rendered at 1.5× from the same 1200-unit composition so the screen-filling raster is not upscaled by the optimizer. |
| Type in the plate | Couplets in American Typewriter, left-anchored in the upper third; `Lazy` / `Perfectionist` in Bodoni 72 at 180px in the 1200-unit composition, two right-aligned lines, filled with the same three process-dot layers via `background-clip: text`. The subject is shifted 260px left so the head enters from the paper's edge and rises through the `P`; the type layer is vector at 1800 and stays crisp. No watermark, no second title. |
| Hero | Full bleed. The section is `100svh` minus the measured chrome (174px at phone widths, 143px from `md` up, so the print ends exactly at the fold) with `overflow-hidden`; the print is a `next/image` with `fill` and `object-cover`, anchored at `50% 35%`. The link covers the entire print, so the fold is one surface; a keyboard focus ring is drawn by the anchor's `::after` (2px ember, inset 4px) because an outline would paint beneath the absolutely-positioned image and the section clips its outside edge. `Lazy Perfectionist` is the page `h1`, carried for the document outline rather than repeated over the print. |
| Crop | The vertical anchor is chosen, not default: at 35% the visible source window at 1440×900 is poster y 339–969, at 1024×768 it is 304–1037, and at 1366/1920 it lands similarly — the name's glyphs (505–816) stay whole at every landscape ratio, and the window stops above the wall band at 1050 so the fold never cuts the dissolve seam. Portrait screens see most or all of the print: at 375×667 the window is 97% of the poster's height. |
| Removed from the fold | The quiet `Listen on Spotify` caption — with the print at full bleed it would either break the one-screen height or need a scrim. The announcement bar and the header's `Spotify` entry are the explicit actions. The vinyl reveal, its `reveal` variant, `--animate-vinyl`, and the `lusg-cover-400.webp` label asset were already deleted in the first pass; the full cover stays for Open Graph/Twitter cards. |
| Sky | `HeroSky` is no longer mounted — the print covers the fold it used to stage, and the site is now fully static (no motion), so the reduced-motion e2e that asserted the sky's `motion-safe` animations is retired. The component and its keyframes remain in the tree, unmounted, so the ridge can be brought back as a band below the print without rebuilding it. |

No dependencies added (the plate was generated with the repo's existing
`sharp`, plus a local Playwright render for the type layer; neither script
is committed — they live in ignored `.omc/state/`). No client JavaScript.

## ✅ Verification

- `npx tsc --noEmit`, `npm run lint` (ESLint), `npm run lint:css` — clean.
- `npm run test:pipeline` — **24 passed, 0 failed** (3 skipped: the
  mobile-only overflow test on desktop projects) across
  chromium/firefox/webkit desktop.
- `npm run test:mobile` — **9 passed, 0 failed** at 375×667.
- The `poster hero` test now locks the full-screen contract instead of the
  old 3:4 rendering: the artwork's box equals the section's box on all
  four sides (`object-fit: cover`), the section starts below the chrome,
  and its bottom lands on the viewport bottom within 2px. The page `h1`
  is still `Lazy Perfectionist`.
- Measured at 1440×900, 1024×768, 768×1024 and 375×667: section top 143/
  143/143/174 (the header's bottom), section bottom exactly 900/768/1024/
  667, artwork box identical to the section, `scrollWidth − innerWidth = 0`
  at every size, zero console errors and zero page errors.
- The fold was screenshot at all four sizes and inspected: the name is
  whole, the head crosses the `P` without hiding it, and the bottom rows
  are flat paper (no wall-dissolve seam) at 1440 and 1024.
- Keyboard: six Tabs reach the print (`announcement → wordmark → Music →
  Elsewhere → Spotify → print`) and the `::after` ring computes to
  `opacity: 1`, 2px `rgb(220, 80, 0)`, inset 4px.
- The optimizer serves 1800×2400 (no enlargement beyond the plate):
  **539KB** as JPEG and **448KB** as AVIF at `w=1920`; the plate itself is
  705KB.

## 📝 Notes

- The subject is the same archived photograph the old hero's sky was
  composed around, so the print and the ridge share one palette (the
  print's ink was sampled from the source's wall and jacket).
- The subject enters from the left edge rather than sitting fully inside
  the paper, so the poster reads as a cropped portrait with the name set
  beside it — the crop is what buys the name its legibility at full scale.
- Full bleed means the print's own top margin — the couplets and the
  `ORIGINAL` thumbnail — is what a wide screen loses; portrait screens
  keep them. That trade was chosen over letterboxing or shrinking the
  name.
- The couplets are the poster's own text, not site copy; the site's voice
  still lives in the announcement bar and the catalog.
- The print is a raster asset; its generator is documented here rather
  than shipped, because the poster is final artwork, not a build step.
