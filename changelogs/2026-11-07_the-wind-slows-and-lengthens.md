---
title: 2026-11-07 - The wind slows and lengthens
description: The billow and shimmer each a tenth slower and a fifth longer — 11s/67vw and 5.5s/28.8vw — bigger, lazier waves at the same amplitude the wordmark already cleared.
commit: pending
author: Samuel Lee
date: 2026-11-07
category: 🎨 Design
impact: Home hero
---

# 📅 2026-11-07 - The Wind Slows and Lengthens

**Author**: Samuel Lee
**Category**: 🎨 Design

## 🎯 Overview

*"also 10% slower and 20% bigger."* Durations up a tenth, wavelengths up a
fifth; amplitude untouched (it was raised a tenth the day before and the
wordmark already inspects single-edged at that strength).

- **Billow**: 10s → **11s**, wavelength 56vw → **67.2vw** (about one and a
  half waves across the fold). Phase offsets move with them: bumps at
  −22.4vw / −44.8vw, delays −3.67s / −7.33s.
- **Shimmer**: 5s → **5.5s**, wavelength 24vw → **28.8vw**. Bumps at
  −9.6vw / −19.2vw, delays −1.83s / −3.67s.

The cos⁺ flank stops are percentages of the tile, so the crossfade still
takes a fifth of the (now longer) wavelength — the anti-ghosting budget
scales with the wave. Crest speed is wavelength over period, so the longer
wave crosses the fold at nearly the same pace while the sheet itself sways
more slowly: bigger, lazier billows.

## 🧪 Verified

- Deviation from the still print breathes mean 2.2–7.2/255 across the cycle;
  wordmark single-edged at the strongest frame.
- `npm run lint:css` clean; ripple + reduced-motion tests pass in all four
  projects (8 passed).

## 🔁 Built on

`changelogs/2026-11-07_ten-percent-more-wind.md` (f62b6a2): amplitude.
This change: time and space.
