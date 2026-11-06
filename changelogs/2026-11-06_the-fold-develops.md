---
title: 2026-11-06 - The fold develops
description: The hero print now arrives instead of merely loading — a paper wash lifts off the plate once, on load, and the plate settles out of a 2% enlarge, all in CSS and held still under reduced motion.
commit: pending
author: Samuel Lee
date: 2026-11-06
category: 🎨 Design
impact: Home hero
---

# 📅 2026-11-06 - The Fold Develops

**Author**: Samuel Lee
**Category**: 🎨 Design

## 🎯 Overview

The fold is a letterpress print, so its arrival should read as an
impression settling under the platen rather than an image finishing its
download. Once, on load: a paper wash lies over the print, soft-focus and
nearly opaque, and lifts over about a second while the plate gives up a 2%
enlarge as it lands. After that the hero is exactly the plate it was
before — nothing loops, nothing moves again.

The whole thing is CSS. The site still ships zero client JS.

## 🖨️ How it is built

Two pieces, both one-shot:

- **The wash** (`hero-wash` in `Hero.tsx`, `.hero-wash` in `globals.css`) —
  a paper-coloured element over the plate, `opacity: 0.88 → 0` over 1.1s on
  `cubic-bezier(0.22, 0.61, 0.36, 1)`. It carries
  `backdrop-filter: blur(8px)`, so the print under it is soft while the
  wash is heavy and sharpens as the wash lifts — the focus and the paper
  tone resolve together. Where `backdrop-filter` is unsupported the wash
  still lifts, just without the soft focus.
- **The settle** (`hero-plate` on both plates) — `transform: scale(1.02) → 1`
  over 1.4s on the same curve. The fold clips it (`overflow-hidden`), so the
  print starts a hair larger and comes to rest exactly edge to edge.

Both use `animation-fill-mode: both`: the wash rests at `opacity: 0` and the
plate at `scale(1)`, so the finished state is the resting state — no
flicker when the animation is handed back to the element.

**The LCP plate is not touched.** The image never animates its own opacity
or filter; the soft focus lives on the wash above it, and the only image
property that moves is `transform`, which does not affect painting of the
bitmap. The print is painted whole on the first frame, the wash clears off
it, and the reveal costs nothing in measured load.

**Reduced motion.** Both animations sit inside
`@media (prefers-reduced-motion: no-preference)`, so a reader who asked
their system for less motion gets the plain fold — the same way the site
already gates `scroll-behavior: smooth`. The wash's resting `opacity: 0` is
declared outside the query, so even a browser that applies neither branch
never shows a paper block over the hero.

**Layering.** The wash is the anchor's last child, so it covers the ember
stamp too — the fold arrives as one object. It is `pointer-events-none`
and `aria-hidden`, and the focus ring (the anchor's `::after`) still paints
above it.

## 🧪 Verified

- Frames captured at 60 / 300 / 700 / 1400ms on 1440×900: wash opacity
  0.81 → 0.37 → 0.06 → 0, image soft at 60ms and sharp from ~700ms, final
  frame identical to the pre-animation hero.
- 390×844 mid-animation: the print ghosted, name emerging, stamp arriving
  with it.
- Cumulative layout shift over a load: **0** (the settle is a transform and
  the wash is out of flow, so nothing reflows).
- `npx tsc --noEmit`, `npm run lint`, `npm run lint:css` — clean.
- `npm run test:pipeline` — **65 passed, 0 failed** (4 skipped, chromium +
  firefox + webkit).
- `npm run test:mobile` — **23 passed, 0 failed**.
- Two new tests: *the fold develops* (animation names on wash and plate,
  `pointer-events: none`, the wash polls to opacity 0, and the plate's box
  settles flush with the fold) and *reduced motion holds the fold still*
  (`animation-name: none`, wash at opacity 0) under
  `emulateMedia({ reducedMotion: 'reduce' })`.

## 🔁 Built on

`changelogs/2026-11-06_the-plates-gain-a-strike.md` (f48f325): the plates,
their crop windows and the full-bleed contract are unchanged — this only
changes how the first second of them looks.
