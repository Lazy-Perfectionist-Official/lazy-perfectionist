---
title: 2026-09-23 - Stripped-down rebuild referencing Plini and Intervals
description: The whole site was wiped to a skeleton (139ce0f); this rebuilds it as a single static page borrowing the shared DNA of plini.co and intrvls.com — warm near-black canvas, one ember accent doing triple duty, centered wordmark over tiny tracked nav, a poster hero for LUSG with a single filled CTA, hairline release rows, and plain-text socials — zero client JS, content hardcoded in src/lib/site.ts
commit: pending
author: Samuel Lee
category: 🎨 Design
impact: High
date: 2026-09-23
---

# 📅 2026-09-23 - Stripped-Down Rebuild Referencing Plini and Intervals

**Author**: Samuel Lee
**Category**: 🎨 Design

## 🎯 Overview

After clearing the website for a from-scratch rebuild, the site returns as a
single static page whose structure references the two sites the user named:
**plini.co** (Shopify store for the Australian guitarist) and **intrvls.com**
(Shopify store for the band Intervals). Both were researched via agent-reach
(Jina Reader content extraction + Playwright screenshots + vision analysis).

The shared DNA extracted from both references and carried into this rebuild:

- warm **near-black canvas, never pure black** (both sites: ~#1a0f0a / #1a1414)
- **one accent doing triple duty** — announcement bar, the single filled CTA,
  and hover moments (Intervals' dusty rose → our ember #dc5000)
- **near-invisible chrome** — hairline rules, tiny tracked-caps nav links
- **centered wordmark over a centered nav row** (Intervals' header pattern)
- **one typographic statement per screen**, extremely airy (Plini's poster hero)
- announcement bar at the very top (both sites)

## 📦 What changed

**New single page** (`src/app/page.tsx` + `src/components/`), all server
components — **zero client JS**:

| Section | Reference | Notes |
|---|---|---|
| AnnouncementBar | Intervals | Ember strip, tiny tracked caps, whole bar links to the LUSG Spotify track |
| Header | Intervals | Centered Instrument-Serif-italic wordmark over a wrapping row of tiny uppercase nav links (Music anchor + Store/Spotify/YouTube/Instagram external), closed by a hairline |
| Hero | Plini | Eyebrow → giant serif-italic `LUSG` (clamp 4.5–9.5rem) → ember `OUT NOW` → centered 420px artwork → **single** ember pill CTA `Listen on Spotify` (dark-on-ember ≈4.6:1 AA) |
| Releases | both | Hairline catalog rows (year · serif-italic title · description), newest first: LUSG 2026, Cyclothymia 2026, Orbit 2025 — whole row links to Spotify |
| Connect | Plini | Quiet text-link row: Spotify · YouTube · Instagram · Twitter · Store (Ko-fi) |
| Footer | both | Serif-italic name + `© 2026 · Hong Kong` |

**Design tokens** (`src/app/globals.css`): Tailwind v4 `@theme inline` with
canvas #100904 / surface #1d130b / cream #ffedd7 / muted #e7b37b / line
#40372e / ember #dc5000 — the brand palette carried over from the archived
design system, now with only six tokens. Faint film-grain overlay
(body::after, noise tile at 4% opacity) echoes Intervals' texture.

**Content** (`src/lib/site.ts`): single source of truth — verified Spotify
track/artist URLs, Ko-fi shop, socials. No DB, no platform-links API.

**Infrastructure**:
- `package.json` `dev` → plain `next dev` (custom `server.ts` was wiped)
- `next.config.ts` reset to minimal: standalone output, caching/security
  headers, image config; dropped gsap/three/framer chunk splitting, dead
  redirects to the deleted `optimized/` dir, and custom-server webpack hacks
- `src/instrumentation.ts`: **Node 25 fix** — webstorage exists by default but
  is inert without `--localstorage-file`, so Next's dev overlay crashed every
  SSR render with `localStorage.getItem is not a function`; register()
  installs an in-memory shim before rendering (browsers untouched)
- `manifest.json` rewritten (canvas/ember colors, live icon paths, `/#music`
  shortcut); `robots.txt` dead sitemap line removed
- Public assets restored from the archive branch: favicon set, icons, Google
  verification, `lusg-cover.jpg` (1400×1400), noise tile. Dropped the 11MB
  `orbit-cover.jpg`, 5MB `logo.svg`, 641KB `favicon.svg`, and `sw.js`.

## ✅ Verification

- `npm run build` — clean; fully static, 107 kB first-load JS
- `npm run lint:css` — clean after splitting `outline`/`background` into
  longhands for declaration-strict-value
- Emitted CSS contains generated `bg-ember`, `text-canvas`, `border-line`,
  `font-display` utilities (the Tailwind v4 token lesson applied)
- Playwright probe on dev :3000 — HTTP 200, **zero console errors**
- Vision review (desktop top, full page, mobile 375px): announcement bar,
  header, hero typography/artwork/CTA, release rows, connect, footer all
  render correctly; mobile nav wraps cleanly, no overflow

## 📝 Notes

- Previous 54-commit site is archived on local branch `feature/website-redesign`
  (never pushed). Recover assets/content with
  `git show feature/website-redesign:<path>`.
- `devIndicators: false` was tried first for the Node 25 crash; the
  instrumentation shim is the actual fix (indicator config kept off anyway).
- Test scripts (`test:*`) still reference the wiped `tests/` tree — restoring
  a minimal e2e suite is future work, as is the tailnet standalone redeploy.
- F11 (parked domain) still applies — canonical URLs reference
  lazyperfectionist.com, which the owner must repoint.
