import { test, expect, type Page } from '@playwright/test';

/**
 * User Journey Tests
 * Tests complete user flows and experiences from real user perspective.
 *
 * Rule (proposal Phase 1.3): every assertion must be able to fail. No
 * if-visible guards around expects, no vacuous scroll/tap loops, no
 * post-click assertions weaker than "the body exists".
 */

/** Resolve a nav link at any viewport: open the mobile drawer when there is one. */
async function navLink(page: Page, item: 'music' | 'blog' | 'store') {
  const toggle = page.getByTestId('nav-mobile-toggle');
  if (await toggle.isVisible({ timeout: 1500 }).catch(() => false)) {
    await toggle.click();
  }
  return page
    .locator(`[data-testid="nav-link-${item}"]:visible, [data-testid="nav-mobile-link-${item}"]:visible`)
    .first();
}

test.describe('User Journey - First Time Visitor', () => {
  test('complete homepage exploration journey', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // The scroll must actually land: the page moved and the contact footer
    // (the last content) is rendered.
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(100);
    await expect(page.getByTestId('contact-footer')).toBeVisible();
  });

  test('music discovery journey', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await (await navLink(page, 'music')).click();
    await expect(page).toHaveURL(/\/music$/, { timeout: 15000 });
  });

  test('blog reading journey', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await (await navLink(page, 'blog')).click();
    await expect(page).toHaveURL(/\/blog$/, { timeout: 15000 });
  });

  test('store browsing journey', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await (await navLink(page, 'store')).click();
    // /store is a redirect page: the journey ends on the external Ko-fi shop.
    await expect(page).toHaveURL(/^https:\/\/ko-fi\.com\//, { timeout: 20000 });
  });
});

test.describe('User Journey - Mobile User', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('mobile exploration journey', async ({ page }) => {
    test.skip(
      !(test.info().project.use as { hasTouch?: boolean } | undefined)?.hasTouch,
      'touch project only'
    );
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Real mobile interaction: tap the hamburger, drawer must open.
    await page.touchscreen.tap(
      (await page.getByTestId('nav-mobile-toggle').boundingBox())!.x + 22,
      (await page.getByTestId('nav-mobile-toggle').boundingBox())!.y + 22
    );
    await expect(page.getByTestId('nav-mobile-menu')).toBeVisible();
  });

  test('mobile touch interactions', async ({ page }) => {
    test.skip(
      !(test.info().project.use as { hasTouch?: boolean } | undefined)?.hasTouch,
      'touch project only'
    );
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Journey, not a size gate (sizes are the a11y suite's job): open the
    // drawer by tapping, then navigate somewhere by tapping.
    const toggle = page.getByTestId('nav-mobile-toggle');
    await toggle.tap();
    await expect(page.getByTestId('nav-mobile-menu')).toBeVisible();

    await page.getByTestId('nav-mobile-link-music').tap();
    await expect(page).toHaveURL(/\/music$/, { timeout: 15000 });
  });
});

test.describe('User Journey - Accessibility User', () => {
  test('keyboard-only navigation journey', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Every tab stop must land on a visible element — an invisible focus
    // target is a real keyboard trap.
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);
      const visible = await page.evaluate(() => {
        const el = document.activeElement;
        return el ? window.getComputedStyle(el).visibility !== 'hidden' : false;
      });
      expect(visible, `tab stop ${i} focused an invisible element`).toBe(true);
    }

    // Deterministic keyboard action: focus the Blog nav link (drawer open
    // when the viewport has one) and activate it with Enter.
    const link = await navLink(page, 'blog');
    await link.focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/blog$/, { timeout: 15000 });
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

    // The homepage is a multi-section experience (hero, works, journal,
    // stats, finale, contact…). A collapsed render must fail here.
    expect(sectionCount).toBeGreaterThan(3);

    for (let i = 0; i < Math.min(sectionCount, 5); i++) {
      await sections.nth(i).scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
    }

    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(100);
  });

  test('cross-page content discovery', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await (await navLink(page, 'music')).click();
    await expect(page).toHaveURL(/\/music$/, { timeout: 15000 });
    await page.waitForLoadState('networkidle');

    await (await navLink(page, 'blog')).click();
    await expect(page).toHaveURL(/\/blog$/, { timeout: 15000 });
    await page.waitForLoadState('networkidle');

    await (await navLink(page, 'store')).click();
    // Final hop lands on the external Ko-fi shop (the /store page redirects).
    await expect(page).toHaveURL(/^https:\/\/ko-fi\.com\//, { timeout: 20000 });
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
