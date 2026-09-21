---
title: 2026-09-21 - Lighthouse gates the pipeline on the production build
description: Dedicated playwright.lighthouse.config.ts builds the site, serves the standalone server on :3001, and audits with canonical desktop/mobile presets — test:lighthouse now runs in test:pipeline
commit: pending
author: Samuel Lee
category: 🧪 Testing
impact: High
date: 2026-09-21
---

# 📅 2026-09-21 - Lighthouse Gates the Pipeline (Production Build)

**Author**: Samuel Lee
**Category**: 🧪 Testing

## 🎯 Overview

Phase 1.4: `npm run test:lighthouse` now audits the **production build**
via a dedicated config, and `test:pipeline` runs it as its final gate.
The lane had never actually constrained anything before — the spec
referenced audits deleted from Lighthouse 12 and library options that
playwright-lighthouse v4 silently ignores.

## ⚙️ What was wrong (measured, not guessed)

- Auditing the dev server measured Next.js compile-on-demand: performance
  **50** on dev vs **94** on the same site's production build.
- playwright-lighthouse v4 source shows: top-level `audits`/`onlyAudits`
  options are ignored, and audit-level threshold keys compare against
  `undefined` — every "CWV threshold" vacuously passed.
- Lighthouse 12 removed the `pwa` category and the service-worker,
  installable-manifest, maskable-icon, js-libraries, tap-targets, and
  sitemap audits; the old `pwa: 70` threshold requested a nonexistent
  category.
- Without an explicit preset, Lighthouse defaults to a simulated Moto G
  on slow 4G — wrong device class for the desktop lanes.

## ⚙️ What changed

- `playwright.lighthouse.config.ts` — dedicated project (Chrome with CDP
  :9222), `workers: 1`, and a webServer that serves **the standalone
  production server** (`serve:prod`: copies `public/` + `.next/static`
  into `.next/standalone` — Next does not do this automatically — and
  runs the traced `server.js` on :3001). `next start` warns it does not
  support `output: 'standalone'`; the lane audits what actually ships.
  Port 3001 keeps it independent of any dev server on 3000.
- `lighthouse.spec.ts` rewritten against the real API:
  - category thresholds only; per-audit assertions made explicitly from
    the returned LHR (`numericValue` for CWV budgets, score≠0 for axe /
    SEO / best-practices audits; null = not-applicable = pass);
  - canonical desktop preset imported from
    `lighthouse/core/config/lr-desktop-config.js` for desktop runs;
    default mobile emulation for the mobile lane;
  - `disableStorageReset: false` so every run measures a cold first visit;
  - PWA → direct installability checks (`/sw.js` served as JS, manifest
    linked + name/start_url/≥192px/maskable icons);
  - sitemap → robots.txt must declare an absolute https Sitemap (the live
    URL's uptime is a monitoring concern, not a build gate);
  - `/store` dropped from multi-page audits (it redirects to Ko-fi —
    auditing it would audit someone else's site; the redirect itself is
    asserted in the ux journeys);
  - HTML report per run in `reports/lighthouse/` (gitignored).
- `playwright.config.ts` — lighthouse project moved out; the six browser
  projects keep `testIgnore` for the spec.
- `package.json` — `test:lighthouse` = `npm run build && playwright test
  --config=playwright.lighthouse.config.ts`; `serve:prod` script;
  `test:pipeline` now: `lint:css && test:functional:cross-browser &&
  navigation && test:visual && test:lighthouse`.

## ✅ Verification (production scores, thresholds not lowered)

- Full `npm run test:lighthouse`: **12/12 passed** — homepage 94/100/96/100
  (perf/a11y/bp/seo), CWV all under budget (FCP<2s, LCP<2.5s, CLS<0.1,
  TBT<300ms, SI<3.4s), no JS chunk >500KB, music 98/100/100, blog
  100/100/100, mobile-on-slow-4G 78/100/100, axe/SEO/best-practices audits
  individually green, SW + manifest checks green.
- One transient 503 on a `/store?_rsc` prefetch surfaced once in
  `errors-in-console` (weight 1, did not breach the threshold) — not
  reproducible; watching for recurrence.

## 🔎 Notes & follow-ups

- `valid-source-maps` fails (weight 0, no score impact) — enabling
  `productionBrowserSourceMaps` would turn it green at the cost of build
  size; optional follow-up.
- Lighthouse's storage reset does not clear cookies and this Chrome build
  removed the browser-level cookie CDP methods — cross-test cookie
  contamination is why the thumbnail fix (separate changelog) mattered.
