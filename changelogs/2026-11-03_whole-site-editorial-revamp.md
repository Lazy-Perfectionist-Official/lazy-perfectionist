---
title: 2026-11-03 - Whole-site editorial revamp
description: A full visual revamp after an anti-slop design audit. The centered poster hero survives; everything below it is rebuilt as a left-rail editorial layout — fixed rail with ghost section numbers and a full-height hairline, wide catalog rows with a ghost index, Elsewhere as the single off-site destination, a squared ember CTA, a wordmark-left/nav-right header, and a colophon footer. One serif display headline per screen, a real body voice, no drop shadows.
commit: pending
author: Samuel Lee
date: 2026-11-03
category: 🎨 Design
impact: Medium
---

# 📅 2026-11-03 - Whole-Site Editorial Revamp

**Author**: Samuel Lee
**Category**: 🎨 Design

## 🎯 Overview

Request, verbatim: *"revamp the whole site"* — with the anti-slop design
skill used as the quality gate. A read-only audit of the existing one-pager
found the dominant AI-design tell was compositional, not cosmetic: every
section sat on the same centered vertical axis, the fold repeated one
listening action five times in five visual voices, all sections shared one
padding value, and the Elsewhere strip existed only to repeat the nav.

The revamp keeps what the audit called strong — the warm near-black/ember
palette, the bespoke twilight sky, the vinyl reveal, the centered poster
hero, and the honest copy — and rebuilds the rest of the page around them.

**The left rail.** Releases and Elsewhere now hang off a fixed 14rem rail
carrying a ghost section number, the section name in tracked caps, and a
full-height hairline. Content runs the full 1280px width instead of
floating in a centered 64rem box, so the page uses the gutters it was
leaving dead.

**One serif display headline per screen.** The hero keeps the giant serif;
release and platform names stay serif as content. The old serif section h2
becomes a sans mid-voice lede, while the section name stays a tracked-caps
h2 in the rail. Descriptions move from `text-sm` to `text-base` so the page
finally has a body register.

**One action per intent.** The fold now offers the listen twice — the
artwork (implicit) and one squared ember button (explicit). The duplicate
"Artist profile" link left the fold and joined the Elsewhere list, where
every off-site destination now lives once.

## 📦 What changed

| Area | Change |
|---|---|
| Header | Wordmark left, nav right on desktop; nav slimmed to Music / Elsewhere / Spotify; mobile stacks left-aligned. `id="top"` added. |
| Announcement bar | Tightened to `py-2.5`; 11px caps at 0.2em on mobile so it never wraps at 375px. |
| Hero | Label becomes metadata ("Single · 2026") instead of a third "new single"; flanking hairlines removed; album art loses `rounded-sm` and the heavy `shadow-2xl` for a square hairline sleeve; CTA becomes a square ember button with a drifting ↗ arrow to match the external-link glyph; identity splits into two deliberate lines under 640px; duplicate "Artist profile" quiet link removed. |
| Releases | Left rail (01 / Singles) + full-height hairline; wide catalog rows with ghost index (01–03), title + body-voice description, right-aligned year + Listen; sans lede replaces the competing serif h2; hover surface + ember title + arrow drift. |
| Elsewhere | Left rail (02 / Elsewhere); large serif platform names on hairline rows with a category counterweight (Artist profile / Watch / Follow / Shop); the Spotify row now carries the Artist profile label, so the duplicate row is gone; single destination for all off-site links. |
| Footer | Wordmark removed (no third repeat); one colophon row — provenance left (two deliberate lines under 640px), Back to top right. |
| globals.css | `.ember-pill` → `.ember-button` (square, gap, arrow); new `.display-link` type helper; no color/token changes. |
| Gate fixes | Year range raised to `muted/70` (5.51:1, was 4.31:1); 11px caps floor restored on mobile via deliberate two-line splits; ghost indices lifted to `muted/40`; CTA glyph aligned to `↗`; `.display-link` reduced to type only. |

No new dependencies. No client JavaScript added. HeroSky, palette, type
pair, grain, and all motion-safe gating untouched.

## ✅ Verification

- `npx tsc --noEmit`, `npm run lint` (ESLint) and `npm run lint:css` —
  all clean.
- `npm run test:pipeline` — **20 passed, 0 failed** (7 skipped) across
  chromium/firefox/webkit desktop, re-run on the final tree.
- `npm run test:mobile` — **7 passed, 0 failed** (2 skipped) at 375×667,
  re-run on the final tree.
- Behavior contract preserved: every `data-testid`, the Music anchor
  scroll, honest Spotify hrefs on the CTA/artwork/rows, the visible
  Listen label, the vinyl slide-layer selector, reduced-motion behavior,
  and the `/artist profile/i` link (now the merged Spotify row).
- Screenshots at 1440, 1024, 768 and 375: zero console errors, zero
  horizontal overflow (measured `scrollWidth − innerWidth = 0` at 768 and
  1024; 375 covered by the mobile suite).
- **Independent anti-slop gate** (read-only adversarial lane; run as a
  fork after the environment's fresh-agent routes returned
  model-availability errors) returned **FIX** on three items: year-range
  contrast (4.31:1), stale verification after the Elsewhere dedupe, and
  changelog overclaims. All three fixed; the suite was re-run on the final
  tree. Non-blocking notes accepted: the hero CTA sits below a 900px fold
  by design (the artwork and announcement remain actionable), and ghost
  indices now sit at `muted/40` for presence.

## 📝 Notes

- Only LUSG artwork exists in `public/`; Cyclothymia and Orbit have no
  cover files, so the catalog uses ghost indices instead of fabricated
  thumbnails.
- The hero deliberately stays a centered poster: both cited references
  (plini.co, intrvls.com) center their heroes and left-anchor below the
  fold. The asymmetry starts where the page previously became a stack.
- The left rail is a repeated device, not a one-off decoration: both
  content sections use the same 14rem measure so the hairlines line up
  from section to section.
