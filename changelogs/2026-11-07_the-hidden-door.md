---
title: 2026-11-07 - The hidden door
description: /admin opens — a static Sveltia CMS page that signs in with GitHub, edits the catalog's JSON, and lets the commit redeploy the site; the curated shop copy moves from the sync to the render so edits go live without a local run.
commit: pending
author: Samuel Lee
date: 2026-11-07
category: 🔧 Infrastructure
impact: New /admin route, content architecture, shop sync
---

# 📅 2026-11-07 - The Hidden Door

**Author**: Samuel Lee
**Category**: 🔧 Infrastructure
**Impact**: New /admin route, content architecture, shop sync

## 🎯 Overview

*"with this architecture, are we able to use an admin portal?"* — yes, one
kind: a git-based admin. The site stays static with zero public client JS;
the admin is a separate static page whose only authority is GitHub.

- **/admin is Sveltia CMS.** One static page in `public/admin/` (pinned
  `@sveltia/cms@0.261.0`, jsDelivr), rewritten onto the clean URL by
  `next.config.ts`. It is `noindex` (robots.txt already disallowed
  `/admin/`), and the public pages never load a byte of it. Sign in with
  the repo's GitHub account and a fine-grained personal access token
  (Contents read/write on this repo); save, and the commit lands on main,
  where Vercel builds it. No server of ours, no user table, no login
  surface to defend.
- **The copy moved to where the CMS can reach it.** The announcement, the
  footer liner note and the singles now live in `src/lib/content.json`
  (re-exported typed by `site.ts`; the three per-track Spotify constants
  folded in — the fold's stamp links through `ANNOUNCEMENT.href` now, so
  label and link still live together). `shop-copy.json` restructures from
  a slug map to `{summaries: [{slug, summary}]}` for the same reason.
- **Curation applies at render, not at sync.** New `src/lib/shop.ts`
  merges `shop-copy.json` onto the synced listing for the home plate and
  the /shop screen — so a summary saved in the admin goes live on the
  next build. The sync returns to being an honest mirror: it writes
  Ko-fi's raw listing text (`npm run sync:shop` re-ran to un-bake the
  five summaries) and still warns when a curated summary outlives its
  product.

## 🧪 Verified

- New `tests/e2e/admin.spec.ts` (×4 projects): /admin serves, pinned,
  unlisted, aimed at this repo's main branch, and the rewrite resolves
  in a real browser with the config script having run.
- `home.spec.ts` now expects the curated summary (the merge
  `summaryOf`), in both the mirror test and the /shop search test.
- `npx tsc --noEmit`, `npm run lint`, `npm run lint:css` — clean; full
  suite `npm test` — **117 passed, 7 skipped** across all four projects.

## 🔁 Built on

`changelogs/2026-11-07_the-catalog-speaks.md` (54e4abc): the curated
copy. This change makes it editable.
