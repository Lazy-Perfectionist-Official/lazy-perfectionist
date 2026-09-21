---
title: 2026-09-21 - First-party Medium thumbnails
description: Journal/blog thumbnails now go through next/image — the browser stops hitting miro.medium.com, killing the _cfuvid third-party cookie (Lighthouse best-practices 74→96) and loading 64px squares instead of 800px images
commit: pending
author: Samuel Lee
category: ⚡ Performance
impact: Medium
date: 2026-09-21
---

# 📅 2026-09-21 - First-Party Medium Thumbnails

**Author**: Samuel Lee
**Category**: ⚡ Performance

## 🎯 Overview

The production Lighthouse lane found a real shipped defect: journal and
blog cards rendered Medium-hosted thumbnails as plain `<img>` tags, so every
visitor's browser hit `miro.medium.com` directly. Cloudflare answers with a
`_cfuvid` third-party cookie — for any returning visitor, Lighthouse
best-practices dropped to **74** (threshold 80) via the third-party-cookies
(weight 5) and inspector-issues audits. As a bonus, 64px squares were
downloading 800px-wide images.

## ⚙️ What changed

- `Journal.tsx` / `BlogPage.tsx`: plain `<img>` → `next/image` with `fill`
  + `sizes`. The Next image optimizer fetches Medium's CDN server-side;
  the browser only ever talks to our origin — same fix for the cookie and
  the payload size in one move.
- Prerequisites verified: `remotePatterns` already allowlists
  miro.medium.com / cdn-images-1.medium.com; `sharp` is traced into the
  standalone build so the optimizer works in production.

## ✅ Verification

- Lighthouse in-sequence best-practices: 74 → **96** (stable across two
  full production runs; the earlier cookie-clearing workaround was removed
  — it was masking a real finding).
- blog page performance 99–100; homepage 94/100/96/100 on the standalone
  production server.
- Visual baselines regenerated for journal/blog cards.

## 🔎 Notes

- The initial attempt to clear the audit browser's cookies via CDP kept
  hitting removed/restricted protocol methods — which forced the better
  question: *why does the homepage have a third-party cookie at all?*
  Fix the site, not the test.
