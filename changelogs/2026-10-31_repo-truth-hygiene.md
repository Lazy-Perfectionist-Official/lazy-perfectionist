---
title: 2026-10-31 - Repo truth hygiene: dev.db untracked, pre-wipe stragglers gone
description: The tree lied about itself in three small ways. prisma/dev.db was git-tracked despite the repo's never-commit-runtime-state convention and despite .gitignore already covering it (tracked files override ignore rules). Three AGENTS.md files from the July pre-wipe sprawl (commit 80b6273) survived the wipe by hiding in .github/, .github/workflows/, and prisma/ — pure boilerplate that actively misdocuments this repo (issue templates, CODEOWNERS, dependabot, scheduled DB-maintenance workflows, Vercel deploys: none exist). .dockerignore referenced a Dockerfile that does not exist anywhere in the repo. All four files removed; dev.db stays on disk, untracked.
commit: pending
author: Samuel Lee
date: 2026-10-31
category: 🧹 Hygiene / Truth
impact: Low
---

# 📅 2026-10-31 - Repo Truth Hygiene: dev.db Untracked, Pre-Wipe Stragglers Gone

**Author**: Samuel Lee
**Category**: 🧹 Hygiene / Truth

## 🎯 Overview

Three provable untruths sat in the tree after the 09-24 strip-down. Each
was verified against the live repo before removal — no judgment calls, no
relitigating parked decisions.

## ✅ What changed

- **`prisma/dev.db` untracked** (`git rm --cached` — file stays on disk).
  `.gitignore:94/97` (`*.db`, `prisma/dev.db*`) already covered it, but
  tracked files override ignore rules; it had been riding every commit
  since before the wipe. Convention: never commit local runtime state.
- **`.github/AGENTS.md`, `.github/workflows/AGENTS.md`, `prisma/AGENTS.md`
  deleted** — July boilerplate (80b6273) from the erased site: claims
  issue templates, CODEOWNERS, dependabot, scheduled database-maintenance
  workflows, Vercel deploys — none exist; the workflows table omits
  `test.yml` entirely. The root AGENTS.md was wiped on 09-24; these three
  survived by hiding in subdirectories and inject noise into any agent
  working in those dirs. Recoverable from history at 80b6273.
- **`.dockerignore` deleted** — orphaned: no Dockerfile anywhere in the
  repo; the sole `docker` mention repo-wide was inside the AGENTS.md
  boilerplate itself. `next.config.ts` standalone output serves
  `serve:prod` (plain `node server.js`), not containers.

## 🔬 Verification

- `git ls-files` before: all five paths tracked. After: none.
- `.gitignore` needed no edit — `prisma/dev.db*` and `*.db` already
  present (lines 94, 97).
- `dev.db` confirmed still on disk (`git rm --cached` only).
- Repo-wide grep for `docker` (excluding ignored dirs): one hit, inside
  the now-deleted AGENTS.md boilerplate.
- `prisma/schema.prisma` stays tracked (the 09-24 purge deliberately kept
  schema + migrations; not relitigated). `prisma/migrations/` was already
  untracked via `.gitignore:98`.

## 📝 Notes

- **CI audited, left untouched**: `.github/workflows/test.yml` is truthful
  against today's `package.json` (`npm ci`, `lint:css`, `test:functional`
  all exist). `deploy-docs.yml` is dormant (triggers on `docs/**` /
  `README.md`, neither exists; repo is never pushed) — flagged for Samuel
  as a future-intent call, not deleted.
- The never-run prod build remains blocked: port 3000 cannot be proven
  free (lsof/curl approval-gated this slot) and building blind against a
  possibly-live shared dev server clobbers `.next` (documented incident).
