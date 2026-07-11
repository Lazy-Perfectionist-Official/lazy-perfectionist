import { test, expect } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';

/**
 * Lighthouse Performance and Accessibility Tests
 * Integrates Lighthouse auditing into Playwright test suite
 */

test.describe('Lighthouse Performance', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
  });

  test('homepage performance score @lighthouse', async ({ page }) => {
    await playAudit({
      page,
      port: 9222,
      thresholds: {
        performance: 80,
        accessibility: 90,
        'best-practices': 80,
        seo: 90,
      },
    });
  });

  test('homepage Core Web Vitals @lighthouse', async ({ page }) => {
    await playAudit({
      page,
      port: 9222,
      audits: [
        'first-contentful-paint',
        'largest-contentful-paint',
        'cumulative-layout-shift',
        'total-blocking-time',
        'speed-index',
      ],
      thresholds: {
        'first-contentful-paint': 2000,
        'largest-contentful-paint': 2500,
        'cumulative-layout-shift': 0.1,
        'total-blocking-time': 300,
        'speed-index': 3400,
      },
    });
  });
});

test.describe('Lighthouse Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
  });

  test('accessibility audit @lighthouse', async ({ page }) => {
    await playAudit({
      page,
      port: 9222,
      thresholds: {
        accessibility: 90,
      },
    });
  });

  test('accessibility - color contrast @lighthouse', async ({ page }) => {
    await playAudit({
      page,
      port: 9222,
      onlyAudits: ['color-contrast'],
      thresholds: {
        'color-contrast': 80,
      },
    });
  });

  test('accessibility - ARIA attributes @lighthouse', async ({ page }) => {
    await playAudit({
      page,
      port: 9222,
      onlyAudits: ['aria-valid-attr-value', 'aria-input-field-name'],
      thresholds: {
        'aria-valid-attr-value': 90,
        'aria-input-field-name': 80,
      },
    });
  });

  test('accessibility - image alt text @lighthouse', async ({ page }) => {
    await playAudit({
      page,
      port: 9222,
      onlyAudits: ['image-alt'],
      thresholds: {
        'image-alt': 90,
      },
    });
  });

  test('accessibility - link text @lighthouse', async ({ page }) => {
    await playAudit({
      page,
      port: 9222,
      onlyAudits: ['link-name'],
      thresholds: {
        'link-name': 90,
      },
    });
  });
});

test.describe('Lighthouse SEO', () => {
  test('SEO audit @lighthouse', async ({ page }) => {
    await page.goto('/');
    await playAudit({
      page,
      port: 9222,
      thresholds: {
        seo: 90,
      },
    });
  });

  test('SEO - meta tags @lighthouse', async ({ page }) => {
    await page.goto('/');
    await playAudit({
      page,
      port: 9222,
      onlyAudits: ['meta-description', 'document-title', 'http-status-code'],
      thresholds: {
        'meta-description': 80,
        'document-title': 100,
        'http-status-code': 100,
      },
    });
  });

  test('SEO - crawlable content @lighthouse', async ({ page }) => {
    await page.goto('/');
    await playAudit({
      page,
      port: 9222,
      onlyAudits: ['is-crawlable', 'robots-txt', 'sitemap'],
      thresholds: {
        'is-crawlable': 100,
        'robots-txt': 80,
        'sitemap': 80,
      },
    });
  });
});

test.describe('Lighthouse Best Practices', () => {
  test('best practices audit @lighthouse', async ({ page }) => {
    await page.goto('/');
    await playAudit({
      page,
      port: 9222,
      thresholds: {
        'best-practices': 80,
      },
    });
  });

  test('best practices - HTTPS @lighthouse', async ({ page }) => {
    await page.goto('/');
    await playAudit({
      page,
      port: 9222,
      onlyAudits: ['is-on-https', 'redirects-http'],
      thresholds: {
        'is-on-https': 100,
      },
    });
  });

  test('best practices - JavaScript libraries @lighthouse', async ({ page }) => {
    await page.goto('/');
    await playAudit({
      page,
      port: 9222,
      onlyAudits: ['js-libraries'],
      thresholds: {
        'js-libraries': 80,
      },
    });
  });
});

test.describe('Lighthouse PWA', () => {
  test('PWA audit @lighthouse', async ({ page }) => {
    await page.goto('/');
    await playAudit({
      page,
      port: 9222,
      thresholds: {
        pwa: 70,
      },
    });
  });

  test('PWA - service worker @lighthouse', async ({ page }) => {
    await page.goto('/');
    await playAudit({
      page,
      port: 9222,
      onlyAudits: ['service-worker'],
      thresholds: {
        'service-worker': 70,
      },
    });
  });

  test('PWA - manifest @lighthouse', async ({ page }) => {
    await page.goto('/');
    await playAudit({
      page,
      port: 9222,
      onlyAudits: ['installable-manifest', 'maskable-icon'],
      thresholds: {
        'installable-manifest': 70,
      },
    });
  });
});

test.describe('Lighthouse Multi-Page Performance', () => {
  const pages = [
    { path: '/', name: 'homepage' },
    { path: '/music', name: 'music' },
    { path: '/blog', name: 'blog' },
    { path: '/store', name: 'store' },
  ];

  for (const pageConfig of pages) {
    test(`${pageConfig.name} performance @lighthouse`, async ({ page }) => {
      await page.goto(pageConfig.path);
      await playAudit({
        page,
        port: 9222,
        thresholds: {
          performance: 75,
          accessibility: 85,
          seo: 85,
        },
      });
    });
  }
});

test.describe('Lighthouse Mobile Performance', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('mobile performance @lighthouse', async ({ page }) => {
    await page.goto('/');
    await playAudit({
      page,
      port: 9222,
      thresholds: {
        performance: 70,
        accessibility: 85,
        seo: 85,
      },
    });
  });

  test('mobile tap targets @lighthouse', async ({ page }) => {
    await page.goto('/');
    await playAudit({
      page,
      port: 9222,
      onlyAudits: ['tap-targets'],
      thresholds: {
        'tap-targets': 80,
      },
    });
  });

  test('mobile viewport @lighthouse', async ({ page }) => {
    await page.goto('/');
    await playAudit({
      page,
      port: 9222,
      onlyAudits: ['viewport'],
      thresholds: {
        'viewport': 100,
      },
    });
  });
});

test.describe('Lighthouse Performance Regression Detection', () => {
  test('compare with performance budget @lighthouse', async ({ page }) => {
    await page.goto('/');

    // Define performance budget
    const budget = {
      'first-contentful-paint': 2000,
      'largest-contentful-paint': 2500,
      'cumulative-layout-shift': 0.1,
      'total-blocking-time': 300,
      'speed-index': 3400,
    };

    await playAudit({
      page,
      port: 9222,
      onlyAudits: Object.keys(budget) as any,
      thresholds: budget,
    });
  });

  test('bundle size monitoring @lighthouse', async ({ page }) => {
    await page.goto('/');

    const resourceMetrics = await page.evaluate(() => {
      return performance.getEntriesByType('resource')
        .filter((entry: PerformanceEntry) => entry.name.includes('.js'))
        .map((entry: any) => ({
          name: entry.name,
          size: entry.transferSize,
        }));
    });

    // Check for large bundles
    const largeBundles = resourceMetrics.filter((bundle) => bundle.size > 500000);
    expect(largeBundles.length).toBe(0);
  });
});
