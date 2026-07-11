import { test, expect } from '@playwright/test';

/**
 * E2E Navigation Tests
 * Tests core navigation flows across all pages
 */

test.describe('Navigation Flows', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Lazy Perfectionist/i);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should navigate to Music page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /music/i }).click();
    await expect(page).toHaveURL(/\/music/);
    await expect(page.getByRole('main')).toBeVisible();
  });

  test('should navigate to Blog page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /blog/i }).click();
    await expect(page).toHaveURL(/\/blog/);
    await expect(page.getByRole('main')).toBeVisible();
  });

  test('should navigate to Store page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /store/i }).click();
    await expect(page).toHaveURL(/\/store/);
    await expect(page.getByRole('main')).toBeVisible();
  });

  test('should navigate to Platform Links page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /platform/i }).click();
    await expect(page).toHaveURL(/\/platform-links/);
  });

  test('should navigate from homepage back to homepage', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /music/i }).click();
    await page.getByRole('link', { name: /home|lazy perfectionist/i }).click();
    await expect(page).toHaveURL('/');
  });

  test('should handle browser back button navigation', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /music/i }).click();
    await page.goBack();
    await expect(page).toHaveURL('/');
    await page.goForward();
    await expect(page).toHaveURL(/\/music/);
  });

  test('should navigate using keyboard', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toBeVisible();
  });

  test('should handle 404 pages gracefully', async ({ page }) => {
    await page.goto('/non-existent-page');
    await expect(page.locator('body')).toContainText(/404|not found/i);
  });

  test('should maintain scroll position during navigation', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, 500));
    const scrollBefore = await page.evaluate(() => window.scrollY);
    await page.goto('/music');
    await page.goBack();
    const scrollAfter = await page.evaluate(() => window.scrollY);
    expect(scrollAfter).toBeGreaterThan(0);
  });

  test('should handle URL parameters correctly', async ({ page }) => {
    await page.goto('/?debug=true');
    await expect(page).toHaveURL(/debug=true/);
    await page.goto('/music?tab=albums');
    await expect(page).toHaveURL(/tab=albums/);
  });
});

test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should show mobile menu on small screens', async ({ page }) => {
    await page.goto('/');
    const mobileMenu = page.getByRole('button', { name: /menu|hamburger/i });
    if (await mobileMenu.isVisible({ timeout: 3000 }).catch(() => false)) {
      await mobileMenu.click();
      await expect(page.getByRole('navigation')).toBeVisible();
    }
  });

  test('should navigate using mobile menu', async ({ page }) => {
    await page.goto('/');
    const mobileMenu = page.getByRole('button', { name: /menu|hamburger/i });
    if (await mobileMenu.isVisible({ timeout: 3000 }).catch(() => false)) {
      await mobileMenu.click();
      await page.getByRole('link', { name: /music/i }).click();
      await expect(page).toHaveURL(/\/music/);
    }
  });

  test('should close mobile menu after navigation', async ({ page }) => {
    await page.goto('/');
    const mobileMenu = page.getByRole('button', { name: /menu|hamburger/i });
    if (await mobileMenu.isVisible({ timeout: 3000 }).catch(() => false)) {
      await mobileMenu.click();
      await page.getByRole('link', { name: /music/i }).click();
      await page.waitForLoadState('networkidle');
      await expect(mobileMenu).not.toHaveAttribute('aria-expanded', 'true');
    }
  });
});

test.describe('Accessibility Navigation', () => {
  test('should have proper ARIA labels on navigation', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation');
    if (await nav.count() > 0) {
      await expect(nav.first()).toBeVisible();
      await expect(nav.first()).toHaveAttribute('role', 'navigation');
    }
  });

  test('should support skip to main content link', async ({ page }) => {
    await page.goto('/');
    const skipLink = page.getByRole('link', { name: /skip to main content/i });
    if (await skipLink.isVisible({ timeout: 2000 }).catch(() => false)) {
      await skipLink.click();
      const mainContent = page.getByRole('main');
      await expect(mainContent).toBeVisible();
    }
  });

  test('should have focus visible on keyboard navigation', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should maintain focus trap in modals', async ({ page }) => {
    await page.goto('/');
    const modalTrigger = page.getByRole('button').filter({ hasText: /connect|contact/i }).first();
    if (await modalTrigger.isVisible({ timeout: 2000 }).catch(() => false)) {
      await modalTrigger.click();
      const modal = page.getByRole('dialog');
      if (await modal.isVisible({ timeout: 2000 }).catch(() => false)) {
        const focusedInModal = await modal.evaluate((el) => el.contains(document.activeElement));
        expect(focusedInModal).toBe(true);
      }
    }
  });
});
