---
title: 2026-11-06 - The breeze
description: The mouse shadow is gone — the lantern's ink scrim is removed — and the whole print now ripples, very subtly, like a flag in a light wind, with the lens still riding on top of it.
commit: pending
author: Samuel Lee
date: 2026-11-06
category: 🎨 Design
impact: Home hero
---

# 📅 2026-11-06 - The Breeze

**Author**: Samuel Lee
**Category**: 🎨 Design

## 🎯 Overview

Two asks in one breath: *"remove the shadow caused by the mouse movement"* and
*"make the whole image have a very subtle distortion effect like a flag in
wind, but very subtle and on top we having the mouse over effect."*

So the lantern is unlit for good — its 12.5% ink scrim, which dimmed the
print away from the cursor, is deleted — and in its place the whole print
catches a light wind. The lens (the magnified, velocity-deforming circle at
the pointer) stays exactly as it was, on top of the wind.

## 🕯️ The lantern, removed

The scrim was the only thing on the fold that *subtracted* from the print: a
shade that fell into the ink the further you were from the cursor. It read as
a shadow on the sheet, which is what was asked out. The span, its gradient,
its edge-fade mask and the whole `.hero-lantern` rule are gone. The script
survives — it is what lights the lens — and so do the `data-lantern` /
`--lantern-x/y` / `.lantern-lit` names it writes, now historical: they mean
"the pointer" and "the lens is lit".

## 🌬️ The breeze

The print sways, very slightly, all the time. It is built from three more
copies of the plate — same `src`, same orientation-scoped `sizes`, so no
extra bytes — each masked to a soft vertical band (a `28vw` tile with a third
of it feather, `mask-position` offset by a third per copy) and each swaying a
third of a 9s cycle behind the last (`animation-delay: 0 / −3s / −6s`).

- **Why three copies and not one keyframe on the plate:** a single transform
  is rigid — the whole sheet would bob. Three bands out of phase crossfade
  under feathered masks, and because the masks' weights sum to a constant
  everywhere, the *phase* of the blend turns continuously along the width:
  one full wavelength across the fold, travelling. That is what reads as
  cloth rather than wobble.
- **The amplitude is a hair.** `translateY(±0.12vmin)` and `skewY(±0.06deg)`
  — about a pixel of vertical travel on a 1080p fold. Measured against the
  print with the wind off: **mean 1.8/255** deviation at any instant —
  quieter than the removed lantern ever was (3.3). The first pass ran at
  double the amplitude and measured 9.3 between extremes of the cycle; it was
  halved before it shipped.
- **No seams, ever.** The bands live inside a span whose own mask fades them
  out over the top and bottom 8% of the fold, so a moving band can never step
  out of line against the sheet at the edges — on any aspect ratio, even
  where the crop cuts into the print. The ember stamp sits above the wind and
  stays crisply set.
- **It costs the compositor, not the painter.** Only `transform` animates —
  nothing repaints, and the LCP image itself is untouched (the copies are
  separate layers sharing one decoded bitmap). The span takes the same
  `hero-settle` landing animation as the plates, so the wind arrives with the
  impression rather than against it. Under reduced motion the breeze is
  `display: none` and the fold is the still print.
- **The lens rides on top unchanged.** Same 1.2% glass, same
  velocity-deforming circle, same counter-transform so the type never
  doubles, and it still keeps up with the page while scrolling. Where the
  glass sits, the print is held still for a moment — the wind moves around
  it.

## 🧪 Verified

- Band wiring in Chromium: three visible `.hero-wave-band` per orientation,
  `hero-breeze` 9s with delays `0 / −3s / −6s` and mask offsets a third of a
  `28vw` tile apart.
- Instantaneous deviation from the still print: **mean 1.8/255** (frame vs a
  reduced-motion frame with the wind hidden). Screenshot review: no banding,
  no seams at any edge, type crisp.
- `npx tsc --noEmit`, `npm run lint`, `npm run lint:css` — clean.
- `home.spec.ts` across all four projects: **97 passed, 7 skipped**;
  `npm run test:pipeline` — **77 passed, 4 skipped**;
  `npm run test:mobile` — **24 passed, 3 skipped**.
- Tests: *the lantern follows the pointer* became *the lens follows the
  pointer* (opacity 0 → 1 on enter, dark on leave, position converges);
  *the light keeps up while the page scrolls* became *the lens keeps up…*;
  new *the print ripples in a breeze* (three bands, three phases, one
  duration); reduced motion now asserts the wind is `display: none` too.

## 🔁 Built on

`changelogs/2026-11-06_the-lens.md` (b90a830): the lens layers, the velocity
deformation and the scroll re-aiming are untouched — the wind sits beneath
them and the lantern above them is gone.
