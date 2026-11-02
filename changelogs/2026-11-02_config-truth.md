---
title: 2026-11-02 - Config truth: dead /api config stripped, package named for itself
description: vercel.json still described an API surface the stripped rebuild no longer has — cache headers for /api/(.*), a no-op /api self-rewrite, and injection of an unused NEXT_PUBLIC_VERCEL_ENV. src/app holds only globals.css/layout.tsx/page.tsx; grep for "/api/" and NEXT_PUBLIC_VERCEL_ENV across src returns zero. Same dead-reference class as the 10-25 robots trim. Also the package still introduced itself with the scaffold's name (nextjs_tailwind_shadcn_ts) in package.json and both lockfile entries.
commit: pending
author: Samuel Lee
date: 2026-11-02
category: 🧹 Hygiene / Truth
impact: Low
---

# 📅 2026-11-02 - Config Truth: Dead /api Config Stripped, Package Named for Itself

**Author**: Samuel Lee
**Category**: 🧹 Hygiene / Truth

## 🎯 Overview

Two files still described a site that no longer exists. Both were
verified against the live tree before editing; nothing about the deploy
target (region, framework, build commands) was touched — that is the F11
parked-domain decision's surface, not mine.

## ✅ What changed

- **`vercel.json`**: removed the `/api/(.*)` Cache-Control header block,
  the `/api/(.*)` → `/api/$1` rewrite (a no-op by construction — both the
  cache rule and the rewrite pointed at routes that do not exist), and
  the `NEXT_PUBLIC_VERCEL_ENV` env injection (a `NEXT_PUBLIC_*` value is
  exposed to every visitor; nothing in `src/` reads it). Remaining keys
  are the truthful ones: buildCommand, outputDirectory, installCommand,
  framework, regions.
  - Note: Next.js's own `headers()` in `next.config.ts` already sets the
    real caching policy (immutable static assets, daily manifest, prod
    security headers) — the deleted vercel block duplicated that concern
    for a route family that isn't there.
- **`package.json` + `package-lock.json`**: `name` changed from
  `nextjs_tailwind_shadcn_ts` (the scaffold's default) to
  `lazy-perfectionist` in both lockfile locations (root + `packages[""]`),
  keeping `npm ci` consistency.

## 🔬 Verification

- `src/app` contains only `globals.css`, `layout.tsx`, `page.tsx`; `find
  src -type d -name api` → nothing.
- Repo-wide grep for `/api/` and `NEXT_PUBLIC_VERCEL_ENV` across `src/`
  → zero matches (the only `vercel` hits elsewhere are `.gitignore`).
- `jq empty` passes on all three edited JSON files.
- `npm run lint` — see commit log; no source code changed.

## 📝 Notes

- **Not touched, flagged**: `.omc/state/hud-stdin-cache.json` and
  `.omc/state/sessions/*/hud-state.json` are still *tracked* despite
  `.gitignore`'s `.omc/` entry — but their untracking belongs to Studio
  Booking's pending `2d26e48` on `ai-office/2026-10-26`; editing the same
  paths here would set up a conflict with their unmerged commit.
- `deploy-docs.yml` remains dormant for the same reason noted 10-31 — no
  `docs/` directory, repo never pushed; Samuel's future-intent call.
