import { expect, test, type Page } from '@playwright/test';

// These tests measure geometry, not pixels: the plate's art would only put
// the dev image optimizer — slow at phone device ratios — between the test
// and the number it is reading.
const shedImages = (page: Page) => page.route('**/_next/image**', (route) => route.abort());

/**
 * The phone is the smallest press this issue is printed on, and the plate
 * screens are its narrowest editions. These lock the three decisions that
 * made those two readings hold: one masthead line, a reading measure for
 * the plate screens, and a fold crop that keeps the wordmark whole.
 */
test.describe('responsive', () => {
  test('the masthead keeps its nav on one line down to 320', async ({ page }) => {
    await shedImages(page);
    for (const width of [320, 360, 390, 430]) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/');

      const rows = await page
        .getByTestId('primary-nav')
        .locator('li')
        .evaluateAll((items) =>
          [...new Set(items.map((item) => Math.round(item.getBoundingClientRect().top)))],
        );

      expect(rows, `${width}px nav must not wrap`).toHaveLength(1);
    }
  });

  test('the plate screens take a reading measure, not the cover’s full grid', async ({ page }) => {
    await shedImages(page);
    await page.setViewportSize({ width: 1920, height: 1080 });

    await page.goto('/');
    const cover = await page
      .locator('section#music')
      .evaluate((section) => section.querySelector('div')!.getBoundingClientRect().width);

    for (const path of ['/discography', '/music', '/shop', '/writing']) {
      await page.goto(path);

      const [header, heading] = await Promise.all([
        page
          .getByTestId('site-header')
          .locator(':scope > div')
          .evaluate((div) => div.getBoundingClientRect().width),
        page.getByRole('heading', { level: 1 }).boundingBox(),
      ]);
      const measure = await page
        .locator('main section > div')
        .first()
        .evaluate((div) => div.getBoundingClientRect().width);

      expect(measure, `${path} must read narrower than the cover`).toBeLessThan(cover);
      expect(measure, `${path} must not sprawl on a 16:9 screen`).toBeLessThanOrEqual(1160);
      // The masthead is on the same measure as the page it titles.
      expect(header, `${path} masthead must sit on the plate's measure`).toBeCloseTo(measure, 0);
      expect(heading!.width, `${path} heading must fit its measure`).toBeLessThanOrEqual(measure);
    }
  });

  test('the search field does not zoom the page it is typed into', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/discography');

    const size = await page
      .getByRole('searchbox')
      .evaluate((input) => parseFloat(getComputedStyle(input).fontSize));

    // Below 16px iOS Safari zooms the viewport on focus.
    expect(size, 'search input must be at least 16px on phones').toBeGreaterThanOrEqual(16);
  });

  test('the tall plate is cropped toward the wordmark, not through it', async ({ page }) => {
    await shedImages(page);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const position = await page
      .getByTestId('hero-artwork')
      .locator('img[data-plate]:visible')
      .evaluate((img) => getComputedStyle(img).objectPosition);

    const x = parseFloat(position);
    expect(x, 'a centred crop cuts the name off on a phone').toBeGreaterThan(40);
  });

  test('the masthead holds the phone on its side too', async ({ page }) => {
    await shedImages(page);
    // iPhone 16 lying down: wide enough for `md`, far too short for the
    // desktop masthead — the row layout must wait for `lg`, or the wordmark
    // and the nav each break onto a second line.
    await page.setViewportSize({ width: 852, height: 393 });
    await page.goto('/');

    const wordmark = await page.getByTestId('wordmark').evaluate((a) => {
      const rect = a.getBoundingClientRect();
      const line = parseFloat(getComputedStyle(a).fontSize) * 1.4;
      return { height: rect.height, line };
    });
    expect(wordmark.height, 'the wordmark must stay one line in landscape').toBeLessThan(
      wordmark.line,
    );

    const rows = await page
      .getByTestId('primary-nav')
      .locator('li')
      .evaluateAll((items) =>
        [...new Set(items.map((item) => Math.round(item.getBoundingClientRect().top)))],
      );
    expect(rows, 'the nav must stay on one line in landscape').toHaveLength(1);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow, 'a landscape phone must not scroll sideways').toBeLessThanOrEqual(0);
  });

  test('the search field prints its placeholder whole on a phone', async ({ page }) => {
    await page.setViewportSize({ width: 393, height: 852 });

    for (const path of ['/discography', '/music', '/shop', '/writing']) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);

      const fit = await page.getByRole('searchbox').evaluate(async (input) => {
        const box = input as HTMLInputElement;
        const cs = getComputedStyle(box);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
        // Typed text scrolls; a placeholder cannot, so it simply ends.
        return {
          text: ctx.measureText(box.placeholder).width,
          room: box.clientWidth,
        };
      });

      expect(fit.text, `${path} placeholder must not be cut off`).toBeLessThan(fit.room);
    }
  });

  test('the plate screens fit a 320px window without scrolling sideways', async ({ page }) => {
    await shedImages(page);
    await page.setViewportSize({ width: 320, height: 640 });

    for (const path of ['/discography', '/music', '/shop', '/writing']) {
      await page.goto(path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow, `${path} must not overflow a 320px window`).toBeLessThanOrEqual(0);
    }
  });
});
