---
title: 2026-11-04 - The shop syncs with Ko-fi
description: A native Shop plate on the print page, generated from the public Ko-fi shop by a sync script, plus Medium and Ko-fi in Elsewhere. Ko-fi refuses to be framed and exposes no shop API, so the store is synced from the public shop into the site instead of embedded at runtime — the page stays static with zero client JS.
commit: pending
author: Samuel Lee
date: 2026-11-04
category: 🛍️ Store
impact: Medium
---

# 📅 2026-11-04 - The Shop Syncs with Ko-fi

**Author**: Samuel Lee
**Category**: 🛍️ Store

## 🎯 Overview

Request, verbatim: *"I want the site to also connect to my medium and my
https://ko-fi.com/lazyperfectionist kofi, and embed the kofi into the
website so it's like a site native store which syncs with kofi!"*

The two links are now printed on the page (Elsewhere gains **Medium** and
**Ko-fi**), and the shop is a native **Plate 02** between Singles and
Elsewhere: five rows, one per Ko-fi product, each opening its product page
on Ko-fi. The listing is generated from the live public shop by
`npm run sync:shop` and committed, so the page stays static and the store
still follows Ko-fi.

## 🚫 Why it cannot be iframed

Checked before building:

- The Ko-fi shop answers `X-Frame-Options: SAMEORIGIN` and
  `Content-Security-Policy: frame-ancestors 'self'` — any iframe of it is
  blocked by the browser.
- Ko-fi's "API" is for payment webhooks, not for reading the shop. There is
  no public shop endpoint to query.
- The only official embeds are the tip widgets (Floating Button / Tip
  Panel), which are third-party JavaScript and cover tips, not shop
  products.

So the store is synced rather than embedded: the same public pages a
visitor can open are read once by a script, the products are written into
the site as data and art, and each row hands off to Ko-fi for the actual
transaction. No client JavaScript, no third-party scripts, no dependency
added.

## 🛠️ What was built

**`scripts/sync-kofi-shop.mjs`** (`npm run sync:shop`) — opens the public
shop with Playwright, collects the product links in the order the shop
shows them, and reads each product page's `Product` JSON-LD plus its
pay-what-you-want marker. It writes:

- `src/lib/kofi-shop.json` — slug, name, first-line summary, price label,
  pay-what-you-want flag, product URL, image path.
- `public/assets/img/kofi-shop/kofi-<hash>.<ext>` — the product art,
  content-addressed (sha256 prefix), so identical art is stored once (the
  three Orbit products share one cover) and removed files are cleaned up on
  the next sync. Source images are 480x480; `next/image` serves them at the
  rendered size.

The script writes nothing if the listing is unchanged and fails loudly if
the shop page returns no products, so a Cloudflare challenge can never
silently empty the store. If the listing suddenly gets shorter it warns
before writing — a truncated result is far more often a partial render or
an unpaginated page than a real removal.

**`src/components/Shop.tsx`** — Plate 02, set on the existing print grid:
the cover in the margin column where the tracklist index sits, the Bodoni
product name and Inter summary in the content column, and the mono price
label (`Free +`) plus `Get ↗` in the right column. Each row's accessible
name is `"<product> — pay what you want on Ko-fi"` (or the price, for a
paid item), matching the release rows' pattern.

**Elsewhere (Plate 03)** gains **Medium → Read**
(`https://medium.com/@lazyperfectist`, verified against the account's RSS
feed) and **Ko-fi → Support** (`https://ko-fi.com/lazyperfectionist`). The
old **Store** row is gone — the Shop plate is the store now. The masthead
nav gains **Shop** and the manifest a Shop shortcut; the structured data's
`sameAs` includes Medium and Ko-fi.

## ✅ Verification

- `npx tsc --noEmit`, `npm run lint`, `npm run lint:css` — clean.
- `npm run test:pipeline` — **33 passed, 0 failed** (3 skipped) across
  chromium, firefox and webkit desktop.
- `npm run test:mobile` — **12 passed, 0 failed** at 375x667.
- New tests: every row in `kofi-shop.json` renders with its synced URL,
  `target="_blank"`, accessible name, summary, price label and cover; nav
  Shop scrolls the plate into view; Elsewhere's Medium and Ko-fi links carry
  the verified URLs.
- Browser probe at 1440x900, 768x1024, 375x667: `scrollWidth - innerWidth
  = 0`, every cover loaded from the optimizer at the right width
  (256/384px for a 144px box at DPR 1/2), zero console or page errors.
- The section screenshots at all three widths were reviewed against the
  neighbouring plates: same margin, same hairlines, same hover.

## 📝 Notes

- Run `npm run sync:shop` and commit whenever the shop changes. The sync is
  manual by design: a build must not depend on live scraping of a
  Cloudflare-fronted page.
- The Ko-fi shop lists the artist's Instagram as
  `instagram.com/lazyperfectionist_official`; the site links
  `instagram.com/lazyperfectionist`. Left as-is — out of scope for this
  change, but worth confirming which profile is canonical.
- `npm run build` was not run: `next dev` was live, and this repo forbids a
  production build alongside it. All gates above ran against the dev
  server.
