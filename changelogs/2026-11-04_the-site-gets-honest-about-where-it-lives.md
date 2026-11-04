---
title: 2026-11-04 - The site gets honest about where it lives
description: Canonicals and the sitemap now come from the deploy environment instead of a parked domain, a 1200x630 share card replaces the square cover, the shop's one broken summary gets a curated override, the writing sync archives instead of overwrites, the fold says Listen, and the announcement copy moves into site.ts.
commit: pending
author: Samuel Lee
date: 2026-11-04
category: 🧹 Hygiene / Truth
impact: Metadata, sharing, content
---

# 📅 2026-11-04 - The Site Gets Honest About Where It Lives

**Author**: Samuel Lee
**Category**: 🧹 Hygiene / Truth

## 🎯 Overview

Six fixes from a review of what was wrong or aging on the page rather than
what was missing: the canonical host pointed at a domain that is for sale,
the share card was cropped to a square, one shop row carried a scraping
typo, the writing sync could silently drop posts, the fold never said what
it does, and the announcement copy lived in a component instead of the
site's data.

## 🔍 The canonical host, and a sitemap

`metadataBase` used to fall back to `https://lazyperfectionist.com` — which
is parked and for sale, so every canonical, `og:url` and absolute
`og:image` URL sent crawlers to a sales page. It now comes only from
`NEXT_PUBLIC_SITE_URL`; until that is set at deploy, no canonical is
emitted at all, and `src/app/sitemap.ts` serves an empty `<urlset>` rather
than a URL the site does not own. One env var turns both on correctly.
`public/robots.txt` no longer names the domain either.

## 📣 The share card

The social image was the 1400×1400 LUSG cover, which every
`summary_large_image` surface crops to 1.91:1 — the name went off the
edge. `public/assets/img/og-card.png` (1200×630, 2400×1260 at 2x, 90KB) is
a proof of the site's own cover: paper, Bodoni wordmark, the three
releases, and the ember bellyband with `Listen ↗`. It is a static asset,
not generated at request time; regenerate it from the same HTML if the
catalog changes. `twitter.images` is now explicit instead of relying on
the Open Graph fallback.

## 🛍 The listing's own voice

The shop sync scrapes Ko-fi's first description line verbatim, which put
*"Comes in gp and pdf."* on the Orbit Tabs row. `src/lib/shop-copy.json`
maps a product slug to a replacement summary; the sync applies it when
writing the data file, so `kofi-shop.json` stays the single source the
page and the tests both read. An override whose product was renamed warns
instead of rotting. Only the broken row is curated — the other four keep
the artist's own wording.

## 🗄 The writing archive

`npm run sync:medium` replaced the file with the feed's newest window, so
a post that fell out of the feed disappeared from the plate. It now
merges by URL: feed entries always win (so title and date edits land) and
older posts stay. The one-off count-drop warning went with the risk it
guarded.

## 🔊 The fold says listen

The print is the link but never said so. It now carries the same ember
stamp as the bellyband at its foot — `Listen to LUSG ↗`, mono caps, ink
on ember — inside the anchor, aligned to the page gutter. The anchor's
accessible name starts with that visible text (`Listen to LUSG on
Spotify`), so voice control can say what it sees. The stamp is absolutely
positioned: the measured 166px/131px chrome and the fold's height are
untouched.

## 📰 The news in one place

`ANNOUNCEMENT` in `src/lib/site.ts` holds the bellyband's label and href
together, so the next release is a data edit and the copy cannot outlive
the link it points at.

## ✅ Verification

- `npx tsc --noEmit`, `npm run lint`, `npm run lint:css` — clean.
- `npm run test:pipeline` — **45 passed, 0 failed** (3 skipped).
- `npm run test:mobile` — **16 passed, 0 failed** at 375x667.
- New assertions: the hero's accessible name is exactly `Listen to LUSG
  on Spotify` and the visible stamp reads `Listen to LUSG`; `/sitemap.xml`
  answers 200 with a `<urlset>`.
- Dev probes: no `<link rel="canonical">` while the env var is unset;
  `og:image` and `twitter:image` both resolve to `og-card.png` at
  1200×630; `sitemap.xml` is an empty urlset.
- `npm run sync:medium` reports `writing unchanged (1 post)`; a second
  `npm run sync:shop` reports the listing unchanged, override included.
- Fold screenshots at 1440, 768 and 375: the stamp is legible on paper
  and on the print's warm band, and the fold still ends exactly at the
  viewport bottom.

## 📝 Notes

- Set `NEXT_PUBLIC_SITE_URL` in the deploy environment (e.g.
  `https://example.com`) to turn on the canonical and the sitemap; nothing
  else needs changing.
- The share card is a committed binary. If the wordmark, catalog or the
  ember changes, re-render it rather than editing the PNG.
- Instagram is still linked as `lazyperfectionist` while the Ko-fi profile
  lists `lazyperfectionist_official` — worth confirming which is
  canonical before the next push.
