---
title: 2026-09-23 - Fine grain baked into the art, ridges redrawn as a real skyline
description: Three fixes from review — the page-wide body::after grain overlay (z-50, sitting on top of text) is deleted and replaced by a dual-polarity speckle tile baked inside the hero SVG the way Intervals does it; the metronomic rolling ridges are redrawn as a sharp asymmetric mountain skyline with atmospheric-perspective gradients and an off-center valley glow; the old blurry 200px webp tile is replaced by a crisp 256×256 PNG (≈1 CSS px speckles, verified sharp at 3x on desktop and mobile)
commit: pending
author: Samuel Lee
date: 2026-09-23
category: 🎨 Design
impact: Medium
---

# 📅 2026-09-23 - Fine Grain Baked Into the Art, Ridges Redrawn as a Real Skyline

**Author**: Samuel Lee
**Category**: 🎨 Design

## 🎯 Overview

Three notes from review, three root causes, three fixes:

1. **"Grain is overlaying the foreground"** — it literally was:
   `body::after` painted a fixed full-page tile at `z-50`, above every
   word on the page. Deleted. Grain now lives *inside* the HeroSky
   artwork only (the actual Intervals pattern — their grain is part of
   the background photo, not a veil over the site), so text and imagery
   stay crisp by construction.
2. **"Mountains are too Material UI"** — the ridge paths were evenly
   spaced rolling crests (~130–160px rhythm, uniform smooth waves),
   which reads as a stock vector wave, not a landscape. Redrawn as an
   actual mountain range: sharp asymmetric peaks (control points
   straddle each crest so it arrives going up and leaves going down),
   60–75px varied rhythm, tallest peak at (1000,452) in the open sky
   right of the cover, the stretch behind the artwork kept low so it
   never competes. Far ridge gains a haze gradient (`#502b39` →
   `#3a1a27`, crest lifted like distant ranges photograph at dusk) and
   an off-center valley glow pool — real dusk glows are irregular.
3. **"Grain is too large and too blurry, even on phone"** — the old
   tile was a 200×200 lossy webp: webp smoothing fuzzes every speckle,
   and at 200 CSS px the particles render chunky. New
   `grain-fine.png`: a 256×256 **dual-polarity** speckle tile — every
   pixel randomly white or black, alpha skewed faint (`pow 2.4`) — so
   the tile modulates luminance around zero instead of fogging the
   scene like an opaque mid-gray veil. Painted at a 220-unit pattern
   in the 1440-wide viewBox ≈ **1 CSS px particles** (~2–3 device px
   on a 3x phone) at 0.22 opacity. PNG keeps the speckles razor-sharp.

## 📦 What changed

| File | Change |
|---|---|
| `src/app/globals.css` | **Deleted** the `body::after` page-wide grain overlay (200px webp tile, z-50, 0.04 opacity); replaced by a comment pointing at the baked-in approach |
| `src/components/HeroSky.tsx` | Far ridge redrawn as jagged asymmetric skyline with `far-ridge-fill` haze gradient; new `horizon-pool` off-center valley glow; grain pattern now `grain-fine.png` at 220-unit tiling, opacity 0.22; header comment documents the baked-in grain |
| `public/assets/img/grain-fine.png` | **New.** 256×256 dual-polarity speckle tile, deterministic (xorshift seed `0x9e3779b9`), hand-rolled PNG encoder — 94 KB |
| `public/assets/img/noise-tile.webp` | **Deleted.** The blurry lossy tile; zero references remain |
| `.omc/state/gen-grain.mjs` | Generator for the tile (not committed — `.omc/state/*` stays local) |

## ✅ Verification

- `npm run lint:css` clean; `npm run build` clean
- Playwright probe (`.omc/state/lp-grain-shot.mjs`, deviceScaleFactor 3):
  **zero console errors**, no mobile horizontal scroll
- Vision review (GLM-4.6V):
  - Grain desktop sky patch **PASS 4/4** — "very fine, sharp 1–2 px
    speckles… organic sparkle reads like high-ISO film grain"
  - Grain mobile patch (375 @ 3x) **PASS 3/3** — small discrete
    speckles, consistent with phone-width rendering
  - Title glyph crop **PASS 4/4** — crisp serif, **zero grain sitting
    on the letters** (proves the overlay removal)
  - Skyline left-band crop **PASS 4/4** — sharp irregular peaks, varied
    rhythm, layered depth; reads hand-drawn, not stock vector

## 📝 Notes

- Dual-polarity is the load-bearing trick: a balanced white/black
  speckle field reads as texture; a mid-gray noise field reads as fog.
- Tallest-peak placement follows the fold geometry from the previous
  pass: peaks behind the cover (x 510–930) are wasted pixels — the
  visible sky right of the artwork is where the range gets to perform.
