---
title: 2026-11-04 - The site is the print
description: Whole-site revamp extending the full-bleed poster hero to the rest of the page. The palette is sampled from the print's paper and inks, the type is the poster's Didone and typewriter, the catalog and Elsewhere plates share one 9rem print margin, the colophon closes on ink with a halftone screen, and the hero crop is re-anchored so no sliver of the poster's margin type shows under the masthead. Dead hero-sky code and stale helpers removed.
commit: pending
author: Samuel Lee
date: 2026-11-04
category: 🎨 Design
impact: High
---

# 📅 2026-11-04 - The Site Is the Print

**Author**: Samuel Lee
**Category**: 🎨 Design

## 🎯 Overview

Request, verbatim: *"Okay, now revamp the whole site following this hero!
use deslop and some design skills to help yourself go autopilot"*.

The fold is now the LUSG poster at full bleed. This pass makes the rest of
the one-pager continue on that same sheet instead of sitting under it: the
page background is the print's own paper, headings and titles use the
poster's Didone, indices and margin labels use its typewriter, and every
section hangs off the same 9rem print margin the plate labels sit in. No
artist copy (titles, descriptions, links) was added or rewritten; no testid
changed; no client JavaScript and no dependencies were added. The only new
visible strings are the two plate labels.

## 🎨 The print as a system

**Palette, sampled from the poster.** Paper `#f2e7d5`, recessed paper
`#e9dac1`, ink `#2a1810`, soft ink `#6d5442`, press `#5e2c10`, rust
`#8a3a12`, hairline `#d3c2a4`, ember `#dc5000`, bright ember `#f05c04`,
ember ink `#170b04`, cream `#ffedd7`. Measured contrast on paper: ink
13.9:1, press 9.3:1, rust 6.4:1, soft ink 5.7:1; ember 3.3:1 is used only
for the bar and the large focus frame; ember ink on ember is 4.8:1.

**Type.** Bodoni Moda carries the wordmark, plate headings and release
titles (echoing the poster's high-contrast Didone); Courier Prime carries
plate labels, indices, years, margin categories and the colophon; Inter
carries the reading copy. All three are self-hosted through `next/font`.

**One margin.** Releases and Elsewhere now share
`grid-cols-[2.5rem_minmax(0,1fr)]` on phones and
`[9rem_minmax(0,1fr)...]` from `md` up, so the plate labels, the tracklist
indices and the Elsewhere categories all sit on one vertical rule, and the
titles start on the same line as the section heading.

**The fold is the print.** The hero keeps its exact measured geometry
(`100svh` minus the 131px desktop / 166px phone chrome) and its rust focus
frame. The vertical crop anchor moved from 35% to 40%: at 1024x768 and
other squarer ratios, 35% left the bottom few pixels of the poster's
couplet type peeking under the masthead. At 40% the crop clears it, wide
screens still end on the print's paper above the wall band, and squarer
screens crop into the band as intended.

**The colophon closes on ink** with a faint paper halftone screen echoing
the print's dots — the only dark surface on the page.

## 🧹 Deslop

| Removed | Why |
|---|---|
| `src/components/HeroSky.tsx` (599 lines) | Unmounted since the print replaced the sky hero, imported nowhere. Recoverable from git history. |
| `@theme` animation tokens + four keyframes | `twinkle`, `breathe`, `shoot`, `beacon` existed only for HeroSky. |
| `.ember-button`, `.display-link`, `.quiet-link` | No component referenced them after the revamp. |
| Stale grain comment and `md:gap-3` | Comment described a background that no longer exists; gap was dead under `justify-between`. |

Two small layout fixes: `whitespace-nowrap` on the Elsewhere margin
category (it wrapped inside the 9rem column at 1440), and the hero crop
re-anchor described above. No stale tokens remain (`canvas`/`surface`/
`muted`/`accent` all gone).

## ✅ Verification

- `npx tsc --noEmit`, `npm run lint`, `npm run lint:css` — clean.
- `npm run test:pipeline` — **24 passed, 0 failed** (3 skipped) across
  chromium, firefox and webkit desktop, on the final tree.
- `npm run test:mobile` — **9 passed, 0 failed** at 375x667, on the final
  tree.
- Fold geometry measured in the browser: the hero section ends exactly at
  the viewport bottom at 1440x900, 1024x768, 768x1024 and 375x667; the
  artwork box equals the section box; `scrollWidth - innerWidth = 0` at
  every size; zero console/page errors.
- The print's crop was checked at 1440x900, 1024x768, 1280x800, 1600x1200
  and 1440x700: no poster margin type surfaces under the masthead, and the
  name stays whole.
- Keyboard focus on the print link paints the 2px ember frame; nav links,
  rows and Back to top keep the rust/paper rings.
- Screenshots at 1440, 1024, 768 and 375 reviewed after the change.
- Independent read-only review lane (fresh-agent routes were 403-blocked in
  this environment, so the pass ran as a fork, as in the prior revamp)
  returned sound with no blockers: it re-ran the typecheck, lint, pipeline
  and mobile suites on the current tree, re-measured the fold at nine
  viewport sizes, and re-checked focus colors, token usage, testids and
  dead-code removal. Two changelog wording overclaims it caught were
  corrected. Its two nits were accepted as-is: the Elsewhere margin
  category can use up to 5px of the 40px gutter at 1440, and the ghost
  release index stays faint (`aria-hidden`, decorative, carried over).

## 📝 Notes

- At wide ratios the hero's bottom edge is invisible: the crop lands on
  the print's own paper, so the sheet reads as continuous. At squarer
  ratios the wall band enters the fold and the crop is visible. Both are
  the intended "cropped by the viewport, never letterboxed" behavior.
- `npm run build` was intentionally not run in this pass: `next dev` was
  live and this repo forbids a production build while it is (it would
  clobber the dev server's output). All gates above ran against the dev
  server.
