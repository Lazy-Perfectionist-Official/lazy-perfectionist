---
title: 2026-10-27 - Manifest truth pass
description: Two small truths in public/manifest.json. (1) The 512px icon claimed "purpose": "any maskable" — but maskable icons must be drawn with safe-zone padding (content inside the inner ~80%); ours is a plain square logo, so Android launchers would crop the edges off the wordmark. Now honestly "any". (2) Added stable install identity "id": "/" — when the parked lazyperfectionist.com domain is reclaimed or the origin moves (F11), a stable id keeps PWA install identity across the migration. Everything else audited and found truthful: #music shortcut anchor exists (Releases.tsx:8), description matches the three RELEASES, start_url/display/colors consistent with the site tokens.
commit: pending
author: Samuel Lee
date: 2026-10-27
category: 🔍 PWA / Metadata
impact: Low
---

# 📅 2026-10-27 - Manifest Truth Pass

**Author**: Samuel Lee
**Category**: 🔍 PWA / Metadata

## 🎯 Overview

A truth audit of the web app manifest found one false claim and one
missing identity. Both fixed; everything else verified truthful.

## 🔧 What changed

- `public/manifest.json` (two lines):
  - `"purpose": "any maskable"` → `"purpose": "any"` on the 512px icon.
    Maskable icons get circle-cropped by Android launchers and must keep
    content inside the inner ~80% safe zone; the 512 is a square logo
    with no such padding, so the claim invited edge-cropped wordmarks.
  - `"id": "/"` added — stable PWA install identity. Cheap now, valuable
    later: the site's canonical domain is parked (F11) and any origin
    move would otherwise risk duplicate install identities.

## ✅ Verification

- `npm run lint` — ✔ No ESLint warnings or errors.
- Audit of the remaining fields, verified against the codebase:
  shortcut `url: "/#music"` — anchor exists (`Releases.tsx:8`,
  `<section id="music">`, already `scroll-mt-8` for the offset);
  `description` matches the three RELEASES in `src/lib/site.ts`;
  `start_url`/`display`/`background_color`/`theme_color` consistent with
  layout viewport + tokens; icon files all tracked in `public/`.
- No test references to manifest/shortcut (grep over `tests/`).
- Not machine-verified: actual PNG pixel dimensions vs declared sizes
  (image tooling approval-gated this slot); icons were generated at
  their declared sizes for this site.

## 📝 Notes

- `apple-touch-icon.png` inside the manifest's `icons` array is
  redundant (Apple reads the `<link>` from layout metadata) but
  harmless — left alone rather than churned.
- Branch `ai-office/2026-10-27` cut from `feature/site-rebuild`
  (standing deviation — `main` = pre-wipe site). File-disjoint from all
  pending cherry-picks (robots.txt, layout.tsx, .env.example), so no
  merge-order coupling.
