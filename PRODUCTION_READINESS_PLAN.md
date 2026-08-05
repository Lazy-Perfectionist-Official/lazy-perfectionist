# Production Readiness Plan — Lazy Perfectionist Website

Findings from a full read-through of the codebase (not guesses — every item below was verified by reading the actual file). Organized by priority. Each item names the exact file(s), what's wrong, and the fix.

---

## P0 — Security (fix before anything else goes live)

### 1. Contact messages endpoint leaks PII with no auth
**File:** `src/app/api/contact/route.ts` (GET handler, lines ~48-86)
**Problem:** `GET /api/contact` returns up to 50 contact messages (name, email, message body) with zero authentication. The code even has a comment admitting this: `// GET contact messages (admin only - should be protected with auth)` — but no auth check was ever added.
**Fix:** Either delete the GET handler entirely (admin can read via Prisma Studio/DB directly), or gate it behind a real auth check (e.g. a shared secret header, or NextAuth session check since `next-auth` is already a dependency). Do not ship this endpoint public.

---

## P1 — Broken functionality (things that visibly don't work)

### 2. Hero background "interactive reveal" effect doesn't work
**Files:** `src/app/components/portfolio/Hero.tsx` (line 108-113), `src/app/components/portfolio/LiquidReveal.tsx`, `src/app/components/portfolio/SpotlightReveal.tsx`
**Problem:** Hero.tsx imports and renders `LiquidReveal`, with a comment calling it "Interactive Liquid Reveal Background." But `LiquidReveal.tsx` contains **no interactivity at all** — it's just two static stacked `<div>`s with background images, no mouse tracking, no canvas, no mask. The actual interactive cursor-tracking canvas mask logic lives in `SpotlightReveal.tsx`, which is a real, working component — but it is never imported or used anywhere. The flagship visual effect on the homepage is dead code standing in for a working component that already exists but isn't wired up.
**Fix:** In `Hero.tsx`, replace the `LiquidReveal` import/usage with `SpotlightReveal` (same prop shape: `baseImage`, `revealImage`, `enabled`). Delete `LiquidReveal.tsx` once nothing references it. Verify the reveal follows the cursor on both desktop and touch (add a touch/pointer fallback if `SpotlightReveal` doesn't already handle touch — it currently only listens to `mousemove`).

### 3. No mobile navigation on the homepage
**File:** `src/app/components/portfolio/Hero.tsx` (lines 130-149)
**Problem:** The nav links (`Home / Music / Blog / Store / Connect`) are wrapped in `<div className="hidden md:flex ...">` with no mobile fallback — no hamburger menu, no mobile drawer. On a phone, a visitor lands on the homepage and has literally no way to navigate to Music/Blog/Store/Connect except the one "Listen Now" and "Stream Orbit" buttons. Every other page (`music`, `blog`) uses `src/components/Navigation.tsx`, which does have a working hamburger + mobile menu — so the pattern already exists, it's just missing from the homepage hero nav.
**Fix:** Add a mobile menu button + slide-down panel to the Hero nav, following the same interaction pattern as `src/components/Navigation.tsx` (menu icon toggles an animated panel with the same links). This is the single highest-impact mobile bug on the site.

### 4. Missing PWA icon referenced in layout
**File:** `src/app/layout.tsx` (line 69)
**Problem:** `icons.icon` array references `/icon-192x192.png`, but that file does not exist in `public/` (confirmed — only `icon-512x512.png` and `apple-touch-icon.png` exist). This 404s on every page load for browsers/OSes that request the 192px icon.
**Fix:** Generate a 192x192 PNG icon (same source art as `icon-512x512.png`, downscaled) and place it at `public/icon-192x192.png`. Or remove the reference from `layout.tsx` if you don't want to maintain it.

### 5. Contact/newsletter API routes exist with no UI to use them
**Files:** `src/app/api/contact/route.ts`, `src/app/api/newsletter/route.ts`, `src/app/components/portfolio/Contact.tsx`
**Problem:** Both API routes are fully built (Zod validation, Prisma writes) but there's no actual `<form>` anywhere in the app that POSTs to them. `Contact.tsx` only renders static `mailto:` and Spotify links — it's not a contact form. Similarly no newsletter signup input exists anywhere.
**Fix:** Either build the actual form UI (a simple contact form component wired to `/api/contact`, and a newsletter email input wired to `/api/newsletter`, both using the existing `useToast()` hook for success/error feedback — see #10 below), or delete the unused API routes and Prisma models if you don't want a contact feature. Don't leave a half-built backend live.

---

## P2 — Visual identity is inconsistent across pages (the "sucks" problem)

The site currently runs **three unrelated visual themes** stitched together, which is almost certainly the root of "the UI sucks":

- **Homepage** (`page.tsx` → Hero/SelectedWorks/Journal/Explorations/Stats/Contact): dark near-black canvas, cream/ember accent colors, serif italic display font — "ORYZO" theme (`oryzo-*` utility classes in `globals.css`).
- **Music, Blog pages** (`MusicPage.tsx`, `BlogPage.tsx`): white cards, blue accents, `linktree-gradient` background, DM Serif font — completely different look.
- **Platform-links page**: same `linktree-gradient` white/blue theme but its own hand-rolled nav bar (not the shared `Navigation.tsx`).
- **Store page**: just an external redirect, no themed page at all.

A visitor clicking from the dark, moody homepage into Music or Blog lands on what looks like a different, unrelated website.

### 6. `globals.css` has duplicated, conflicting theme definitions
**File:** `src/app/globals.css`
**Problem:** The file defines `:root` **four separate times** (lines ~11, ~205, ~241 `.dark`, ~531), and duplicates `@keyframes fade-rise` and `.liquid-glass` twice each (once near the top, once again near line 478-528 under a "Velorah" comment). This is copy-pasted CSS from at least two different generation passes that were never merged, and it makes the cascade unpredictable — later duplicate blocks silently override earlier ones.
**Fix:** Pick ONE theme as canonical (recommend: the ORYZO dark theme, since it's what the current homepage/Hero — the first thing visitors see — actually uses). Delete the duplicate `:root` blocks, the duplicate `.liquid-glass`, and the duplicate `@keyframes fade-rise`. Delete the unused "Velorah" HSL variables (`--background: 201 100% 13%` etc.) if ORYZO wins. Result should be a single `:root` block and no duplicate rules.

### 7. Music/Blog/Store/Platform-links pages need to be re-themed to match the homepage
**Files:** `src/app/music/MusicPage.tsx`, `src/app/blog/BlogPage.tsx`, `src/app/platform-links/page.tsx`, `src/components/Navigation.tsx`
**Problem:** These pages use `linktree-gradient`, `linktree-button`, `linktree-text` classes (white cards, blue/black text) — a leftover from what looks like an earlier "linktree" design pass. They don't share fonts, colors, spacing, or nav styling with the homepage.
**Fix:** Rebuild these pages using the ORYZO dark theme + the existing `oryzo-*` utility classes (already defined in `globals.css`) instead of the `linktree-*` classes. Replace `src/components/Navigation.tsx`'s white pill nav with a dark nav consistent with the Hero nav (once #3 is fixed, reuse that same nav component/markup across all pages instead of maintaining two separate nav implementations — see #9). Once done, delete the unused `linktree-*` utility classes from `globals.css`.

---

## P3 — Content is placeholder/template filler, not real content

This is likely the second-biggest reason the site "sucks" — large sections of the homepage show generic design-agency template copy that has nothing to do with a musician's site.

### 8. Fabricated/incorrect stats
**File:** `src/app/components/portfolio/Stats.tsx` (lines 12-16)
**Problem:** Hardcoded stats claim "50+ Tracks Released" and "1M+ Streams Across Platforms." But `MusicPage.tsx` describes this as a debut artist with one single ("Orbit"). These numbers are fabricated and will read as obviously false to any real visitor who then checks the Music page.
**Fix:** Replace with real numbers (e.g. actual current release count, actual Spotify follower/stream count if available via the existing `/api/spotify` integration — `src/lib/spotify.ts` already exists), or remove the Stats section entirely until there's real data to show.

### 9. "Selected Work" and "Explorations" sections are unrelated generic template content
**Files:** `src/app/components/portfolio/SelectedWorks.tsx`, `src/app/components/portfolio/Explorations.tsx`
**Problem:** `SelectedWorks.tsx` renders four fake project cards — "Automotive Motion," "Urban Architecture," "Human Perspective," "Brand Identity" — with no real images, just a giant placeholder letter. `Explorations.tsx` renders "Sonic Textures," "Visual Harmony," etc. with the same letter-placeholder treatment, and links out to a generic `https://dribbble.com` (not the artist's own profile). This is unmistakably leftover design-agency template copy — it has nothing to do with an instrumental rock musician's actual work.
**Fix:** Either replace with real content (actual track artwork/videos linked to Spotify/YouTube, using the artist's real Spotify data already available via `/api/spotify`), or delete both sections from the homepage entirely if there isn't yet enough real material to fill them. Showing fake placeholder "portfolio pieces" is worse than showing nothing.

### 10. "Recent Thoughts" journal section shows fake blog entries instead of real ones
**File:** `src/app/components/portfolio/Journal.tsx` (lines 17-42)
**Problem:** Hardcoded fake blog post titles ("Creating Orbit: The Journey," "Bedroom Production Techniques," etc.) with made-up dates, three of which reuse `/assets/img/logo.png` as a thumbnail. Meanwhile the real Blog page (`BlogPage.tsx`) already fetches actual posts from Medium via `/api/medium`. The homepage's Journal section is disconnected from the real content pipeline.
**Fix:** Fetch and render the same real Medium posts here that `BlogPage.tsx` already fetches (reuse the `/api/medium` call, show the latest 3-4 real posts), instead of hardcoded fake entries.

---

## P4 — Dead code / duplication cleanup

### 11. Duplicate, diverging component trees
**Files:** `src/app/components/portfolio/*` vs `src/app/portfolio/components/*`
**Problem:** Two nearly-identical sets of components exist: `Hero.tsx`, `CursorReveal.tsx`, `SelectedWorks.tsx`, `Journal.tsx`, `Explorations.tsx`, `Stats.tsx`, `LoadingScreen.tsx`, `Contact.tsx` all exist in **both** `src/app/components/portfolio/` and `src/app/portfolio/components/`, with diverged content (confirmed via diff — e.g. the two `Hero.tsx` files use different reveal components and different nav markup). Only `src/app/components/portfolio/` is actually used by `page.tsx`. `src/app/portfolio/page.tsx` is dead code that does nothing but `router.replace('/')`.
**Fix:** Delete the entire `src/app/portfolio/` directory (both `page.tsx` and `components/`). Keep only `src/app/components/portfolio/`.

### 12. Unused legacy homepage files
**Files:** `src/app/HomePage.tsx`, `src/app/LazyPerfectionistHero.tsx`
**Problem:** Neither file is imported anywhere in the codebase (confirmed via grep) — `page.tsx` uses its own inline component, not `HomePage.tsx`. These are orphaned leftovers from an earlier redesign pass.
**Fix:** Delete both files, unless one of them is intended to replace the current `page.tsx` implementation — if so, clarify which version is canonical before deleting the other.

### 13. Monitoring/analytics module is fully built but never initialized
**File:** `src/lib/monitoring.ts`
**Problem:** A complete Sentry + GA4 + Web Vitals tracking module exists, but `initMonitoring()` is never called anywhere in the app (confirmed via grep — no imports of this file exist outside itself). All the "production monitoring" described in the file's own header comment is currently inert.
**Fix:** Either call `initMonitoring()` from `layout.tsx` (client-side, on mount) if you want real monitoring/error tracking in production, or delete the file if it's not needed. Also decide whether `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_SENTRY_DSN` env vars should actually be set for production.

### 14. Toast system wired but never triggered
**File:** `src/hooks/use-toast.ts`, `src/app/layout.tsx` (Toaster is mounted)
**Problem:** `<Toaster />` is mounted globally, but `useToast()` is never called anywhere except inside `toaster.tsx` itself — there are no success/error toasts shown anywhere in the app (e.g. no toast on newsletter signup success, form errors, etc.).
**Fix:** Once the contact/newsletter forms are built (#5), wire their success/error states to `useToast()` so users get feedback when they submit something.

---

## P5 — Build/config hygiene

### 15. Type and lint errors are silenced at build time
**File:** `next.config.ts` (lines 9-11, 295-298)
**Problem:** `typescript.ignoreBuildErrors: true` and `eslint.ignoreDuringBuilds: true` mean the production build will succeed even if there are real type errors or lint violations. This hides bugs instead of catching them before deploy.
**Fix:** Run `npm run build` and `npm run lint` with these flags temporarily set to `false`/removed, fix whatever surfaces, then decide whether to keep them off permanently (not recommended for a "production-level" site) or leave them on only for genuinely unfixable third-party type noise.

### 16. `reactStrictMode` disabled globally, dev-only comment left in shared config
**File:** `next.config.ts` (line 12-13)
**Problem:** `reactStrictMode: false` is set at the top level with a Chinese-language comment explaining it's to stop hot-reload conflicts with nodemon — a dev-environment concern bleeding into config that also governs production (though it's correctly re-enabled for `isProduction` further down at line 126, so production is actually fine — just flagging the confusing/duplicate-sounding config and mixed-language comment for anyone maintaining this later).
**Fix:** No functional bug here (production already re-enables strict mode), but consider clarifying the comment in English and moving the dev-only webpack watch-options hack (lines 217-223) closer to where it's explained, so a future maintainer doesn't get confused about whether strict mode is on in prod.

---

## P6 — Performance

### 17. Unoptimized multi-megabyte images used directly
**Files:** `src/app/components/portfolio/Hero.tsx` (background images), `src/app/components/portfolio/Journal.tsx`, `public/assets/img/`
**Problem:** `hero-background.jpg` (2.5MB) and `hero-background-warm.JPG` (2.4MB) are loaded as raw CSS `background-image` URLs directly (not through `next/image`, not through the `optimized/` folder that already exists for other assets like the logo). `orbit-cover.jpg` (11MB!) is referenced by `Journal.tsx`. There's already tooling for this — `optimize-images.js` and an `optimized/` folder with AVIF/WebP variants for the logo and orbit cover — it just isn't being used for the hero backgrounds.
**Fix:** Run the existing `npm run optimize-images` pipeline (or extend it) to generate AVIF/WebP variants of `hero-background.jpg` and `hero-background-warm.JPG` at reasonable sizes, then reference those optimized variants in `Hero.tsx`/`SpotlightReveal.tsx` instead of the raw multi-megabyte originals. Same for `orbit-cover.jpg` in `Journal.tsx` — use the already-generated `orbit-cover-1200.avif`/`.webp` from `public/assets/img/optimized/` instead of the 11MB original.

---

## Suggested order of work

1. Fix the security hole (#1) — this can leak user PII right now.
2. Fix the broken hero interactive effect (#2) and mobile nav (#3) — both are visible, embarrassing bugs on the most-viewed page.
3. Consolidate the CSS theme (#6) and re-theme Music/Blog/Store/Platform-links to match the homepage (#7) — this is the core "looks inconsistent" fix.
4. Replace or remove placeholder content (#8, #9, #10) — stop showing fake stats/portfolio/blog content.
5. Delete dead code (#11, #12, #13 or wire it up, #14 or wire it up).
6. Fix missing icon (#4), optimize images (#17), verify build with type/lint checks on (#15).

Once these are done the site will have one consistent visual identity end-to-end, no fake/broken content or effects, and no obvious security or performance red flags for a "production-level" launch.
