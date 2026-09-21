import { test, expect, Page } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';
// Canonical desktop preset shipped inside Lighthouse 12 — the same settings
// the `--preset=desktop` CLI flag applies (desktop formFactor, dense-4G
// throttling, 1350x940 emulation). Without it Lighthouse defaults to a
// simulated Moto G Power on slow 4G, which describes a device class and
// network we do not primarily ship for on the desktop lanes.
// @ts-expect-error Lighthouse ships no types for deep config imports
import desktopConfig from 'lighthouse/core/config/lr-desktop-config.js';

/**
 * Lighthouse audits against the PRODUCTION build.
 *
 * Runs via the dedicated `playwright.lighthouse.config.ts`, which builds the
 * site and serves it with `next start` on port 3001 — dev-server scores
 * measure Next.js compile-on-demand, not the shipped site. playwright-
 * lighthouse connects to Chrome's CDP port 9222, which that config's
 * launchOptions open. Serial mode keeps workers from fighting over the port.
 *
 * playwright-lighthouse v4 API realities this file is written against
 * (verified against its source):
 * - Only CATEGORY-level thresholds are compared (performance, accessibility,
 *   best-practices, seo). Audit-level threshold keys silently compare against
 *   undefined and always "pass" — so per-audit assertions are made explicitly
 *   below from the returned Lighthouse result object instead.
 * - Top-level `audits`/`onlyAudits` options are ignored; restricting a run to
 *   certain categories happens by listing only those categories in thresholds.
 *
 * Lighthouse 12 removed the PWA category and its audits (service-worker,
 * installable-manifest, maskable-icon) plus js-libraries, tap-targets, and
 * sitemap. Coverage replacements live here as direct checks, and tap-target
 * coverage lives in a11y/accessibility.spec.ts (full-coverage bounding-box
 * test, which is stricter than the removed audit).
 */

const CDP_PORT = 9222;

type LhrAudits = Record<string, { score: number | null; numericValue?: number | null }>;

/**
 * Assert a binary Lighthouse audit (axe/SEO/best-practices) has no violations.
 * Binary audits score 1 = pass, 0 = violations found, and null = not
 * applicable (no matching elements on the page — e.g. aria-input-field-name
 * on a page with no forms), which is also a pass.
 */
function expectAuditPass(lhr: { audits: LhrAudits }, id: string) {
  const score = lhr.audits[id]?.score;
  expect(
    score === 1 || score === null,
    `Lighthouse audit "${id}" must not have violations (score: ${score})`,
  ).toBe(true);
}

/** Assert a metric audit's measured value stays under budget (ms / unitless). */
function expectMetricUnderBudget(
  lhr: { audits: LhrAudits },
  id: string,
  budget: number,
) {
  const value = lhr.audits[id]?.numericValue;
  expect(value, `Lighthouse metric "${id}" must have a measured value`).toBeDefined();
  expect(value!, `Lighthouse metric "${id}" must stay under ${budget}`).toBeLessThan(budget);
}

/**
 * Shared audit call. Storage reset stays ENABLED (Lighthouse default) so every
 * run measures a cold first visit — playwright-lighthouse disables it by
 * default, which would let the service worker flatter the scores.
 */
function audit(
  page: Page,
  thresholds: Record<string, number>,
  options: { config?: unknown; reportName?: string } = {},
) {
  return playAudit({
    page,
    port: CDP_PORT,
    thresholds,
    opts: { disableStorageReset: false },
    ...(options.config ? { config: options.config } : {}),
    // HTML report per run (gitignored) — the evidence trail for threshold
    // failures and score variance.
    ...(options.reportName
      ? {
          reports: {
            formats: { html: true },
            name: options.reportName,
            directory: 'reports/lighthouse',
          },
        }
      : {}),
  }) as Promise<{ lhr: { audits: LhrAudits } }>;
}

test.describe.configure({ mode: 'serial' });

test.describe('Lighthouse Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
  });

  test('homepage scores @lighthouse', async ({ page }) => {
    await audit(
      page,
      { performance: 80, accessibility: 90, 'best-practices': 80, seo: 90 },
      { config: desktopConfig, reportName: 'homepage' },
    );
  });

  test('homepage Core Web Vitals budget @lighthouse', async ({ page }) => {
    const results = await audit(page, { performance: 80 }, { config: desktopConfig });
    expectMetricUnderBudget(results.lhr, 'first-contentful-paint', 2000);
    expectMetricUnderBudget(results.lhr, 'largest-contentful-paint', 2500);
    expectMetricUnderBudget(results.lhr, 'cumulative-layout-shift', 0.1);
    expectMetricUnderBudget(results.lhr, 'total-blocking-time', 300);
    expectMetricUnderBudget(results.lhr, 'speed-index', 3400);
  });

  test('bundle size monitoring @lighthouse', async ({ page }) => {
    const resourceMetrics = await page.evaluate(() => {
      return performance
        .getEntriesByType('resource')
        .filter((entry: PerformanceEntry) => entry.name.includes('.js'))
        .map((entry: PerformanceEntry) => ({
          name: entry.name,
          size: (entry as PerformanceResourceTiming).transferSize,
        }));
    });

    // No single JS chunk over 500KB over the wire
    const largeBundles = resourceMetrics.filter((bundle) => bundle.size > 500000);
    expect(
      largeBundles,
      `JS bundles over 500KB: ${largeBundles.map((b) => `${b.name} (${b.size}B)`).join(', ')}`,
    ).toHaveLength(0);
  });
});

test.describe('Lighthouse Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
  });

  test('axe audits pass @lighthouse', async ({ page }) => {
    const results = await audit(
      page,
      { accessibility: 90 },
      { config: desktopConfig, reportName: 'homepage-a11y' },
    );
    expectAuditPass(results.lhr, 'color-contrast');
    expectAuditPass(results.lhr, 'image-alt');
    expectAuditPass(results.lhr, 'link-name');
    expectAuditPass(results.lhr, 'aria-valid-attr-value');
    expectAuditPass(results.lhr, 'aria-input-field-name');
  });
});

test.describe('Lighthouse SEO', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
  });

  test('SEO audits pass @lighthouse', async ({ page }) => {
    const results = await audit(page, { seo: 90 }, { config: desktopConfig, reportName: 'homepage-seo' });
    expectAuditPass(results.lhr, 'meta-description');
    expectAuditPass(results.lhr, 'document-title');
    expectAuditPass(results.lhr, 'http-status-code');
    expectAuditPass(results.lhr, 'is-crawlable');
    expectAuditPass(results.lhr, 'robots-txt');
  });

  // Lighthouse 12 removed the sitemap audit; it fetched the sitemap declared
  // in robots.txt and checked it resolved. This gate asserts the declaration
  // our build ships; the live prod URL's availability is a deployment
  // concern (monitoring), not a local build gate — it must not fail the
  // pipeline when the production host is down.
  test('sitemap declared in robots.txt @lighthouse', async ({ request }) => {
    const robots = await (await request.get('/robots.txt')).text();
    const declared = robots.match(/^Sitemap:\s*(\S+)/m)?.[1];
    expect(declared, 'robots.txt must declare a Sitemap').toBeTruthy();
    expect(declared!, 'declared Sitemap must be an absolute https URL').toMatch(
      /^https:\/\/\S+\.xml$/,
    );
  });
});

test.describe('Lighthouse Best Practices', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
  });

  // Both audits relax their requirements on localhost, so they measure the
  // page's own insecure requests rather than the http:// origin itself.
  test('best practices audits pass @lighthouse', async ({ page }) => {
    const results = await audit(
      page,
      { 'best-practices': 80 },
      { config: desktopConfig, reportName: 'homepage-best-practices' },
    );
    expectAuditPass(results.lhr, 'is-on-https');
    expectAuditPass(results.lhr, 'redirects-http');
  });
});

test.describe('PWA installability', () => {
  // Lighthouse 12 removed the PWA category and its audits. These direct
  // checks verify the same installability preconditions against the
  // production server.
  test('service worker is served @lighthouse', async ({ request }) => {
    const res = await request.get('/sw.js');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type'] ?? '').toContain('javascript');
    expect((await res.text()).length, 'service worker should be a real script').toBeGreaterThan(
      1000,
    );
  });

  test('web app manifest is complete and linked @lighthouse', async ({ page, request }) => {
    await page.goto('/');
    await expect(page.locator('link[rel="manifest"]')).toHaveAttribute('href', /manifest/);

    const res = await request.get('/manifest.json');
    expect(res.status()).toBe(200);
    const manifest = await res.json();

    expect(manifest.name || manifest.short_name, 'manifest must name the app').toBeTruthy();
    expect(manifest.start_url, 'manifest must declare a start_url').toBeTruthy();

    const icons: Array<{ sizes?: string; purpose?: string }> = manifest.icons ?? [];
    const iconAtLeast = (px: number) => (icon: { sizes?: string }) =>
      (icon.sizes ?? '')
        .split(/\s+/)
        .some((size) => parseInt(size.split('x')[0], 10) >= px);
    expect(
      icons.some(iconAtLeast(192)),
      'manifest must include an icon of at least 192px',
    ).toBeTruthy();
    expect(
      icons.some((icon) => (icon.purpose ?? '').includes('maskable')),
      'manifest must include a maskable icon',
    ).toBeTruthy();
  });
});

test.describe('Lighthouse Multi-Page Performance', () => {
  // /store is excluded: it is a client-side redirect page to
  // https://ko-fi.com/lazyperfectionist/shop, so a Lighthouse run there would
  // audit Ko-fi's site, not ours. The redirect itself is covered in
  // ux/user-journeys.spec.ts.
  const pages = [
    { path: '/music', name: 'music' },
    { path: '/blog', name: 'blog' },
  ];

  for (const pageConfig of pages) {
    test(`${pageConfig.name} scores @lighthouse`, async ({ page }) => {
      await page.goto(pageConfig.path, { waitUntil: 'networkidle' });
      await audit(
        page,
        { performance: 75, accessibility: 85, seo: 85 },
        { config: desktopConfig, reportName: pageConfig.name },
      );
    });
  }
});

test.describe('Lighthouse Mobile Performance', () => {
  // No desktop config here: Lighthouse's defaults are a simulated Moto G
  // Power on slow 4G — the constrained device class mobile users actually
  // get, and the condition our mobile thresholds budget for.
  test.use({ viewport: { width: 375, height: 667 } });

  test('mobile scores and mobile-only audits @lighthouse', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const results = await audit(
      page,
      { performance: 70, accessibility: 85, seo: 85 },
      { reportName: 'homepage-mobile' },
    );
    // viewport: page must define a mobile viewport meta tag (SEO category).
    expectAuditPass(results.lhr, 'viewport');
    // target-size: Lighthouse 12's successor to the removed tap-targets
    // audit — interactive elements large enough to tap on touch screens.
    expectAuditPass(results.lhr, 'target-size');
  });
});
