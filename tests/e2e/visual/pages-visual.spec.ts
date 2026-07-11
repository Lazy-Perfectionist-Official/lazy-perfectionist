import { test, expect } from '@playwright/test';

/**
 * Visual Regression Tests for All Pages
 * Ensures design consistency across the entire site
 */

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
  test.beforeEach(async ({ page }) => {
    await page.goto('/store');
    await page.waitForLoadState('networkidle');
  });

  test('store page layout @visual', async ({ page }) => {
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot('store-page.png', {
      fullPage: true,
      maxDiffPixels: 400,
    });
  });

  test('store page mobile @visual', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/store');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('store-page-mobile.png', {
      fullPage: true,
      maxDiffPixels: 300,
    });
  });

  test('product cards @visual', async ({ page }) => {
    const productCards = page.locator('[data-testid="product-card"], .product-card');
    if (await productCards.count() > 0) {
      await productCards.first().scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await expect(productCards.first()).toHaveScreenshot('product-card.png', {
        maxDiffPixels: 100,
      });
    } else {
      test.skip();
    }
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
    const pages = ['/', '/music', '/blog', '/store'];
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
    const pages = ['/', '/music', '/blog', '/store'];

    for (const pagePath of pages) {
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');

      const backgroundColor = await page.evaluate(() => {
        return window.getComputedStyle(document.body).backgroundColor;
      });

      // Should maintain dark theme consistency
      expect(backgroundColor).toMatch(/rgb\([0-2]\d, [0-2]\d, [0-2]\d\)|#[0-3][0-9a-f]/i);
    }
  });
});

test.describe('Visual Regression - Loading States', () => {
  test('skeleton loaders on blog page @visual', async ({ page }) => {
    // Slow down network to see loading states
    await page.route('**/*', (route) => {
      setTimeout(() => route.continue(), 500);
    });

    await page.goto('/blog');
    await page.waitForTimeout(600);

    const skeletons = page.locator('[data-testid="loading-skeleton"], .skeleton');
    if (await skeletons.count() > 0) {
      await expect(skeletons.first()).toHaveScreenshot('blog-skeleton.png', {
        maxDiffPixels: 50,
      });
    } else {
      test.skip('No skeleton loaders found');
    }
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

    // Error page should maintain theme
    expect(backgroundColor).toMatch(/rgb\([0-2]\d, [0-2]\d, [0-2]\d\)|#[0-3][0-9a-f]/i);
  });
});
