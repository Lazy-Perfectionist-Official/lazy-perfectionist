---
title: 2026-11-07 - The debut carries the only line
description: The description texts under the songs are swept off the tracklist — rows print index, title, year and Listen; only Orbit keeps a line, "The debut single."
commit: pending
author: Samuel Lee
date: 2026-11-07
category: 📝 Content
impact: Releases plate + /music screen, home and catalog
---

# 📅 2026-11-07 - The Debut Carries the Only Line

**Author**: Samuel Lee
**Category**: 📝 Content
**Impact**: Releases plate + /music screen, home and catalog

## 🎯 Overview

The three singles each carried a one-line description under the title. They
are gone: a release row now prints exactly its catalog index, title, year
and the Listen label. The one line the catalog keeps is Orbit's — **"The
debut single."** — so the tracklist says what it needs to and stops
explaining itself.

- **`src/lib/content.json`** — `description` removed from LUSG and
  Cyclothymia; Orbit's tightened to "The debut single."
- **`Release.description` is now optional** (`site.ts`) and the row renders
  the line only when it exists (`Releases.tsx`) — both the home plate and
  the `/music` screen share the row, so both went quiet together.
- **`/music` search still reads descriptions** when present (`??
  ""`), and its placeholder and page description no longer promise "the
  story of each."
- **The /admin form follows**: the description field is `required: false`
  and labeled optional in `public/admin/config.yml`, so saving a single
  without a line from the CMS works instead of being blocked.

## 🧪 Verified

- New test in `home.spec.ts` ("the tracklist is titles and years: only the
  debut carries a line"): Orbit's debut line is visible; the LUSG and
  Cyclothymia rows' innerText is exactly `01 LUSG 2026 LISTEN ↗` /
  `02 Cyclothymia 2026 LISTEN ↗` — whitespace-collapsed, so any stray line
  fails it.
- `npx tsc --noEmit`, `npm run lint`, `npm run lint:css` — clean; full
  suite `npm test` — **125 passed, 7 skipped** across all four projects.

## 🔁 Built on

`changelogs/2026-11-07_say-it-plain.md` (d2acaae): the deslop pass that
wrote the lines this change removes.
