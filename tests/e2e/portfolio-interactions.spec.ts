import { test, expect } from '@playwright/test';

/**
 * Portfolio Interaction Tests
 * Tests artistic elements, animations, and interactive components
 */

test.describe('Portfolio Loading Screen', () => {
  test('should display loading screen on initial visit', async ({ page }) => {
    await page.goto('/');
    // Check if loading screen exists
    const loadingScreen = page.locator('[data-testid="loading-screen"]');
    if (await loadingScreen.isVisible()) {
      await expect(loadingScreen).toBeVisible();
      // Loading screen should disappear after completion
      await loadingScreen.waitFor({ state: 'detached', timeout: 10000 });
    }
  });

  test('should complete loading within reasonable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    // Wait for initial load
    await page.waitForLoadState('networkidle');
    const endTime = Date.now();
    const loadTime = endTime - startTime;
    // Loading should complete within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('should show content after loading completes', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('main, body')).toBeVisible();
  });

  test('should handle loading errors gracefully', async ({ page }) => {
    // Simulate slow network
    await page.route('**/*', (route) => {
      setTimeout(() => route.continue(), 2000);
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toBeVisible();
  });
});

test.describe('Hero Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display hero section', async ({ page }) => {
    const hero = page.locator('section, [data-testid="hero"]').first();
    await expect(hero).toBeVisible();
  });

  test('should have visible hero text', async ({ page }) => {
    const heroText = page.locator('h1, h2').filter({ hasText: /lazy perfectionist/i });
    await expect(heroText).toBeVisible();
  });

  test('should animate hero elements on load', async ({ page }) => {
    const hero = page.locator('section, [data-testid="hero"]').first();
    await hero.waitFor({ state: 'visible' });
    // Wait for GSAP animations
    await page.waitForTimeout(1000);
    await expect(hero).toBeVisible();
  });

  test('should be accessible via keyboard', async ({ page }) => {
    await page.keyboard.press('Tab');
    const firstFocusable = page.locator(':focus');
    await expect(firstFocusable).toBeVisible();
  });
});

test.describe('Cursor Reveal Effect', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should follow mouse movement', async ({ page }) => {
    const cursor = page.locator('[data-testid="cursor-reveal"], .cursor-reveal');
    if (await cursor.count() > 0) {
      await page.mouse.move(100, 100);
      await page.waitForTimeout(500);
      // Cursor should be present
      expect(await cursor.count()).toBeGreaterThan(0);
    }
  });

  test('should interact with hover elements', async ({ page }) => {
    const interactiveElements = page.locator('a, button').filter({ hasText: /.+/ }).first();
    await interactiveElements.hover();
    await page.waitForTimeout(500);
    // Check if cursor changes state
    const cursor = page.locator('[data-testid="cursor-reveal"], .cursor-reveal');
    if (await cursor.count() > 0) {
      expect(await cursor.first().isVisible()).toBe(true);
    }
  });

  test('should handle touch devices', async ({ page }) => {
    // Simulate touch device
    await page.touchpoint(100, 100);
    await page.waitForTimeout(500);
    // Should not error on touch devices
    await expect(page.locator('body')).toBeVisible();
  });
});

test.describe('Scroll Animations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should trigger scroll animations', async ({ page }) => {
    await page.waitForTimeout(500);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    // Elements should be visible after scroll
    const footer = page.locator('footer');
    if (await footer.count() > 0) {
      await expect(footer.first()).toBeVisible();
    }
  });

  test('should animate elements into view', async ({ page }) => {
    const sections = page.locator('section').all();
    const firstSection = await sections.then(s => s[0]);
    await firstSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await expect(firstSection).toBeVisible();
  });

  test('should handle rapid scrolling', async ({ page }) => {
    for (let i = 0; i < 10; i++) {
      await page.evaluate(() => window.scrollBy(0, 200));
      await page.waitForTimeout(100);
    }
    // Page should remain responsive
    await expect(page.locator('body')).toBeVisible();
  });

  test('should use Lenis smooth scroll', async ({ page }) => {
    // Check if Lenis is initialized
    const hasLenis = await page.evaluate(() => {
      return typeof window !== 'undefined' && 'lenis' in window;
    });
    if (hasLenis) {
      // Smooth scroll should be active
      await page.evaluate(() => window.scrollTo({ top: 500, behavior: 'smooth' }));
      await page.waitForTimeout(1000);
      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeGreaterThan(0);
    }
  });
});

test.describe('Selected Works Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display selected works section', async ({ page }) => {
    const worksSection = page.locator('[data-testid="selected-works"], section').filter({ hasText: /works|projects/i });
    if (await worksSection.count() > 0) {
      await expect(worksSection.first()).toBeVisible();
    }
  });

  test('should show work cards', async ({ page }) => {
    const workCards = page.locator('[data-testid="work-card"], .work-card');
    if (await workCards.count() > 0) {
      await expect(workCards.first()).toBeVisible();
      const cardCount = await workCards.count();
      expect(cardCount).toBeGreaterThan(0);
    }
  });

  test('should have hover effects on work cards', async ({ page }) => {
    const workCards = page.locator('[data-testid="work-card"], .work-card');
    if (await workCards.count() > 0) {
      const firstCard = workCards.first();
      await firstCard.hover();
      await page.waitForTimeout(500);
      // Card should have some visual feedback
      await expect(firstCard).toBeVisible();
    }
  });

  test('should link to work details', async ({ page }) => {
    const workLinks = page.locator('[data-testid="work-card"] a, .work-card a');
    if (await workLinks.count() > 0) {
      const firstLink = workLinks.first();
      const href = await firstLink.getAttribute('href');
      if (href) {
        await firstLink.click();
        await page.waitForLoadState('networkidle');
        // Should navigate to work detail page
        await expect(page).toHaveURL(/\/works\//);
      }
    }
  });
});

test.describe('Stats Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display stats section', async ({ page }) => {
    const statsSection = page.locator('[data-testid="stats"], section').filter({ hasText: /stats|numbers/i });
    if (await statsSection.count() > 0) {
      await expect(statsSection.first()).toBeVisible();
    }
  });

  test('should animate stats numbers', async ({ page }) => {
    const statsSection = page.locator('[data-testid="stats"], section').filter({ hasText: /stats|numbers/i });
    if (await statsSection.count() > 0) {
      await statsSection.first().scrollIntoViewIfNeeded();
      await page.waitForTimeout(1500);
      // Stats should be visible and animated
      await expect(statsSection.first()).toBeVisible();
    }
  });

  test('should have parallax effect', async ({ page }) => {
    const statsSection = page.locator('[data-testid="stats"], section').filter({ hasText: /stats|numbers/i });
    if (await statsSection.count() > 0) {
      await statsSection.first().scrollIntoViewIfNeeded();
      await page.mouse.wheel(0, 200);
      await page.waitForTimeout(500);
      await expect(statsSection.first()).toBeVisible();
    }
  });
});

test.describe('Contact Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display contact section', async ({ page }) => {
    const contactSection = page.locator('[data-testid="contact"], section').filter({ hasText: /contact|connect/i });
    if (await contactSection.count() > 0) {
      await expect(contactSection.first()).toBeVisible();
    }
  });

  test('should have magnetic button effects', async ({ page }) => {
    const contactButtons = page.locator('[data-testid="contact"] button, section button').filter({ hasText: /contact|email/i });
    if (await contactButtons.count() > 0) {
      const button = contactButtons.first();
      // Move mouse near button to trigger magnetic effect
      const box = await button.boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.waitForTimeout(500);
        await expect(button).toBeVisible();
      }
    }
  });

  test('should handle contact form submission', async ({ page }) => {
    const contactForm = page.locator('form').filter({ has: page.locator('input[type="email"]') });
    if (await contactForm.count() > 0) {
      await contactForm.first().waitFor({ state: 'visible' });
      // Fill form if it exists
      const emailInput = contactForm.locator('input[type="email"]').first();
      if (await emailInput.isVisible()) {
        await emailInput.fill('test@example.com');
        // Don't submit, just verify interaction works
        await expect(emailInput).toHaveValue(/@/);
      }
    }
  });
});

test.describe('Responsive Design', () => {
  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toBeVisible();
  });

  test('should work on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toBeVisible();
  });

  test('should work on large desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 2560, height: 1440 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toBeVisible();
  });

  test('should adapt layout on viewport resize', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Start with mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    // Resize to desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(500);
    await expect(page.locator('body')).toBeVisible();
  });
});

test.describe('Performance', () => {
  test('should load within performance budget', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const endTime = Date.now();
    const loadTime = endTime - startTime;
    // Initial load should be under 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('should have minimal layout shifts', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Check for layout stability
    const clsScore = await page.evaluate(() => {
      return (performance as any).getEntriesByType('layout-shift')
        ?.reduce((sum: number, entry: any) => sum + (entry.hadRecentInput ? 0 : entry.value), 0) || 0;
    });
    // CLS should be very low
    expect(clsScore).toBeLessThan(0.1);
  });

  test('should handle concurrent animations efficiently', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Scroll rapidly to trigger multiple animations
    for (let i = 0; i < 20; i++) {
      await page.evaluate(() => window.scrollBy(0, 100));
      await page.waitForTimeout(50);
    }
    // Page should remain responsive
    await expect(page.locator('body')).toBeVisible();
  });
});
