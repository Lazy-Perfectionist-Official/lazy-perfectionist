---
title: 2026-11-05 - Find is the verb
description: The plate screens' submit button announced itself as "Find north east arrow"; the arrow is now decoration and the accessible name is just the verb.
commit: pending
author: Samuel Lee
date: 2026-11-05
category: ♿ Accessibility
impact: /music, /shop, /writing
---

# 📅 2026-11-05 - Find Is the Verb

**Author**: Samuel Lee
**Category**: ♿ Accessibility

## 🎯 Overview

The search line on each plate screen ends in a `↗` submit. Everywhere else on
the site that glyph is `aria-hidden` — the announcement bar, the foot rows,
the release rows — because it is decoration, not content. The search button
was the one place it leaked into the accessible name, so a screen reader
read *"Find north east arrow"* and voice control had to repeat the glyph.

## ✂️ The glyph steps out of the name

The arrow is wrapped in an `aria-hidden` span; the button's name is now
`Find`. The plate-screen e2e test pins it with an exact accessible-name
match, so the glyph cannot drift back into the name unnoticed.

## 🧪 Verified

- `tests/e2e/home.spec.ts` — exact name `Find` asserted before the submit on
  `/shop`; test passes.
- `npm run build` clean (only the known parked-domain `metadataBase`
  warning). Run on an isolated port: `:3000` was occupied tonight by an
  unrelated local app, so the suite could not reuse it.
