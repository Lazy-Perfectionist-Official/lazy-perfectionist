---
title: 2026-09-23 - Taste pass and the vinyl reveal
description: A restrained polish pass over the stripped rebuild — the single creative point is a vinyl record that slides out from behind the LUSG cover and spins on hover (pure CSS, gated to hover-capable pointers with no reduced-motion preference), plus small honesty/rhythm fixes; groove contrast and a hairline rim were tuned after vision review flagged the disc as too quiet against the canvas
commit: pending
author: Samuel Lee
category: 🎨 Design
impact: Medium
date: 2026-09-23
---

# 📅 2026-09-23 - Taste Pass and the Vinyl Reveal

**Author**: Samuel Lee
**Category**: 🎨 Design

## 🎯 Overview

One creative point, deliberately the only one: **on hover, a vinyl record
slides out from behind the album cover and starts spinning**. It is pure
CSS — no client JS, no state — and it only exists for pointers that can
truly hover (`hover: hover` + `pointer: fine`) and for people who have
not asked for less motion (`prefers-reduced-motion: no-preference`).
Touch visitors and reduced-motion visitors see the static cover, exactly
as before.

Around it, four small taste fixes that add no new concepts:

## 📦 What changed

| File | Change |
|---|---|
| `src/app/globals.css` | `@custom-variant reveal` gating on hover-capable + no-reduced-motion; `--animate-vinyl` token with `vinyl-spin` keyframes (3.5s linear) |
| `src/components/Hero.tsx` | **The creative point**: vinyl disc behind the cover — slide layer (`inset-[6%]`, `translate-x-[52%]`, 650ms `cubic-bezier(0.16,1,0.3,1)`) + spin layer (grooves via `repeating-radial-gradient`, center label from a 400px webp of the cover, paused until hover). Also: hero eyebrow flanked by hairline rules (hero-only craft cue), "All streaming platforms" now honestly points at the Spotify **artist profile** instead of the single's page, `overflow-x-clip` guards the slide-out |
| `src/components/Releases.tsx` | Listen `↗` arrow lifts 2px on row hover |
| `src/components/AnnouncementBar.tsx` | Tiny `↗` suffix (aria-hidden) signals the bar leaves the site |
| `public/assets/img/lusg-cover-400.webp` | 20KB label image for the disc (restored from the archive branch) so the CSS background doesn't pull the 880KB cover |

### The spin trick

`animate-vinyl` runs at `animation-play-state: paused` at rest and flips
to `running` on `reveal:group-hover:` — so the disc **freezes mid-angle**
when the pointer leaves, like a record player that actually stops, and
picks up where it left off on re-hover. The shadow blooms in over the
same 650ms as the slide so the two read as one motion.

### Contrast tuning after vision review

The first cut rendered the disc as "a dark smudge" — grooves at
`rgba(255,237,215,0.05)` were invisible and the silhouette had no edge
against the near-black canvas. Tuned to `0.085` + a `border-cream/10`
hairline rim. Final vision verdict: grooves PASS, no moiré PASS, "reads
as a deliberate, tactile vinyl object" PASS; the rim itself stays subtle
(WEAK PASS) — intentional, since the groove lighting carrying the edge is
how vinyl actually photographs; a brighter ring would read as a sticker.

## ✅ Verification

- `npm run lint:css` — clean
- `npm run build` — passes, still zero client JS (First Load JS 101 kB)
- Playwright probe (`rest` / `hover` / `zoomed crop` / `mobile 375`): **zero console errors**, mobile has **no horizontal scroll** (the `overflow-x-clip` guard holds)
- Vision review (GLM-4.6V): rest state correct (no disc visible, eyebrow rules landed); hover state — disc exposed ~1/3, clean z-order, no moiré; after tuning, 3 PASS + 1 WEAK PASS as above

## 📝 Notes

- The `reveal` variant means the disc markup is inert on touch/reduced-motion — no `@media` duplication in the component, no JS feature detection.
- All existing testids preserved (`hero-artwork`, `hero-cta-button`, `release-*`, …).
