---
title: 2026-09-23 - The wreck and the ridges become line art
description: The solid-black silhouettes are gone — the whole hero scene (crashed satellite, three ridge depths, crash scars) is redrawn as etched line art, driftwood crest strokes and machine outlines over faint color washes, so the dusk light reads as if it traces every edge instead of filling every mass. The ember beacon stays the one filled thing left — the living light. Vision review 4/4 PASS on the wreck crop; the ridge strip's lone "artifacts" fail was verified a false positive (the reviewer flagged the hero's own LUSG album artwork, intended page content the crop includes).
commit: pending
author: Samuel Lee
date: 2026-09-23
category: 🎨 Design
impact: Medium
---

# 📅 2026-09-23 - The Wreck and the Ridges Become Line Art

**Author**: Samuel Lee
**Category**: 🎨 Design

## 🎯 Overview

User note: "make the satellite more line-y, more lineart feeling instead
of a solid black, also do this to those mountains." One idea, applied
everywhere:

**Solid fills → etched strokes.** Every mass in the hero scene is now
drawn as line art — crest lines and machine outlines in driftwood
(`#e7b37b`) over faint washes — as if the dusk light traces every edge
instead of filling every mass:

1. **Ridges** keep their three depths but express atmospheric
   perspective in *line* now: far crest at 0.32 opacity / 1.2 width over
   a 15% haze wash, mid at 0.4 / 1.6 over 45%, near ground at 0.48 /
   1.8 over 50%. A few short accent strokes run downhill from crests —
   etched shading, three per depth at most.
2. **The satellite** is all outline: hull capsule with panel seams,
   flared engine bell with inner lip, dish + feed strut + rivet dot,
   outlined solar cells (the torn fourth stays torn), ventral stub,
   whip antenna — driftwood strokes at graded opacities (structure
   0.55–0.62, details 0.3–0.5).
3. **The ember beacon stays filled** (`#dc5000`) — the one filled
   thing left on the machine, the living light. The moon and stars
   were already filled light.
4. **Crash scars** read as ink marks against the `scar-glow` ember
   pool — unchanged mechanism (silhouette-against-glow), unchanged
   values.

Why driftwood-on-dark works where dark-on-dark didn't: light strokes
sit far above the film grain's modulation, so no contrast floor issue
(this pass's mirror of the previous pass's lesson).

## 📦 What changed

| File | Change |
|---|---|
| `src/components/HeroSky.tsx` | Ridge washes dropped to 0.15/0.45/0.5 fill-opacity with matching crest stroke paths added (0.32/0.4/0.48, widths 1.2/1.6/1.8) + 5 accent strokes. Satellite group flipped from filled paths to `fill="none"` outlines (group carries stroke + linecaps; children set width/opacity). Header comment documents the line-art intent. No gradient, geometry, or animation changes |

## ✅ Verification

- `npm run lint:css` clean; `npm run build` clean (dev stopped first —
  no `.next` collision)
- Playwright probe (`.omc/state/lp-wreck-shot.mjs`), re-run on the
  relaunched dev server: **zero console errors**, no mobile horizontal
  scroll; all 9 referenced `/_next/static/**` assets return 200
- Vision review (GLM-4.6V), wreck crop @7300ms (beacon bright phase):
  **4/4 PASS** — line art read, machine legible from linework alone
  (hull seams, bell, dish, wing grid, masts), scars visible against
  the ember pool, strokes clean
- Vision review, full-width ridge strip: **3/4 PASS** — line art read,
  crest legible across all segments (far ridge intentionally
  faintest, still traceable), wreck reads as outline. The ARTIFACTS
  fail ("fantasy illustration in the center") was **verified a false
  positive**: that region is `public/assets/img/lusg-cover.jpg`, the
  hero's featured-release artwork (caped warrior, cat, floating
  temple) — intended page content the strip crop includes
- Mobile 375px: no hscroll; wreck outside the center crop (accepted
  trade, unchanged)

## 📝 Notes

- **Crest strokes for free**: each ridge's stroke path is the wash path
  minus its `L 1440 900 L 0 900 Z` closure — same crest geometry, zero
  drift between wash and line.
- **Atmospheric perspective in line weight**: with fills nearly gone,
  depth is carried by stroke opacity/width stepping (0.32→0.4→0.48)
  over progressively darker washes — the etching gets bolder as it
  gets closer.
- **Vision reviewer context gap**: a crop that includes real page
  content (the album art) can produce confident false alarms — verify
  flagged "artifacts" against actual assets before acting (memory
  rule, reconfirmed).
