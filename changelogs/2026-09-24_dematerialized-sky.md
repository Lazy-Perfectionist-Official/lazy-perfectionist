---
title: 2026-09-24 - Dematerialized sky (DRAWN LIGHT)
description: The user asked for a more deliberate, un-materialized hero background. The whole scene now obeys one rule — only light carries fill (dusk sky, horizon glow, stars, moon, beacon); the world is pure contour. Every ridge wash deleted, the wreck fully wireframed, crash scars as ink strokes against an ember pool, then one legibility bump after two independent judges flagged the lines sitting too close to the visibility floor. Verified by served-markup greps, a Node-side pixel probe (7/8, the one miss is a known threshold artifact), corrected vision-verdict crops, and the full pipeline.
commit: pending
author: Samuel Lee
date: 2026-09-24
category: 🎨 Design
impact: Medium
---

# 📅 2026-09-24 - Dematerialized Sky (DRAWN LIGHT)

**Author**: Samuel Lee
**Category**: 🎨 Design

## 🎯 Overview

User note: "make the hero background, the mountains and the satellite
more deliberate? More un-materialized design concept?" The answer is a
single compositional rule, now stated in the file header and enforced
in every element — **DRAWN LIGHT: only light carries fill.** The dusk
sky gradient, the horizon glow pools, the stars, the moon, and the
ember beacon are the only filled marks in the scene. Everything else —
three ridge ranges, the crashed satellite, the crash scars — is pure
contour. Depth no longer comes from tonal masses but from stroke
weight alone (far 0.40 → mid 0.48 → near 0.56, atmospheric perspective
as line weight).

**Washes deleted.** The far ridge's haze gradient
(`#452232→#331622` at 0.15), the mid ridge's `#170d13` mass at 0.45,
and the near ground's `#0a0605` at 0.5 are gone — crest paths dropped
their closing hems and `fill` entirely. What remains is the crest
line, exactly as before conceptually but now unmasked: the far
skyline is the faintest etched line, the near ground the strongest.

**The wreck is fully wireframe.** Hull, engine bell, dish, solar wing,
ventral stub, and antenna carry outline and seam strokes only. The
machine's one filled mark is the beacon itself — enlarged (dot r 2.6→
3.2 at 0.8, halo 5.5→7) so the "living light" anchors the left band.

**Scars as ink, not chips.** The three debris rects (filled
`#060302` rectangles) became three fat strokes in the same ink dialect
as the mound arc and gouge — every mark a stroke, nothing filled,
silhouetted against the `scar-glow` ember pool which concentrates the
dusk gradient into a field the ink can cut against.

**One legibility bump after judging.** Two independent vision verdicts
agreed the dematerialized lines sat too close to the visibility floor
— "deliberate" line-art must be legible line-art. The whole ladder
stepped up one rung (far 0.32→0.40 w 1.2→1.35, mid 0.40→0.48 w
1.6→1.7, near 0.48→0.56 w 1.8→2.0, accents to match), the wreck's
lighter lines strengthened (hull/bell 0.62→0.68, dish and wing
0.5→0.6 with wider strokes), and four anchor stars brightened.

## 📦 What changed

All in `src/components/HeroSky.tsx` (single file):

| Element | Change |
|---|---|
| File header + ridge comments | DRAWN LIGHT rule documented; ladder values updated |
| Far ridge | Haze wash + gradient def deleted; stroke 0.32/1.2 → 0.40/1.35 |
| Mid ridge | `#170d13` wash deleted; stroke 0.40/1.6 → 0.48/1.7 |
| Near ground | `#0a0605` wash deleted; stroke 0.48/1.8 → 0.56/2.0 |
| Downhill accents | Raised to match (0.16→0.20, 0.14→0.18, 0.2→0.24; widths +0.1) |
| Satellite hull/bell | Strokes 0.62 → 0.68 |
| Dish + feed strut | 1.6/0.5 → 1.9/0.6; strut 0.45 → 0.52 |
| Solar wing | 1.1/0.5 → 1.25/0.6 |
| Beacon | Dot r 2.6@0.7 → 3.2@0.8; halo r 5.5@0.2 → 7@0.24 |
| Debris | 3 filled rects → 3 stroke ticks (w 3.5/3/5.5) in the ink group |
| Stars | 4 anchor stars brightened (r 1.6-1.7 → 1.9-2.0, o 0.68-0.7 → 0.75-0.78) |

Sky gradient, glow pools, moon, meteor, grain tile, and all
motion-safe effects are untouched — light was already drawn light.

## ✅ Verification

- Served-markup greps: zero wash markers (`far-ridge-fill`,
  `#170d13`, `#0a0605`, `#452232`, `#331622`); the only `fill-opacity`
  left is the dish rivet at 0.5
- Pixel probe (`.omc/state/lp-dematerial-probe.mjs`, Node-side PNG
  decode): **7/8 PASS** — hull interior equals local sky (fill=none
  physically confirmed; the one formal miss is P2-vs-P3 Δ9 against a
  threshold of 8, explained by radial-gradient falloff across x — a
  real fill would show Δ30+), beacon bright-phase r=156 / dim-phase
  r=117, scar ink r=25, far crest peak 151 on 94 sky, zero console
  errors
- Vision verdicts on region crops: skyline 4.25/5 (moon 5/5); left
  band concept 4/4/3/4/3.5 — the judge's "beacon not discernible" was
  disproven by decoding the crop PNG itself (maxR 176 at the beacon's
  mapped location); its "solid black chip" is the intentional torn-
  solar-cell tick, now a stroke
- `npm run lint:css` clean; `npm run test:pipeline` **17 passed,
  0 failed** (7 skips = mobile-gated tests in desktop projects) across
  chromium/firefox/webkit

## 📝 Notes

- **Judge lane discipline (reinforced):** GLM-4.6V-Flash downscales or
  confabulates small elements in dark scenes — it called a pixel-hot
  beacon (r=156 live, 176 in-crop) "not discernible" twice. Pixel
  probes are ground truth; verdicts are taste signal only. Verdict
  crops must also exclude the LUSG cover (page x ≥ 510) — cover art
  in frame poisons the judgment.
- The scar-glow pool is load-bearing, not decoration: dark ink on the
  near-black ground sits below the grain's own modulation, so the
  scars need a lit floor to cut against.
- Probe scripts kept in `.omc/state/` (uncommitted by convention):
  `lp-dematerial-probe.mjs` (ground truth), `lp-dematerial-crops.mjs`
  (verdict crops, cover-excluded).
