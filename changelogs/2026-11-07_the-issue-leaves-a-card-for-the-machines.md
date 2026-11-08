---
title: 2026-11-07 - The issue leaves a card for the machines
description: Canonical URLs, a per-plate social card, a schema.org graph, a generated robots.txt, a sitemap and an /llms.txt — so search engines, unfurlers and AI agents read the site the way a reader does.
commit: pending
author: Samuel Lee
date: 2026-11-07
category: 🔍 SEO
impact: All screens + crawler files
---

# 📅 2026-11-07 - The Issue Leaves a Card for the Machines

**Author**: Samuel Lee
**Category**: 🔍 SEO
**Impact**: All screens + crawler files

## 🎯 Overview

The site already read well to a person; it read like a pile of unrelated
pages to a crawler. Every screen now says what it is, in the words the
machines use.

- **A host, resolved once.** `SITE_URL` in `src/lib/site.ts` takes
  `NEXT_PUBLIC_SITE_URL`, else Vercel's own production host, else the
  deploy URL — so canonicals and the sitemap are correct on a preview
  deploy as well as on a domain. The parked
  `lazyperfectionist.com` is never substituted.
- **A social card per screen.** `pageMetadata()` in
  `src/lib/metadata.ts` emits title, description, canonical, Open Graph
  and Twitter tags. Next *replaces* a parent's `openGraph` object rather
  than merging it, so without this every plate previewed as the cover —
  a discography link showed the new single.
- **A schema.org graph.** `src/lib/structured-data.ts` describes the
  `MusicGroup` (genre, Hong Kong, every handle), the `WebSite`, and each
  `MusicRecording` keyed by its Spotify URL; the catalog screens add a
  `CollectionPage` wrapping an `ItemList` of their visible releases.
- **A robots.txt worth reading.** The static file is gone, replaced by
  `app/robots.ts`: search engines, renderers and AI agents are named and
  welcomed (`GPTBot`, `ClaudeBot`, `Claude-User`, `Claude-SearchBot`,
  `OAI-SearchBot`, `PerplexityBot`, `Google-Extended`, `Spotify`,
  `Applebot`), while `/admin/` and `/api/` stay shut to all of them.
  `/_next/` — the JS, CSS and images a renderer needs — is never
  disallowed.
- **`/llms.txt`.** A generated summary in the llmstxt.org shape, built
  from the same `content.json` the pages read, so a release or a handle
  can never drift between the site and its card for a language model.
- **A truthful sitemap.** Five URLs, no `lastModified`: a build
  timestamp would claim every page changed on every deploy.

## 🧪 Verified

- New spec `tests/e2e/seo.spec.ts`: per-screen title/description/OG/
  Twitter on all five screens, the home JSON-LD graph (band, site, each
  recording), the `ItemList` on `/discography` and `/music`, the named
  agents and the `/admin/` + `/api/` disallows in robots.txt, and
  `/llms.txt` listing every release and page.
- Canonicals, `og:url`, robots rules and the sitemap checked against a
  dev server with `NEXT_PUBLIC_SITE_URL` set to the live host.
- `tsc --noEmit`, `next lint` clean; full desktop suite green.
