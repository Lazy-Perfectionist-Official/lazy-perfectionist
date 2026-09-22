---
title: 2026-09-22 - Store nav links go straight to Ko-fi
description: The /store route behind a next/link made every page's RSC prefetch chase the 307 cross-origin and die on Ko-fi's missing CORS headers — console errors on all pages and a broken-feeling STORE click; nav now points directly at the shop
commit: pending
author: Samuel Lee
category: 🐛 Bug Fix
impact: Medium
date: 2026-09-22
---

# 📅 2026-09-22 - Store Nav Links Go Straight to Ko-fi

**Author**: Samuel Lee
**Category**: 🐛 Bug Fix

## 🎯 Overview

Surfaced while hosting the production build on the tailnet: browsing
any page spammed console errors from `/store`, and clicking STORE went
through a failed intermediate state before landing on Ko-fi (on some
browsers/timings this surfaces as an error page attributed to the
site's host). Root cause: an external shop masquerading as an internal
route.

## ⚙️ What was wrong (reproduced with a headless browser)

- Both nav bars linked `/store` via `next/link`, so the App Router
  treated it as a client-side navigation target and prefetched
  `/store?_rsc=…`.
- The route answers `307 → ko-fi.com`; the prefetch fetch chased the
  redirect cross-origin, Ko-fi sends no CORS headers, and the RSC
  payload died with `net::ERR_FAILED` — repeated console errors on
  **every page** (the STORE link sits in the global nav), plus a
  fallback-to-full-navigation flicker on click.
- This is the same endpoint the 2026-09-21 Lighthouse lane flagged as
  a "transient 503 on `/store?_rsc`" — now root-caused, not transient.

## ⚙️ What changed

- `src/lib/nav.ts` (new): single source for the nav mapping +
  `STORE_URL`; `Store` resolves to the absolute Ko-fi shop URL.
  Absolute URLs skip the RSC machinery entirely (same pattern as the
  existing Listen Now button), and both navs now share it.
- `Hero.tsx` / `Navigation.tsx`: drop their duplicated local
  `navHref` in favor of the shared one.
- `store/page.tsx`: keeps the `redirect(STORE_URL)` route for
  typed/legacy/direct-entry URLs (still asserted by tests).
- `home-functions.spec.ts`: the nav-link contract now asserts the
  external Ko-fi href; the `/store` 307 route assertion is unchanged.
  UX/navigation journeys (click STORE → land on Ko-fi) pass unchanged —
  the click is now a plain same-tab navigation with no broken hop.

## ✅ Verification

- Headless-browser pass over the tailnet origin: `/`, `/music`,
  `/blog`, `/platform-links` all 200 with **zero** ≥400 responses and
  **zero** console errors after the fix (previously every page
  produced the RSC/CORS error storm); STORE click lands directly on
  `ko-fi.com/lazyperfectionist/shop`.
- Functional nav contracts + `/store` redirect assertion green.

## 🔎 Notes

- Store deliberately stays same-tab (audit F10 decision); only the
  broken intermediate hop is gone.
