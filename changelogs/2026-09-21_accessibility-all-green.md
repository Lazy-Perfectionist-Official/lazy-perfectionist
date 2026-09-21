---
title: 2026-09-21 - True All-Green: A11y Source Fixes + Legacy Suite Repair
description: 151 pre-existing failures in the a11y/cross-browser legacy suites triaged into real site bugs (fixed in source) vs broken test code (repaired on @axe-core/playwright) — every suite now green
commit: pending
author: Samuel Lee
category: ♿ Accessibility
impact: High
date: 2026-09-21
---

# 📅 2026-09-21 - True All-Green

**Author**: Samuel Lee
**Category**: ♿ Accessibility

## 🎯 Overview

After the functional pipeline went green, an honest check asked: is the
*whole* repo green? No — the legacy a11y and cross-browser suites carried
**151 pre-existing failures**. Triage split them cleanly: ~90% were broken
test code (a dead axe library, truthiness bugs, impossible selectors),
~10% were real site defects. Both sides are now fixed; every suite in the
repo passes.

## 🐛 Real site bugs fixed (source)

- **Framer-motion tab traps** — every gesture wrapper (`whileTap`) injects
  `tabindex="0"` on its div, putting anonymous divs in the keyboard tab
  order *ahead of* the real links. Fixed with `tabIndex={-1}` (gesture
  kept, tab stop dropped) in `Hero.tsx` nav links, listen-now, and the
  hero CTA (the one the WebKit focus probe caught last), plus
  `Navigation.tsx` link wrappers. platform-links rows are `motion.a`
  (natively focusable — no fix needed); PlatformButtons/GestureCard/
  MobileGestureNav turned out to be dead code, left untouched.
- **40px mobile menu toggle** — `p-2.5` + 20px icon = 40×40, under the
  44×44 touch-target best practice. Now `p-3` = 44×44 in both Hero and
  Navigation toggles.
- **Hero outside `<main>`** — axe's "region" rule flagged hero copy and
  scroll indicator as content outside any landmark. `<Hero />` moved
  inside `<main>` in `page.tsx`.
- **Footer contrast on Safari mobile** — contact footer strip used
  `text-oryzo-muted` over the video/gradient composite and failed
  color-contrast on mobile-safari; bumped to `text-oryzo-cream/90`.

## 🔧 Broken tests repaired

- **axe migration** — `axe-playwright@2.2.2` never injects `window.axe`
  under Playwright 1.61; every audit test was failing before asserting
  anything. Migrated to `AxeBuilder` from `@axe-core/playwright`, with a
  gate that fails only on serious/critical impacts (moderate/minor stay
  visible in the report).
- **Truthiness** — `.toBe(true)` against string aria attributes →
  `Boolean(...)` wraps.
- **Impossible assertions** — Enter-key test regex `/.*href.*/` (matches
  everything) → deterministic nav-blog target; role allowlist extended
  with `region`/`status`/`alert`; `emulateMedia({ reducedMotion:
  'reduced' })` → `'reduce'`; `@flash` pseudo-selector → `blink,
  marquee`; `'gsap' in window` (ESM, never on window) → real
  scroll-reveal observation (journal header opacity 0 → 1).
- **Touch tests on desktop projects** — `page.touchscreen.tap()` throws
  without `hasTouch`; guarded with `test.skip(...hasTouch)`.
- **Form submission** — filled only the name field then wondered why
  `checkValidity()` was false; now fills name/email/message validly.
- **Strict-mode ambiguity** — `getByRole('link', { name: /music/i })`
  resolves to several links; scoped to `nav-link-music`/mobile variant.
- **Sub-pixel touch targets** — WebKit reports a computed 44px as
  43.99999809265137; assertions now allow 0.5px rounding tolerance
  (43.5 floor), so a real size regression still fails.

## 📁 Files Modified

- `src/app/components/portfolio/Hero.tsx`, `src/app/components/portfolio/Contact.tsx`,
  `src/components/Navigation.tsx`, `src/app/page.tsx`
- `tests/e2e/a11y/accessibility.spec.ts`, `tests/e2e/cross-browser.spec.ts`
- Visual baselines regenerated (mobile/tablet toggle, contact/footer color,
  focus-state, oryzo-colors shots)

## ✅ Verification

- a11y + cross-browser across all 7 projects (chromium/firefox/webkit
  desktop, mobile-chrome, mobile-safari, tablet, accessibility): 537
  passed after source fixes, remaining 3 were the sub-pixel touch-target
  flake — repaired and re-verified (43 passed targeted run). 151 → 0.
- `npm run test:pipeline` end-to-end after the fixes: functional
  cross-browser 120 → navigation 18 → visual matrix 226, all green
  against regenerated baselines.

## 🔎 Follow-up (not blocking)

- `axe-playwright@2.2.2` is now an unused devDependency (only referenced
  by an outdated example in `tests/README.md`); safe to remove and update
  the doc snippet to `@axe-core/playwright`.
