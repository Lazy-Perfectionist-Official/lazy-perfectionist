---
title: 2026-11-07 - The fold goes to the artist
description: Clicking the poster now opens the Spotify artist page instead of the LUSG track, so the fold lands on the whole catalog rather than the current single. The ember stamp says "Listen on Spotify".
commit: pending
author: Samuel Lee
date: 2026-11-07
category: 🎨 Design
impact: Poster hero link
---

# 📅 2026-11-07 - The Fold Goes to the Artist

**Author**: Samuel Lee
**Category**: 🎨 Design
**Impact**: Poster hero link

## 🎯 Overview

The fold was wired to `ANNOUNCEMENT.href` — the LUSG track — because the
bellyband's news was the new single. The print is the band, though, not
one release: clicking it now opens the **Spotify artist page**
(`LINKS.spotifyArtist`), the same destination as the Releases plate's
hand-off.

- The ember stamp reads **"Listen on Spotify ↗"** instead of "Listen to
  LUSG", so the visible label no longer promises one track.
- The accessible name starts with the stamp's text — "Listen on Spotify —
  Lazy Perfectionist" — which keeps voice control able to say what it
  sees.
- The bellyband is untouched: it still announces the single and still
  links to the LUSG track, which is what its copy says.

## 🧪 Verified

- The hero-link test now asserts the artist URL and the new stamp and
  accessible name (the bellyband's own track link is still asserted).
- Ran in a clean worktree off `main`: hero-link and discography specs,
  chromium and mobile — **12 passed**; `tsc --noEmit` and `next lint`
  clean.
