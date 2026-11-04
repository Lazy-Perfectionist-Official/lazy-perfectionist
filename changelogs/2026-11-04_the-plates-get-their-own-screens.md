---
title: 2026-11-04 - The plates get their own screens
description: More no longer hands off to Spotify, Ko-fi or Medium. Each growing plate opens its own screen — /music, /shop, /writing — with the full list, a server-rendered search, a count, and an honest way back.
commit: pending
author: Samuel Lee
date: 2026-11-04
category: ✨ Feature
impact: Navigation
---

# 📅 2026-11-04 - The Plates Get Their Own Screens

**Author**: Samuel Lee
**Category**: ✨ Feature

## 🎯 Overview

Request, verbatim: *"more should go to a different screen in the site that
expands the list and have basic search functions."*

The More row used to be an exit: Spotify's artist page, Ko-fi's shop,
Medium's profile. It now opens a plate of its own inside the site, where
the whole list is printed and can be searched. The outbound hand-off
didn't disappear — it moved to the foot of each screen, where it belongs
once you've seen everything.

## 🖨️ Three screens, one plate template

`/music` (Singles), `/shop` (Shop) and `/writing` (Writing) share
`CatalogPage`: the announcement bar and masthead, then the plate header on
the same print grid as the cover — plate number, display title, italic
lede, count in the right margin — then the list, then the external row
(Spotify / Ko-fi / Medium), then the ink back cover.

The count is honest about what is showing: `5 items` unfiltered, `3 of 5`
once a query is in play.

## 🔎 Search without a line of client JS

The search is a plain `<form role="search" method="get">` submitting `q`.
The page component awaits `searchParams`, lowercases the needle and
filters the synced data on the server:

- `/music` matches title, description and year.
- `/shop` matches name and summary.
- `/writing` matches title and excerpt.

Every result is a URL you can share, the back button does what it says,
and there is still no script on the page beyond the Next runtime. A miss
prints `Nothing matches “…”` with a **Clear search** link back to the
unfiltered screen; both links and the search box are keyboard-reachable
with the same rust focus line as the rest of the paper.

## ✂️ The cover prints a page, not the book

Shop and Writing now print three rows on the cover with the total in the
margin; Releases prints all three (there are only three) and keeps its
More row so the search is one click from the fold. The plates are still
the catalog — nothing is hidden behind a hover or a click that the count
doesn't admit to.

The masthead nav points at `/#music` and friends, so it works from the
screens too: same-document jump on the cover, home-and-then-there from a
plate. The wordmark goes to the cover.

## 🗺️ Metadata follows the routes

`SITE_URL` (from `NEXT_PUBLIC_SITE_URL`) moved into `src/lib/site.ts` so
the layout, each screen's canonical, and the sitemap read one value. The
sitemap now lists `/`, `/music`, `/shop`, `/writing` — and still emits an
empty `<urlset>` when no host is configured rather than guessing.

## ✅ Verification

- `npx tsc --noEmit`, `npm run lint` — clean.
- `npm run test:pipeline` — **51 passed, 0 failed** (3 skipped
  mobile-only), chromium, firefox and webkit at 1920x1080.
- `npm run test:mobile` — **18 passed, 0 failed** at 375x667.
- New tests: the three More rows carry internal hrefs and their full
  accessible names, Elsewhere has none; `/shop` prints all five products,
  `?q=orbit` narrows to three, `?q=zzzz` shows the empty state and a
  working Clear search, `/music` and `/writing` print their own lists.
- Screenshots at 1440 and 375 for all three screens plus the search and
  empty states: the grid, the hairlines and the footer hold.

## 🔁 Note on freshness

The screens read the same synced JSON as the cover. A change on Ko-fi or
Medium reaches them when `npm run sync:shop` / `npm run sync:medium` runs
and the result is deployed — not on pageload. That is the cost of the
static build, and the reason the pages load as fast as they do.
