---
title: 2026-09-22 - Real ORYZO tokens, serif restored, once-per-session loading screen
description: Tailwind v4 loaded no config, so every oryzo-* utility was a handful of hand-written CSS rules and font-display never generated — headlines rendered italic Inter while opacity modifiers were no-ops; tokens are now registered in @theme inline, the tone/spec sweep lands (walnut body, ember hero CTA, Inter caps headings), and a non-blocking loader replaces the one removed in August
commit: pending
author: Samuel Lee
category: 🎨 Design
impact: High
date: 2026-09-22
---

# 📅 2026-09-22 - Real ORYZO Tokens, Serif Restored, Loading Screen

**Author**: Samuel Lee
**Category**: 🎨 Design

## 🎯 Overview

The site's intended visual voice was silently broken. `@tailwindcss/postcss`
loads no `tailwind.config.ts` and globals.css never declared `@config`, so
Tailwind itself generated **none** of the ORYZO utilities — they existed only
as a few hand-written plain-CSS rules. The tell: `font-display` (the serif
face) was applied to the biggest headings on the site but generated nothing,
so every headline rendered *italic Inter* while small text carried the
styling weight. All opacity modifiers (`text-oryzo-cream/20` marquee,
`/[0.04]` ghost words, `bg-oryzo-canvas/80` glass nav) rendered at full
opacity or fully transparent, and `border-oryzo-*` / gradient stops never
generated at all.

## ⚙️ What changed

**Tokens (WS1)** — ORYZO palette + Instrument Serif registered in
`@theme inline` (`globals.css`), mapping to the canonical `:root` tokens:
`--color-oryzo-{canvas,surface,cream,muted,border,ember}`, `--font-display`,
plus `--color-driftwood`/`--color-bark-brown` for gradient stops. Verified in
the emitted CSS: `.font-display{font-family:var(--font-display)}`,
`color-mix(in oklab, … 20%, transparent)` variants, borders, ember fills.
Hand-written duplicates and dead rules (legacy aliases, `.font-oryzo-display`,
`.font-dm-serif*`, `.text-oryzo-{display,heading,subheading}`) deleted after
grep-verify; ~78 usages swept to the two-name font system (`font-display`
serif for display moments, `font-medium` for Inter labels/buttons/eyebrows).

**Tone + spec sweep (WS2)** — body paints walnut-shadow `#100904` directly
(audit F9; `!important` and pure black gone) with a cream-on-walnut
`::selection`; hero title loses its off-spec negative tracking; the hero CTA
becomes the site's single ember-filled moment (dark canvas text on ember,
~4.6:1 AA) with glow on hover — everything else stays outline/glass; nav
links move to 12px uppercase tracked (mobile drawers `text-sm uppercase`);
page/section headings unify to Inter 500 uppercase tracked 0.2em while serif
italic stays for display moments (hero title, ghost words, featured/track/
post titles, pull quotes, marquee); contact spotify button hairline border;
catalog/journal card titles drop the JS `toUpperCase()` now that they render
as serif display text.

**Loading screen (WS3)** — `LoadingScreen.tsx` (new, audit F8 resolution 2).
The 2026-08-13 removal (d8005d5) killed a loader that gated the whole tree
behind `onComplete`; the rebuild never gates content: server renders `null`,
`useEffect` decides show/skip (no hydration flash), and the page always
paints beneath the fixed overlay (LCP-safe). Once per browser session
(`sessionStorage lp-intro-shown`), skipped under `prefers-reduced-motion`,
duration `clamp(900ms, readiness, 1600ms)` where readiness is
`document.fonts.ready` + a rAF settle raced against the max so slow fonts
can't stretch the beat; 380ms exit fade then unmount. Words
`['Create', 'Lazy Perfectionist']` in Instrument Serif italic at
`clamp(2.5rem, 8vw, 4.5rem)` (name fits mobile), "EST. 2025 — HONG KONG"
label (replacing the template's PORTFOLIO placeholder), tabular-nums 000→100
counter, 3px cork/ember progress bar.

**Tests, baselines, docs (WS4)** — `skipIntro` helper (session-flag
`addInitScript`) applied to every '/'-visiting suite (fresh context per test
= new session); new `loading-screen-functions.spec.ts` covers fresh-visit
show+self-remove, once-per-session skip, reduced-motion skip (no exact-timing
asserts); home-visual zombie loading test deleted (F6) with its 7 baselines,
contact-section selector re-pointed to `[data-testid="contact-section"]`
(F7), settle bound 5000→300ms, ORYZO-colors test asserts `rgb(16, 9, 4)`;
music/journal test expectations updated for natural-case serif titles;
visual baselines regenerated (~226 tests × project contexts — churn is
intentional: serif restored, opacity modifiers live, Inter-caps, ember CTA
touch every page). Audit F6/F7/F8/F9 → fixed; F12 verified already covered
(`home-functions.spec.ts` "surfaces an error toast when the API rejects").

## ✅ Verification

- `npm run build` green; emitted CSS grepped for `.font-display{` and the
  `oryzo-cream/20` color-mix variant — Tailwind generates them (proof the
  registration works, not just compiles).
- `loading-screen-functions.spec.ts` 3/3; functional (3 engines),
  navigation, portfolio-interactions, cross-browser, ux journeys, a11y all
  green with `skipIntro`.
- Baselines regenerated once after all visual changes, then full
  `test:pipeline` (lint:css → functional → navigation → visual →
  Lighthouse-on-prod) green; lighthouse runs with `skipIntro` and the loader
  never gates content, so LCP holds.
- Tailnet standalone server rebuilt and restarted on :3000; routes 200,
  headless probe clean, loader appears once per browser session.

## 🔎 Notes

- `--color-driftwood` keeps the code value `#e7b37b` (FIGMA spec lists
  `#6c5f51`); the code value is contrast-driven for text-on-canvas and the
  divergence predates this change — flagged, not altered.
- Ember CTA text is canvas-dark (≈4.6:1), not cream (≈3.7:1 would fail the
  axe gate).
- Admin inherits the serif fix for free; its labels keep the Inter-medium
  uppercase treatment they already rendered as.
