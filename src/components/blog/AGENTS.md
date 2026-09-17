<!-- Parent: ../../AGENTS.md -->
<!-- Generated: 2025-07-08 | Updated: 2026-09-17 -->

# blog

## Purpose
React components for blog functionality. The Blog page (`src/app/blog/BlogPage.tsx`)
renders Medium articles as dark editorial rows (numbered, bordered, hover-ember
titles) matching the Music page direction; this directory holds its supporting
components.

## Key Files

| File | Description |
|------|-------------|
| `BlogSortSelect.tsx` | Sorting interface for blog posts (latest / oldest / popular) |

## For AI Agents

- Blog rows, loading skeletons, and error/empty states are implemented inline in
  `src/app/blog/BlogPage.tsx` (testids: `blog-card`, `loading-skeleton`,
  `blog-catalog-header`, `blog-closing`).
- Thumbnails come from `/api/medium` and are restricted to Medium CDN hosts
  (`miro.medium.com`, `cdn-images-1.medium.com`) — see `extractThumbnailFromContent`
  in `src/app/api/medium/route.ts`. Do not feed other hosts into image components.
- `BlogSortSelect` wraps shadcn/ui `Select`; sort options must stay in sync with the
  `SortOption` type in `BlogPage.tsx`.

<!-- MANUAL: Blog component specific notes and implementation details -->
