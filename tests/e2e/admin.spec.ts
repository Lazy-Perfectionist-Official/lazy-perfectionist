import { expect, test } from '@playwright/test';

// /admin is the hidden door: a static Sveltia CMS page whose only authority
// is GitHub. The public site never loads a byte of it, and these checks read
// the served files themselves, so they pass even with the CDN unreachable —
// the login that matters is the repo's, and that cannot be tested from here.
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
  });

  test('the key is where Sveltia looks: config.yml is served at /admin', async ({ page }) => {
    // Sveltia at our pinned version reads no inline window config — on boot
    // it resolves <admin path>/config.yml, so the file must sit beside the
    // page and be aimed at this repo's main, where Vercel builds. (Verified
    // the hard way: an inline config boots straight to "The configuration
    // file could not be retrieved.")
    const response = await page.request.get('/admin/config.yml');
    expect(response.status()).toBe(200);
    const yml = await response.text();
    expect(yml).toContain('Lazy-Perfectionist-Official/lazy-perfectionist');
    expect(yml).toContain('branch: main');
    expect(yml).toContain('src/lib/content.json');
    expect(yml).toContain('src/lib/shop-copy.json');
  });

  test('the door opens in a browser: the rewrite serves the page at /admin', async ({ page }) => {
    const response = await page.goto('/admin');
    expect(response?.status()).toBe(200);
    // The pinned loader is the page's own script; what Sveltia then renders
    // with it is the CDN's business.
    expect(await page.content()).toContain(
      '@sveltia/cms@0.261.0/dist/sveltia-cms.js',
    );
  });
});
