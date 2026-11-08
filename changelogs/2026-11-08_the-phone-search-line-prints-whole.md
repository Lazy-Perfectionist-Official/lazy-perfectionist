---
title: 2026-11-08 - The phone's search line prints whole, and the masthead holds sideways
description: The phone search field takes the full measure so its placeholder is no longer cut mid-word, and the masthead's one-row layout now waits for lg, so an iPhone on its side no longer breaks the wordmark and nav onto second lines.
commit: pending
author: Samuel Lee
date: 2026-11-08
category: 🎨 Design
impact: Plate screens and masthead, phones and landscape phones
---

# 📅 2026-11-08 - The Phone's Search Line Prints Whole

**Author**: Samuel Lee
**Category**: 🎨 Design
**Impact**: Plate screens and masthead, phones and landscape phones

## 🎯 Overview

Two defects an iPhone 16 found that the earlier phone pass was measuring
past: a placeholder that ended mid-word, and a masthead that fell apart
the moment the phone was turned on its side.

**The search line.**

- On a 393px phone the field shared its row with `FIND ↗`, leaving it
  about 250px — enough for `"Title, description or yea"` and no more.
  Browsers clip a placeholder rather than ellipsizing it, so the cut
  read as broken type.
- The form is now a two-line grid below `md`: `SEARCH` and `FIND ↗`
  share the first line, and the field takes the whole measure beneath it
  (361px at 393). From `md` up it is the same single row as before.
- All four placeholders now print in full — `"Title, description or
  year…"` on `/music` and `/discography` is the longest.

**The masthead, sideways.**

- The row layout switched on at `md` (768px). An iPhone 16 on its side is
  852×393: wide enough for `md`, far too short for the desktop masthead.
  There the wordmark broke onto two lines and `ELSEWHERE` orphaned onto a
  second nav row — 200px of chrome over a 393px-tall screen.
- The row layout now waits for `lg`. Between `md` and `lg` the masthead
  stacks — wordmark on its line, nav right-aligned beneath it — which is
  a deliberate two-row header rather than a wrapped one.

## ✅ Verification

- `tests/e2e/responsive.spec.ts` gains two tests: the placeholder is
  measured against the field's own client width (canvas, same computed
  font) on all four plate screens at 393×852, and the landscape phone
  holds the wordmark on one line, the nav on one row, with no sideways
  scroll at 852×393.
- Full suite on a production build: **201 passed, 7 skipped, 0 failed**
  across Chromium, Firefox, WebKit and the mobile project.
- `tsc --noEmit`, `next lint` and `stylelint` clean.
- Screenshots at 393×852, 402×874, 430×932 and 852×393 before and after.

## 📝 Notes

- The fold itself is unchanged: on a tall phone the 3:4 plate is still
  cover-cropped by the fold (about 26% of its width at 852px tall), which
  is the print's design, not a layout bug. A phone-specific strike would
  need the source photograph to re-compose; the generator's source is no
  longer on disk.
