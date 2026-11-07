---
title: 2026-11-05 - The suite can use another port
description: Playwright now takes the dev-server port from PORT, so a busy :3000 no longer reads as a broken site.
commit: pending
author: Samuel Lee
date: 2026-11-05
category: 🧰 Tooling
impact: tests
---

# 📅 2026-11-05 - The Suite Can Use Another Port

**Author**: Samuel Lee
**Category**: 🧰 Tooling

## 🎯 Overview

`playwright.config.ts` hardcoded `:3000` in three places — `baseURL`, the
webServer `url`, and implicitly the dev command. When another local app holds
3000, Next quietly binds the next free port, Playwright waits on 3000 until
the 120 s timeout, and the failure reads *"Timed out waiting from
config.webServer"* — indistinguishable from a site that will not boot. That
happened twice in the last two nights and cost real diagnostic time.

## 🔌 One port, read once

`const port = process.env.PORT ?? '3000'` now feeds both `baseURL` and the
server. The command passes the port explicitly (`npm run dev -- -p ${port}`)
because Next does not learn the port from the URL Playwright polls; without
the flag it simply drifts to the next free one. `PORT=3137 npm test` now runs
the whole suite on a port nothing else owns, with no file edits.

## 🧪 Verified

- Port plumbing proved end to end at `3137`: with the default set to that
  port, the dev server bound 3137 and the tests navigated against it
  (metadataBase warned `http://localhost:3137`, so the app really was there).
  Three of four projects passed; the WebKit one hit a separate
  cold-compile navigation race described below.
- **Not** verified on 3000 tonight: a long-running dev server already held
  that port, so Playwright reused it instead of starting one. The `-p 3000`
  path is therefore untested by execution.

## ⚠️ Notes

- The env var itself could not be exercised in-session (`PORT=… npm …` is
  approval-gated), so the plumbing is proven by changing the default, not by
  setting the variable. Reading `process.env.PORT` is the only untested line.
- The dev server squatting `:3000` (PID 83696, started outside this session)
  serves stale pages: 12 tests fail against it (every `/writing` and sitemap
  case) while the same code passes on a fresh server at 3137. Left running —
  it may be the tailnet dev server — and recorded in the report instead.
- A separate, pre-existing flake: running the plate-screen test **alone** on a
  cold server, WebKit reports `/music` navigation "interrupted" by the
  previous URL. Next logs a Fast Refresh full reload as it compiles `/music`
  mid-navigation. It does not reproduce in a warm full-suite run, and is not
  caused by the port change.
