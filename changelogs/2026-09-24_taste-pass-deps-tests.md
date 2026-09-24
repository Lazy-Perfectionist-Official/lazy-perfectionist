---
title: 2026-09-24 - Taste pass, honest links, dependency purge, rebuilt tests
description: An eight-agent pass over the stripped-down site. The fold stops announcing the release three times (the bar says it; the hero now says what the music is), the artwork becomes the link it always looked like, the lying "All streaming platforms" label becomes "Artist profile", chrome gets dark color-scheme + 24px touch targets + AA footer contrast, and the vinyl gets a sleeve zoom. Under the hood: 81→3 runtime dependencies, dead scaffold deleted (incl. prisma/seed.ts, which broke the build by importing purged packages), and a real minimal e2e suite (8 tests × 4 projects, all green) replacing the broken wipe-era config.
commit: pending
author: Samuel Lee
date: 2026-09-24
category: 🎨 Design
impact: Medium
---

# 📅 2026-09-24 - Taste Pass, Honest Links, Dependency Purge, Rebuilt Tests

**Author**: Samuel Lee
**Category**: 🎨 Design

## 🎯 Overview

User note: "Continue, taste thing and website improvement. In as many
agents you can do." Four read-only audits (critic, designer with live
probing, hygiene sweep, reference-site research on plini.co ×
intrvls.com) converged on one win list, executed by five parallel
agents with disjoint file ownership.

**The fold stops repeating itself.** The release was announced three
times above the fold — bar, "Out now" subline, eyebrow. The subline is
now an identity line ("Bedroom instrumental rock · Hong Kong"), so the
hero says what the music *is* while the bar says what's *new*. That
also removed the fourth ember usage — the accent is back to bar + one
CTA + hovers.

**Links tell the truth.**

1. The hero artwork looked clickable and wasn't — it's now the link it
   looked like (Spotify track, new tab), which also gives the vinyl
   reveal a payoff on touch devices.
2. "All streaming platforms" linked to one platform's artist page —
   relabeled **"Artist profile"**. Honest beats aspirational.
3. Quiet links unified: the artist-profile line joins Connect/Footer in
   the `quiet-link` dialect instead of a one-off style.

**Chrome polish.** `color-scheme: dark` (kill the white UA flash on
form/scrollbar edge cases), nav/quiet-link touch targets raised to a
24px floor (`inline-block py-2.5`), hovers eased to 300ms, footer
contrast to AA (`/70` muted, 4.6:1) minus a double hairline, mobile
title clamp floor 4.5rem→7.5rem (the title now outsizes the 190px
wordmark it sits under), hairline `--color-line` brightened to `#4c4034`,
and a hover ember `--color-ember-bright: #f05c04` so bar/CTA states
don't just thicken.

**Vinyl + sleeve.** Grooves to 0.11 alpha, rim to `/15`, a directional
cast shadow, and the sleeve zooms 1.5% on reveal — the record slides
*out* of a living jacket, not a static one. Sky nudges: horizon glow
down 12 units, sky band's last stop to 0.80 (clearer band behind the
artwork).

**Repo health.** 81→3 runtime dependencies (next/react/react-dom — the
site has zero client JS), 20→12 devDeps, 32→15 scripts. Deleted dead
scaffold: `tailwind.config.ts` (Tailwind v4 CSS-first never loaded it),
`components.json`, `playwright.lighthouse.config.ts`, `lighthouserc.json`,
and `prisma/seed.ts` — the seed imported purged `@prisma/client` /
`bcryptjs` and type-check failure broke `npm run build` (the archive is
schema + dev.db, which stay). Release rows respond to touch
(`active:bg-surface`) and show their Listen label on mobile.

## 📦 What changed

| File | Change |
|---|---|
| `src/app/globals.css` | `--color-line` #40372e→#4c4034; new `--color-ember-bright` #f05c04; `color-scheme: dark`; `.announcement:focus-visible` cream outline (ember ring invisible on ember bar); `.nav-link`/`.quiet-link` +24px touch floor, 300ms hovers; `.ember-pill` ember-bright hover + glow 44px→20px |
| `src/components/Hero.tsx` | Title clamp floor 7.5rem; "Out now" → identity eyebrow; artwork `<a>` (track URL, new tab) + sleeve zoom `scale-[1.015]`; "All streaming platforms" → "Artist profile" (`quiet-link`); vinyl grooves 0.11, rim `/15`, directional shadow; vestigial CTA wrapper div removed |
| `src/components/HeroSky.tsx` | Horizon-glow ellipse cy 500→512; sky-band last stop 0.82→0.80 |
| `src/components/AnnouncementBar.tsx` | `announcement` class, py-3, ember-bright hover, arrow 10px/60% |
| `src/components/Header.tsx` | Desktop nav gap 7→8 |
| `src/components/Releases.tsx` | `active:bg-surface`; year + metrics 11px on mobile; Listen label visible on mobile |
| `src/components/Connect.tsx` | Quiet-link class unified |
| `src/components/Footer.tsx` | Double hairline removed; muted `/70` (AA); py-8 |
| `src/lib/site.ts` | LUSG description: "The bedroom at full scale — strings and synths stacked to the ceiling." |
| `src/app/layout.tsx` | Instrument Serif italic face only (upright face unused); `alternates.canonical: "/"` |
| `public/manifest.json` | icon-192x192.png registered (was orphaned) |
| `playwright.config.ts` | Rewritten: 4 projects (3× desktop 1920×1080 + mobile-chrome 375×667), no broken globalSetup, `retain-on-failure` traces |
| `tests/e2e/home.spec.ts` | New minimal suite — 8 tests: clean load (0 console/page errors), honest hero links, announcement bar, Music anchor scroll, release rows + Listen, no mobile hscroll, reduced-motion static, vinyl rests at origin |
| `package.json` / lockfile | deps 81→3, devDeps 20→12, scripts 32→15 (1,239 packages pruned) |
| Deleted | `tailwind.config.ts`, `components.json`, `playwright.lighthouse.config.ts`, `lighthouserc.json`, `prisma/seed.ts` |
| `.github/workflows/test.yml` | Minimal single job (was wired to wiped test tree) |

## ✅ Verification

- `npm run lint:css` clean; `npm run build` clean (after removing
  prisma/seed.ts — first run failed on its purged imports)
- Emitted CSS verified in served `layout.css`: `color-scheme: dark`,
  `#4c4034`, `#f05c04`, `.announcement:focus-visible`, `.nav-link`
  inline-block + 2.5 spacing padding
- Dev server relaunched: all 8 referenced `/_next/static/**` assets
  200; `rel="canonical"` present
- `npm run test:pipeline` (lint + functional × chromium/firefox/webkit):
  **17 passed, 0 failed** (7 skips = mobile/feature-gated tests in
  desktop projects); `npm run test:mobile`: **6 passed** incl. the
  no-hscroll gate
- Fixed in passing: RM test skip checked project name `chromium` but
  the project is `chromium-desktop` — the test silently skipped
  everywhere; now runs and passes
- Fold probe: zero console errors; vision spot-check 3/5 with both
  FAILs refuted by DOM geometry (identity→artwork gap 56px, CTA at
  y≈1090 on a 900px viewport — poster-hero fold by design, per the
  fold-crop attention rule)

## 📝 Notes

- **Dead code that imports purged deps breaks the build** — tsconfig
  type-checks every .ts under the project; "archive" files must be
  self-importing or deleted. prisma keeps schema + dev.db, drops seed.
- **Project-name skip gating is exact-match** — `testInfo.project.name
  !== 'chromium'` vs a project named `chromium-desktop` skips the test
  in every project. Silent skips are the worst failure mode; audit
  skip counts.
- Reference-site research (plini.co × intrvls.com) confirmed the
  stripped direction rather than adding wants: their shared restraint
  (one accent, generous type, hairline structure) is what this site
  already does; adopted only the sleeve-zoom and slower hovers.
- `.env.example` left on disk (untracked) documenting
  NEXT_PUBLIC_SITE_URL; `metadataBase` still references the parked
  BuyDomains domain (F11) — metadata affects og cards only once the
  domain is reclaimed.
