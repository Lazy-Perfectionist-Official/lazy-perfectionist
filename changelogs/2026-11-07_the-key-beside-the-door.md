---
title: 2026-11-07 - The key beside the door
description: /admin booted straight to "configuration file could not be retrieved" in production — Sveltia at our pinned version reads no inline window config; the config now ships as a static config.yml beside the page, where Sveltia actually looks.
commit: pending
author: Samuel Lee
date: 2026-11-07
category: 🔧 Infrastructure
impact: /admin config delivery (acec6e8 hotfix)
---

# 📅 2026-11-07 - The Key Beside the Door

**Author**: Samuel Lee
**Category**: 🔧 Infrastructure
**Impact**: /admin config delivery (acec6e8 hotfix)

## 🎯 Overview

The post-ship check of https://lazy-perfectionist.vercel.app/admin caught the
door jammed: Sveltia booted to *"There is an error in the CMS configuration
… The configuration file could not be retrieved."* The inline
`window.SVELTIA_CMS_CONFIG` from acec6e8 was never going to work — the pinned
bundle (`@sveltia/cms@0.261.0`) contains zero references to that global. It
reads its config the Decap way: a fetch of `config.yml` resolved against the
admin path.

- **`public/admin/config.yml` is the config now** — the same collections and
  fields as before (Copy & singles, Shop summaries), in YAML, served at
  `/admin/config.yml`, which is exactly where Sveltia's path resolution lands
  from `/admin` (verified against the bundle's own code, not the docs).
- **The inline script is gone from `index.html`** — dead weight that never
  ran, and misleading about where the config lives. The page keeps the
  pinned loader, the print styling, and `noindex`.

## 🧪 Verified

- Local browser probe (Playwright chromium against dev): `/admin` boots
  Sveltia past config to the sign-in screen, which offers **"Sign In Using
  Access Token"** — the PAT path, no OAuth app.
- `admin.spec.ts` re-locked: the page serves pinned and unlisted; **the new
  test fetches `/admin/config.yml`** and pins it to this repo's `main` and
  the two editable JSON paths; the rewrite still resolves in a browser.
  (The old `window.SVELTIA_CMS_CONFIG` assertion is gone with the script it
  checked.)
- `npx tsc --noEmit`, `npm run lint`, `npm run lint:css` — clean; full suite
  `npm test` — **121 passed, 7 skipped** across all four projects.

## 🔁 Built on

`changelogs/2026-11-07_the-hidden-door.md` (acec6e8): the portal itself.
This change makes it actually open.
