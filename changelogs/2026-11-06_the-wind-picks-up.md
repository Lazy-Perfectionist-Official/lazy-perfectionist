---
title: 2026-11-06 - The wind picks up
description: The breeze was too subtle, looked left-only and too uniform — because its three phases cancelled wherever their weights tied. Rebuilt as a true travelling wave (cos⁺ phasor bumps, two harmonics, three times the amplitude) with the wordmark kept crisp.
commit: pending
author: Samuel Lee
date: 2026-11-06
category: 🎨 Design
impact: Home hero
---

# 📅 2026-11-06 - The Wind Picks Up

**Author**: Samuel Lee
**Category**: 🎨 Design

## 🎯 Overview

The first breeze shipped too quiet: *"it's too subtle and why it's only on
the left side, and it's too uniform."* All three were the same defect. The
bands' masks had been drawn so their weights **summed to a constant** — the
neat-looking choice — but three sine phases 120° apart sum to **zero**
wherever the weights tie, so the wave stood in dead patches roughly every
9vw, never reached more than about a quarter of the keyframe's amplitude,
and being a single harmonic, shimmered metronomically. The still patches
landing on the left of the fold is what read as "only on the left side".

## 📚 How everyone else does it

Researched before rebuilding:

- **The classic CSS flag** — one image sliced into vertical strips, all
  running the same keyframes with staggered `animation-delay` (public
  snippets use ~14 slices). GPU-cheap, but hard slices step at their seams.
- **SVG `feTurbulence` + `feDisplacementMap`** — the organic standard: noise
  shoves pixels around, animatable via `baseFrequency`. And measurably
  expensive: animating it re-runs the filter over every pixel every frame,
  reported "really sluggish" on mobile — a non-starter on a full-bleed LCP.
- **WebGL/three.js** — real vertex-shader flags; a 3D pipeline this
  zero-JS site is not adopting for a poster.

So the fold keeps the slice family, done the way the math wants.

## 🌬️ What changed

- **cos⁺ bumps instead of constant-sum bands.** Each harmonic's three
  copies are masked to a soft bump per wavelength — `max(0, cos)` in
  disguise — offset a third of a wavelength apart, swaying a third of a
  cycle behind each other (negative mask positions with negative delays, so
  the phase *falls* with x and the wave travels right). At every point one
  phase dominates; amplitude stays 0.87–1.0 of the keyframe everywhere and
  there are no dead patches. Measured: crests cross the fold rightward at
  ~110px/s.
- **Two harmonics — a chord, not a tone.** The *billow* (56vw wavelength,
  10s, `skewY` + `translateY`) carries the long slow wave; the *shimmer*
  (24vw, 5s, `skewX`) rides across it, sheared the other way so the two
  never lockstep. The print's motion no longer repeats on a metronome.
- **Three and a half times the amplitude.** Instantaneous deviation from
  the still print now breathes between **mean 2.8 and 6.5/255** (the first
  breeze sat at a constant 1.8; the deleted lantern read 3.3).
- **The flanks are steep, and that is what keeps the type crisp.** The
  crossfade zone is where two displaced copies show at once — a wide flank
  at this amplitude reads as a doubled edge on *Lazy Perfectionist*
  (caught in review at ±0.4vmin and pulled back to ±0.26vmin with the blend
  confined to a fifth of the wavelength). Displacement, not double
  exposure.
- **The wind has a direction.** The span's mask now intersects a gentle
  left-to-right envelope (45% → full by 55% width): the wind enters at the
  leading edge and the free edge moves most, like cloth pinned upwind.
  `mask-composite: intersect` needs a 2023-era engine — the site's floor
  already requires it — and if an older one unions the layers instead, the
  cost is an envelope, not a seam.
- Still compositor-only (transforms alone animate; nothing repaints, the
  LCP plate is untouched), still zero extra bytes (six copies per
  orientation, all sharing the plate's src), still `display: none` under
  reduced motion, and the span's vertical feather still keeps bands away
  from the fold's edges — measured 0.0 (top) and 1.3 (bottom) mean
  deviation in the edge rows on a phone.

## 🧪 Verified

- Deviation from the still print across the cycle: means 6.5 → 6.2 → 2.8
  (it breathes); crest tracking by profile cross-correlation: +145px,
  +108px per 1.2s, rightward.
- Wordmark inspected at peak displacement: single edges, no doubling.
- `npx tsc --noEmit`, `npm run lint`, `npm run lint:css` — clean.
- `home.spec.ts` all four projects: **97 passed, 7 skipped**;
  `npm run test:pipeline` — **77 passed, 4 skipped**;
  `npm run test:mobile` — **24 passed, 3 skipped**.
- *The print ripples in a breeze* became *…in a wind of two harmonics*:
  six bands, both keyframes present, three distinct phases / one duration /
  one wavelength per harmonic, and the two wavelengths asserted different
  so the harmonics can never silently collapse into one.

## 🔁 Built on

`changelogs/2026-11-06_the-breeze.md` (2a2e9ef), whose span, edge feather,
settle-on-landing and reduced-motion switch all survive — only the bands'
weights, count and amplitude changed.
