---
title: 2026-11-07 - The tracklist points at the EP
description: LUSG and Cyclothymia get their line back — "Included on the upcoming EP." — so the two new singles say where they live; the debut keeps its own line.
commit: pending
author: Samuel Lee
date: 2026-11-07
category: 📝 Content
impact: Releases plate + /music screen
---

# 📅 2026-11-07 - The Tracklist Points at the EP

**Author**: Samuel Lee
**Category**: 📝 Content
**Impact**: Releases plate + /music screen

## 🎯 Overview

One line per song, back on the tracklist — but catalog facts this time,
not flavor. LUSG and Cyclothymia both print **"Included on the upcoming
EP."** and Orbit keeps **"The debut single."** The descriptions removed an
hour ago were atmosphere; these two lines are where the music is heading.

- **`src/lib/content.json`** — the EP line under both new singles; Orbit
  untouched.
- **The test locks the shape**: each row's innerText is exactly index,
  title, one line, year, LISTEN — so a second line or a stray word fails.
- **`/music` search placeholder** says "Title, description or year…"
  again, honestly, because the lines are searchable copy once more.

## 🧪 Verified

- `npm test` — **125 passed, 7 skipped** (the tracklist test rewritten,
  still one test, exact strings for all three rows).
- `npx tsc --noEmit`, `npm run lint`, `npm run lint:css` — clean.

## 🔁 Built on

`changelogs/2026-11-07_the-debut-carries-the-only-line.md` (956aafc): the
sweep that made the line optional — this change uses the room it left.
