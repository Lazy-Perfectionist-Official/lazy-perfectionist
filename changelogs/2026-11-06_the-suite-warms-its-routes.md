---
title: 2026-11-06 - The suite warms its routes
description: Playwright now compiles every route once before the workers start, so a dev-server Fast Refresh reload can no longer interrupt a test's navigation.
commit: pending
author: Samuel Lee
date: 2026-11-06
category: 🧰 Tooling
impact: tests
---

# 📅 2026-11-06 - The Suite Warms Its Routes

**Author**: Samuel Lee
**Category**: 🧰 Tooling

## 🎯 Overview

Running the plate-screen test **alone** against a cold dev server failed in
WebKit, every time, with *"Navigation to /music is interrupted by another
navigation to /shop?q=zzzz"*. The server log showed the cause: Next was still
compiling `/music` when the test navigated to it, and finishing that compile
forces a Fast Refresh full reload, which aborts the in-flight goto. Warm runs
never showed it, which is exactly the kind of flake that gets misread as a
broken link.

## 🔥 One GET per route, before the workers

`tests/e2e/global-setup.ts` requests `/`, `/music`, `/shop`, `/writing` and
`/sitemap.xml` once each and fails loudly if any answers non-200. Every route
is compiled before the first test starts, so no worker can navigate into a
compile. It takes about a second and it is the only honest place to fix this:
the app is fine — `next build` renders every route — it is the dev server's
compile-on-navigation that races.

## 🧪 Verified

- The exact failing command (cold server, WebKit, plate-screen test alone)
  now passes.
- Full suite: **97 passed / 7 by-design skips / 0 failed**.

## ⚠️ Notes

- This does not hide a site bug: with the warm-up removed the same tree is
  green as long as the routes are already compiled, and the same navigation
  sequence is clean in a full run.
- Cost is one extra round of requests per run (~1 s).
