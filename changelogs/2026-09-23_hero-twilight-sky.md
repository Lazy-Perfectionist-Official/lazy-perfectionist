---
title: 2026-09-23 - Hand-drawn twilight sky behind the hero
description: The Intervals "backbg" pattern rebuilt as a pure-vector SVG scene behind the hero — twilight ridge in three depths, masked crescent moon, 28-star field, lone tree — with three whisper-quiet CSS-only effects (staggered twinkle, breathing horizon glow, a meteor every ~13s), all motion-safe-gated; composition vertically recomposed after DOM geometry measurement showed the horizon sat below the first fold
commit: pending
author: Samuel Lee
date: 2026-09-23
category: 🎨 Design
impact: Medium
---

# 📅 2026-09-23 - Hand-drawn Twilight Sky Behind the Hero

**Author**: Samuel Lee
**Category**: 🎨 Design

## 🎯 Overview

The record now lives under a sky. Replacing the old flat radial ember
gradient, `HeroSky` is the Intervals "backbg" idea — a photographic-feeling
twilight landscape baked into the page — rebuilt as **pure hand-coded
vector**, palette-locked to the site tokens (canvas-plum sky, ember/
driftwood horizon, near-canvas ground), with film grain from the same
noise tile the page-wide whisper uses. Zero JS: the component is a
server-rendered SVG plus three motion-safe-gated CSS effects.

## 📦 What changed

| File | Change |
|---|---|
| `src/components/HeroSky.tsx` | **New.** Full-bleed SVG (viewBox 1440×900, `slice`) behind the hero content: 5-stop sky gradient, breathing ember horizon glow, driftwood spill along the crest line, masked crescent moon + halo, 28-star field (11 twinkling, staggered seeds), ridges in three depth tiers, hand-drawn tapered tree left-of-center, a meteor every ~13s, grain tile at 6%, top/bottom canvas fades |
| `src/app/globals.css` | `--animate-twinkle/breathe/shoot` tokens + keyframes. Twinkle floor 0.3 (stars pulse, never nearly vanish). Meteor travel lives in keyframes so no transform attribute is overridden |
| `src/components/Hero.tsx` | Vinyl hover shadow deepened (`0_18px_60px` @ 0.7) so the slid-out disc grounds against the brighter horizon |

### Composition was measured, not eyeballed

The first cut put the horizon stack at viewBox y≈570+, which read as "one
dark wash" in review. A DOM geometry probe explained why: the announcement
bar + nav push the hero to page y=210, and the section's 1041px height
makes the `slice` scale 1.157 — so on a 1440×900 viewport the fold cuts at
viewBox y≈600. **The entire landscape was below the first screen.** The
scene was recomposed upward: horizon band at ~55% of the viewBox, far/mid
ridges cresting 470–620, tree planted at 706 with its crown at 387 — the
landscape now reads on the first screen while the title zone keeps its
dark contrast.

## ✅ Verification

- `npm run lint:css` — clean; `npm run build` — clean, fully static, 107 kB first-load JS (unchanged)
- Playwright probe (desktop rest/hover/meteor, tree + moon crops, mobile 375, reduced-motion): **zero console errors**, **no horizontal scroll** on mobile
- Meteor captured mid-flight via the Web Animations API clock (phase ≈2750 of 13000)
- Vision review (GLM-4.6V), after tuning: left sky band **PASS 4/4** (layered ridges, backlit horizon, tree, stars); tree detail crop **PASS 3/3**; reduced-motion **PASS 3/3** (static comp holds, nothing stuck mid-animation); hover **PASS 3/4** — the "no ground shadow" flag is a dark-canvas artifact (a black shadow on #100904 is subtle by design; the cover separates via its hairline border + `shadow-2xl`)
- Tuning rounds: star field enriched on the left band + twinkle floor raised after stars read below the grain floor; ridge value gaps widened (far `#46222e` vs mid `#170d13`) for atmospheric perspective

## 📝 Notes

- All effects gated with `motion-safe:`; under `prefers-reduced-motion` the scene renders fully (stars at base opacity, glow static, no meteor) — verified.
- Stars cluster in the x 590–850 band so the mobile center-crop still shows sky.
- Vision-review lesson recorded to memory: full-page screenshots of a busy hero produce attention artifacts (the same pixels pass when cropped) — verdict crops, not full pages; and full-page verdicts claiming objects that geometry proves out of frame are confabulations.
