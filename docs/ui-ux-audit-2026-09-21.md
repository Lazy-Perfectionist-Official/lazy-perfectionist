# UI/UX Heuristic Audit — 2026-09-21

**Scope**: All public routes — `/` (home), `/music`, `/blog`, `/store` (redirect), `/platform-links`, `/404` — across mobile (375px), tablet (768px), and desktop (1280px+) viewports.
**Method**: Nielsen's 10 usability heuristics + Deque's 10 accessibility heuristics + conformance to `docs/FIGMA-DESIGN-SPEC.md` (ORYZO design system), grounded in evidence from the four automated suites, the vision-judge pass, production Lighthouse runs, and source inspection. No findings are speculative — every item cites its evidence.
**Status**: Phase 0 of `docs/UI-UX-VERIFICATION-PROPOSAL.md`. Triage classes: **real-bug** (shipped defect), **coverage-gap** (test/spec hygiene — the UI may be fine but nothing proves it), **taste** (deferred to human judgment).

---

## Evidence base

| Source | Result |
|---|---|
| Visual regression (3 engines × 3 viewports + mobile projects) | 226 passed, 47 skipped, 0 failed |
| Accessibility (axe, all projects) | 540 passed, 0 violations |
| Functional, cross-browser (chromium/firefox/webkit) | All passed (pipeline gate) |
| Vision judge (glm-4.6v-flash on section baselines) | 14/15 PASS; 4 skipped (HTTP 429 congestion) |
| Lighthouse, production standalone build | Home 94/100/96/100 (perf/a11y/BP/SEO); music 98/100/100; blog 100/100/100; mobile slow-4G 78/100/100; CWV within budget |

---

## Findings summary

| ID | Finding | Triage | Status |
|---|---|---|---|
| F1 | Third-party `_cfuvid` cookie from Medium CDN (Lighthouse BP 74) | real-bug | **Fixed today** — first-party `next/image` thumbnails; BP 74→96 |
| F2 | Footer social links below 24×24 touch-target minimum | real-bug | **Fixed today** — full-coverage tap-target test added, source fixed |
| F3 | Lighthouse lane audited dev server with vacuous thresholds | real-bug (meta) | **Fixed today** — prod build gated in `test:pipeline`, 12/12 |
| F4 | `settleLayout` deadlocked on lazy images (Firefox/WebKit timeouts) | coverage-gap | **Fixed today** — only in-flight loads awaited, 5s bound |
| F5 | UX journeys used soft (vacuous) assertions | coverage-gap | **Fixed today** — real assertions restored |
| F6 | `homepage loading screen` test targets a removed testid; 7 zombie baselines | coverage-gap | **Fixed 2026-09-22** — zombie test + 7 baselines deleted; loading screen re-introduced (F8 resolution 2) with a real functional spec |
| F7 | `homepage contact section` baseline captures the hero, not the contact section | coverage-gap | **Fixed 2026-09-22** — selector re-pointed to `[data-testid="contact-section"]`, baseline regenerated |
| F8 | FIGMA spec still specifies the loading screen that was deliberately removed | taste / spec-stale | **Fixed 2026-09-22** — resolution 2 taken: fast non-blocking loader (≤1.6s, once per session, reduced-motion opt-out); spec now matches code |
| F9 | Body forced `#000`; spec says canvas `#100904`, never pure black | taste / spec-divergence | **Fixed 2026-09-22** — body paints walnut-shadow `#100904` directly; ORYZO-colors test asserts it |
| F10 | `/store` same-tab server redirect to Ko-fi exits the site | taste | **Open** |
| F11 | `lazyperfectionist.com` is parked for sale at BuyDomains — canonical URLs point at it | real-bug (ops/domain) | **Open** — not a build gate |
| F12 | Contact-form API-failure toast has no automated test | coverage-gap (minor) | **Closed — already covered**: `home-functions.spec.ts` "surfaces an error toast when the API rejects" (route 500 → error toast, fields retained) predates this audit item; no gap remains |

---

## Fixed today — evidence they were real defects

### F1 — Third-party cookie from Medium thumbnails (real-bug, fixed)
Journal/blog cards rendered Medium-hosted thumbnails as plain `<img>`; every visitor hit `miro.medium.com`, received a `_cfuvid` cookie, and Lighthouse best-practices fell to **74** (threshold 80) on repeat visits. Also downloaded 800px images for 64px squares. Fixed via `next/image` (`Journal.tsx`, `BlogPage.tsx`); the optimizer now fetches Medium server-side. Verified: BP 74→**96** across two full production runs. See `changelogs/2026-09-21_first-party-medium-thumbnails.md`.

### F2 — Touch targets below minimum (real-bug, fixed)
Footer social icon links rendered below the 24×24 CSS-pixel minimum. Source fixed (`Contact.tsx`, `Hero.tsx`) and a full-coverage tap-target test added to the a11y suite — it now walks **every** interactive element on every page instead of sampling. All green.

### F3 — Lighthouse lane constrained nothing (real-bug, meta, fixed)
The old lane audited the dev server (perf **50** vs **94** prod) with threshold keys that compared against `undefined` — every "CWV budget" vacuously passed. Rebuilt as `playwright.lighthouse.config.ts` auditing the standalone production build on :3001, now the final `test:pipeline` gate: 12/12 passed with thresholds not lowered. See `changelogs/2026-09-21_lighthouse-prod-lane.md`.

### F4 — `settleLayout` deadlock (coverage-gap, fixed)
After thumbnails became `next/image` (lazy by default), below-fold images had `complete === false` with an **empty `currentSrc`** — no request in flight, `load`/`error` never fire until scrolled into view. Firefox and WebKit (whose lazy thresholds are smaller than Chromium's ~3000px) deadlocked the hover/press visual tests indefinitely; WebKit additionally stalled an in-flight optimizer request behind the same-origin autoplay video. Fixed: await only loads with a request in flight, bounded at 5s (thumbnail containers are fixed-size, so late images cannot shift layout). The 5 previously-timing-out tests now pass; full visual suite 226/0.

### F5 — Vacuous UX assertions (coverage-gap, fixed)
The ux journeys silently passed on missing preconditions. Restored to real assertions (`tests/e2e/ux/user-journeys.spec.ts`).

---

## Open findings

### F6 — Zombie loading-screen test and baselines (coverage-gap — fixed 2026-09-22)
The `homepage loading screen` visual test targeted `[data-testid="loading-screen"]` — an element **deleted on 2026-08-13** (commit d8005d5, "Remove LoadingScreen 2.7s blocking gate"). The selector matched nothing; `isVisible()` returned immediately, so the test silently skipped in every run, while 7 tracked baseline PNGs went stale (one burned a vision-judge verdict on a blank rectangle).
**Resolution**: zombie test and all 7 baselines deleted; a real loader exists again (see F8), and its behaviors (fresh-visit show + self-remove, once-per-session skip, reduced-motion skip) are covered by `tests/e2e/functional/loading-screen-functions.spec.ts`.

### F7 — Contact-section baseline captures the hero (coverage-gap — fixed 2026-09-22)
The `homepage contact section` test selected `section` filtered by `/contact|connect/i` `.first()`, which matched the hero (its nav has a Connect link), so the committed baseline showed navigation + hero headline instead of the contact UI.
**Resolution**: selector re-pointed to `[data-testid="contact-section"]`, count-guard dropped so the assertion can fail, baseline regenerated with the F8/F9 changes.

### F8 — Spec still describes the removed loading screen (taste / spec-stale — resolved 2026-09-22)
`docs/FIGMA-DESIGN-SPEC.md` specifies a loading screen; the 2026-08-13 implementation was removed because it **gated the whole tree for 2.7s** — the removal was correct, the spec was not stale so much as awaiting a non-blocking rebuild.
**Resolution**: option 2 taken. New `LoadingScreen.tsx` renders a fixed overlay over already-painted content (server renders `null`, never gates the tree — LCP-safe), shows once per browser session, skips under `prefers-reduced-motion`, runs `clamp(900ms, readiness, 1600ms)` with a 380ms exit fade, and carries the spec's label/rotating-words/counter/progress-bar vocabulary (words: *Create* → *Lazy Perfectionist*; label: EST. 2025 — HONG KONG). See `changelogs/2026-09-22_design-voice-tokens-loading-screen.md`.

### F9 — Body background `#000` vs spec canvas `#100904` (taste / spec-divergence — fixed 2026-09-22)
`globals.css` forced `body` to pure `#000 !important` while the ORYZO spec's canvas is `#100904` ("never pure black").
**Resolution**: the html/body rule now paints `var(--color-walnut-shadow)` (#100904) directly, `!important` dropped, and a cream-on-walnut `::selection` was added; the ORYZO-colors test asserts the computed `rgb(16, 9, 4)`.

### F10 — `/store` same-tab exit to Ko-fi (taste)
`src/app/store/page.tsx:4` server-redirects (HTTP 307) to `ko-fi.com/lazyperfectionist/shop` in the **same tab** — the only navigation that fully leaves the site, requiring browser-back to return. This is intentional (documented, asserted by the ux journey and excluded from Lighthouse for exactly this reason) and fine for a small merch shop. If wanted later: open in a new tab, or a light interstitial preserving site nav. Not a defect.

### F11 — Domain parked for sale; canonical URLs point at it (real-bug, ops/domain — not a build gate)
`https://lazyperfectionist.com` refuses connections on 443, and port 80 (207.148.248.143) 301s to `buydomains.com/lander/lazyperfectionist.com` — the domain is parked and listed **for sale** by BuyDomains, not serving the app. (Initially read as a hosting outage; the lander redirect is the ground truth.) The repo's `vercel.json` targets Vercel `sin1`, but DNS has never been pointed there. Meanwhile every hardcoded canonical URL — SEO metadata, JSON-LD `sameAs`, RSS autodiscovery, robots.txt sitemap assertion — references this parked domain. All gates audit the local build, so CI stays green. **Action (owner)**: reclaim/repoint the domain (Vercel or the self-hosted box), or swap the canonical URLs to a domain actually controlled — until then the site has no reachable production origin.

### F12 — Untested form-failure toast (coverage-gap, minor)
`ContactForm.tsx` handles API failure with a toast (`catch` → error message, verified in source), but no test exercises the failure path — the press-state test pins the API at 200-delayed. The happy path and required-field prevention are covered. A one-test addition (route abort → expect toast) would close it.

---

## Heuristic walkthrough (condensed)

**Nielsen**
1. *Visibility of system status* — contact submit shows disabled+SENDING while in flight (asserted twice in the visual suite); newsletter and platform-links show loading states; no loading gate remains, so paint is immediate. ✓
2. *Match to real world* — artist voice throughout ("bedroom studio", song titles); no system jargon. ✓
3. *User control & freedom* — no dialogs or traps; 404 offers Home/Music escapes. Only edge: F10 store exit. ✓ (with note)
4. *Consistency & standards* — ORYZO tokens now enforced by stylelint (no raw hex/px in component CSS); cross-page footer and color-scheme baselines pass; same nav across pages. ✓
5. *Error prevention* — required fields block submission (deterministically proven by the press-state test). ✓
6. *Recognition over recall* — persistent nav, icon+label platform links, visible form labels. ✓
7. *Flexibility & efficiency* — N/A for a 5-page portfolio (no shortcuts needed). —
8. *Aesthetic & minimalist* — 14/15 judge PASS on section baselines; the single FINDING traced to F6's zombie, not real UI. ✓
9. *Error recovery* — 404 page baselined; form failure toast exists in code but untested (F12). ◐
10. *Help & documentation* — N/A scope. —

**Deque (accessibility)**
1. Keyboard/6. Focus order — focus-state baselines pass; functional tab-order tests pass. ✓
2. Touch targets — full-coverage test green after F2 fix. ✓
3. Color contrast — cream `#ffedd7` on canvas `#100904` well above 4.5:1; Lighthouse a11y 100 on all pages. ✓
4. Headings/landmarks — axe clean (540 passed), including the `region` rule fix keeping nav+hero inside `main`. ✓
5. Images/alt — axe clean; Lighthouse image audits green. ✓
6. Media — contact background video: autoplay respects `prefers-reduced-motion` in tests; no audio autoplay. ✓
7–10. Forms, structure, motion, state — axe clean; reduced-motion emulated across the visual suite (marquees and scroll indicators settle to deterministic rest states). ✓

**Viewport coverage** — every page baselined at 375/768/1280 across chromium/firefox/webkit plus mobile projects; superwide (2560) covered for home. ✓

---

## Verdict

The shipped UI has **no open real-bug findings** from the heuristic pass — the five genuine defects found this cycle (F1–F5) are fixed and gated. The 2026-09-22 design-voice pass closed the remaining hygiene items: F6/F7 (zombie test + wrong-section baseline), F8/F9 (spec conformance — non-blocking loader rebuilt, walnut canvas on body), and F12 (verified already covered). What remains open is a deliberate design choice (F10) and one operational outage outside this repo's blast radius (F11).

— *Audit performed 2026-09-21 by Claude (Phase 0 of the UI/UX verification plan). All fixed findings verified by the full pipeline: lint → functional (cross-browser) → navigation → visual → Lighthouse-on-prod.*
