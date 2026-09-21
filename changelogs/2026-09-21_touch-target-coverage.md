---
title: 2026-09-21 - Full-coverage touch targets
description: Touch-target tests now check every visible link/button (drawer opened, Next dev-tools portal excluded) instead of the first 10; footer socials and drawer links grew to py-3
commit: pending
author: Samuel Lee
category: 🧪 Testing
impact: Medium
date: 2026-09-21
---

# 📅 2026-09-21 - Full-Coverage Touch Targets

**Author**: Samuel Lee
**Category**: 🧪 Testing

## 🎯 Overview

Phase 1.2: the "44px minimum touch target" checks used to sample the first
10 interactive elements. They now assert over **every** visible link and
button — and the wider net immediately caught two real violations.

## ⚙️ What changed

- `tests/e2e/a11y/accessibility.spec.ts` + `tests/e2e/cross-browser.spec.ts`:
  - open the mobile drawer (`nav-mobile-toggle`) before measuring so
    drawer-only links are covered;
  - enumerate `a:visible, button:visible` and require > 0 checked elements
    (an empty pass is a failure);
  - skip elements inside the `<nextjs-portal>` shadow root (the 32×32 dev
    tools button) via a `getRootNode()` check — app config untouched;
  - WebKit sub-pixel tolerance (43.5px floor) for computed 43.999px.
- Source fixes: footer social links (`Contact.tsx`) and mobile drawer links
  (`Hero.tsx`) `py-2`/bare → `py-3` (≈44px tall).

## ✅ Verification

- a11y + cross-browser suites: 540 passed / 6 skipped across all browser
  projects.
- Visual baselines regenerated for the taller footer/drawer (committed
  separately).

## 🔎 Notes

- Full coverage means the test also guards *future* elements — a new
  undersized chip will fail CI instead of shipping.
