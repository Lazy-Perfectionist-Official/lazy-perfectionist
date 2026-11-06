---
title: 2026-11-06 - The lens is measured right
description: The lens test read its stretch off m.a/m.d, which mixes scale with the rotation to the pointer's travel; it now reads the ellipse's semi-axes and stops failing when the pointer travels steeply.
commit: pending
author: Samuel Lee
date: 2026-11-06
category: 🐛 Fix
impact: tests
---

# 📅 2026-11-06 - The Lens Is Measured Right

**Author**: Samuel Lee
**Category**: 🐛 Fix

## 🎯 Overview

`the drop deforms with the pointer` failed on all three desktop projects with
`expected > 1.02, received 0.9696` — the *thinned* axis, not the stretched one.

The cause was in the test, not the fold. The lens is drawn as
`rotate(θ) scale(sx, sy) rotate(-θ)` where θ follows the pointer's travel. Its
matrix is therefore `R·S·Rᵀ`, so `m.a = sx·cos²θ + sy·sin²θ` and
`m.d = sx·sin²θ + sy·cos²θ`: at a steep angle the two swap. The test assumed
θ = 0, and the pointer in the test arrives diagonally (Playwright's mouse
starts at the origin) before it flicks horizontally — so whether it passed
depended on how much of that diagonal the easing had forgotten.

## 📐 The stretch itself

The ellipse's semi-axes are the matrix's eigenvalues, which are exactly
`sx` and `sy` at any rotation. The test now derives them from the trace and
determinant and asserts `major > 1.02`, `minor < 0.99` — the same claim, read
the way the transform actually works. The composed check below it (glass ×
plate = the resting 1.2% enlarge) is unchanged.

## 🧪 Verified

- The lens test with `--repeat-each=3`: **9 passed / 3 by-design skips**, no
  failures.
- Full suite: **97 passed / 7 by-design skips / 0 failed**.
