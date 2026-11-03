---
title: 2026-11-03 - The print becomes the hero
description: The fold is now a 3:4 letterpress-style poster — typewriter couplets in the paper, the band name in giant rust serif cut by the artist's figure, CMYK halftone with plate misregistration, and the original photo as a thumbnail — laid over the twilight ridge. The cover-and-vinyl hero is gone.
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

A follow-up corrected the plate's title: *"of course the hero need to
say Lazy Perfectionist instead of lusg."* The giant word is the band
name, not the single. Eighteen characters cannot be set at the 430px
that carried four, so the name is two right-aligned lines at 180px and
the photograph is shifted 260px left: the head crops into the left edge
and rises through the `P` of `Perfectionist`, leaving the name readable
where the old `LUSG` lost its `L`.

## 📦 What changed

| Area | Change |
|---|---|
| Plate | `public/assets/img/lusg-poster.jpg` — 1200×1600 (3:4), 434KB. Warm paper `#f3e9d7`; subject matted from the source by luminance and screened at 3.6px pitch with rotated plates (C 15°, M 75°, Y 0°, K 45°) and per-plate offsets of ≤0.7px; wall band screened at 5px behind an organic, alpha-dithered dissolve; the source thumbnail (200px, 15% of the width) sits top-right under an `ORIGINAL` caption. |
| Type in the plate | Couplets in American Typewriter 23px, left-anchored in the upper third; `Lazy` / `Perfectionist` in Bodoni 72 at 180px, two right-aligned lines, filled with the same three process-dot layers via `background-clip: text`, so the name carries halftone too. The subject is shifted 260px left so the head enters from the paper's edge and rises through the `P`; the ink ghosts through the transparent parts. No watermark, no second title. |
| Hero | The print replaces the square cover, centered at `min(88vw, 42rem)` with a hairline frame that warms on hover (no lift — paper doesn't levitate). The image is the listen link; the explicit action is now a quiet tracked-caps link beneath it instead of the filled ember button. `Lazy Perfectionist` is the page `h1`, carried for the document outline rather than repeated over the print. HeroSky remains as the ground behind the print; the crashed satellite stays visible left of the paper and the moon right of it. |
| Removed | Vinyl reveal and its `reveal` variant, `--animate-vinyl` keyframes, and the `lusg-cover-400.webp` label asset — all hero-only. The full cover stays for Open Graph/Twitter cards. |
| Comments | HeroSky's composition notes now cite the centered print, not the vinyl's slide path. |

No dependencies added (the plate was generated with the repo's existing
`sharp`, plus a local Playwright render for the type layer; neither script
is committed — they live in ignored `.omc/state/`). No client JavaScript.

## ✅ Verification

- `npx tsc --noEmit`, `npm run lint` (ESLint), `npm run lint:css` — clean.
- `npm run test:pipeline` — **25 passed, 0 failed** (5 skipped) across
  chromium/firefox/webkit desktop.
- `npm run test:mobile` — **9 passed, 0 failed** (1 skipped) at 375×667.
- The new `poster hero` tests lock the print contract: the artwork renders
  a 3:4 image (measured ratio 0.75), and the page `h1` is
  `Lazy Perfectionist`. The
  honest-link, announcement, nav-scroll, release-row, reduced-motion and
  manifest tests all still pass unchanged.
- Zero console errors and zero page errors at load (suite assertion), and
  `scrollWidth − innerWidth = 0` at 375, 768 and 1024. The optimizer
  serves 750px/121KB (111KB as AVIF) for the 672px print at DPR 1.
- Screenshots at 1440×900, 1024×768, 768×1024 and 375: the fold reads
  poems → thumbnail → word → head, with the CTA just below it.

## 📝 Notes

- The subject is the same archived photograph the old hero's sky was
  composed around, so the print and the ridge share one palette (the
  print's ink was sampled from the source's wall and jacket).
- The subject now enters from the left edge rather than sitting fully
  inside the paper, so the poster reads as a cropped portrait with the
  name set beside it — the crop is what buys the name its legibility at
  full scale.
- The couplets are the poster's own text, not site copy; the site's
  voice still lives in the announcement bar and the catalog.
- The print is a raster asset; its generator is documented here rather
  than shipped, because the poster is final artwork, not a build step.
