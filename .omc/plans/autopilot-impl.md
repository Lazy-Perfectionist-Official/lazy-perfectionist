# Plan — print-issue revamp

1. Tokens + base (`globals.css`): paper palette, light color-scheme, Bodoni /
   Courier font vars, rust focus ring, mono eyebrow/quiet-link, halftone
   utility; delete unused `ember-button` / `display-link`; update stale
   grain comment.
2. Fonts (`layout.tsx`): Inter + Bodoni Moda + Courier Prime; themeColor
   paper. Manifest theme/background to paper.
3. Chrome: announcement bar mono; masthead paper with Bodoni wordmark.
4. Releases: plate header (label / Bodoni h2 + italic lede / year range),
   printed tracklist rows.
5. Connect: plate header, destination rows in Bodoni + mono meta.
6. Footer: ink band with halftone screen, paper text.
7. Verify: tsc, ESLint, stylelint, both Playwright suites (testids and
   accessible names unchanged), screenshots at 1440/1024/768/375, contrast
   check, keyboard focus, zero overflow.
8. Changelog + commit; deslop pass on changed files; independent review.

Risks: font fetch at build (next/font) — verify dev renders; paper seam at
the hero edge — the hero is full-bleed so only the bottom edge meets paper,
and the crop there is paper on landscape; the mobile fold ends on the wall,
which reads as the print's trim.
