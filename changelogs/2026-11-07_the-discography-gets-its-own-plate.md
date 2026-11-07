---
title: 2026-11-07 - The discography gets its own plate
description: A fourth plate screen lists every release under the year it belongs to — one separator card per year, with year facets, search and three orders, all server-filtered from the URL.
commit: pending
author: Samuel Lee
date: 2026-11-07
category: 🎨 Design
impact: New /discography screen
---

# 📅 2026-11-07 - The Discography Gets Its Own Plate

**Author**: Samuel Lee
**Category**: 🎨 Design
**Impact**: New `/discography` screen

## 🎯 Overview

The cover's Singles plate lists the catalog as one running tracklist.
`/discography` is the ordered edition of it — every release filed under
the year it came out, with a year card between the groups:

- **Plate 04** on the print's own grid: the year set as a display heading
  in the title column, the release count in the right margin, and the
  rows beneath it numbered inside their year.
- **Year facets** across the top (`?tag=2026`), built from the catalog
  itself rather than a list to maintain.
- **Search** over title, description and year (`?q=…`), keeping the year
  filter it was typed under.
- **Three orders** (`?sort=oldest`, `?sort=title`): newest first is the
  default and stays out of the URL; oldest reverses the years *and* the
  rows inside each, so the list really reads bottom-up.
- **The year leaves the row.** `ReleaseRow` gains `showYear`, off here,
  because the separator above the group already carries it.

`CatalogPage` grew a `tagsLabel` (the facet row says "Year" here, "Tags"
on the shop and writing screens) and an optional `sort` block whose
chips are links like the facets — every control keeps the other
parameters, so a filter, a search and an order compose in the URL.

The screen is reachable from the masthead (every screen), from
`/sitemap.xml`, and the e2e warm-up list.

## 🧪 Verified

- New spec `tests/e2e/discography.spec.ts`: year order, one row per
  release, the count per year, the year missing from the row, search
  narrowing the years, the year facet, oldest reversing years and rows,
  the sort surviving on the facet links, and the masthead link.
- Desktop (1440×900) and phone (375×667) screenshots checked.
- Full suite — chromium and mobile **76 passed**, firefox and webkit
  **77 passed**; `next build` and `next lint` clean.
