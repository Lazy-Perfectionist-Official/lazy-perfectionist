---
title: 2026-11-04 - The writing plate and the whole name
description: The Medium feed becomes Plate 03, printed like the shop with a date and a Read action and synced from the RSS feed by a new script; the hero crop is re-anchored so the print's name stays whole on tall phones, where the cover crop was cutting its last glyph. Elsewhere moves to Plate 04 and the masthead becomes four in-page anchors.
commit: pending
author: Samuel Lee
date: 2026-11-04
category: 📝 Content
impact: Medium
---

# 📅 2026-11-04 - The Writing Plate and the Whole Name

**Author**: Samuel Lee
**Category**: 📝 Content

## 🎯 Overview

Request, verbatim: *"Shop now looks nice! next, I want you to refine the
hero and have medium posts work like shops too, e.g. Read..."*

Two changes: the fold's crop now keeps the print's name whole on tall
phones, and the Medium feed is printed as **Plate 03 / Writing** — the
shop's grid and hairlines, the date where the shop puts its price, and
`Read ↗` where it puts `Get ↗` — synced from Medium's RSS feed and
committed. Elsewhere becomes Plate 04.

## 🖨 The fold: the name stays whole

The hero is `object-cover` on a 3:4 print, so any viewport taller than
3:4 scales the poster by height and trims the sides. Phone viewports are
that tall: at 412x915 the print is drawn 561.75px wide for a 412px
screen, so only 1320 of its 1800px survive the crop, and the horizontal
anchor decides which 1320. The old 50% anchor kept the left side and cut
the end of "Perfectionist" on tall phones. The first fix, 100%, kept the
print's right edge but at 412x915 started the crop at the print's 480th
pixel — past the "P", whose stem begins around 456 — and the name read
"erfectionist". **90%** is the anchor that survives both ends: at 412
the crop starts at 432, leaving ~8px of air before the P's stem, and
ends at 1752, leaving ~15px after the name's last stroke at 1703. It
holds at 360, 375, 390, 412 and 430 wide; the 40% vertical anchor is
untouched.

The horizontal anchor has no effect wherever the print is not trimmed
sideways — every landscape screen and tablets in portrait draw it at
exactly the viewport width — so those crops are unchanged. At 375x667
the drawn width is 375.75px, so the crop shifts by 0.075px between 100%
and 90%: visually identical, not byte-for-byte. Verified
`section.bottom === innerHeight` at 1440x900, 1024x768, 375x667,
390x844, 412x915 and 430x932.

## ✍️ The writing plate

**`scripts/sync-medium.mjs`** (`npm run sync:medium`) reads
`https://medium.com/feed/@lazyperfectist` with plain `fetch` — no
browser, no API key: the RSS feed is public while the post pages sit
behind Cloudflare. It writes `src/lib/medium-posts.json`:

| Field | Source |
|---|---|
| `slug` | slugified title, for keys and testids |
| `title` | item title (CDATA decoded) |
| `excerpt` | the post's own opening sentences, added until they read ~110 characters (hard cap 220 — the feed has no summary field) |
| `date` | `pubDate` as `YYYY-MM-DD` |
| `url` | the item link with the RSS query string stripped |

The row mirrors the print's catalog: mono index in the margin, Bodoni
title and Inter excerpt in the content column, the date in the mono
column where the shop puts its price, `Read ↗` beneath it. Its accessible
name is `"<title> — read on Medium"`, matching the release rows' and the
shop rows' pattern. The plate's own margin link, **All posts ↗**, opens
the Medium profile. The section is text-only: this post carries no
images in the feed, so none were invented or synced.

**Plates renumber** — Singles 01, Shop 02, Writing 03, Elsewhere 04 — and
the masthead is now four in-page anchors: Music, Shop, Writing,
Elsewhere. Spotify leaves the nav (it remains in the announcement bar and
in Elsewhere): a fifth item wrapped to a second line at 375px, which
would have changed the measured 166px phone chrome the hero's height
subtracts.

## ✅ Verification

- `npx tsc --noEmit`, `npm run lint`, `npm run lint:css` — clean.
- `npm run test:pipeline` — **39 passed, 0 failed** (3 skipped) across
  chromium, firefox and webkit desktop.
- `npm run test:mobile` — **14 passed, 0 failed** at 375x667.
- New tests: every post in `medium-posts.json` renders with its synced
  URL, `target="_blank"`, accessible name and excerpt; All posts points
  at the profile; nav Writing scrolls the plate into view.
- Browser probes: the chrome still measures 166px on phones (36.5px
  announcement + 129.5px masthead) and 131px from md up — unchanged —
  `scrollWidth - innerWidth = 0` at 1440, 768, 412 and 375, zero
  console/page errors, and the fold ends on the viewport bottom at all
  six sizes above.
- Screenshots at device pixel ratio 2-3: the name is whole with air at
  both ends at 360x800, 375x667, 390x844, 412x915 and 430x932. 412x915
  is the tightest crop and is what ruled out the 100% anchor.
- A second `npm run sync:medium` reports `writing unchanged (1 post)`.
- Writing plate screenshots reviewed at 1440, 768 and 375.

## 📝 Notes

- The RSS feed carries the newest posts only, so the plate shows what the
  feed shows. Re-run `npm run sync:medium` and commit after publishing.
- The row links to the feed item's own URL with the RSS tracking query
  stripped. Medium serves the feed with 200 but puts post pages behind a
  Cloudflare challenge (`curl` and headless browsers get 403), so the
  link is taken from the feed rather than confirmed by a status code.
- The fold still has no visible label over the print: the whole screen is
  the Spotify link and the announcement bar is the explicit one. Adding
  a printed action line at the fold's foot is a deliberate design decision
  left for a later pass.
