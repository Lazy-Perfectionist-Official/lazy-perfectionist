---
title: 2026-09-23 - The tree becomes a crashed satellite; the skyline steps back
description: The lone tree read as an Intervals echo, so it's replaced by a crashed satellite augured in nose-down left-of-center — fuselage, flared engine bell, dish, a solar wing with the last cell torn off, and a whip antenna whose ember distress beacon still double-pulses every 7s (steady ember point under reduced motion). The far ridge is quieted (lower amplitude, fill pulled toward the dusk #452232→#331622) so the wreck owns the left band. Crash scars get a faint ember ground-pool to silhouette against after vision review showed the debris sat below the film grain's own modulation on the near-black ground.
commit: pending
author: Samuel Lee
date: 2026-09-23
category: 🎨 Design
impact: Medium
---

# 📅 2026-09-23 - The Tree Becomes a Crashed Satellite; the Skyline Steps Back

**Author**: Samuel Lee
**Category**: 🎨 Design

## 🎯 Overview

User note: the tree made the hero feel too close to the Intervals
reference, and asked for a crashed satellite/spacecraft with more
discrete mountains. Two changes, one composition:

1. **Tree → crashed satellite.** A machine that fell out of this sky,
   drawn axis-aligned in its own frame (nose at origin, hull along +x,
   dorsal gear at -y) and placed with one `rotate(-55)` so it augured
   in nose-down at (268,704) — clear of both the artwork and the
   vinyl's slide path, invisible on the mobile center-crop (same
   trade the tree made). Parts read at silhouette scale: crumpled
   nose into a straight capsule hull, flared engine bell, dish on a
   stalk aimed along the hull toward the moon, a bent solar wing with
   the last cell torn off, a sheared ventral stub — and a whip
   antenna whose **ember beacon still blinks**: a 7s double-pulse
   distress pattern (`--animate-beacon`), motion-safe-gated, a steady
   ember point with a faint halo under reduced motion.
2. **Quieter far skyline.** The previous pass's sharp skyline stays
   as technique but drops to a whisper: crests ~30px lower, deep
   saddles that let sky show between massifs, fill pulled toward the
   dusk behind it (`#452232 → #331622`, was `#502b39 → #3a1a27`).
   Distinct summits at distance, not a bold rampart — the wreck owns
   the left band now.

Plus a fix the verification loop forced: the first scars cut
(impact mound, gouge, debris shards, dirt spray) was **invisible** —
`#060302` marks on `#0a0605` ground are ~4 luminance steps apart,
below the film grain's own modulation. The scene's own lighting
language fixed it: a faint ember pool (`scar-glow` radial) at the
crash site — the beacon's answer on the ground — so every scar
silhouettes against light, the same way the ridges cut the lit sky.

## 📦 What changed

| File | Change |
|---|---|
| `src/components/HeroSky.tsx` | Tree deleted. New crashed-satellite group (`translate(268 704) rotate(-55)`): hull, engine bell, dish + feed strut, 3.5-cell solar wing, ventral stub, whip antenna, blinking beacon (halo r5.5 @0.2 + dot r2.6 @0.7 in a `motion-safe:animate-beacon` group). Far-ridge path redrawn quieter + `far-ridge-fill` stops retimed to y470, `#452232→#331622`. New `scar-glow` gradient + ground ellipse; crash scars (mound, gouge, 3 shards, 3 spray strokes) at fuller opacity. Header + inline comments updated |
| `src/app/globals.css` | New `--animate-beacon: beacon 7s linear infinite` token + `beacon` keyframes (floor 0.14, peaks 1 / 0.9 at 3% / 15%, dark ~5.5s) |

## ✅ Verification

- `npm run lint:css` clean; `npm run build` clean
- Playwright probe (`.omc/state/lp-wreck-shot.mjs`): **zero console
  errors**, no mobile horizontal scroll; probe waits 7300ms ≡ 300ms
  into the 7s beacon cycle to land in the first pulse's bright phase
- Vision review (GLM-4.6V), bright-phase wreck crop: **3/3 PASS** —
  scars ("impact mound with radiating debris shards/dirt-spray… warm
  ember-colored glow pooling on the ground… deliberate crash
  texture"), spacecraft ("clearly reads as a machine"), no artifacts
- Vision review, reduced-motion crop: **3/3 PASS** — fully static,
  steady ember point with faint halo, silhouette intact
- Mobile 375px: wreck outside the center crop (accepted, as with the
  tree); skyline band + twinkling stars still read

## 📝 Notes

- **Opacity multiplication trap**: an animated `<g>`'s keyframe
  opacity multiplies with children's base opacity — the first cut's
  base-0.35 dot capped the pulse at ~0.32 effective, dimmer than its
  own steady state. Brightness lives on the dot; keyframes drive the
  group.
- **Local contrast floor**: dark marks on a near-black ground need a
  lit field behind them (~4 luminance steps is below the grain's
  modulation). Silhouette-against-glow, not darker-paint.
- Beacon timing: 7s cycle, double pulse in the first ~1.9s. Probe
  timing matters — a 2.5s wait lands mid-dark and reads as "faint
  dot" even when the pulse is healthy.
