---
title: 2026-11-04 - Tags on the screens
description: The shop and writing screens now carry tag filters — Tabs, Stems, Jam tracks, Freebies from Ko-fi's categories and the product's own kind, and the real Medium tags on posts. Every filter is a plain URL, still with zero client JS.
commit: pending
author: Samuel Lee
date: 2026-11-04
category: ✨ Feature
impact: Navigation
---

# 📅 2026-11-04 - Tags on the Screens

**Author**: Samuel Lee
**Category**: ✨ Feature

## 🎯 Overview

Request: tag filters on the plate screens, so a visitor can ask for just
the tabs, or just the tracks, instead of reading every row. And can the
tags come from Ko-fi and Medium?

Short answer: from Medium, yes, directly. From Ko-fi, yes — but only
where a category has been assigned, so the sync also derives a kind tag
from each product name to keep the filter useful today.

## 🏷️ Where the tags come from

**Medium.** The RSS feed carries each post's tags as `<category>`
elements — the post synced today has `creative-process`,
`original-music`, `band`, `electric-guitar`, `progressive-rock`. The feed
slugifies them, so the sync restores sentence case ("Creative process")
and writes them onto the post.

**Ko-fi.** The shop page is backed by two JSON endpoints: the public
category list and an item list where each product carries
`ShopCategoryIds`. Plain requests from Node are challenged by Cloudflare,
but the sync already drives a real browser, so it asks the page to fetch
them — using the shop IDs the page itself was initialised with. The
result is the author's own categories: today, one ("Jam tracks") assigned
to one product.

**Derived kinds.** Because that is sparse, every product also gets a tag
for what it is, read from its name: `Tabs`, `Stems`, `Jam track`,
`Freebies`. Native categories come first and a derived tag that says the
same thing is dropped — `Jam tracks` from Ko-fi wins over a derived
`Jam track`, so the shelf is never listed twice.

## 🔗 Filters are links

The tag row sits under the search line: `TAGS — All · Tabs · Freebies ·
Jam tracks · Stems`. Each chip is an `<a href>`, so the whole thing works
without a script and every filter is shareable:

- `/shop?tag=tabs` prints the two tab listings and `2 of 5` in the margin.
- `/writing?tag=creative-process` prints the posts tagged so.
- Search and tag compose: searching inside a tag carries it as a hidden
  field (`/shop?tag=tabs&q=lusg`), and **All** drops the tag while keeping
  the search.
- A miss says `Nothing matches “…”` and **Clear search** returns to the
  tagged shelf rather than throwing the filter away.

The active chip is inverted (ink on paper) rather than only recoloured, so
the state does not depend on telling two browns apart. Chips wrap on
phones; the row keeps the same 16px/24px inset as every other row.

## 🗂️ Data

`kofi-shop.json` products and `medium-posts.json` posts each gain a
`tags: string[]`. The syncs write them; the site only reads them. Adding
a category in Ko-fi or tagging a post on Medium reaches the screen at the
next `npm run sync:shop` / `npm run sync:medium` plus a deploy — the same
freshness rule as the rest of the catalog.

## ✅ Verification

- `npx tsc --noEmit`, `npm run lint` — clean.
- `npm run test:pipeline` — **56 passed, 0 failed** (4 skipped: three
  mobile-only, one WebKit tab-order policy), chromium, firefox and webkit.
- `npm run test:mobile` — **20 passed, 0 failed** at 375x667.
- New test: every synced product carries at least one tag, the feed
  carries tags, a chip filters by URL and sets `aria-current`, search
  preserves the tag, All preserves the search, a tagged miss keeps the
  shelf, and the writing screen filters on a real Medium tag.
- Probed directly: `/shop` = 5 rows and 5 chips; `/shop?tag=tabs` = 2 of
  5; `/writing?tag=creative-process` = 1 of 1. Screenshots at 1440 and 375.
