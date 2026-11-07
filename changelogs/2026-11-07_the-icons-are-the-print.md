---
title: 2026-11-07 - The icons are the print, down to 16px
description: The tab, install and home-screen marks stop being the pre-wipe garden photograph and become the print in miniature — paper field, ink Bodoni "LP", ember bellyband — with a lone L at 16px where the P's counter provably collapses.
commit: pending
author: Samuel Lee
date: 2026-11-07
category: 🎨 Design
impact: Tab, install + home-screen marks
---

# 📅 2026-11-07 - The Icons Are the Print, Down to 16px

**Author**: Samuel Lee
**Category**: 🎨 Design
**Impact**: Tab, install + home-screen marks

## 🎯 Overview

The favicon set was still the pre-wipe site's: a garden photograph at
81 KB for the touch icon and 481 KB for the 512. Since b810383 the site
*is* the print, so its smallest marks are now the print too — the og-card
collapsed to a glyph.

- **The mark**: paper field `#f2e7d5`, ink `#2a1810` Bodoni Moda "LP",
  ember `#dc5000` bellyband across the foot 64/512 — the same palette
  and band the og-card carries.
- **Set in the site's own Bodoni**, not a bundled font file: the script
  borrows a running dev server on 127.0.0.1:3000, reads the hashed
  family from `--font-bodoni`, waits on `document.fonts.load` for the
  real glyphs, then centres the type on its ink extents via `getBBox`.
- **Two optical tiers, judged on true rasters**: at 16px the P's counter
  collapses into a gray mass, so the smallest raster is a lone **L**;
  from 32px up the monogram keeps and holds its holes. The 512 keeps the
  true Bodoni 700.
- **Outputs**: `favicon.ico` assembled here with PNG entries at 16/32/48
  (every browser in the support matrix reads them), plus 180/192/512
  PNGs for Apple touch and the manifest.
- **`npm run icons`** added to `package.json`; the script lives at
  `scripts/make-icons.mjs` and screenshots the mark at native pixels,
  scale 1.

## 🧪 Verified

- True rasters inspected at 12× nearest-neighbour: 16px reads as a clean
  **L**; 32px and 48px read **LP** with the P's counter intact; 180/192/512
  show the full monogram.
- All four routes serve 200 with the right types — `favicon.ico`
  5,686 → 1,233 B; `apple-touch-icon.png` 81,521 → 1,723 B;
  `icon-192x192.png` 87,494 → 1,937 B; `icon-512x512.png`
  480,922 → 4,884 B.
- `node --check scripts/make-icons.mjs`; `npm run lint` — clean.
