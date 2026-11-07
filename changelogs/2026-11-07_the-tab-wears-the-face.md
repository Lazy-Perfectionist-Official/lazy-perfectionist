---
title: 2026-11-07 - The tab wears the face
description: The icon set is the Ko-fi profile mark — the same 210×210 upload Ko-fi masks for its tab — clear corners in the favicon, a coin on paper for the install marks. The LP monogram retires after a few hours.
commit: pending
author: Samuel Lee
date: 2026-11-07
category: 🎨 Design
impact: Tab, install + home-screen marks
---

# 📅 2026-11-07 - The Tab Wears the Face

**Author**: Samuel Lee
**Category**: 🎨 Design
**Impact**: Tab, install + home-screen marks

## 🎯 Overview

The LP monogram shipped earlier today; it is replaced by the **Ko-fi
profile mark** — the same 210×210 upload that Ko-fi masks for the tab
beside the shop. One image, two treatments, because the tab and the
home screen have different rules.

- **`favicon.ico` (16/32/48)** — the coin with clear corners, so the
  browser tab is the same mark as the Ko-fi tab.
- **Install marks** (`apple-touch-icon.png` 180, `icon-192`, `icon-512`) —
  the coin on the paper field with a 4% margin. iOS and Android flatten
  transparency to black, and a full-bleed circle gets clipped by their
  rounded-square mask; the paper ring is what their mask cuts.
- **Source committed** at `scripts/assets/icon-source.png`; `npm run
  icons` rebuilds everything from it. Each target is resized straight
  from the source with Lanczos and masked at its own size — never
  upscaled to a master and down again.
- **The script no longer needs the dev server.** It was borrowing the
  site's Bodoni through a running `next dev`; a photograph needs no font,
  so it now uses `sharp` directly. `sharp` is an explicit devDependency,
  deduped with the copy Next already uses for image optimization.
- **PNG effort**: photos in a default PNG run ~353 KB at 512; level 9 +
  adaptive filtering takes the same pixels to 96 KB losslessly.

## 🧪 Verified

- True rasters inspected: 16/32/48 read as the coin with clear corners;
  180/192 at their rounded masks; 512 holds the portrait at native size.
- Sizes: `favicon.ico` 5,777 B; `apple-touch-icon.png` 18,847 B;
  `icon-192x192.png` 21,843 B; `icon-512x512.png` 96,034 B.
- `npm run test:functional` — **32 passed, 1 skipped**; the manifest test
  resolves both install icons.
