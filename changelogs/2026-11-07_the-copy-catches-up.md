---
title: 2026-11-07 - The copy catches up with the one line
description: Title, description, keywords, manifest, ledes and the share card now say instrumental rock/metal — no bedroom, no single count, three songs plain. The og-card has a committed generator.
commit: pending
author: Samuel Lee
date: 2026-11-07
category: 📝 Content
impact: Metadata, manifest, singles ledes, share card
---

# 📅 2026-11-07 - The Copy Catches Up with the One Line

**Author**: Samuel Lee
**Category**: 📝 Content
**Impact**: Metadata, manifest, singles ledes, share card

## 🎯 Overview

The footer went to "Instrumental rock/metal from Hong Kong." first;
the rest of the copy now matches it instead of telling a slightly
different story in the tab, the share preview and the singles plate.

- **`src/app/layout.tsx`** — title, description, keywords and the
  `og:image:alt` say instrumental rock/metal; "bedroom rock" leaves the
  keyword list for "instrumental metal"; the declared `og:image` size
  matches the file (2400×1260).
- **The share card is re-struck** with the kicker `INSTRUMENTAL ROCK /
  METAL`. Its source and renderer now live in the repo
  (`scripts/og-card.html`, `scripts/make-og-card.mjs`, `npm run og`),
  so the next release is a one-line edit, not a design pass.
- **`public/manifest.json`** loses "bedroom" from its description.
- **"Three songs, one bedroom." → "Three songs."** on both the cover's
  catalogue plate and `/music`.
- **JSON-LD `genre` is an array** — `["Instrumental Rock",
  "Instrumental Metal"]` — now that the positioning includes metal.

## 🧪 Verified

- `npm run test:functional` — **34 passed, 1 skipped**; `npm run build`
  green; `npm run lint` clean.
- The regenerated card is 2400×1260, matching the metadata it declares.
- Live metadata re-checked after deploy: title, description and alt all
  carry the new line.
