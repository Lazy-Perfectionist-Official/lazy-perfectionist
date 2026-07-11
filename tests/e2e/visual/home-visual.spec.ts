import { test, expect } from '@playwright/test';

/**
 * Visual Regression Tests for Homepage
 * Tests critical UI components and design consistency
 */

test.describe('Visual Regression - Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for loading screen to complete
    try {
      await page.waitForSelector('[data-testid="loading-screen"]', { state: 'detached', timeout: 5000 });
    } catch {
      // Continue if loading screen not found
    }
    await page.waitForLoadState('networkidle');
  });

  test('homepage hero section @visual', async ({ page }) => {
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();
    await page.waitForTimeout(1000); // Wait for animations
    await expect(page).toHaveScreenshot('homepage-hero.png', {
      maxDiffPixels: 100,
      threshold: 0.2,
    });
  });

  test('homepage full page @visual', async ({ page }) => {
    await page.waitForTimeout(2000); // Wait for all animations
    await expect(page).toHaveScreenshot('homepage-full.png', {
      fullPage: true,
      maxDiffPixels: 500,
      threshold: 0.3,
    });
  });

  test('homepage dark mode @visual', async ({ page }) => {
    // Check if dark mode toggle exists
    const darkModeToggle = page.locator('[data-testid="dark-mode-toggle"], button[aria-label*="dark"]').first();
    if (await darkModeToggle.isVisible()) {
      await darkModeToggle.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot('homepage-dark.png', {
        fullPage: true,
        maxDiffPixels: 500,
      });
    }
  });

  test('homepage selected works section @visual', async ({ page }) => {
    const worksSection = page.locator('section').filter({ hasText: /works|projects/i }).first();
    if (await worksSection.count() > 0) {
      await worksSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);
      await expect(worksSection).toHaveScreenshot('selected-works.png', {
        maxDiffPixels: 100,
      });
    } else {
      test.skip();
    }
  });

  test('homepage stats section @visual', async ({ page }) => {
    const statsSection = page.locator('section').filter({ hasText: /stats|numbers/i }).first();
    if (await statsSection.count() > 0) {
      await statsSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1500); // Wait for number animations
      await expect(statsSection).toHaveScreenshot('stats-section.png', {
        maxDiffPixels: 100,
      });
    } else {
      test.skip();
    }
  });

  test('homepage contact section @visual', async ({ page }) => {
    const contactSection = page.locator('section').filter({ hasText: /contact|connect/i }).first();
    if (await contactSection.count() > 0) {
      await contactSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await expect(contactSection).toHaveScreenshot('contact-section.png', {
        maxDiffPixels: 100,
      });
    } else {
      test.skip();
    }
  });

  test('homepage mobile viewport @visual', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      fullPage: true,
      maxDiffPixels: 300,
    });
  });

  test('homepage tablet viewport @visual', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot('homepage-tablet.png', {
      fullPage: true,
      maxDiffPixels: 400,
    });
  });

  test('homepage large desktop @visual', async ({ page }) => {
    await page.setViewportSize({ width: 2560, height: 1440 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot('homepage-large.png', {
      fullPage: true,
      maxDiffPixels: 600,
    });
  });

  test('homepage loading screen @visual', async ({ page }) => {
    // Load fresh to catch loading screen
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const loadingScreen = page.locator('[data-testid="loading-screen"]');
    if (await loadingScreen.isVisible({ timeout: 2000 })) {
      await page.waitForTimeout(100);
      await expect(page).toHaveScreenshot('loading-screen.png', {
        maxDiffPixels: 50,
      });
    } else {
      test.skip('Loading screen not visible');
    }
  });
});

test.describe('Visual Regression - Interactive States', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('hover states on navigation @visual', async ({ page }) => {
    const navLinks = page.locator('nav a').first();
    await navLinks.hover();
    await page.waitForTimeout(300);
    await expect(page.locator('nav')).toHaveScreenshot('nav-hover.png', {
      maxDiffPixels: 50,
    });
  });

  test('hover states on work cards @visual', async ({ page }) => {
    const workCards = page.locator('[data-testid="work-card"], .work-card');
    if (await workCards.count() > 0) {
      await workCards.first().scrollIntoViewIfNeeded();
      await workCards.first().hover();
      await page.waitForTimeout(500);
      await expect(workCards.first()).toHaveScreenshot('work-card-hover.png', {
        maxDiffPixels: 50,
      });
    } else {
      test.skip();
    }
  });

  test('hover states on buttons @visual', async ({ page }) => {
    const buttons = page.locator('button').filter({ hasText: /.+/ });
    if (await buttons.count() > 0) {
      await buttons.first().scrollIntoViewIfNeeded();
      await buttons.first().hover();
      await page.waitForTimeout(300);
      await expect(buttons.first()).toHaveScreenshot('button-hover.png', {
        maxDiffPixels: 50,
      });
    } else {
      test.skip();
    }
  });

  test('focus states for accessibility @visual', async ({ page }) => {
    const focusableElements = page.locator('a, button').first();
    await focusableElements.focus();
    await page.waitForTimeout(300);
    await expect(focusableElements).toHaveScreenshot('focus-state.png', {
      maxDiffPixels: 30,
    });
  });

  test('active button press state @visual', async ({ page }) => {
    const buttons = page.locator('button').filter({ hasText: /.+/ });
    if (await buttons.count() > 0) {
      await buttons.first().click();
      await page.waitForTimeout(100);
      await expect(buttons.first()).toHaveScreenshot('button-active.png', {
        maxDiffPixels: 50,
      });
    } else {
      test.skip();
    }
  });
});

test.describe('Visual Regression - Color Consistency', () => {
  test('ORYZO design system colors @visual', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for consistent ORYZO color scheme
    const backgroundColor = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });

    // Should match ORYZO canvas color (approximately)
    expect(backgroundColor).toMatch(/rgb\(20, 20, 20\)|rgb\(15, 15, 15\)|#0c0c0c/i);

    await expect(page).toHaveScreenshot('oryzo-colors.png', {
      fullPage: true,
      maxDiffPixels: 200,
    });
  });

  test('text contrast and readability @visual', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check text contrast
    const textColor = await page.evaluate(() => {
      const textElements = document.querySelectorAll('h1, h2, h3, p');
      const firstText = textElements[0] as HTMLElement;
      return window.getComputedStyle(firstText).color;
    });

    // Text should be light colored on dark background
    expect(textColor).toMatch(/rgb\(2\d\d, 2\d\d, 2\d\d\)|rgb\(248, 248, 248\)|#f5f5f5/i);
  });
});

test.describe('Visual Regression - Typography', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('heading typography @visual', async ({ page }) => {
    const headings = page.locator('h1, h2');
    if (await headings.count() > 0) {
      await headings.first().scrollIntoViewIfNeeded();
      await expect(headings.first()).toHaveScreenshot('heading-typography.png', {
        maxDiffPixels: 50,
      });
    }
  });

  test('body text readability @visual', async ({ page }) => {
    const paragraphs = page.locator('p').filter({ hasText: /.{20,}/ });
    if (await paragraphs.count() > 0) {
      await paragraphs.first().scrollIntoViewIfNeeded();
      await expect(paragraphs.first()).toHaveScreenshot('body-text.png', {
        maxDiffPixels: 50,
      });
    }
  });
});

test.describe('Visual Regression - Spacing and Layout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('section spacing @visual', async ({ page }) => {
    const sections = page.locator('section');
    if (await sections.count() >= 2) {
      await sections.nth(1).scrollIntoViewIfNeeded();
      await expect(page.locator('body')).toHaveScreenshot('section-spacing.png', {
        clip: { x: 0, y: 0, width: 1920, height: 500 },
        maxDiffPixels: 100,
      });
    }
  });

  test('grid and layout consistency @visual', async ({ page }) => {
    const grids = page.locator('[class*="grid"], [data-testid*="grid"]');
    if (await grids.count() > 0) {
      await grids.first().scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await expect(grids.first()).toHaveScreenshot('grid-layout.png', {
        maxDiffPixels: 100,
      });
    }
  });
});
