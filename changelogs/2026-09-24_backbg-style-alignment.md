---
title: 2026-09-24 - Backbg style alignment (MASS & ETCH + drawn detail)
description: User redirect after the dematerialized pass — "not colours, mainly how the lines are drawn and how the subjects are drawn and the details within them." The sky now follows the Intervals backbg's actual mechanism — flat value-stepped masses with one etched crest line each — drawn ANGULAR (straight facets, sharp peaks, rocky lobes), the crashed satellite rebuilt as the scene's detail subject (~30 marks: seams, access panel, rivets, dish mesh, torn wing grid), and the desert floor given a recession dash field. Verified by a 13/13 Node-side pixel probe, fair-magnification vision verdicts (massif 5/5 angular, wreck 4/5 density + 4/5 coherence), and the full pipeline (17 passed / 0 failed across three engines).
commit: pending
author: Samuel Lee
date: 2026-09-24
category: 🎨 Design
impact: Medium
---

# 📅 2026-09-24 - Backbg Style Alignment (MASS & ETCH + Drawn Detail)

**Author**: Samuel Lee
**Category**: 🎨 Design

## 🎯 Overview

User redirect, verbatim: *"Not colours, although colors are nice, mainly on
how the lines are drawn and how the subjects are drawn and the details
within them. You have none now..."* The dematerialized pass had stripped
the scene to contour, and the contour itself was generic — soft-ish
silhouettes, a sparse wreck, an empty floor. This pass answers all three
halves of the note.

**MASS & ETCH replaces DRAWN LIGHT.** The reference's backbg does not
leave land as pure line; it paints flat value-stepped masses, darkest
nearest, each receding plane dusted toward the horizon light, with one
drawn line etching every crest. Our dialect: far `#432c38` → mid
`#251824` → near `#150e0c`, one driftwood `#e7b37b` etch per crest edge,
atmospheric depth as fill value, never rim light. Chroma stays confined
to the narrow horizon band; nothing paints pure black (warm charcoals
only) — save the ember beacon, the machine's one saturated mark.

**Lines drawn ANGULAR.** Every crest is now a pure `L`-segment polyline —
straight facets between sharp irregular peaks, no beziers anywhere — with
scree ticks running down-slope on the far ridge and the near ground
broken into rocky lobes (the reference's paper-cutout hand). Angularity
is guaranteed by construction, then confirmed by verdict.

**The wreck carries the scene's detail** the way the reference's dead
tree carries its branches: two more hull seams, an access panel with
three vent slots, five rivet dots, a dish mesh ellipse with brace strut,
an engine-bell inner ring with flange struts, a solar wing with a full
cell grid, a trailing cable, and a ventral skid — ~30 marks in two
hierarchy tiers (outline 0.55–0.68, detail 0.3–0.45) so the machine
reads as one object, not a tangle.

**The desert floor wears a dash field** — the backbg's recession texture:
24 short hand-placed driftwood dashes, sparse at the crest (o 0.10) and
denser toward the viewer (o 0.18), three ink chips where the pool lights
the floor, long ground-drag streaks, and four low-horizon dust stars
thickening toward the band.

## 📦 What changed

All in `src/components/HeroSky.tsx` (single file, 174+/73−):

| Element | Change |
|---|---|
| File header | MASS & ETCH mechanism + angular-drawing + wreck-as-detail-subject notes |
| Far ridge | Flat fill `#432c38` restored; crest redrawn as angular polyline; scree ticks ×3 |
| Mid ridge | Flat fill `#251824` restored; angular polyline; down-slope ticks ×2 |
| Near ground | Flat fill `#150e0c` restored; crest broken into rocky lobes |
| Wreck detail | +2 seams, access panel + 3 vents, 5 rivets, dish mesh + brace, bell ring + struts, wing grid lines, cable, skid |
| Dash field | New — 24 dashes by density recession + 3 ink chips (vx 70–1398, vy 716–788) |
| Ground drag | New — 3 long faint streaks running with the near ground |
| Star dust | +4 low-horizon stars (y 430–462) thickening toward the band |
| Scars | Kept as ink strokes against the ember `scar-glow` pool (from the prior pass) |

Sky gradient, glow pools, moon, meteor, grain tile, and all
motion-safe effects untouched.

## ✅ Verification

- Pixel probe (`.omc/state/lp-mass-probe.mjs`, Node-side PNG decode):
  **13/13 PASS** — far r=73 / mid r=44 / near r=21 with step gaps 29/23;
  hull interior equals local mid fill (Δ≤2 — fill=none physically
  confirmed); beacon bright r=168, cycle-min [142,81,49] (stays ember);
  scar ink r=32 vs pool floor r=50 (Δ18 cut); far-crest etch peak 131,
  hull-stroke peak 171, drag streaks peak 57; zero console errors
- Vision verdicts at fair magnification (sips zoom crops from the DSF-2
  artwork): massif **5/5 angular** — "every ridge transition is an
  unambiguous straight-edge intersection with sharp peaks... no smooth
  curves anywhere"; wreck **~9 machined sub-elements, 4/5 density,
  4/5 coherence** — "reads as one object rather than a tangle"; value
  steps and flat planes confirmed on the skyline crop
- `npm run test:pipeline`: lint:css clean; functional cross-browser
  **17 passed, 0 failed** (7 skips = mobile-gated tests in desktop
  projects) across chromium/firefox/webkit

## 📝 Notes

- **Crop framing can fabricate verdicts** (new judge-lane lesson): the
  first verdict round used region crops whose bottom edges cut at
  vy 735/610 — hiding the dense dash rows and the mid/near fills the
  judges then reported as "uniform density" and "no value steps". Fit
  the crop to the claim being judged; when a verdict contradicts a
  passing pixel probe, check what the crop actually framed before
  touching the art.
- Rivets (r 0.8 @ 0.35) and the cable (0.32) are sub-resolution at
  viewing magnification — intentional whisper-tier texture; the probe's
  hull/streak scans cover what must be visible.
- Probe scripts kept in `.omc/state/` (uncommitted by convention):
  `lp-mass-probe.mjs` (ground truth), `lp-style-cmp.mjs` (DSF-2
  artwork capture), zoom crops via `sips` from its output.
