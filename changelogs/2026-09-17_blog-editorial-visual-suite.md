---
title: 2026-09-17 - Blog Editorial Redesign, Medium Thumbnail Fix, Navigation Spec Repair, Deterministic Visual Suite
description: Blog page dark editorial redesign, tracking-pixel thumbnail filtering, main landmarks + nav test ids, reduced-motion gates, visual regression suite made deterministic with regenerated baselines
commit: aa58981
author: Samuel Lee
category: 🧪 Testing & QA
impact: High
date: 2026-09-17
---

# 📅 2026-09-17 - Blog Editorial Redesign + Deterministic Visual Suite

**Commits**: `5c1b25d` → `b751d0d` → `c5ad874` → `4ada277` → `aa58981`
**Author**: Samuel Lee
**Category**: 🧪 Testing & QA

## 🎯 Overview

Three-track pass on `feature/website-redesign`: a dark editorial Blog page
redesign (matching the Music page direction), a Medium API thumbnail fix, and
the long-standing visual regression debt cleared — ten run-over-run failures
root-caused and fixed, all 163 baselines regenerated from the current design,
and the full matrix confirmed green twice. Also resolves both "Known Issues"
carried in the 2026-08-15 changelog (broken navigation expectation and stale
visual baselines).

## 🔄 Changes by Commit

### `5c1b25d` — Main landmarks + nav test ids

- Pages (`page.tsx`, `MusicPage`, `not-found`, `platform-links`) now wrap
  content in `<main>` for landmark semantics.
- `Navigation.tsx` exposes `data-testid` hooks (`nav-link-*`,
  `nav-mobile-toggle`, `nav-mobile-link-*`).
- `navigation.spec.ts` rewritten around helper functions targeting those ids,
  including the real contracts: Connect → `/platform-links`, /store → 307 to
  ko-fi. Fixes the pre-broken `/platform/i` expectation flagged on 2026-08-15.

### `b751d0d` — Medium thumbnail fix

- Medium article bodies can lead with 1×1 tracking pixels, which leaked into
  cards as blank covers. `/api/medium` now only accepts `miro.medium.com` /
  `cdn-images-1.medium.com` image URLs as thumbnail candidates.

### `c5ad874` — Blog editorial redesign

- `BlogCard` + `BlogLoadingSkeleton` deleted (−535 lines); the Blog page is
  now a single-file editorial layout: oversized serif headlines, generous
  whitespace, inline skeleton rows, full client-side list from `/api/medium`,
  posts opening directly on Medium. `blog/AGENTS.md` updated to match.

### `4ada277` — prefers-reduced-motion gates

- Hero scroll indicator and contact marquee looped forever, making screenshot
  captures nondeterministic. Both now rest at a fixed state under reduced
  motion — also correct accessibility behavior.

### `aa58981` — Deterministic visual suite + regenerated baselines

Ten failures root-caused rather than threshold-bumped:

- **Reduced motion** emulated in specs (`emulateMedia`) so infinite animations
  and the autoplaying contact video settle deterministically.
- **/store** asserted at the HTTP level (307 → ko-fi) instead of screenshotting
  an external page that never reaches networkidle.
- **Section spacing** asserted geometrically (DOM order, no overlap) instead of
  scroll-sensitive element captures.
- **Blog skeleton** and **contact submitting** states pinned with
  route-interception delays (`/api/medium`, `/api/contact`), so the capture
  can't race the content swap. Submit form is filled first — clicking an empty
  required form is a no-op, which used to capture a random phase.
- **Hover un-hovering**: late-mounting fonts/images/scroll-triggered sections
  shift the page under the stationary cursor and silently un-hover mid-test.
  Tests now flush lazy sections with a full pre-scroll, wait
  `document.fonts.ready` + all images, then hover.
- **Button hover/pressed pixel captures dropped** for behavioral assertions
  (computed `scale` engages and holds; pressed = disabled + SENDING + scale
  pinned): under parallel suite load the rasterized line box is bistable
  (6px) across engines — a WebKit/Firefox capture artifact, stable within a
  run but random between runs, so no pixel baseline can be reliable.
- **`test.slow()`** on the three-navigation loop tests that exceed 30s under
  parallel dev-server load.
- All baselines regenerated (the old ones predated the redesign — blank /
  skeleton captures) and obsolete store-page baselines deleted.

## 📁 Files Modified

- `src/app/page.tsx`, `src/app/music/MusicPage.tsx`, `src/app/not-found.tsx`,
  `src/app/platform-links/page.tsx` — `<main>` landmarks
- `src/components/Navigation.tsx` — test ids
- `tests/e2e/navigation.spec.ts` — helper-based rewrite
- `src/app/api/medium/route.ts` — thumbnail filtering
- `src/app/blog/BlogPage.tsx` — editorial redesign;
  `src/components/blog/{BlogCard,BlogLoadingSkeleton}.tsx` deleted
- `src/app/components/portfolio/{Hero,Contact}.tsx` — reduced-motion gates
- `tests/e2e/visual/{home-visual,pages-visual}.spec.ts` — determinism fixes
- `tests/e2e/visual/*-snapshots/` — 163 baselines regenerated

## ✅ Verification

- Full visual matrix (7 projects): **226 passed / 47 skipped / 0 failed,
  confirmed green twice** in back-to-back sequential runs (3.4m each).
- Button tests stress-tested `--repeat-each=4` across all projects: 44/44.
- Navigation spec: 108 passed.

## 📝 Known Issues (not blocking)

- Spotify API `invalid_client` (owner-side env) — unchanged, pages degrade
  gracefully.
