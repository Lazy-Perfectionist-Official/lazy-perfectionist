---
title: 2026-11-03 - Release rows announce their action: concise accessible names
description: The editorial rails rebuilt the catalog rows as whole-row links, but left the visible "Listen" label aria-hidden. With the title, description and year all inside the anchor, each row's accessible name was a run-on ("LUSG The bedroom at full scale — strings and synths stacked to the ceiling. 2026") that never said what the link does or where it goes. Each row now carries aria-label="<title> — listen on Spotify", and the e2e suite asserts it.
commit: pending
author: Samuel Lee
date: 2026-11-03
category: ♿ Accessibility
impact: Low
---

# 📅 2026-11-03 - Release Rows Announce Their Action: Concise Accessible Names

**Author**: Samuel Lee
**Category**: ♿ Accessibility

## 🎯 Overview

The 11-03 editorial revamp turned each catalog row into a single
full-width link with the ghost index and the "Listen" label marked
`aria-hidden` — correct for the visual design, but it left the anchor's
computed name as every other piece of text inside it: title,
description, year. A screen reader announced a paragraph ending in a
year, with no verb and no destination, on the page's only listen action.

## ✅ What changed

- **`Releases.tsx`**: each release row link gains
  `aria-label={"<title> — listen on Spotify"}`. All three rows point at
  verified Spotify track URLs (`src/lib/site.ts`), so the label is true
  for every row. The visible "Listen ↗" stays decorative.
- **`tests/e2e/home.spec.ts`**: the release-rows test now asserts
  `toHaveAccessibleName('<title> — listen on Spotify')` per row, so the
  guarantee cannot silently regress. Row ids and titles are paired in
  one `RELEASE_ROWS` constant.

Deliberately unchanged: the visible description stays inside the link
(sighted readers keep the prose; the row's hover treatment depends on
it), the hrefs/targets, and the announcement bar and fold links, whose
labels already state their destination.

## 🔬 Verification

- `npm run lint` and `npm run lint:css` — clean.
- `npm run test:pipeline` — cross-browser desktop, including the new
  accessible-name assertion.
- `npm run test:mobile` — 375×667 project, same assertion.

## 📝 Notes

- Trade-off, deliberate: an `aria-label` overrides the inner text, so
  screen-reader users no longer hear the one-line description in the
  link name. The name now carries what the link *does*; the prose stays
  available as visible content.
- Observation for the record (not changed): the revamp changelog's
  Verification block cites 20 passed / 7 skipped and 7 passed / 2
  skipped, which matched the pre-poster suite; on the final tree the
  suite is 24 passed / 3 skipped (desktop) and 9 passed (mobile). The
  counts in that changelog are stale, not the suite.
