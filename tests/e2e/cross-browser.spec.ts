import { test, expect } from '@playwright/test';
import { skipIntro } from './functional/helpers';

/**
 * Cross-Browser Compatibility Tests
 * Tests functionality across Chrome, Firefox, and Safari (WebKit)
 */

// Fresh context per test = fresh sessionStorage: skip the once-per-session
// intro overlay on '/' visits (covered in loading-screen-functions.spec.ts).
test.beforeEach(async ({ page }) => {
  await skipIntro(page);
});

test.describe('Cross-Browser - Chrome', () => {

  test('chrome - homepage loads', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Lazy Perfectionist/i);
    await expect(page.locator('main')).toBeVisible();
  });

  test('chrome - navigation works', async ({ page }) => {
    await page.goto('/');
    // Scope to the nav link: /music/i alone matches several links (strict
    // mode violation). Open the mobile drawer first when there is one.
    const toggle = page.getByTestId('nav-mobile-toggle');
    if (await toggle.isVisible({ timeout: 1500 }).catch(() => false)) {
      await toggle.click();
    }
    await page
      .locator('[data-testid="nav-link-music"]:visible, [data-testid="nav-mobile-link-music"]:visible')
      .first()
      .click();
    await expect(page).toHaveURL(/\/music/);
  });

  test('chrome - animations perform well', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);

    // gsap is bundled as an ES module and never lands on window, so observe
    // a real scroll-reveal instead: the journal header starts transparent and
    // animates to opaque when scrolled into view.
    const journalHeader = page.getByTestId('journal-header');
    const opacityBefore = await journalHeader.evaluate(
      (el) => window.getComputedStyle(el).opacity
    );
    expect(Number(opacityBefore)).toBeLessThan(1);

    await journalHeader.scrollIntoViewIfNeeded();
    await expect
      .poll(async () =>
        Number(await journalHeader.evaluate((el) => window.getComputedStyle(el).opacity))
      )
      .toBe(1);
  });

  test('chrome - touch interactions', async ({ page }) => {
    // Touchscreen APIs require a touch-enabled project.
    test.skip(!(test.info().project.use as { hasTouch?: boolean } | undefined)?.hasTouch, 'touch project only');
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Simulate touch interaction
    await page.touchscreen.tap(100, 100);
    await page.waitForTimeout(500);

    await expect(page.locator('body')).toBeVisible();
  });

  test('chrome - WebGL rendering', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check WebGL support
    const webglSupported = await page.evaluate(() => {
      const canvas = document.createElement('canvas');
      return canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    });

    expect(webglSupported).toBeTruthy();
  });
});

test.describe('Cross-Browser - Firefox', () => {

  test('firefox - homepage loads', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Lazy Perfectionist/i);
    await expect(page.locator('main')).toBeVisible();
  });

  test('firefox - navigation works', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /music/i }).first().click();
    await expect(page).toHaveURL(/\/music/);
  });

  test('firefox - CSS Grid support', async ({ page }) => {
    await page.goto('/');

    const hasGrid = await page.evaluate(() => {
      const div = document.createElement('div');
      div.style.display = 'grid';
      return div.style.display === 'grid';
    });

    expect(hasGrid).toBe(true);
  });

  test('firefox - custom properties', async ({ page }) => {
    await page.goto('/');

    const hasCustomProps = await page.evaluate(() => {
      const div = document.createElement('div');
      div.style.setProperty('--test', 'value');
      return div.style.getPropertyValue('--test') === 'value';
    });

    expect(hasCustomProps).toBe(true);
  });

  test('firefox - scroll behavior', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.evaluate(() => window.scrollTo({ top: 500, behavior: 'smooth' }));
    await page.waitForTimeout(1000);

    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(0);
  });
});

test.describe('Cross-Browser - Safari/WebKit', () => {

  test('safari - homepage loads', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Lazy Perfectionist/i);
    await expect(page.locator('main')).toBeVisible();
  });

  test('safari - navigation works', async ({ page }) => {
    await page.goto('/');
    const musicLink = page.getByRole('link', { name: /music/i });
    if (await musicLink.count() > 0) {
      await musicLink.first().click();
      await expect(page).toHaveURL(/\/music/);
    }
  });

  test('safari - backdrop-filter support', async ({ page }) => {
    await page.goto('/');

    const hasBackdropFilter = await page.evaluate(() => {
      const div = document.createElement('div');
      div.style.backdropFilter = 'blur(10px)';
      return div.style.backdropFilter !== '';
    });

    expect(hasBackdropFilter).toBe(true);
  });

  test('safari - smooth scrolling', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.evaluate(() => window.scrollTo({ top: 1000, behavior: 'smooth' }));
    await page.waitForTimeout(1000);

    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(0);
  });

  test('safari - touch gestures', async ({ page }) => {
    test.skip(!(test.info().project.use as { hasTouch?: boolean } | undefined)?.hasTouch, 'touch project only');
    await page.goto('/');

    // Simulate pinch zoom
    await page.touchscreen.tap(200, 200);
    await page.waitForTimeout(500);

    await expect(page.locator('body')).toBeVisible();
  });
});

test.describe('Cross-Browser - Responsive Design', () => {
  const viewports = [
    { name: 'Mobile Small', width: 375, height: 667 },
    { name: 'Mobile Large', width: 414, height: 896 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1920, height: 1080 },
    { name: 'Large Desktop', width: 2560, height: 1440 },
  ];

  for (const viewport of viewports) {
    test.describe(`${viewport.name} (${viewport.width}x${viewport.height})`, () => {
      test.use({ viewport: { width: viewport.width, height: viewport.height } });

      test('responsive homepage @responsive', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        await expect(page.locator('main')).toBeVisible();
      });

      test('responsive navigation @responsive', async ({ page }) => {
        await page.goto('/');

        // Check navigation adapts to viewport
        const nav = page.locator('nav, [role="navigation"]');
        if (await nav.count() > 0) {
          await expect(nav.first()).toBeVisible();
        }
      });

      test('responsive content @responsive', async ({ page }) => {
        await page.goto('/');

        // Content should be visible and accessible
        const content = page.locator('main, [role="main"]');
        await expect(content.first()).toBeVisible();
      });

      test('no horizontal scroll @responsive', async ({ page }) => {
        await page.goto('/');

        // Check for horizontal scroll
        const hasHorizontalScroll = await page.evaluate(() => {
          return document.body.scrollWidth > window.innerWidth;
        });

        expect(hasHorizontalScroll).toBe(false);
      });

      test('touch targets on mobile @responsive', async ({ page, browserName }) => {
        if (viewport.width < 768) {
          // Mobile-specific test — full coverage of every visible interactive
          // element (the old first-10 sampling missed everything below the
          // fold, e.g. the contact-footer social links).
          await page.goto('/');

          const buttons = page.locator('a:visible, button:visible');
          const buttonCount = await buttons.count();

          // Skip the dev-only Next.js dev-tools button (32x32, lives in a
          // <nextjs-portal> shadow root; never ships to production).
          const devToolsIndices = new Set(
            await buttons.evaluateAll((nodes) =>
              nodes
                .map((el, i) => {
                  const root = el.getRootNode();
                  return root instanceof ShadowRoot && root.host?.tagName === 'NEXTJS-PORTAL' ? i : -1;
                })
                .filter((i) => i >= 0)
            )
          );

          let checked = 0;
          for (let i = 0; i < buttonCount; i++) {
            if (devToolsIndices.has(i)) continue;
            const box = await buttons.nth(i).boundingBox();
            if (box) {
              checked++;
              // Touch targets should be at least 44x44 (allow a hair of
              // sub-pixel tolerance — engines report a computed 44px as
              // 43.99999809265137, which is not a real size regression)
              expect(box.width).toBeGreaterThanOrEqual(43.5);
              expect(box.height).toBeGreaterThanOrEqual(43.5);
            }
          }
          expect(checked).toBeGreaterThan(0);
        }
      });
    });
  }
});

test.describe('Cross-Browser - Feature Detection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('ES6 support', async ({ page }) => {
    const supportsES6 = await page.evaluate(() => {
      try {
        eval('() => {}');
        return true;
      } catch {
        return false;
      }
    });

    expect(supportsES6).toBe(true);
  });

  test('CSS Grid support', async ({ page }) => {
    const supportsGrid = await page.evaluate(() => {
      const div = document.createElement('div');
      div.style.display = 'grid';
      div.style.gridTemplateColumns = '1fr 1fr';
      document.body.appendChild(div);
      const supported = getComputedStyle(div).display === 'grid';
      document.body.removeChild(div);
      return supported;
    });

    expect(supportsGrid).toBe(true);
  });

  test('CSS Flexbox support', async ({ page }) => {
    const supportsFlexbox = await page.evaluate(() => {
      const div = document.createElement('div');
      div.style.display = 'flex';
      document.body.appendChild(div);
      const supported = getComputedStyle(div).display === 'flex';
      document.body.removeChild(div);
      return supported;
    });

    expect(supportsFlexbox).toBe(true);
  });

  test('IntersectionObserver support', async ({ page }) => {
    const supportsIO = await page.evaluate(() => {
      return 'IntersectionObserver' in window;
    });

    expect(supportsIO).toBe(true);
  });

  test('ResizeObserver support', async ({ page }) => {
    const supportsRO = await page.evaluate(() => {
      return 'ResizeObserver' in window;
    });

    expect(supportsRO).toBe(true);
  });

  test('Local Storage support', async ({ page }) => {
    const supportsLS = await page.evaluate(() => {
      try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        return true;
      } catch {
        return false;
      }
    });

    expect(supportsLS).toBe(true);
  });

  test('Session Storage support', async ({ page }) => {
    const supportsSS = await page.evaluate(() => {
      try {
        sessionStorage.setItem('test', 'test');
        sessionStorage.removeItem('test');
        return true;
      } catch {
        return false;
      }
    });

    expect(supportsSS).toBe(true);
  });
});

test.describe('Cross-Browser - Font Loading', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('fonts load correctly', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Check if fonts are loaded
    const fontsLoaded = await page.evaluate(() => {
      return document.fonts && document.fonts.ready;
    });

    expect(fontsLoaded).toBeTruthy();
  });

  test('font display fallback', async ({ page }) => {
    await page.goto('/');

    // Text should be visible even if fonts haven't loaded
    const text = page.locator('h1, h2, p').first();
    await expect(text).toBeVisible();
  });

  test('custom font rendering', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for custom font families
    const fontFamily = await page.locator('body').evaluate((el) => {
      return window.getComputedStyle(el).fontFamily;
    });

    expect(fontFamily).toBeTruthy();
  });
});

test.describe('Cross-Browser - Image Loading', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('images load correctly', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const images = page.locator('img');
    const imageCount = await images.count();

    if (imageCount > 0) {
      // Check if at least some images are loaded
      const loadedImages = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs.filter(img => img.complete && img.naturalHeight !== 0).length;
      });

      expect(loadedImages).toBeGreaterThan(0);
    }
  });

  test('image lazy loading works', async ({ page }) => {
    await page.goto('/');

    const lazyImages = page.locator('img[loading="lazy"]');
    const count = await lazyImages.count();

    if (count > 0) {
      // Lazy loading attribute is supported
      expect(count).toBeGreaterThan(0);
    }
  });

  test('picture element support', async ({ page }) => {
    const pictures = page.locator('picture');
    const count = await pictures.count();

    if (count > 0) {
      // Picture elements should work
      const working = await pictures.first().evaluate((el) => {
        return el.querySelector('source, img') !== null;
      });

      expect(working).toBe(true);
    }
  });
});

test.describe('Cross-Browser - Form Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('form inputs work', async ({ page }) => {
    const inputs = page.locator('input, textarea, select');
    const inputCount = await inputs.count();

    if (inputCount > 0) {
      const firstInput = inputs.first();
      await firstInput.fill('test input');
      const value = await firstInput.inputValue();
      expect(value).toBe('test input');
    }
  });

  test('form validation works', async ({ page }) => {
    const emailInputs = page.locator('input[type="email"]');
    const count = await emailInputs.count();

    if (count > 0) {
      const emailInput = emailInputs.first();
      await emailInput.fill('invalid-email');
      await emailInput.blur();

      // Browser should validate email format
      const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.checkValidity());
      expect(isInvalid).toBe(true);
    }
  });

  test('form submission works', async ({ page }) => {
    const form = page.getByTestId('contact-form');

    // Fill every required field validly, then the form as a whole must
    // report itself submittable. (The old version filled only the name and
    // then wondered why checkValidity() was false.)
    await form.getByLabel('Your name').fill('Test User');
    await form.getByLabel('Your email').fill('test@example.com');
    await form.getByLabel('Your message').fill('This is a valid test message.');

    const canSubmit = await form.evaluate((el: HTMLFormElement) => el.checkValidity());
    expect(canSubmit).toBe(true);
  });
});
