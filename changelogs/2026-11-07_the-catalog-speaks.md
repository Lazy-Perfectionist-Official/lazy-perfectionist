---
title: 2026-11-07 - The catalog speaks
description: The shop rows stop speaking raw Ko-fi listing text, the back cover gains a liner note answering who and where, and the three singles become MusicRecording JSON-LD — a content pass over everything below the fold.
commit: pending
author: Samuel Lee
date: 2026-11-07
category: 📝 Content
impact: Shop plate, footer, head metadata
---

# 📅 2026-11-07 - The Catalog Speaks

**Author**: Samuel Lee
**Category**: 📝 Content
**Impact**: Shop plate, footer, head metadata

## 🎯 Overview

*"for the site's contents, are there any ways we can make it better?"* — a
survey of the plates below the fold, then the three fixes that survived it.
(Four were proposed; the writing plate's greeting strip and honest foot-row
labels were declined for now.)

- **Shop copy, curated.** Only one of five products used `shop-copy.json`;
  the rest printed raw Ko-fi listing text — two of them on the home page,
  and copy is all that distinguishes the three Orbit products, which share
  one cover image. Four overrides now speak in the catalog's voice, each
  grounded in what the products actually contain (read off the live Ko-fi
  pages): Cyclothymia's bundle is jam tracks + a Neural DSP preset + the
  first demo; the stems are seven buses of WAVs; the jam track is the
  original mix with the lead guitar taken out. Applied by running the sync
  (`npm run sync:shop`), not by hand — the diff to `kofi-shop.json` is the
  four summaries and nothing else.
- **A liner note on the back cover.** The site told a stranger *what*
  (singles, shop, notes) but never *who or where* — "bedroom instrumental
  rock from Hong Kong" lived only in metadata. One Courier line now sits
  above the colophon on the ink footer, where a record's liner notes go:
  no new plate, no nav, sentence case so it reads as notes, not a label.
- **The catalog, machine-readable.** The home page's JSON-LD grows from a
  lone `MusicGroup` to an `@graph` with each single as a `MusicRecording`
  (name, year, Spotify URL, `byArtist`). The `@id`s are the Spotify pages —
  stable, and they don't wait on the site's own still-unset domain.

## 🧪 Verified

- New locks in `home.spec.ts`: the liner note is visible and set above the
  © line; the `@graph` carries the group and the three singles, every
  recording pointing at a Spotify track through the artist's `@id`.
- Shop rows still assert against the synced data itself, so the new
  summaries are covered by the existing mirror tests.
- `npx tsc --noEmit`, `npm run lint`, `npm run lint:css` — clean; full
  home spec across all four projects, `npm run test:pipeline`,
  `npm run test:mobile` — green.

## 🔁 Built on

`changelogs/2026-11-07_the-wind-slows-and-lengthens.md` (20b67bf): the
fold. This change: everything under it.
