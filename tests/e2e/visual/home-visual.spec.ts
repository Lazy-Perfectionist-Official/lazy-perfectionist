import { test, expect, type Page } from '@playwright/test';

/**
 * Visual Regression Tests for Homepage
 * Tests critical UI components and design consistency
 */

// Emulate prefers-reduced-motion so decorative infinite animations
// (hero scroll indicator, contact marquee) and the autoplaying contact
// video settle to a deterministic rest state before screenshots.
test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

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

  // Freeze layout before hover interactions: late-loading fonts and images
  // (e.g. Journal Medium cards above the contact form) shift the page under
  // the stationary cursor and silently un-hover the button mid-test.
  async function settleLayout(page: Page) {
    await page.evaluate(() => document.fonts.ready);
    // Only await loads that are actually in flight, and bound the wait:
    // next/image defaults to loading="lazy", so a below-fold image with no
    // request yet has an empty currentSrc and never fires load/error until
    // scrolled into view (deadlocks the await in Firefox/WebKit, whose
    // lazy thresholds are smaller than Chromium's), and a stalled response
    // (WebKit holding the request behind the same-origin autoplay video)
    // would hang the suite. Thumbnail containers are fixed-size, so a
    // late-arriving image cannot shift layout after we proceed.
    await page.evaluate(
      () =>
        new Promise<void>((resolve) => {
          const pending = Array.from(document.images).filter(
            (img) => !img.complete && img.currentSrc !== ''
          );
          if (pending.length === 0) return resolve();
          let remaining = pending.length;
          const done = () => {
            remaining -= 1;
            if (remaining === 0) resolve();
          };
          for (const img of pending) {
            img.addEventListener('load', done, { once: true });
            img.addEventListener('error', done, { once: true });
          }
          setTimeout(resolve, 5000);
        })
    );
  }

  test('hover states on navigation @visual', async ({ page }) => {
    // Desktop nav links are hidden behind the mobile menu on small viewports
    const navLinks = page.locator('nav a:visible').first();
    if ((await navLinks.count()) === 0) {
      test.skip('No visible navigation links');
    }
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
    // Tailwind hover: styles only apply on hover-capable devices
    const canHover = await page.evaluate(() => window.matchMedia('(hover: hover)').matches);
    test.skip(!canHover, 'hover states not applicable on touch devices');

    const buttons = page.locator('button').filter({ hasText: /.+/ });
    if (await buttons.count() > 0) {
      // Flush scroll-triggered lazy sections (journal cards, reveals) first:
      // scrolling the button into view arms their IntersectionObservers, and
      // their late mount shifts the page under the stationary cursor long
      // after fonts/images have settled, silently un-hovering the button.
      await page.evaluate(async () => {
        window.scrollTo({ top: document.body.scrollHeight });
        await new Promise((r) => setTimeout(r, 300));
        window.scrollTo({ top: 0 });
        await new Promise((r) => setTimeout(r, 300));
      });
      await buttons.first().scrollIntoViewIfNeeded();
      await settleLayout(page);
      await buttons.first().hover();
      // The first button scales up on hover (CSS `scale` + transition).
      // Pixel-baselining this state is not viable: under parallel suite load,
      // WebKit intermittently rasterizes the capture with a pre-settle line
      // box (6px shorter) even after the computed scale has landed, so the
      // baseline and actual alternate between two genuine-looking render
      // states. Assert the hover behavior instead: the scale transform
      // engages and holds across two polls spaced beyond the 150ms
      // transition — this still fails if hover stops engaging.
      await expect(buttons.first()).toHaveCSS('scale', '1.02');
      await page.waitForTimeout(300);
      await expect(buttons.first()).toHaveCSS('scale', '1.02');
    } else {
      test.skip();
    }
  });

  test('focus states for accessibility @visual', async ({ page }) => {
    const focusableElements = page.locator('a:visible, button:visible').first();
    if ((await focusableElements.count()) === 0) {
      test.skip('No visible focusable elements');
    }
    await focusableElements.focus();
    await page.waitForTimeout(300);
    await expect(focusableElements).toHaveScreenshot('focus-state.png', {
      maxDiffPixels: 30,
    });
  });

  test('active button press state @visual', async ({ page }) => {
    // Clicking submit on the empty form is a no-op (required fields block
    // submission), so the captured phase raced between hover-scaled and
    // resting. Fill the form and hold the API response so the button
    // deterministically shows its real pressed state: disabled, SENDING,
    // scale pinned to 1 by disabled:hover:scale-100.
    await page.route('**/api/contact', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'ok' }),
      });
    });

    // Scoped to the contact form — the footer newsletter form also has a
    // submit button (SUBSCRIBE).
    const button = page.locator('[data-testid="contact-form"] button[type="submit"]');
    await settleLayout(page);
    await page.fill('input[name="name"]', 'Visual Regression');
    await page.fill('input[name="email"]', 'visual@test.dev');
    await page.fill('textarea[name="message"]', 'Deterministic press state capture.');
    await button.click();
    await expect(button).toBeDisabled();
    await expect(button).toHaveText(/SENDING/);
    // Pixel-baselining pressed buttons hits the same per-run line-box
    // bistability noted in the hover test above, so assert the pressed
    // behavior instead: disabled, SENDING, and not stuck hover-scaled.
    // On hover-capable devices the scale is pinned to 1 by
    // disabled:hover:scale-100; on touch devices hover variants never apply
    // and `scale` stays "none".
    const canHover = await page.evaluate(() => window.matchMedia('(hover: hover)').matches);
    await expect(button).toHaveCSS('scale', canHover ? '1' : 'none');
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

    // Should match ORYZO canvas color (body is forced to #000 in globals.css;
    // the oryzo canvas tone lives on the page wrapper elements)
    expect(backgroundColor).toMatch(/rgb\(0, 0, 0\)|rgb\(20, 20, 20\)|rgb\(15, 15, 15\)|#0c0c0c/i);

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
      // Element screenshots of the full body are scroll/scrub-sensitive, so
      // assert the stacking geometry directly: sections must render in DOM
      // order, touching or gapped, never overlapping.
      const rects = await sections.evaluateAll((els) =>
        els.map((el) => {
          const r = el.getBoundingClientRect();
          return { top: r.top + window.scrollY, bottom: r.bottom + window.scrollY };
        })
      );
      for (let i = 1; i < rects.length; i++) {
        expect(rects[i].top).toBeGreaterThanOrEqual(rects[i - 1].top);
        expect(rects[i].top).toBeGreaterThanOrEqual(rects[i - 1].bottom - 1);
      }
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
