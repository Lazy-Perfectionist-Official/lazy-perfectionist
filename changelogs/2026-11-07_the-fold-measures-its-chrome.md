---
title: 2026-11-07 - The fold measures its chrome
description: The hero no longer subtracts a hard-coded 166px / 131px; it measures the announcement bar and masthead, so a nav that wraps to a second row still leaves the print flush with the bottom of the screen.
commit: pending
author: Samuel Lee
date: 2026-11-07
category: 🐛 Fix
impact: Poster hero
---

# 📅 2026-11-07 - The Fold Measures Its Chrome

**Author**: Samuel Lee
**Category**: 🐛 Fix
**Impact**: Poster hero

## 🎯 Overview

The fold's height was `100svh` minus a fixed number: 166px on phones,
131px from `md` up — the measured height of the announcement bar plus the
masthead. That number only holds while the nav fits on one line. Adding
the Discography item wraps it to two rows on a phone, and the print then
stopped 44px short of the bottom of the screen.

The hero now measures the chrome itself, inside the script it already
ships for the lens:

- `hero.getBoundingClientRect().top` is exactly what sits above the fold —
  skip link, announcement bar, masthead — whatever their height.
- The value is published as `--chrome-h` from a style element of our own,
  re-taken on resize and once the fonts settle. Writing a `style`
  attribute onto markup React hydrates is a mismatch; a root variable
  from a separate `<style>` is not.
- The class still carries the old numbers as the no-script fallback, so
  the fold is right on first paint and exact once the script runs.

## 🧪 Verified

- New test: the fold meets the viewport bottom at 320, 375, 768 and
  1024px — 320 being a width where even the four-item nav wrapped.
- Full suite — chromium and mobile **76 passed**, firefox and webkit
  **77 passed**; `next build` and `next lint` clean.
