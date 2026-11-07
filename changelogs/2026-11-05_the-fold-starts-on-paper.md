---
title: 2026-11-05 - The fold starts on paper, not on letter tails
description: Tall phones trim the print's sides, and the trim was slicing the couplets in its top margin, leaving their last letters cut mid-word at the fold. The print's own paper now covers the sliced tails — only where the crop actually reaches them.
commit: pending
author: Samuel Lee
date: 2026-11-05
category: 🎨 Design
impact: Home hero
---

# 📅 2026-11-05 - The Fold Starts on Paper, Not on Letter Tails

**Author**: Samuel Lee
**Category**: 🎨 Design

## 🎯 Overview

The hero is the LUSG print at cover size. On a phone taller than the print's
3:4 the sides have to be trimmed, and the trim runs straight through the
couplets in the print's top margin: their first letters stay off-screen and
their last letters land at the fold, cut mid-word. At 390–430 wide that reads
as `…on.` / `…os time.` / `leaves,` and a lone full stop down the left edge —
broken type, not a crop.

Screenshots at 360, 375, 390, 412 and 430 wide made the pattern plain: the
debris is only there when the window starts between the couplets' left edge
and their end, and it is gone entirely on squarer screens, where the same
couplets show whole.

## 🧵 What the print actually holds

Measured from the 1800×2400 artwork, not eyeballed:

| Element | Where it sits in the print |
| --- | --- |
| Paper | samples to `#f2e7d5` — exactly `--color-paper` |
| Couplets | x 7.7%–27.6%, y 8%–19% |
| "Lazy" | x 64.1%–94.1%, cap top y 31.6% |
| "Perfectionist" | x 25.0%–94.6%, cap y 42.5%–47.6% |
| ORIGINAL thumbnail | x 78%–94.6%, y 5.5%–13.8% |
| Figure's head top | y 34.25% |

The cover window starts at 90% of the side overflow, so it enters the
couplets' 7.7% left edge below a 0.686 section aspect — which is why the
375×667 phone (0.749) and tablets keep them whole while 390×915-class phones
(0.55–0.59) get the tails.

## ✂️ The patch

The hero section is now its own size container, and a paper patch shows only
while the section's aspect is below 0.686:

```css
.hero-print { container-type: size; container-name: heroprint; }

@container heroprint (max-aspect-ratio: 686/1000) {
  .hero-crop-cover { display: block; }
}
```

The patch is the print's own paper — the sampled value is the site's
`--color-paper` — so over that margin it is invisible: no seam, no scrim, no
second asset. It covers 30% of the section's corner, past the tails' worst
case in the band it serves (20% across, 19% down at the 0.686 edge) and
4.2% of the print's height clear of the figure's head.

Container queries are the point: the trim depends on the hero's own box, not
the window's, so a viewport media query would have masked the couplets on the
375×667 phone that shows them whole. New e2e test: at 412×915 the patch is
visible, sits on the section's corner, and reaches past the tails; at 375×667
and 768×1024 it is hidden.

## 🧪 Verified

- Chrome screenshots at 360×780, 375×667, 390×844, 412×915, 430×932,
  768×1024, 1440×900, 1920×1080: the corner is clean paper on tall phones,
  untouched elsewhere; the mask edge lands on flat paper and does not show.
- `npx tsc --noEmit`, `npm run lint`, `npm run lint:css` — clean.
- `npm run test:pipeline` — **59 passed, 0 failed** (4 skipped, chromium +
  firefox + webkit).
- `npm run test:mobile` — **21 passed, 0 failed**.
