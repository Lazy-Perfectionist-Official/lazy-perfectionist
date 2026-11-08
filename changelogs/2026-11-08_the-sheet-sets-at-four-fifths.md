---
title: 2026-11-08 - The sheet sets at four fifths
description: Below the ultrawide class of screen the whole page — type, gutters, measures — is set at 80%, the size it was actually being read at under browser zoom; 3440-wide screens and 4K keep the sheet's own size.
commit: pending
author: Samuel Lee
date: 2026-11-08
category: 🎨 Design
impact: Desktop and tablet screens; ultrawides and 4K unchanged
---

# 📅 2026-11-08 - The Sheet Sets at Four Fifths

**Author**: Samuel Lee
**Category**: 🎨 Design
**Impact**: Desktop and tablet screens; ultrawides and 4K unchanged

## 🎯 Overview

Read at 80% browser zoom, the page breathes: the type steps back,
the paper margins widen, and the sheet reads as a sheet instead of
filling the window. That reading was the design all along — it was
just arriving through the browser's zoom control. This makes it the
default: on every ordinary display the whole page is set at 80% of
its scale, and only the ultrawide class of screen — 21:9 and 4K,
3440px and up — keeps the sheet at full size.

## 📐 What changed

- Below `lg` (phones, tablets, landscape phones) nothing moves: those
  are their own cut, tuned separately.
- From `lg` up to 2799px the root of the page is set to `80%`, so
  every rem — type, gutters, the 72rem plate measure, the 90rem cover
  — scales together, exactly as browser zoom scaled it. The billing
  band, the fold, the plates and the footer all sit a step back.
- At 2800px and up (21:9 at 3440, 4K at 3840, 5K2K at 5120) the sheet
  returns to its own size: a 1152px column on a 3440px screen would
  read as a strip down the middle.
- The line sits at 2800 rather than 2560 deliberately — 2560 is an
  ordinary 27" 1440p width, and the boundary sits well clear of it so
  no engine's scrollbar (WebKit's classic bar takes 13px) can tip a
  screen across it.
- Tailwind's breakpoints are pinned in px (`640 / 768 / 1024`) so the
  scale change cannot move them: a rem breakpoint would shrink with
  the root it is measuring, and the phone's own cut would lose its
  bands.

## ✅ Verification

- Full suite on a production build: **217 passed, 7 skipped, 0 failed**
  across Chromium, Firefox, WebKit and the mobile project.
- New test: the root resolves to 12.8px at 1920, 16px at 3440, and
  16px on a 393 phone.
- The card-inset geometry test now measures its 1rem/1.5rem in the
  page's own rem, so it follows the scale instead of assuming 16px.
- `tsc --noEmit`, `next lint`, `stylelint` clean.
- Screenshots at 1920×1080 and 3440×1440 of the fold and the shop
  plate.

## 📝 Notes

- This is not a CSS `zoom` on the body: the viewport stays the size
  the browser reports, media queries keep measuring in true CSS px,
  and `100svh` still means the window's height — only the sheet's own
  scale changes.
- The phone's search field still sets at 16px, as before: it is a px
  value by design, so the scale does not move it.
