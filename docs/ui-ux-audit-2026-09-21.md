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
| F6 | `homepage loading screen` test targets a removed testid; 7 zombie baselines | coverage-gap | **Open** |
| F7 | `homepage contact section` baseline captures the hero, not the contact section | coverage-gap | **Open** |
| F8 | FIGMA spec still specifies the loading screen that was deliberately removed | taste / spec-stale | **Open** |
| F9 | Body forced `#000`; spec says canvas `#100904`, never pure black | taste / spec-divergence | **Open** |
| F10 | `/store` same-tab server redirect to Ko-fi exits the site | taste | **Open** |
| F11 | `lazyperfectionist.com` production origin refuses connections | real-bug (ops) | **Open** — not a build gate |
| F12 | Contact-form API-failure toast has no automated test | coverage-gap (minor) | **Open** |

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

### F6 — Zombie loading-screen test and baselines (coverage-gap)
The `homepage loading screen` visual test targets `[data-testid="loading-screen"]` — an element **deleted on 2026-08-13** (commit d8005d5, "Remove LoadingScreen 2.7s blocking gate"). The selector matches nothing; `isVisible()` returns immediately, so the test **silently skips in every run** (it is part of the 47 skips). Meanwhile 7 tracked baseline PNGs (`loading-screen-*.png`) are stale, and the vision-judge lane burned a verdict on one — correctly reporting "entirely blank — solid black rectangle" — which triggered a false-alarm investigation today. Independently verified via vision: the baseline contains no content.
**Action**: delete the test and the 7 baselines, or re-point to a real loading UI if one is re-introduced (see F8).

### F7 — Contact-section baseline captures the hero (coverage-gap)
The `homepage contact section` test selects `section` filtered by `/contact|connect/i` `.first()` — which matches an earlier section. Vision verification of the committed baseline shows the **hero**: navigation, "Where *silence* speaks through the sound." headline, Stream CTA — no form fields. The real contact section exists and is testable (`data-testid="contact-section"`, `Contact.tsx:140`; form at `contact-form`; newsletter at `newsletter-form`) and its behavior is covered functionally, but there is no correctly-named visual baseline of the actual contact UI (background video, heading, form, newsletter, footer socials).
**Action**: re-point the selector to `[data-testid="contact-section"]` and regenerate. Low risk — purely test hygiene.

### F8 — Spec still describes the removed loading screen (taste / spec-stale)
`docs/FIGMA-DESIGN-SPEC.md` specifies a loading screen (PORTFOLIO label, rotating words, 000→100 counter, 3px progress bar). The implementation was deliberately removed as a **site-breaking regression** — a 2.7s blocking gate (commit d8005d5). Two defensible resolutions, owner's call:
1. Accept removal (instant paint is the better UX for a 5-page portfolio) → update the spec to record the decision.
2. Re-introduce a fast, non-blocking variant → new implementation + real test (replacing F6's zombie).
Until decided, the spec and code contradict each other, and F6 keeps producing zombie artifacts.

### F9 — Body background `#000` vs spec canvas `#100904` (taste / spec-divergence)
`globals.css` forces `body` to pure `#000`; the ORYZO spec's canvas is `#100904` and its Don'ts say "never pure black." In practice the page wrappers carry `bg-oryzo-canvas`, so visitors see the intended tone — the visual suite even documents this in the ORYZO-colors test comment, and Lighthouse a11y is unaffected. The divergence is between the spec's letter and the implementation's structure.
**Action**: either move the canvas tone onto `body` (and simplify the test's accepted-color list) or annotate the spec that `body` is a backdrop behind tone-carrying wrappers. Cosmetic either way.

### F10 — `/store` same-tab exit to Ko-fi (taste)
`src/app/store/page.tsx:4` server-redirects (HTTP 307) to `ko-fi.com/lazyperfectionist/shop` in the **same tab** — the only navigation that fully leaves the site, requiring browser-back to return. This is intentional (documented, asserted by the ux journey and excluded from Lighthouse for exactly this reason) and fine for a small merch shop. If wanted later: open in a new tab, or a light interstitial preserving site nav. Not a defect.

### F11 — Production origin down (real-bug, ops — not a build gate)
`https://lazyperfectionist.com` refuses connections (curl exit 7, reproduced twice today). All gates audit the local build, so CI stays green while the live site is unreachable. Out of scope for this repo's pipeline (deployment/monitoring concern) but it is the most user-visible defect that exists right now. **Action**: check hosting/deployment (owner).

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

The shipped UI has **no open real-bug findings** from the heuristic pass — the five genuine defects found this cycle (F1–F5) are fixed and gated. What remains open is test/spec hygiene (F6, F7, F12 — mechanical fixes), a spec-vs-code decision (F8, F9), a deliberate design choice (F10), and one operational outage outside this repo's blast radius (F11). Recommended order: F7 + F6 cleanup (minutes, kills false alarms in the judge lane), F12 (one test), then the F8/F9 spec decisions, F10 only if desired.

— *Audit performed 2026-09-21 by Claude (Phase 0 of the UI/UX verification plan). All fixed findings verified by the full pipeline: lint → functional (cross-browser) → navigation → visual → Lighthouse-on-prod.*
