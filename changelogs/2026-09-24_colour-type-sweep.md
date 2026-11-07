---
title: 2026-09-24 - Colour & typography taste sweep
description: A 14-edit pass locked by three parallel read-only analyses (critic, designer with live probing, plini.co × intrvls.com reference research) and applied verbatim by one executor. One tracking system (0.25em caps everywhere, optical -0.015em only on the giant italic hero), a three-tier release-row hierarchy (cream title / softer-cream description / quietest tracked year), the wordmark demoted so LUSG owns the fold, and the CTA hover glow removed in favour of a pure brightness shift. Verified by the full battery plus two 5/5 vision verdicts.
commit: pending
author: Samuel Lee
date: 2026-09-24
category: 🎨 Design
impact: Medium
---

# 📅 2026-09-24 - Colour & Typography Taste Sweep

**Author**: Samuel Lee
**Category**: 🎨 Design

## 🎯 Overview

User note: "taste and colour palette and typography analysis and agents to
fix and improve the overall looks of the site." Three read-only analyses ran
in parallel — a critic pass, a designer pass with live Playwright probing,
and reference research on plini.co × intrvls.com — and converged on one
14-edit list, applied verbatim by a single executor agent with disjoint
ownership.

**One tracking system.** Tracked caps now have a single value site-wide
(`0.25em`): the eyebrow (was 0.3em) and release years (were 0.2em) joined
the nav/bar/CTA dialect. The only exception is optical — the giant italic
LUSG gets `-0.015em` because display serifs gape at 150rem. One rule, one
deliberate exception.

**Three-tier release rows.** Rows were two muted tiers fighting (descriptions
in `text-muted` competed with years and read warm at text sizes). Now:
cream serif italic title → `text-cream/80` description → quietest
`text-muted/70` tracked small-caps year. Each tier one step dimmer, hierarchy
carried by colour instead of size.

**The wordmark demoted.** Header wordmark 3xl/4xl → 2xl/3xl and the footer
wordmark pinned at `text-lg` — the fold's biggest type is now unambiguously
LUSG, and the colophon reads as a signature, not a second headline.

**Hover glow deleted.** The CTA's hover dropped its 20px ember shadow;
transition narrowed to background-color only. Reference sites shift
brightness, they don't bloom — and a glow on an already-filled accent is
the loudest thing a quiet page can do.

**Eyebrow hierarchy + hairline honesty.** The hero identity line drops to
`text-muted/70` so "The new single" outranks it; the flanking rules paint
at full `bg-line` (a `/60` hairline next to full-strength hairlines reads
as an accident); the announcement arrow inherits the bar's type instead of
a one-off 10px/60% dialect; years and the footer copyright gain `font-medium`
to match every other tracked-caps label.

## 📦 What changed

| File | Change |
|---|---|
| `src/app/globals.css` | `.eyebrow` tracking 0.3em→0.25em; `.ember-pill` hover shadow deleted, transition → `[background-color]` only; link-system comment updated |
| `src/components/Hero.tsx` | h1 + `tracking-[-0.015em]` (optical, display-size only); eyebrow flanking rules `bg-line/60`→`bg-line`; identity line + `text-muted/70` |
| `src/components/Header.tsx` | Wordmark `text-3xl md:text-4xl` → `text-2xl md:text-3xl` |
| `src/components/AnnouncementBar.tsx` | `md:text-xs` on the bar; arrow span drops its `text-[10px] opacity-60` one-off |
| `src/components/Releases.tsx` | Year `font-medium` + tracking 0.2em→0.25em; description `text-muted`→`text-cream/80` |
| `src/components/Footer.tsx` | Wordmark explicit `text-lg`; copyright `font-medium` |
| `src/components/HeroSky.tsx` | Comment-only: sky's plum family documented as artwork-only, never UI chrome |

## ✅ Verification

- `npm run lint:css` clean; `npm run build` clean (dev stopped first)
- Emitted CSS grepped: hero `tracking-[-0.015em]` present; exactly one
  tracked-caps value (`0.25em`) site-wide; `color-mix(#ffedd7 80%)` body
  copy, `#e7b37b 70%` meta, `#1d130b 60%` row hover — every opacity
  modifier generating
- `npm run test:pipeline` **17 passed, 0 failed** (7 skips = mobile/
  feature-gated tests in desktop projects); `npm run test:mobile`
  **6 passed** incl. the no-hscroll gate
- Dev relaunched: root 200, all referenced `/_next/static/**` assets 200,
  `rel="canonical"` present
- Playwright probe: zero console errors (desktop + mobile), no mobile
  horizontal scroll
- Vision verdicts (region crops, not full pages): fold **5/5 PASS**
  (hierarchy, caps consistency, bar crispness, colour restraint, overall),
  below-fold **5/5 PASS** (row hierarchy, description legibility, hairline
  rhythm, accent discipline, footer colophon)

## 📝 Notes

- **`@theme inline` inlines literal hex values into utilities** —
  `text-cream/80` emits `color-mix(in oklab, #ffedd7 80%, transparent)`,
  not `var(--color-cream)` references. Grepping emitted CSS for `var()`
  false-negatives; grep for property values/hex instead.
- The colour palette itself survived analysis unchanged — canvas/cream/
  muted/line/ember with alpha hierarchy is exactly the one-ground-one-ink
  system the reference sites use. What the pass fixed was *application*:
  tracking consistency, tier ordering, and glow restraint.
- HeroSky change is a comment-only provenance fix (the plum family is
  deliberate artwork, not a token leak) — zero rendered-pixel diff.
