---
title: 2026-11-07 - The back cover says where, not how many
description: The liner note is now "Instrumental rock/metal from Hong Kong." — the single count and the one room are gone; the city and the genre are the whole answer.
commit: pending
author: Samuel Lee
date: 2026-11-07
category: 📝 Content
impact: Footer liner note
---

# 📅 2026-11-07 - The Back Cover Says Where, Not How Many

**Author**: Samuel Lee
**Category**: 📝 Content
**Impact**: Footer liner note

## 🎯 Overview

The footer sentence answered three questions at once — who, where, and
how it was made. It now answers one: **"Instrumental rock/metal from
Hong Kong."**

- **`src/lib/content.json`** — `linerNote` loses "bedroom", the three
  singles, and the one room.
- The colophon directly below still names the project and the city, so
  nothing is left unanswered.
- **The test locks the new line** — it asserts the exact sentence in the
  footer, still above the colophon.

## 🧪 Verified

- The liner-note test passes on the new copy; the full functional suite
  is green (32 passed, 1 skipped).
