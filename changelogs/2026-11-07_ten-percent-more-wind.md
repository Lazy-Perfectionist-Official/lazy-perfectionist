---
title: 2026-11-07 - Ten percent more wind
description: The billow and the shimmer each dialed up a tenth — the fold breathes mean 3.5–6.9/255 off the still print, with the wordmark inspected single-edged at peak.
commit: pending
author: Samuel Lee
date: 2026-11-07
category: 🎨 Design
impact: Home hero
---

# 📅 2026-11-07 - Ten Percent More Wind

**Author**: Samuel Lee
**Category**: 🎨 Design

## 🎯 Overview

*"even more! like 10% more."* Both harmonics up a tenth: the billow to
`skewY(±0.15deg) translateY(±0.29vmin)`, the shimmer to
`skewX(±0.11deg) translateY(±0.15vmin)`. Nothing structural — the weights,
wavelengths, envelope and timings are untouched, so everything
`2026-11-06_the-wind-picks-up.md` established still holds.

## 🧪 Verified

- Deviation from the still print now breathes **mean 3.5–6.9/255** across the
  cycle (was 2.8–6.5).
- The wordmark inspected at the strongest frame: single edges, no doubling —
  the extra 10% stays inside the flank-steepness budget.
- `npm run lint:css` clean; ripple + reduced-motion tests pass in all four
  projects (8 passed).

## 🔁 Built on

`changelogs/2026-11-06_the-wind-picks-up.md` (0a9322a): the cos⁺ bands, two
harmonics and travel direction — amplitude only.
