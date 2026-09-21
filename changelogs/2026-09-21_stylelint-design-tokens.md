---
title: 2026-09-21 - Stylelint enforces design tokens
description: stylelint-declaration-strict-value now fails any raw color/gradient/shadow/mask outside the :root token block, with whole-value effect tokens for composites
commit: pending
author: Samuel Lee
category: 🎨 Design System
impact: Medium
date: 2026-09-21
---

# 📅 2026-09-21 - Stylelint Enforces Design Tokens

**Author**: Samuel Lee
**Category**: 🎨 Design System

## 🎯 Overview

Phase 1.1 of the UI/UX verification proposal: the ORYZO palette is now
machine-enforced. `npm run lint:css` fails on any raw color, gradient,
shadow, or mask value declared outside the `:root` token block.

## ⚙️ What changed

- `.stylelintrc.json` — `stylelint-declaration-strict-value` on color,
  background(-color), border(-color), outline(-color), fill, stroke,
  box-shadow, caret-color, text-decoration-color, mask, -webkit-mask.
  Allowed: `var(--*)`, currentColor, transparent, inherit/initial/unset, none.
- `globals.css` — remaining raw composites became whole-value tokens:
  `--glass-tint`, `--glass-inset-shadow`, `--glass-edge-gradient`,
  `--mask-solid-gradient`, `--glass-mask`, `--gradient-accent`,
  `--glow-ember(-strong)`, `--noise-texture-gradient`. Whole-value tokens
  are the point: `linear-gradient(var(--x), #hex)` still fails the rule,
  so gradients/shadows must be named design decisions.
- Custom-property definitions in `:root` are exempt by design — that block
  *is* the single source of truth.
- `lint:css` added to `test:pipeline` as the first gate.

## ✅ Verification

- `npm run lint:css` green; every remaining hex/rgba in the codebase lives
  inside the `:root` token-definition block (18 declarations, all tokens).

## 🔎 Notes

- Next step (proposal Phase 3): export the token block as JSON so the
  runtime (canvas draws, JS animations) and CSS can share one palette.
