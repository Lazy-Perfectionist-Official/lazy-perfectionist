---
title: 2026-09-21 - Functional Test Pipeline: Every Button, Form, and API-Driven State
description: New deterministic functional suite (5 specs + helpers) covering all interactive elements site-wide, npm pipeline scripts, cross-browser + mobile verified, zero vacuous guards
commit: pending
author: Samuel Lee
category: 🧪 Testing Infrastructure
impact: High
date: 2026-09-21
---

# 📅 2026-09-21 - Functional Test Pipeline

**Author**: Samuel Lee
**Category**: 🧪 Testing Infrastructure

## 🎯 Overview

A full inventory of every interactive element on the site (nav systems,
CTAs, forms, API-driven sections, sort control, platform-link states, 404
recovery, the /store redirect) turned into a deterministic functional
suite. Unlike the older interaction specs, every assertion here can fail —
no `if (visible)` soft guards that pass vacuously. A single
`npm run test:pipeline` now proves the whole site still works.

## 🔄 Changes

### `tests/e2e/functional/` (new)
- **helpers.ts** — shared contract: `expectExternalLink` (asserts href
  origin + `target="_blank"` + `noopener noreferrer` without ever
  navigating off-site), `clickNavLink` (opens the mobile drawer when the
  viewport has one), `isDesktopViewport`, Medium post fixtures.
- **home-functions.spec.ts** — hero nav link contracts, /store → ko-fi
  redirect (request-level, no navigation), /api/content success + fallback
  copy, hero CTA, featured release card, View All → /music, Journal
  section (entries rendered from intercepted /api/medium, VIEW ALL link,
  failure fallback), stat timeline links, finale links, contact form
  (validation wiring, SENDING state, success toast + field reset, error
  toast + fields kept), newsletter form (same three paths), footer social
  links, mobile drawer open → navigate → aria-expanded closes.
- **music-functions.spec.ts** — stream/follow buttons, featured cover
  link, all three catalog rows (title + exact Spotify href), closing
  Spotify + Linktree links.
- **blog-functions.spec.ts** — SSR story cards link to medium.com
  (deterministic: live feed and built-in fallback both qualify), follow +
  archive Medium-profile links, sort select switches Latest/Oldest/Popular.
- **platform-links-functions.spec.ts** — no-track state (BROWSE MUSIC →
  /music, default LUSG stream link), platforms-loaded state via
  intercepted API (rows render; click stubs `window.open` and asserts the
  recorded URL — no popup spawned), API-failure state (direct Spotify link
  for the requested trackId), back-to-music link.
- **not-found-functions.spec.ts** — custom 404 renders; both CTAs land on
  / and /music with the right content testids.

### Pipeline scripts (`package.json`)
- `test:functional` — chromium-desktop only, ~27s.
- `test:functional:cross-browser` — chromium + firefox + webkit.
- `test:pipeline` — functional cross-browser → navigation flows → full
  visual matrix, chained with `&&` (single failing exit code).

## 🔍 Findings encoded as tests

- The homepage hero logo is a decorative div, not a link (subpage
  Navigation's logo is the one that links home) — asserted as-is, not a
  bug.
- Radix toasts duplicate their text into an aria-live region → toast
  assertions use `exact: true` to target the visible toast.
- WebKit (webkit-desktop + mobile-safari) synthetic submit clicks bypass
  HTML5 constraint validation — an automation quirk. The no-POST proof
  runs on chromium/firefox; the attribute wiring (required / type=email /
  minlength=10) is asserted on every engine, and the route is hung in that
  test so WebKit's stray click can never reach the real API.

## 📁 Files Modified

- `tests/e2e/functional/{helpers,home-functions,music-functions,blog-functions,platform-links-functions,not-found-functions}.spec.ts` (new)
- `package.json` (three scripts)

## ✅ Verification

- Chromium: 40 passed / 1 correctly skipped (drawer test is mobile-only).
- Full project matrix (chromium, firefox, webkit, mobile-chrome,
  mobile-safari, tablet): all green; skips are viewport-scoped by design.
- `npm run test:pipeline` end-to-end: functional ×3 engines → navigation →
  visual matrix, all green.
