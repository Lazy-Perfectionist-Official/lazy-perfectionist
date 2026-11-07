---
title: 2026-11-07 - A wrong turn lands on the print
description: A custom 404 keeps the masthead, the measure and the back cover, and says "Out of print" instead of dropping visitors on the framework's default page.
commit: pending
author: Samuel Lee
date: 2026-11-07
category: 🎨 Design
impact: 404 page
---

# 📅 2026-11-07 - A Wrong Turn Lands on the Print

**Author**: Samuel Lee
**Category**: 🎨 Design
**Impact**: 404 page

## 🎯 Overview

Unknown addresses used to render Next's default page — a white screen
with one link, outside the print entirely. `src/app/not-found.tsx` now
answers on the site's own terms:

- **The same chrome** — masthead, wordmark and back cover — so a wrong
  turn never looks like a different site.
- **Plate language** — eyebrow "Out of print", the headline "Page not
  found", the italic line "This pressing was never part of the issue",
  and one underlined way back to the cover.
- **A real 404 status**, so crawlers treat it as a miss rather than a
  thin page.

## 🧪 Verified

- New e2e spec `tests/e2e/not-found.spec.ts`: status 404, the plate copy
  visible, the return link wired to `/`, and masthead + footer present.
- Desktop (1440×900) and phone (390×844) screenshots checked.
- Full functional suite — **34 passed, 1 skipped**.
