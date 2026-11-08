---
title: 2026-11-08 - The phone folds its masthead into a menu
description: The five nav items fold into a native MENU disclosure below md, dropping over the fold on the sheet's paper, and writing excerpts print as one preview line with an ellipsis — the whole excerpt stays on Medium.
commit: pending
author: Samuel Lee
date: 2026-11-08
category: 🎨 Design
impact: All screens on phones
---

# 📅 2026-11-08 - The Phone Folds Its Masthead Into a Menu

**Author**: Samuel Lee
**Category**: 🎨 Design
**Impact**: All screens on phones

## 🎯 Overview

Five nav items in a row on a 393px sheet left each one as small as
fine print, and a writing excerpt ran four or five lines beside a
title — the row read as a paragraph, not as an index entry. The phone
now prints a MENU in the masthead and drops the items over the fold;
the writing rows print one preview line of the excerpt.

## 🧭 What changed

**The phone masthead.**

- Below `md`, the wordmark and a `MENU` control share one line; the
  five items are no longer set as a row.
- The menu is a native `<details>` disclosure — no framework JS — and
  the panel drops over the fold on the page's own paper, one item per
  ruled line with a fingertip-sized tap target.
- The mark is a hairline cross that gives up its upright when open,
  so the control reads `+` when closed and `−` when open.
- One line of inline script closes the menu after a choice; a
  same-document jump would otherwise leave the panel hanging over the
  plate it just scrolled to.
- From `md` the masthead is exactly as it was: the row of tracked caps
  for tablets, landscape phones and desktops.

**The writing rows.**

- The excerpt is clamped to a single line on phones and ends in an
  ellipsis, e.g. "Hi everyone! I released Orbit, the…" — the row is an
  index entry and the whole excerpt is on Medium.
- From `md` the full excerpt still prints, so the wide sheet reads as
  before.

## ✅ Verification

- Full suite on a production build: **209 passed, 7 skipped, 0 failed**
  across Chromium, Firefox, WebKit and the mobile project.
- New tests: the phone folds the nav into a visible menu (four widths,
  no sideways scroll, five items printed, choosing one closes it); the
  writing excerpt holds one line at 320 and 393 and stays whole at
  1920.
- The landscape masthead test now reads the inline row explicitly, and
  the discography nav test opens the menu when it is folded.
- `tsc --noEmit`, `next lint`, `stylelint` clean.
- Screenshots of the closed and open menu at 393×852 in WebKit and
  Chromium; the desktop masthead is unchanged at 1920.

## 📝 Notes

- The five links are printed twice in the markup — once for the menu,
  once for the row — because a closed `<details>` hides its content
  beyond CSS's reach. Exactly one list is ever displayed, so the
  accessibility tree and role queries still see five links, not ten.
- The phone nav no longer needs the fluid clamp added in `d602902`;
  the menu items set at 12px at every narrow width.
