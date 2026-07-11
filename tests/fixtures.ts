import { test as base } from '@playwright/test';
import type { Page } from '@playwright/test';

/**
 * Extended test fixtures for Lazy Perfectionist website
 * Provides custom test utilities and page interactions
 */

interface PortfolioPage {
  waitForLoadingScreen: () => Promise<void>;
  navigateToMusic: () => Promise<void>;
  navigateToBlog: () => Promise<void>;
  navigateToStore: () => Promise<void>;
  navigateToConnect: () => Promise<void>;
  scrollToBottom: () => Promise<void>;
  waitForAnimations: () => Promise<void>;
  takeScreenshot: (name: string) => Promise<void>;
}

// Extend base test with portfolio-specific fixtures
const test = base.extend<{
  portfolioPage: PortfolioPage;
}>({
  portfolioPage: async ({ page }, use) => {
    const portfolioPage: PortfolioPage = {
      // Wait for loading screen to complete
      async waitForLoadingScreen() {
        try {
          await page.waitForSelector('[data-testid="loading-screen"]', { state: 'detached', timeout: 5000 });
        } catch {
          // Loading screen might not be present in all cases
          console.log('Loading screen not detected or already completed');
        }
      },

      // Navigate to Music page
      async navigateToMusic() {
        await page.getByRole('link', { name: /music/i }).click();
        await page.waitForLoadState('networkidle');
      },

      // Navigate to Blog page
      async navigateToBlog() {
        await page.getByRole('link', { name: /blog/i }).click();
        await page.waitForLoadState('networkidle');
      },

      // Navigate to Store page
      async navigateToStore() {
        await page.getByRole('link', { name: /store/i }).click();
        await page.waitForLoadState('networkidle');
      },

      // Navigate to Connect page
      async navigateToConnect() {
        await page.getByRole('link', { name: /connect/i }).click();
        await page.waitForLoadState('networkidle');
      },

      // Scroll to bottom of page
      async scrollToBottom() {
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      },

      // Wait for GSAP and Framer Motion animations to complete
      async waitForAnimations() {
        // Wait for scroll-based animations
        await page.waitForTimeout(500);
        // Ensure scroll position has settled
        await page.waitForLoadState('domcontentloaded');
      },

      // Take a screenshot with consistent naming
      async takeScreenshot(name: string) {
        await page.screenshot({
          path: `test-results/screenshots/${name}.png`,
          fullPage: true,
        });
      },
    };

    await use(portfolioPage);
  },
});

export { test, expect } from '@playwright/test';
export type { PortfolioPage };
