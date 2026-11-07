---
title: 2026-11-06 - The lantern
description: The print now keeps its light where the pointer is and falls a shade into the ink away from it — a lamp moving over the sheet, drawn by CSS at two custom properties a 24-line inline script writes.
commit: pending
author: Samuel Lee
date: 2026-11-06
category: 🎨 Design
impact: Home hero
---

# 📅 2026-11-06 - The Lantern

**Author**: Samuel Lee
**Category**: 🎨 Design

## 🎯 Overview

Asked for a cursor-interactive hero — *"just make it very subtle but there
vibe"* — after the fold learned to develop. CSS cannot read a pointer, so
the choice was between a quantised CSS-only reaction (a 3×3 `:has()` grid
that tilts the sheet) and a genuinely tracked effect at the cost of the
site's first script. The tracked version won: a lantern that follows the
cursor exactly, a beat behind it.

It is the one deliberate exception to zero client JS: 24 lines, inline, no
framework, no state, no listeners on touch or under reduced motion.

## 🕯️ The effect

The print keeps its light where the pointer is and falls a shade into the
ink away from it — a lamp moving over the sheet, not a glow laid on top.

- **Dim the distance, don't brighten the centre.** The first attempt was
  the obvious one: a warm radial light on the plate with `soft-light`.
  Measured against the same frame without it, the peak was a 34/255 lift —
  and almost all of it on ink. On the paper (`#f2e7d5`) added light has
  nowhere to go, so the effect simply vanished where the print is lightest.
  Inverting it works: a 12.5% ink scrim that fades in with distance from
  the cursor reads plainly on paper (24/255 at the margin) and is felt on
  the ink. The pool is the print's own brightness, protected.
- **The fold's edges are masked out.** The scrim is multiplied by
  `mask-image: radial-gradient(ellipse 50% 50% …)`, so it reaches zero at
  the section's border and the sheet's paper stays exactly `--color-paper`
  (sampled 242/231/213 at the margin with the lantern lit). The print still
  has no frame of its own — that is the whole premise of the fold — and a
  moving scrim that touched the edge would draw one.
- **A beat behind.** The gradient's centre is `var(--lantern-x/y)`; the
  script eases toward the pointer at 12% per frame, so the light trails
  the cursor like a hand-held lamp instead of being welded to it. It fades
  in over 600ms on `pointerenter` (the `lantern-lit` class) and out on
  `pointerleave`.

## 🧵 The script

`LANTERN` in `src/components/Hero.tsx`, rendered once as an inline
`<script>` inside the section. It bails out unless
`(hover: hover) and (pointer: fine)` and unless reduced motion is
`no-preference`; it listens to `pointermove` (passive), converts the event
to a percentage of the fold, and sets two custom properties on the
section. A single `requestAnimationFrame` loop eases toward the target and
**stops itself** once within 0.1% — no idle frames, no timers, nothing
running while the pointer is still.

Nothing else about the fold depends on it: with the script blocked, absent
or skipped, the lantern sits at `opacity: 0` and the hero is the still
print it has always been.

## 🧪 Verified

- Headed/headless Chromium at 1440×900, pointer swept across the plate:
  `--lantern-x/y` track the cursor to within a percent, the pool fades in
  to opacity 1 and out on leaving. Frame diff against an unlit load: peak
  24/255, mean 3.3/255 — present, not loud.
- Paper at the fold's margin with the lantern lit: `242, 231, 213` —
  exactly `--color-paper`, so no seam where the sheet meets the page.
- `npx tsc --noEmit`, `npm run lint`, `npm run lint:css` — clean.
- `npm run test:pipeline` — **68 passed, 0 failed** (4 skipped, chromium +
  firefox + webkit — the pointer test passes in all three engines).
- `npm run test:mobile` — **23 passed, 1 skipped** (the lantern test, since
  a touch screen has no fine pointer).
- New tests: *the lantern follows the pointer* (pointer-events none,
  opacity 0 at rest, `--lantern-x/y` converge on the cursor, lit on enter,
  dark on leave; skipped on `mobile-chrome-small`) and the reduced-motion
  test now also asserts the lantern is `display: none`.

## 🔁 Built on

`changelogs/2026-11-06_the-fold-develops.md` (b846a9f): the develop wash
paints above the lantern, so the impression still arrives whole before the
lamp can be seen.
