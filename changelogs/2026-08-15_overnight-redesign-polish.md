---
title: 2026-08-15 - Overnight Redesign Polish: Hero Spotlight Swap, Homepage Finale, Music Editorial Redesign, 404 + Platform-Links Fixes
description: Cross-origin fix, hero image swap, new Finale + Journey sections, animation cleanup, Music page editorial redesign, new 404 page, platform-links fallback states
commit: 337e8a7
author: Samuel Lee
category: 🎨 UI/UX Design
impact: High
date: 2026-08-15
---

# 📅 2026-08-15 - Overnight Redesign Polish

**Commits**: `0c79374` → `78c350d` → `d29173a` → `337e8a7` → `1881f99` → `52358ab`
**Author**: Samuel Lee
**Category**: 🎨 UI/UX Design

## 🎯 Overview

Follow-up polish on the `feature/website-redesign` branch from an autonomous
overnight pass. Five areas: dev-server cross-origin warning, hero spotlight
image direction, homepage ending (placeholders removed, new Finale + Journey
sections, animation fixes), a full Music page redesign to match the site's
dark editorial direction (Plini / Intervals / SheetHappens inspired), and
final-sweep fixes for the two remaining broken states (black 404 page and
platform-links dead ends).

## 🔄 Changes by Commit

### `0c79374` — Cross-origin fix + hero image swap
- Added `allowedDevOrigins` to `next.config.ts` (Next 15.3+) to silence the
  dev-server cross-origin warning. **Note:** requires a manual dev-server
  restart to take effect (nodemon watches only `server.ts` and `src/`).
- Swapped hero spotlight images so the WARM amber image is the at-rest base
  and the COOL blue image is revealed under the cursor spotlight — as
  originally intended.

### `78c350d` — Homepage ending overhaul
- **New `Finale.tsx`**: "ONE LAST THING" section with italic serif statement
  ("Silence never really ends — it just changes song."), giant `LUSG`
  backdrop word (`text-[24vw] text-oryzo-cream/[0.04]`), STREAM + EXPLORE
  CTAs.
- **`Stats.tsx` → "THE JOURNEY SO FAR"**: editorial timeline rows (Orbit 2025
  → Cyclothymia 2026 → LUSG 2026); all `stats-*` testids preserved.
- **`Hero.tsx`**: nav animation delay 2.8s → 0.3s (LoadingScreen was removed
  earlier); hover-poisoning delays removed.
- **`Journal.tsx`**: VIEW ALL link simplified.
- **`Contact.tsx`**: footer social links converted from magnetic buttons to
  plain anchors.
- **`page.tsx`**: static import order Hero → SelectedWorks → Journal → Stats
  → Finale → Contact.

### `d29173a` — Music page editorial redesign
- **Removed dead code**: Spotify fetch (invalid_client), preview playback,
  loading states, all unused hooks (~90 lines).
- **Featured LUSG treatment**: two-column cover/info layout, hover play
  overlay, ember "Latest Single" label, meta row, STREAM NOW / FOLLOW CTAs.
- **Catalog rows**: numbered editorial rows with bordered dividers, hover
  ember titles, LISTEN → affordance (replaces card grid).
- **Closing strip**: italic serif statement + FOLLOW ON SPOTIFY / ALL LINKS.
- **SEO**: metadata now leads with LUSG (2026); structured data updated.

### `337e8a7` — 404 page + platform-links dead-end fixes

Final-sweep findings from a full-site user-perspective tour: the 404 page
rendered entirely black (no `not-found.tsx` existed), and `/platform-links`
had two dead-end states — the no-params state (reached via nav "Connect")
told users to "pick a track and choose your platform," which is impossible
(`PlatformButtons` is dead code and `/music` links straight to Spotify), and
the with-trackId state claimed "Streaming options are loading" forever while
the API actually returns `Track not found` (Spotify `invalid_client` cascade).

- **New `src/app/not-found.tsx`**: dark editorial 404 — giant aria-hidden 404
  backdrop numeral (`text-[42vw] text-oryzo-cream/[0.04]`, same pattern as
  Finale's LUSG backdrop), "Lost Track" eyebrow, "Not found." h1, brand copy
  ("This page never made the final mix — but the music did."), BACK TO HOME +
  LISTEN INSTEAD CTAs. Satisfies the a11y test contract (exactly one h1
  matching `/404|not found|error/i`, nav links present).
- **`platform-links/page.tsx`**: added `failed` state tracked by
  `fetchPlatformLinks`; no-params state now shows "START LISTENING" with
  BROWSE MUSIC + STREAM "LUSG" ON SPOTIFY CTAs (replaces stale Orbit link
  with the current single `4RnwmBIaSuOqGEu8R2nIsU`); API-failure state shows
  "PLATFORM LINKS UNAVAILABLE" with a direct Spotify fallback link built from
  the requested `trackId`.
- **`analytics-stub.ts`**: `trackPlatformClick` signature corrected to accept
  `Partial<PlatformClickEvent>` (was 0-arg, TS2554).
- **Next 15 typing**: `searchParams` prop typed as
  `Promise<{ trackId?; trackName?; artistName? }>` (resolved via React `use()`),
  fixing TS2345/TS2339 in this file.

### `1881f99` + `52358ab` — stale-chunk cache poisoning fix

A browser that visited during the overnight run could crash on every load
(`Cannot read properties of undefined (reading 'split')` in
`SelectedWorks.loadableGenerated.modules`, blank page) after server restarts:

- Dev chunks were served with `Cache-Control: immutable, max-age=1yr`
  (`next.config.ts` applied the prod header rule in dev, where chunk
  filenames are stable across recompiles) → browsers kept pre-redesign
  `webpack.js` forever. Header now applies only in production.
- `sw.js` was registered in dev and served `/_next/static/*` cache-first →
  even clearing HTTP cache didn't help. Registration is now production-only
  (`ServiceWorkerRegistration.tsx`).
- The SW update itself was **broken**: `/store` 307-redirects off-origin to
  ko-fi and `cache.addAll` rejects on that response, so no new SW version
  could ever install — browsers stayed controlled by the old poisoned one.
  Install now caches per-asset with `Promise.allSettled` (one bad URL can't
  block an update) and drops `/store` from the precache list.
- New SW (v2) **self-heals**: on activate it deletes all v1 caches, and the
  fetch handler serves `/_next/static/*` with `cache: 'reload'` (bypasses
  both SW and poisoned immutable HTTP cache entries, never caches chunks).
  Verified end-to-end with Playwright: planted a garbage `webpack.js` into a
  v1-style cache → page still loads clean, zero console/page errors.

## 📁 Files Modified

- `next.config.ts` — allowedDevOrigins
- `src/app/components/portfolio/Hero.tsx`
- `src/app/components/portfolio/Stats.tsx`
- `src/app/components/portfolio/Journal.tsx`
- `src/app/components/portfolio/Contact.tsx`
- `src/app/components/portfolio/Finale.tsx` (new)
- `src/app/page.tsx`
- `src/app/music/MusicPage.tsx`
- `src/app/music/page.tsx`
- `src/app/not-found.tsx` (new)
- `src/app/platform-links/page.tsx`
- `src/lib/analytics-stub.ts`

## ✅ Verification

- Playwright sweeps on homepage (7 screenshots) and Music page
  (6 screenshots): 0 console errors, no mobile horizontal overflow,
  `/music?tab=albums` renders without crash, 3 catalog rows,
  e2e locator contract (`music-card` testid) preserved.
- Playwright verification of the 404 + platform-links fixes: 404 route
  returns status 404 with exactly one h1 ("Not found."), both CTA testids
  present, 6 nav links, no horizontal overflow at desktop or mobile;
  `/platform-links` (no params) shows START LISTENING + LUSG CTA with dead-end
  copy and stale Orbit link gone; `/platform-links?trackId=...` shows
  PLATFORM LINKS UNAVAILABLE + STREAM ON SPOTIFY fallback.
- `npx tsc --noEmit` clean for all touched files (remaining project errors
  are pre-existing in untouched files).

## 📝 Known Issues (not blocking)

- Spotify API returns `invalid_client` — owner-side env var configuration,
  pages no longer depend on it; `/api/platform-links` returns
  `Track not found` until creds are fixed (page now degrades gracefully).
- `tests/e2e/navigation.spec.ts:38` expects a homepage link matching
  `/platform/i` — pre-broken by the redesign (nav label is now "Connect");
  intentionally not "fixed" by adding a legacy link label.
- Visual regression baselines under `tests/e2e/visual/*-snapshots/` need
  regeneration against the new 404 / platform-links / music renders
  (untracked; regenerate with `--update-snapshots`).
