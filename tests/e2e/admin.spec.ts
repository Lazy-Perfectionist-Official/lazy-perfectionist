import { expect, test } from '@playwright/test';

// /admin is the hidden door: a static Sveltia CMS page whose only authority
// is GitHub. The public site never loads a byte of it, and these checks read
// the served HTML itself, so they pass even with the CDN unreachable — the
// login that matters is the repo's, and that cannot be tested from here.
test.describe('admin', () => {
  test('the hidden door is served, pinned and unlisted', async ({ page }) => {
    const response = await page.request.get('/admin');
    expect(response.status()).toBe(200);
    const html = await response.text();

    // Unlisted: the robots meta keeps the door out of search (robots.txt
    // already says Disallow: /admin/).
    expect(html).toContain('name="robots" content="noindex, nofollow"');

    // Pinned: the CMS version is part of the site, not floating on @latest.
    expect(html).toContain('@sveltia/cms@0.261.0/dist/sveltia-cms.js');

    // Aimed at this repo's main branch, so a save commits where Vercel
    // builds — nowhere else.
    expect(html).toContain('Lazy-Perfectionist-Official/lazy-perfectionist');
    expect(html).toContain('"main"');
  });

  test('the door opens in a browser: the rewrite serves the page at /admin', async ({ page }) => {
    const response = await page.goto('/admin');
    expect(response?.status()).toBe(200);

    // Our own inline config ran — Sveltia's bundle is the CDN's business.
    const repo = await page.evaluate(
      () =>
        (
          window as unknown as {
            SVELTIA_CMS_CONFIG?: { backend?: { repo?: string } };
          }
        ).SVELTIA_CMS_CONFIG?.backend?.repo,
    );
    expect(repo).toBe('Lazy-Perfectionist-Official/lazy-perfectionist');
  });
});
