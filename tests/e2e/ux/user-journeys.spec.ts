import { test, expect } from '@playwright/test';

/**
 * User Journey Tests
 * Tests complete user flows and experiences from real user perspective
 */

test.describe('User Journey - First Time Visitor', () => {
  test('complete homepage exploration journey', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
  });

  test('music discovery journey', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.getByRole('link', { name: /music/i }).click();
    await expect(page.locator('main')).toBeVisible();
  });

  test('blog reading journey', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.getByRole('link', { name: /blog/i }).click();
    await expect(page.locator('main')).toBeVisible();
  });

  test('store browsing journey', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.getByRole('link', { name: /store/i }).click();
    await expect(page.locator('main')).toBeVisible();
  });
});

test.describe('User Journey - Mobile User', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('mobile exploration journey', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.touchscreen.tap(200, 300);
    await page.waitForTimeout(500);
    await expect(page.locator('body')).toBeVisible();
  });

  test('mobile touch interactions', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const buttons = page.locator('button, a[href]');
    const count = await buttons.count();

    for (let i = 0; i < Math.min(count, 5); i++) {
      const target = buttons.nth(i);
      const box = await target.boundingBox();
      if (box) {
        expect(box.width).toBeGreaterThanOrEqual(44);
      }
    }
  });
});

test.describe('User Journey - Accessibility User', () => {
  test('keyboard-only navigation journey', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(200);
    }

    await page.keyboard.press('Enter');
    await page.waitForLoadState('networkidle');
  });

  test('screen reader friendly journey', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('main, [role="main"]')).toHaveCount(1);

    const headings = page.locator('h1, h2, h3');
    expect(await headings.count()).toBeGreaterThan(0);
  });
});

test.describe('User Journey - Performance Conscious User', () => {
  test('fast page load experience', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const endTime = Date.now();

    const loadTime = endTime - startTime;
    expect(loadTime).toBeLessThan(5000);
  });

  test('smooth scroll experience', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.evaluate(() => window.scrollTo({ top: 1000, behavior: 'smooth' }));
    await page.waitForTimeout(1000);

    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(500);
  });
});

test.describe('User Journey - Content Explorer', () => {
  test('deep content exploration', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const sections = page.locator('section');
    const sectionCount = await sections.count();

    for (let i = 0; i < Math.min(sectionCount, 5); i++) {
      await sections.nth(i).scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
    }
  });

  test('cross-page content discovery', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.getByRole('link', { name: /music/i }).click();
    await page.waitForTimeout(500);

    await page.getByRole('link', { name: /blog/i }).click();
    await page.waitForTimeout(500);

    await page.getByRole('link', { name: /store/i }).click();
    await page.waitForTimeout(500);

    await expect(page.locator('main')).toBeVisible();
  });
});

test.describe('User Journey - Error Recovery', () => {
  test('navigation error recovery', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.goto('/non-existent-page');
    await page.waitForLoadState('networkidle');

    const errorContent = page.locator('h1, h2').filter({ hasText: /404|not found/i });
    expect(await errorContent.count()).toBeGreaterThan(0);
  });
});
