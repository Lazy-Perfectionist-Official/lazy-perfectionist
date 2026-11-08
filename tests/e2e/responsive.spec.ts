import { expect, test, type Locator, type Page } from '@playwright/test';

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
  test('the phone folds the nav into a one-line menu', async ({ page }) => {
    await shedImages(page);
    for (const width of [320, 360, 390, 430]) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/');

      await expect(page.getByTestId('menu-toggle'), `${width}px needs the menu`).toBeVisible();
      await expect(page.getByTestId('nav-inline'), `${width}px sets the nav as a row`).toBeHidden();

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow, `${width}px must not scroll sideways`).toBeLessThanOrEqual(0);
    }

    // Native <details>: the panel opens with no script, prints all five
    // items, and closes itself once one is chosen (Header's one line).
    await page.setViewportSize({ width: 393, height: 852 });
    await page.goto('/');
    await page.getByTestId('menu-toggle').click();

    const items = page.getByTestId('menu-list').getByRole('link');
    await expect(items).toHaveCount(5);
    await expect(items.first(), 'the first nav item must be printed').toBeVisible();

    const openOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(openOverflow, 'the open menu must not scroll sideways').toBeLessThanOrEqual(0);

    await items.filter({ hasText: 'Shop' }).click();
    await expect(page.getByTestId('menu-list'), 'choosing closes the menu').toBeHidden();
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

    await expect(page.getByTestId('nav-inline'), 'a landscape phone keeps the row').toBeVisible();

    const rows = await page
      .getByTestId('nav-inline')
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

  test('the phone sets its fine print at reading size, not microprint', async ({ page }) => {
    await shedImages(page);
    await page.setViewportSize({ width: 393, height: 852 });

    await page.goto('/music');
    const sizes = await page.evaluate(() => {
      const size = (selector: string) => {
        const el = document.querySelector(selector);
        return el ? parseFloat(getComputedStyle(el).fontSize) : null;
      };
      return {
        nav: size('.nav-toggle'),
        meta: size('[data-testid="release-lusg"] .font-mono'),
        field: size('#q'),
      };
    });
    // 10.9 rather than 11: engines round the computed size slightly
    // differently and the floor, not the fraction, is what this guards.
    expect(sizes.nav, 'the menu must not shrink below 11px on a phone').toBeGreaterThanOrEqual(10.9);
    expect(sizes.meta, 'row meta must stay legible at 10px on a phone').toBeGreaterThanOrEqual(10);
    expect(sizes.field, 'the search field must stay at 16px').toBeGreaterThanOrEqual(16);
  });

  test('the phone prints every card on the desktop row’s one line', async ({ page }) => {
    await shedImages(page);
    await page.setViewportSize({ width: 393, height: 852 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);

    // The ink, not the box: small type is centred on the larger type it
    // shares a line with, so only the glyphs (font ascent and descent) tell
    // the truth about where a line sits.
    const ink = (locator: Locator) =>
      locator.evaluate((el) => {
        const text =
          el.firstChild?.nodeType === Node.TEXT_NODE && el.firstChild.textContent?.trim()
            ? el.firstChild
            : el;
        const range = document.createRange();
        range.selectNodeContents(text);
        const box = range.getBoundingClientRect();
        const style = getComputedStyle(el);
        const ctx = document.createElement('canvas').getContext('2d')!;
        ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
        const metrics = ctx.measureText((text.textContent ?? '').trim());
        // A range's rect is the font box; the baseline is its top plus the
        // font ascent, and the ink runs from there by the glyph metrics.
        const baseline = box.top + metrics.fontBoundingBoxAscent;
        const top = baseline - metrics.actualBoundingBoxAscent;
        const bottom = baseline + metrics.actualBoundingBoxDescent;
        return {
          left: box.left,
          right: box.right,
          top,
          bottom,
          baseline,
          middle: (top + bottom) / 2,
        };
      });
    const box = async (locator: Locator) => (await locator.boundingBox())!;

    // Plate 01 keeps the desktop's three columns at phone width: the number
    // in the margin, the title in the content column, the year on the title's
    // own line at the right, and the Listen closing the row at its foot.
    const row = page.getByTestId('release-lusg');
    const rowBox = await box(row);
    const parts = row.locator(':scope > span');
    const titleBlock = parts.nth(1);
    const line = titleBlock.locator(':scope > span').nth(1);
    const [indexBox, indexInk, titleBox, titleInk, lineBox, yearBox, listenBox] =
      await Promise.all([
        box(parts.nth(0)),
        ink(parts.nth(0)),
        box(titleBlock),
        ink(titleBlock.locator(':scope > span').nth(0)),
        box(line),
        box(parts.nth(2)),
        box(parts.nth(3)),
      ]);

    expect(indexBox.y, 'the number must start on the title’s line').toBeCloseTo(titleBox.y, 0);
    expect(
      Math.abs(indexInk.middle - titleInk.middle),
      'the number must be centred on the title’s caps, not sunk to its baseline',
    ).toBeLessThan(2);

    expect(Math.round(indexBox.x), 'the number holds the margin column').toBe(
      Math.round(rowBox.x + 16),
    );
    expect(Math.round(titleBox.x), 'the title takes the content column').toBe(
      Math.round(indexBox.x + indexBox.width + 12),
    );
    expect(
      Math.round((await box(page.getByRole('heading', { name: 'Singles' }))).x),
      'the plate heading must hang on the rows’ title column',
    ).toBe(Math.round(titleBox.x));

    expect(yearBox.y, 'the year must start on the title’s line').toBeCloseTo(titleBox.y, 0);
    expect(
      listenBox.y,
      'the Listen must close the row, not sit beside the description',
    ).toBeGreaterThanOrEqual(lineBox.y + lineBox.height);
    expect(
      Math.round(listenBox.x + listenBox.width),
      'the Listen must share the year’s right edge',
    ).toBe(Math.round(yearBox.x + yearBox.width));

    // Plate 02 sets the same relations around its art: the price starts on
    // the title's line, the Get closes the row at the same right edge.
    const shop = page.locator('a[data-testid^="shop-"]').first();
    const shopParts = shop.locator(':scope > span');
    const shopTitle = shopParts.nth(1).locator(':scope > span').nth(0);
    const shopLine = shopParts.nth(1).locator(':scope > span').nth(1);
    const [artBox, shopTitleBox, shopLineBox, priceBox, getBox] = await Promise.all([
      box(shopParts.nth(0)),
      box(shopTitle),
      box(shopLine),
      box(shopParts.nth(2)),
      box(shopParts.nth(3)),
    ]);
    expect(Math.round(shopTitleBox.x), 'the shop title must clear the art').toBe(
      Math.round(artBox.x + artBox.width + 12),
    );
    expect(priceBox.y, 'the price must start on the title’s line').toBeCloseTo(shopTitleBox.y, 0);
    expect(getBox.y, 'the Get must close the row').toBeGreaterThanOrEqual(
      shopLineBox.y + shopLineBox.height,
    );
    expect(Math.round(getBox.x + getBox.width), 'the Get must share the price’s edge').toBe(
      Math.round(priceBox.x + priceBox.width),
    );

    // The writing date is the wide one: it holds its place on the title's
    // line by setting the year under the day in a narrow column, so the
    // title keeps its measure instead of paying for the whole date.
    const post = page.locator('a[data-testid^="post-"]').first();
    const postParts = post.locator(':scope > span');
    const [postBox, postTitleBox, dateBox, dateInk] = await Promise.all([
      box(post),
      box(postParts.nth(1).locator(':scope > span').nth(0)),
      box(postParts.nth(2)),
      ink(postParts.nth(2)),
    ]);
    expect(dateBox.y, 'the date must start on the title’s line').toBeCloseTo(postTitleBox.y, 0);
    expect(Math.round(dateInk.right), 'the date must hang on the sheet’s right edge').toBe(
      Math.round(postBox.x + postBox.width - 16),
    );
    expect(
      postTitleBox.width,
      'the date must not take the title’s measure',
    ).toBeGreaterThan(postBox.width * 0.5);

    // The masthead's label is set on the wordmark's baseline, and the menu
    // keeps the sheet's margin — chrome, but printed the same way.
    const [wordmarkInk, menuInk] = await Promise.all([
      ink(page.getByTestId('wordmark')),
      ink(page.getByTestId('menu-toggle')),
    ]);
    expect(menuInk.baseline, 'the menu label must sit on the wordmark’s baseline').toBeCloseTo(
      wordmarkInk.baseline,
      0,
    );
    expect(Math.round(wordmarkInk.left), 'the masthead holds the sheet’s margin').toBe(
      Math.round(rowBox.x + 16),
    );

    await page.getByTestId('menu-toggle').click();
    const menuInkLeft = await ink(page.getByTestId('menu-list').getByRole('link').first());
    expect(Math.round(menuInkLeft.left), 'the menu sets on the masthead’s edge').toBe(
      Math.round(wordmarkInk.left),
    );

    // The discography's year separators hang the year on the rows' title
    // column and centre the count against it at the sheet's right edge.
    await page.goto('/discography');
    const group = page.locator('[data-testid^="year-group-"]').first();
    const separator = group.locator(':scope > div').first();
    const [yearHeading, count, separatorBox] = await Promise.all([
      box(group.locator('h2')),
      box(separator.locator('p')),
      box(separator),
    ]);
    expect(Math.round(yearHeading.x), 'the year must hang on the rows’ title column').toBe(
      Math.round(separatorBox.x + 16 + 24 + 12),
    );
    expect(Math.round(count.x + count.width), 'the count holds the far margin').toBe(
      Math.round(separatorBox.x + separatorBox.width - 16),
    );
    expect(
      Math.abs(count.y + count.height / 2 - (yearHeading.y + yearHeading.height / 2)),
      'the count must centre on the year',
    ).toBeLessThan(3);
  });

  test('the phone menu lands on the sheet rather than blinking into place', async ({ page }) => {
    await shedImages(page);
    await page.setViewportSize({ width: 393, height: 852 });
    await page.goto('/');

    await page.getByTestId('menu-toggle').click();
    const moving = await page.getByTestId('menu-list').evaluate((el) => ({
      list: getComputedStyle(el).animationName,
      item: getComputedStyle(el.querySelector('li') as HTMLLIElement).animationName,
    }));
    expect(moving.list, 'the panel must drop in').toBe('nav-drop');
    expect(moving.item, 'the items must follow it').toBe('nav-item');

    // Reduced motion skips the drop entirely: the menu is simply there.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.reload();
    await page.getByTestId('menu-toggle').click();
    const still = await page
      .getByTestId('menu-list')
      .evaluate((el) => getComputedStyle(el).animationName);
    expect(still, 'reduced motion must not animate the menu').toBe('none');
  });

  test('the phone cuts a writing excerpt to one preview line', async ({ page }) => {
    await shedImages(page);
    const rows = [320, 393];

    for (const width of rows) {
      await page.setViewportSize({ width, height: 852 });
      await page.goto('/');

      const metrics = await page.getByTestId('writing-excerpt').first().evaluate((el) => ({
        height: el.getBoundingClientRect().height,
        line: parseFloat(getComputedStyle(el).lineHeight),
      }));

      // The row is the index entry; the whole excerpt is on Medium.
      expect(
        metrics.height,
        `${width}px must print the excerpt as one preview line`,
      ).toBeLessThanOrEqual(metrics.line * 1.2);
    }

    // The clamp is the phone's alone: the wide sheet still prints the excerpt.
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    const wide = await page.getByTestId('writing-excerpt').first().evaluate((el) => ({
      height: el.getBoundingClientRect().height,
      line: parseFloat(getComputedStyle(el).lineHeight),
    }));
    expect(wide.height, 'the desktop excerpt must stay whole').toBeGreaterThan(wide.line * 2);
  });

  test('the sheet sets at four fifths until the ultrawide class of screen', async ({ page }) => {
    await shedImages(page);

    const root = async () =>
      page.evaluate(() => parseFloat(getComputedStyle(document.documentElement).fontSize));

    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    expect(await root(), 'an ordinary monitor reads at 80%').toBeCloseTo(12.8, 1);

    // 3440 (21:9) and 4K keep the sheet's own size; 2560 is deliberately
    // left on the ordinary side of the line, clear of scrollbar rounding.
    await page.setViewportSize({ width: 3440, height: 1440 });
    await page.goto('/');
    expect(await root(), 'an ultrawide reads at the sheet’s own size').toBe(16);

    await page.setViewportSize({ width: 393, height: 852 });
    await page.goto('/');
    expect(await root(), 'the phone keeps its own cut').toBe(16);
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
