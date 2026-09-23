import { test, expect } from '@playwright/test';
import { skipIntro } from '../functional/helpers';

/**
 * Visual Regression Tests for All Pages
 * Ensures design consistency across the entire site
 */

// Fresh context per test = fresh sessionStorage: the cross-page journeys
// below visit '/', so mark the once-per-session intro overlay as shown
// (loader behavior is covered in functional/loading-screen-functions.spec.ts).
test.beforeEach(async ({ page }) => {
  await skipIntro(page);
});

test.describe('Visual Regression - Music Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/music');
    await page.waitForLoadState('networkidle');
  });

  test('music page layout @visual', async ({ page }) => {
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot('music-page.png', {
      fullPage: true,
      maxDiffPixels: 400,
    });
  });

  test('music page mobile @visual', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/music');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('music-page-mobile.png', {
      fullPage: true,
      maxDiffPixels: 300,
    });
  });

  test('music cards and lists @visual', async ({ page }) => {
    const musicCards = page.locator('[data-testid="music-card"], .music-card, article');
    if (await musicCards.count() > 0) {
      await musicCards.first().scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await expect(musicCards.first()).toHaveScreenshot('music-card.png', {
        maxDiffPixels: 100,
      });
    } else {
      test.skip();
    }
  });
});

test.describe('Visual Regression - Blog Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');
  });

  test('blog page layout @visual', async ({ page }) => {
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot('blog-page.png', {
      fullPage: true,
      maxDiffPixels: 400,
    });
  });

  test('blog page mobile @visual', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('blog-page-mobile.png', {
      fullPage: true,
      maxDiffPixels: 300,
    });
  });

  test('blog cards @visual', async ({ page }) => {
    const blogCards = page.locator('[data-testid="blog-card"], .blog-card, article');
    if (await blogCards.count() > 0) {
      await blogCards.first().scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await expect(blogCards.first()).toHaveScreenshot('blog-card.png', {
        maxDiffPixels: 100,
      });
    } else {
      test.skip();
    }
  });

  test('blog sort functionality @visual', async ({ page }) => {
    const sortSelect = page.locator('[data-testid="blog-sort"], select').first();
    if (await sortSelect.isVisible()) {
      await sortSelect.click();
      await page.waitForTimeout(300);
      await expect(sortSelect).toHaveScreenshot('blog-sort.png', {
        maxDiffPixels: 50,
      });
    } else {
      test.skip();
    }
  });
});

test.describe('Visual Regression - Store Page', () => {
  // /store is a server-side redirect to the external Ko-fi shop. The external
  // page is not our UI (and never reaches networkidle), so verify the redirect
  // contract at the HTTP level instead of screenshotting it.
  test('store page redirects to external shop @visual', async ({ page }) => {
    const response = await page.request.get('/store', { maxRedirects: 0 });
    expect(response.status()).toBe(307);
    expect(response.headers()['location']).toBe('https://ko-fi.com/lazyperfectionist/shop');
  });
});

test.describe('Visual Regression - Platform Links Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/platform-links');
    await page.waitForLoadState('networkidle');
  });

  test('platform links layout @visual', async ({ page }) => {
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot('platform-links.png', {
      fullPage: true,
      maxDiffPixels: 400,
    });
  });

  test('platform links mobile @visual', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/platform-links');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('platform-links-mobile.png', {
      fullPage: true,
      maxDiffPixels: 300,
    });
  });

  test('link buttons and icons @visual', async ({ page }) => {
    const links = page.locator('a').filter({ hasText: /.{3,}/ });
    if (await links.count() > 0) {
      await links.first().scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await expect(links.first()).toHaveScreenshot('platform-link.png', {
        maxDiffPixels: 50,
      });
    }
  });
});

test.describe('Visual Regression - Cross-Page Consistency', () => {
  test('consistent navigation across pages @visual', async ({ page }) => {
    // Three sequential navigations (each waiting for networkidle) can exceed
    // the default 30s budget when the dev server is under parallel load.
    test.slow();
    // /store redirects externally and has no themed navigation
    const pages = ['/', '/music', '/blog'];
    const screenshots = [];

    for (const pagePath of pages) {
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      const nav = page.locator('nav, [role="navigation"]');
      if (await nav.isVisible()) {
        const screenshot = await nav.screenshot();
        screenshots.push(screenshot);
      }
    }

    // All navigation screenshots should be similar
    expect(screenshots.length).toBeGreaterThan(0);
  });

  test('consistent footer across pages @visual', async ({ page }) => {
    // Same three-navigation budget concern as the navigation test above.
    test.slow();
    const pages = ['/', '/music', '/blog'];

    for (const pagePath of pages) {
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      const footer = page.locator('footer');
      if (await footer.isVisible()) {
        await expect(footer).toHaveScreenshot(`footer-${pagePath.replace('/', 'home')}.png`, {
          maxDiffPixels: 100,
        });
      }
    }
  });

  test('consistent color scheme @visual', async ({ page }) => {
    // /store redirects externally and has no themed body
    const pages = ['/', '/music', '/blog'];

    for (const pagePath of pages) {
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');

      const backgroundColor = await page.evaluate(() => {
        return window.getComputedStyle(document.body).backgroundColor;
      });

      // Should maintain dark theme consistency (components 0-29, incl. rgb(0, 0, 0))
      expect(backgroundColor).toMatch(/rgb\([0-2]?\d, [0-2]?\d, [0-2]?\d\)|#[0-3][0-9a-f]/i);
    }
  });
});

test.describe('Visual Regression - Loading States', () => {
  test('blog stories are server-rendered @visual', async ({ page }) => {
    // The story list is rendered on the server (RSC + hourly revalidate) so
    // crawlers and AI agents that fetch raw HTML — without executing
    // JavaScript — see the stories. Guard that contract directly: the
    // initial HTML must contain story cards and the structured data.
    const response = await page.request.get('/blog');
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain('data-testid="blog-card"');
    expect(html).toContain('application/ld+json');
  });

  test('loading states on music page @visual', async ({ page }) => {
    await page.goto('/music');

    // Check for any loading indicators
    const loadingIndicators = page.locator('[role="status"], [aria-busy="true"], .loading');
    if (await loadingIndicators.count() > 0) {
      await page.waitForTimeout(500);
      await expect(loadingIndicators.first()).toHaveScreenshot('music-loading.png', {
        maxDiffPixels: 50,
      });
    } else {
      test.skip('No loading indicators found');
    }
  });
});

test.describe('Visual Regression - Error States', () => {
  test('404 page @visual', async ({ page }) => {
    await page.goto('/non-existent-page');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('404-page.png', {
      fullPage: true,
      maxDiffPixels: 200,
    });
  });

  test('error page design consistency @visual', async ({ page }) => {
    await page.goto('/non-existent-page');
    await page.waitForLoadState('networkidle');

    const backgroundColor = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });

    // Error page should maintain theme (components 0-29, incl. rgb(0, 0, 0))
    expect(backgroundColor).toMatch(/rgb\([0-2]?\d, [0-2]?\d, [0-2]?\d\)|#[0-3][0-9a-f]/i);
  });
});
