---
title: 2026-11-08 - The phone is set in its own size
description: The phone edition steps up a size — an 11px masthead, 44px plate titles, 16px body copy, 11px rows and chips, larger tap targets — so the narrow reading is set for the narrow screen instead of being the desktop page shrunk down.
commit: pending
author: Samuel Lee
date: 2026-11-08
category: 🎨 Design
impact: All screens on phones
---

# 📅 2026-11-08 - The Phone Is Set in Its Own Size

**Author**: Samuel Lee
**Category**: 🎨 Design
**Impact**: All screens on phones

## 🎯 Overview

The phone was reading as the desktop page at 40% — the same voices,
the same fine print, only smaller. This pass gives the narrow reading
its own size: the print's small caps come up off the floor, the display
type gains a step, and the body copy reaches a real reading size.

## 🔠 What changed

**The masthead.**

- The wordmark is 24px on phones (was 20), so the page opens with a
  masthead rather than a caption.
- The nav sets at 11px by 393 (was 10), fluid down to 8.5px at 320 —
  five items still hold one line, including in WebKit where a classic
  scrollbar takes 13px off the measure.
- The announcement bar sets at 11px on phones (was 10).

**The plates.**

- Plate titles are 44px on phones (was 40) and the italic lede 22px
  (was 20) — the plates now read as chapters of one issue.
- Row body copy is 16px (was 15). Descriptions and excerpts were the
  only prose on the page and were set below the phone's reading size.
- Row indices, years, prices, and the `LISTEN / GET / READ` cues are
  11px (was 10), with the foot rows, year-card counts and Elsewhere
  categories matching.
- Tag chips are 11px with 8px vertical padding (was 10px / 4px), so
  they read as controls and clear a fingertip.

**The fold.**

- The Spotify stamp is 12px with a wider padding box — the fold's only
  call to action should look pressable.
- The footer's liner note is 12px at every size.

**The search line** (shipped separately in `1b89816`): `SEARCH` and
`FIND ↗` share the first line and the field takes the full measure
beneath it, so no placeholder is cut mid-word.

## ✅ Verification

- Full suite on a production build: **205 passed, 7 skipped, 0 failed**
  across Chromium, Firefox, WebKit and the mobile project.
- New test: the phone's fine print is measured at 393×852 — nav, row
  meta and the search field all meet their floors.
- The nav holds one line at 320, 340, 360, 375, 390, 393, 430, 640 and
  700 in both Chromium and WebKit, measured on the live build.
- `tsc --noEmit`, `next lint`, `stylelint` clean.
- Screenshots at 393×852, 402×874, 430×932 and 852×393.

## 📝 Notes

- The fold's crop is art, not layout: on a tall phone the 3:4 plate is
  cover-cropped by the fold (about 26% of its width at 852px tall). A
  phone-specific strike would need the source photograph to re-compose,
  and the generator's source is no longer on disk. Any further change
  there is a decision about the print, not a fix.
