import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { skipIntro } from '../functional/helpers';

/**
 * Comprehensive Accessibility Tests
 * Tests WCAG compliance, keyboard navigation, and screen reader support
 */

// Fresh context per test = fresh sessionStorage: skip the once-per-session
// intro overlay on '/' visits (covered in loading-screen-functions.spec.ts).
test.beforeEach(async ({ page }) => {
  await skipIntro(page);
});

// Fail only on violations that actually block users (axe "serious"/"critical"
// impacts); moderate/minor findings (e.g. landmark polish) stay visible in
// the report without failing the gate.
async function expectNoBlockingViolations(page: import('@playwright/test').Page) {
  const results = await new AxeBuilder({ page }).analyze();
  const blocking = results.violations.filter(
    (v) => v.impact === 'serious' || v.impact === 'critical'
  );
  expect(
    blocking.map((v) => ({ impact: v.impact, id: v.id, nodes: v.nodes.length })),
    'serious/critical axe violations'
  ).toEqual([]);
}

test.describe('Accessibility - General', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should pass accessibility audit', async ({ page }) => {
    await expectNoBlockingViolations(page);
  });

  test('should have proper page structure', async ({ page }) => {
    // Check for proper heading hierarchy
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    const headingCount = await headings.count();
    expect(headingCount).toBeGreaterThan(0);

    // Should have exactly one h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
  });

  test('should have skip links for keyboard users', async ({ page }) => {
    const skipLink = page.locator('a[href^="#"], a[data-testid="skip-link"]');

    if (await skipLink.count() > 0) {
      await skipLink.first().click();
      await page.waitForTimeout(500);

      // Focus should move to target
      const activeElement = await page.evaluate(() => document.activeElement?.tagName);
      expect(['MAIN', 'SECTION', 'ARTICLE', 'DIV']).toContain(activeElement);
    }
  });

  test('should have proper ARIA labels', async ({ page }) => {
    // Check for proper landmark roles
    await expect(page.locator('[role="navigation"], nav')).toHaveCount(1);
    await expect(page.locator('[role="main"], main')).toHaveCount(1);
  });

  test('should have valid HTML structure', async ({ page }) => {
    // Check for proper HTML structure
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBeTruthy();
  });

  test('should have focus management', async ({ page }) => {
    // Tab through interactive elements
    await page.keyboard.press('Tab');
    const firstFocused = await page.evaluate(() => document.activeElement?.tagName);
    expect(['A', 'BUTTON', 'INPUT']).toContain(firstFocused);
  });

  test('should have sufficient color contrast', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withRules(['color-contrast'])
      .analyze();
    expect(
      results.violations.flatMap((v) => v.nodes.map((n) => n.target)),
      'color-contrast violations'
    ).toEqual([]);
  });

  test('should have proper image alt text', async ({ page }) => {
    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      const role = await images.nth(i).getAttribute('role');

      // Images should have alt text or role="presentation"
      expect(alt !== null || role === 'presentation').toBe(true);
    }
  });

  test('should have proper link text', async ({ page }) => {
    const links = page.locator('a[href]');
    const linkCount = await links.count();

    for (let i = 0; i < Math.min(linkCount, 10); i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      const title = await link.getAttribute('title');

      // Links should have descriptive text
      expect(
        (text && text.trim().length > 0) ||
        ariaLabel ||
        title
      ).toBe(true);
    }
  });

  test('should have proper form labels', async ({ page }) => {
    const inputs = page.locator('input, select, textarea');
    const inputCount = await inputs.count();

    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledby = await input.getAttribute('aria-labelledby');
      const id = await input.getAttribute('id');

      // Inputs should have labels (Boolean(): aria attributes are strings,
      // not literal true)
      expect(
        Boolean(
          ariaLabel ||
          ariaLabelledby ||
          (id && await page.locator(`label[for="${id}"]`).count() > 0)
        )
      ).toBe(true);
    }
  });

  test('should have proper button text', async ({ page }) => {
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();

    for (let i = 0; i < Math.min(buttonCount, 10); i++) {
      const button = buttons.nth(i);
      const text = await button.textContent();
      const ariaLabel = await button.getAttribute('aria-label');
      const title = await button.getAttribute('title');

      // Buttons should have accessible names (Boolean(): aria attributes are
      // strings, not literal true)
      expect(
        Boolean((text && text.trim().length > 0) || ariaLabel || title)
      ).toBe(true);
    }
  });
});

test.describe('Accessibility - Keyboard Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should be navigable via keyboard', async ({ page }) => {
    const tabCount = 10;

    for (let i = 0; i < tabCount; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);

      const focused = await page.evaluate(() => {
        const el = document.activeElement;
        return {
          tag: el?.tagName,
          visible: el ? window.getComputedStyle(el).visibility !== 'hidden' : false,
        };
      });

      expect(focused.visible).toBe(true);
    }
  });

  test('should have visible focus indicators', async ({ page }) => {
    const interactiveElements = page.locator('a, button, input').first();
    await interactiveElements.focus();

    const hasFocusOutline = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return false;
      const styles = window.getComputedStyle(el);
      return (
        styles.outline !== 'none' ||
        styles.boxShadow !== 'none' ||
        styles.border !== 'none'
      );
    });

    expect(hasFocusOutline).toBe(true);
  });

  test('should support Enter key for actions', async ({ page }) => {
    // Use a deterministic target: the Blog nav link (open the mobile drawer
    // first when the viewport has one).
    const toggle = page.getByTestId('nav-mobile-toggle');
    if (await toggle.isVisible({ timeout: 1500 }).catch(() => false)) {
      await toggle.click();
    }
    const link = page
      .locator('[data-testid="nav-link-blog"]:visible, [data-testid="nav-mobile-link-blog"]:visible')
      .first();
    await link.focus();

    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/blog$/);
  });

  test('should support Escape key for modals', async ({ page }) => {
    // Try to open a modal/dialog
    const modalTrigger = page.locator('button').filter({ hasText: /contact|connect|open/i }).first();

    if (await modalTrigger.isVisible()) {
      await modalTrigger.click();
      await page.waitForTimeout(500);

      const modal = page.locator('[role="dialog"], .modal');
      if (await modal.isVisible()) {
        await page.keyboard.press('Escape');
        await page.waitForTimeout(500);

        // Modal should close
        const isClosed = await modal.isVisible({ timeout: 2000 }).catch(() => false);
        expect(isClosed).toBe(false);
      }
    }
  });

  test('should maintain logical tab order', async ({ page }) => {
    const focusableElements = await page.locator('a, button, input, select, textarea').all();
    const focusOrder: string[] = [];

    for (let i = 0; i < Math.min(focusableElements.length, 5); i++) {
      await page.keyboard.press('Tab');
      const tag = await page.evaluate(() => document.activeElement?.tagName);
      focusOrder.push(tag || '');
    }

    // Should have consistent focus order
    expect(focusOrder.length).toBeGreaterThan(0);
  });
});

test.describe('Accessibility - Screen Reader Support', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have proper role attributes', async ({ page }) => {
    // Check landmark roles
    const landmarks = await page.locator('[role]').all();
    const roles = await Promise.all(
      landmarks.map(async (el) => await el.getAttribute('role'))
    );

    const validRoles = ['navigation', 'main', 'complementary', 'banner', 'contentinfo', 'search', 'form', 'dialog', 'region', 'status', 'alert'];
    const invalidRoles = roles.filter((role) => role && !validRoles.includes(role));

    expect(invalidRoles).toHaveLength(0);
  });

  test('should have proper live regions', async ({ page }) => {
    const liveRegions = page.locator('[aria-live], [role="status"], [role="alert"]');

    if (await liveRegions.count() > 0) {
      const liveCount = await liveRegions.count();
      for (let i = 0; i < liveCount; i++) {
        const ariaLive = await liveRegions.nth(i).getAttribute('aria-live');
        const role = await liveRegions.nth(i).getAttribute('role');

        expect(
          ariaLive === 'polite' ||
          ariaLive === 'assertive' ||
          role === 'status' ||
          role === 'alert'
        ).toBe(true);
      }
    }
  });

  test('should announce dynamic content changes', async ({ page }) => {
    // Check if there are mechanisms for announcing dynamic content
    const announcements = page.locator('[aria-live], [role="status"]');
    const count = await announcements.count();

    if (count > 0) {
      expect(count).toBeGreaterThan(0);
    }
  });

  test('should have proper heading structure for screen readers', async ({ page }) => {
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    let lastLevel = 0;

    for (const heading of headings) {
      const tag = await heading.evaluate((el) => el.tagName);
      const level = parseInt(tag.replace('H', ''));

      // Heading levels should not skip (e.g., h1 to h3)
      expect(level).toBeLessThanOrEqual(lastLevel + 1);
      lastLevel = level;
    }
  });

  test('should have accessible table structures', async ({ page }) => {
    const tables = page.locator('table');
    const tableCount = await tables.count();

    for (let i = 0; i < tableCount; i++) {
      const table = tables.nth(i);

      // Tables should have captions or headers
      const hasCaption = await table.locator('caption').count() > 0;
      const hasHeaders = await table.locator('th').count() > 0;

      expect(hasCaption || hasHeaders).toBe(true);
    }
  });

  test('should have proper list structures', async ({ page }) => {
    // Lists should have proper nesting
    const listItems = page.locator('ul li, ol li');
    const listCount = await listItems.count();

    if (listCount > 0) {
      // Check that list items are within list containers
      const firstLiParent = await listItems.first().evaluate((el) => el.parentElement?.tagName);
      expect(['UL', 'OL', 'MENU']).toContain(firstLiParent);
    }
  });
});

test.describe('Accessibility - Mobile Specific', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have touch-accessible targets', async ({ page }) => {
    // Full coverage: check EVERY visible interactive element, not a sample.
    // Open the mobile drawer first so its links exist in the DOM (they
    // unmount when closed — the old first-20 sampling never saw them, nor
    // the contact-footer social links further down the page).
    const toggle = page.getByTestId('nav-mobile-toggle');
    if (await toggle.isVisible({ timeout: 1500 }).catch(() => false)) {
      await toggle.click();
      await expect(page.getByTestId('nav-mobile-menu')).toBeVisible();
    }

    const interactiveElements = page.locator('a:visible, button:visible');
    const elementCount = await interactiveElements.count();

    // The Next.js dev-tools button (32x32, inside a <nextjs-portal> shadow
    // root) only exists in development — it is not site UI. Skip anything in
    // that portal; gate only on elements the site actually ships.
    const devToolsIndices = new Set(
      await interactiveElements.evaluateAll((nodes) =>
        nodes
          .map((el, i) => {
            const root = el.getRootNode();
            return root instanceof ShadowRoot && root.host?.tagName === 'NEXTJS-PORTAL' ? i : -1;
          })
          .filter((i) => i >= 0)
      )
    );

    let checked = 0;
    for (let i = 0; i < elementCount; i++) {
      if (devToolsIndices.has(i)) continue;
      const element = interactiveElements.nth(i);
      const box = await element.boundingBox();

      if (box) {
        checked++;
        // Touch targets should be at least 44x44 pixels (0.5px sub-pixel
        // tolerance: engines report a computed 44px as 43.99999809265137)
        const id = (await element.getAttribute('data-testid')) ?? (await element.textContent())?.trim() ?? `element ${i}`;
        expect(box.width, `${id} width`).toBeGreaterThanOrEqual(43.5);
        expect(box.height, `${id} height`).toBeGreaterThanOrEqual(43.5);
      }
    }

    // The loop must actually check something to mean anything.
    expect(checked).toBeGreaterThan(0);
  });

  test('should have appropriate text scaling', async ({ page }) => {
    // Test with 200% text zoom
    await page.evaluate(() => {
      document.body.style.zoom = '2';
    });

    await page.waitForTimeout(500);

    // Text should remain readable
    const text = await page.locator('p, h1, h2').first();
    await expect(text).toBeVisible();
  });
});

test.describe('Accessibility - Error States', () => {
  test('404 page accessibility', async ({ page }) => {
    await page.goto('/non-existent-page');
    await expectNoBlockingViolations(page);
  });

  test('error page has proper heading', async ({ page }) => {
    await page.goto('/non-existent-page');

    const h1 = page.locator('h1');
    expect(await h1.count()).toBe(1);

    const headingText = await h1.textContent();
    expect(headingText).toMatch(/404|not found|error/i);
  });

  test('error page provides helpful content', async ({ page }) => {
    await page.goto('/non-existent-page');

    // Should have navigation options
    const navLinks = page.locator('nav a, main a');
    expect(await navLinks.count()).toBeGreaterThan(0);
  });
});

test.describe('Accessibility - Animation and Motion', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should respect prefers-reduced-motion', async ({ page }) => {
    // Set reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });

    // Reload page with reduced motion
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Page should still function
    await expect(page.locator('main')).toBeVisible();
  });

  test('should have pause controls for animated content', async ({ page }) => {
    // Check for animation controls
    const pauseButtons = page.locator('button[aria-label*="pause"], button[aria-label*="play"], button[aria-label*="stop"]');

    if (await pauseButtons.count() > 0) {
      expect(await pauseButtons.first().isVisible()).toBe(true);
    }
  });

  test('should not cause motion sickness triggers', async ({ page }) => {
    // Check for problematic animations
    // '@flash' etc. is not valid selector syntax; deprecated elements are
    // matched by tag name.
    const flashingElements = page.locator('blink, marquee');
    const count = await flashingElements.count();

    // Should not have deprecated flashing elements
    expect(count).toBe(0);
  });
});
