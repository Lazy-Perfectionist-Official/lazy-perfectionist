---
title: 2026-09-21 - Agent-Readable Web: Server-Rendered Blog, Production robots.txt, Sitemap Fix, Entity Schema, RSS Feed
description: SSR blog list via shared Medium lib, robots.txt rewritten for production domain + explicit AI crawlers, sitemap URLs corrected, homepage MusicGroup JSON-LD with sameAs, new /feed.xml RSS
commit: dad86d1
author: Samuel Lee
category: 🔧 Technical SEO / AI Visibility
impact: High
date: 2026-09-21
---

# 📅 2026-09-21 - Agent-Readable Web Pass

**Author**: Samuel Lee
**Category**: 🔧 Technical SEO / AI Visibility

## 🎯 Overview

Research pass on 2026 agent-era frontend best practices (Google's generative-AI
optimization guide, GEO studies, AI-crawler policy data) audited against the
site and closed the five highest-value gaps. Core principle from the research:
most AI crawlers fetch raw HTML without executing JavaScript, entity clarity
drives citations, and sitemaps/robots must live on the production domain.

## 🔄 Changes

### Server-rendered blog (`/blog`)
- New `src/lib/medium.ts` — Medium RSS parsing extracted from the API route
  into a shared module (15-min in-memory cache, fallback post on failure),
  used by both `/api/medium` (homepage Journal still fetches it client-side)
  and the blog page.
- `blog/page.tsx` is now an async server component: fetches stories at
  request/build time with `revalidate = 3600` (ISR) and renders them into the
  initial HTML. Blog JSON-LD (WebSite + Blog) moved server-side.
- `BlogPage.tsx` is presentational: receives server-fetched posts, re-sorts
  client-side (`useMemo`); loading skeleton / error / retry states removed
  (they existed only for the client fetch). Visual test replaced: the old
  skeleton-capture test became a raw-HTML contract test asserting story
  cards + structured data are present without JavaScript.
- Feed fidelity: Medium items often omit `<description>` (content-only), so
  summaries now derive from the article body; tag-stripping keeps word
  boundaries.

### robots.txt (production + AI crawlers)
- Was pointing at the stale `lazy-perfectionist.vercel.app` origin and
  disallowing `/_next/` (JS/CSS assets — renderers need them) and
  `/.well-known/` (where agent protocols like `agent-card.json` live).
  Rewritten for `lazyperfectionist.com` with explicit Allow sections for
  GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User,
  Claude-SearchBot, PerplexityBot, and Google-Extended (training ≠ AI
  Overviews), plus a correct `Sitemap:` line.

### Sitemap
- `sitemaps/sitemap.ts` served at `/sitemaps/sitemap.xml` but every URL used
  the stale vercel.app domain, carried dead `getMediumPosts`/`getSpotifyTracks`
  code, listed cross-domain medium.com URLs (invalid per the sitemap
  protocol), and included `/store` (an external 307 redirect). Rewritten:
  production URLs only, four real routes.

### Homepage entity schema
- Homepage had no structured data. Added `MusicGroup` JSON-LD with
  `sameAs` linking Spotify, Instagram, X/Twitter, YouTube, Medium, and Ko-fi —
  the entity-disambiguation signal that tells models all profiles describe
  the same artist — plus genre, Hong Kong founding location, founder.

### RSS feed
- New `/feed.xml` route (RSS 2.0, hourly revalidate) built from the shared
  Medium lib: clean permalinks (Medium's `?source=rss-*` tracking param
  stripped from link/guid), content-derived descriptions, Atom self-link,
  and autodiscovery `<link rel="alternate">` in the layout head. Serves
  readers, AI agents, and NLWeb-style consumers.

## 📁 Files Modified

- `src/lib/medium.ts` (new), `src/app/api/medium/route.ts` (thin wrapper)
- `src/app/blog/page.tsx` (server component), `src/app/blog/BlogPage.tsx`
  (presentational)
- `public/robots.txt`, `src/app/sitemaps/sitemap.ts`
- `src/app/page.tsx` (MusicGroup JSON-LD)
- `src/app/feed.xml/route.ts` (new), `src/app/layout.tsx` (autodiscovery)
- `tests/e2e/visual/pages-visual.spec.ts` (skeleton test → SSR contract test;
  blog-skeleton baselines deleted)

## ✅ Verification

- `tsc --noEmit` clean for all touched files (remaining errors pre-existing
  in untouched files).
- Live checks: `/blog` raw HTML contains story cards + 3 ld+json blocks;
  `/sitemaps/sitemap.xml` serves production URLs; `/robots.txt` has the
  correct Sitemap line and no vercel references; homepage HTML contains
  MusicGroup with 6 `sameAs` entries; `/feed.xml` serves valid RSS with
  clean permalinks and content-derived descriptions.
- Full visual matrix green (see below).

## 📝 Known Issues (not blocking)

- Medium profile feed currently contains one post, so the journal shows a
  single story; the list will grow automatically with new Medium posts.
- Homepage Journal section still loads client-side from `/api/medium`
  (below the fold, non-critical); could adopt the shared lib server-side
  later.
