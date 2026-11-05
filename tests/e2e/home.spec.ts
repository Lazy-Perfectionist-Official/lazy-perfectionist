import { expect, test } from '@playwright/test';

import shop from '../../src/lib/kofi-shop.json';
import posts from '../../src/lib/medium-posts.json';

/**
 * Minimal functional suite for the single-page site.
 *
 * Every assert is viewport-agnostic unless explicitly project-gated, so the
 * same spec runs under chromium/firefox/webkit-desktop (1920x1080) and
 * mobile-chrome-small (375x667). There is no client JS beyond the Next
 * runtime — everything below exercises real DOM state.
 */

const TRACK_URL = 'https://open.spotify.com/track/4RnwmBIaSuOqGEu8R2nIsU';
const ARTIST_URL = 'https://open.spotify.com/artist/7ELTTbYXSvCIXh0W6IV3um';
const SPOTIFY_TRACK_HREF = /^https:\/\/open\.spotify\.com\/track\//;
const RELEASE_ROWS = [
  ['release-lusg', 'LUSG'],
  ['release-cyclothymia', 'Cyclothymia'],
  ['release-orbit', 'Orbit'],
] as const;

test.describe('home', () => {
  test('loads clean: zero console errors and zero page errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];

    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });
    page.on('pageerror', (error) => pageErrors.push(error.message));

    await page.goto('/');
    await expect(page.getByTestId('hero-title')).toBeVisible();
    // Bounded settle so late subresources (cover art) can surface load
    // errors; never hangs — the wait is capped and swallowed.
    await page.waitForLoadState('networkidle', { timeout: 5_000 }).catch(() => {});

    expect(consoleErrors, 'console errors during load').toEqual([]);
    expect(pageErrors, 'uncaught page errors during load').toEqual([]);
  });

  test('the bypass link comes first and lands on the content', async ({ page, browserName }) => {
    await page.goto('/');

    // Parked until it is needed: clipped to a pixel, not display:none, so it
    // still takes focus.
    const skip = page.getByRole('link', { name: 'Skip to content' });
    await expect(skip).toHaveCount(1);
    await expect.poll(async () => (await skip.boundingBox())?.height ?? 0).toBeLessThanOrEqual(1);

    // WebKit's default macOS keyboard policy does not tab to links at all,
    // so the tab-order half of this check cannot run there.
    test.skip(browserName === 'webkit', 'WebKit does not tab to links by default');

    // Nothing precedes it in the tab order — not the bellyband, not the
    // wordmark, not the nav.
    await page.keyboard.press('Tab');
    await expect(skip).toBeFocused();
    await expect
      .poll(async () => (await skip.boundingBox())?.height ?? 0)
      .toBeGreaterThan(10);

    // Taking it moves the reading position into the plate, past the masthead.
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#main$/);
    await expect
      .poll(() => page.locator('#main').evaluate((el) => Math.abs(el.getBoundingClientRect().top)))
      .toBeLessThanOrEqual(2);
  });

  test('hero links are honest: the print and the artist profile point where they claim', async ({ page }) => {
    await page.goto('/');

    const artwork = page.getByTestId('hero-artwork');
    await expect(artwork).toBeVisible();
    await expect(artwork).toHaveAttribute('href', TRACK_URL);
    await expect(artwork).toHaveAttribute('target', '_blank');
    // The print is the link, so it has to say so: the visible stamp starts
    // the accessible name, which is what voice control repeats back.
    await expect(artwork).toContainText('Listen to LUSG');
    await expect(artwork).toHaveAccessibleName('Listen to LUSG on Spotify');

    const artistProfile = page.getByRole('link', { name: /artist profile/i });
    await expect(artistProfile).toBeVisible();
    await expect(artistProfile).toHaveAttribute('href', ARTIST_URL);
  });

  test('announcement bar carries the news: visible and links to the LUSG track', async ({ page }) => {
    await page.goto('/');

    const bar = page.getByTestId('announcement-bar');
    await expect(bar).toBeVisible();
    await expect(bar).toHaveAttribute('href', TRACK_URL);
  });

  test('nav anchor scrolls to music: clicking Music brings the releases section into view', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('primary-nav').getByRole('link', { name: 'Music' }).click();

    // Scrolling is smooth, so the section arrives over time — toBeInViewport
    // polls until it settles instead of assuming an instant jump.
    await expect(page.getByTestId('releases-section')).toBeInViewport();
  });

  test('release rows afford listening: three rows with honest targets and a visible Listen label', async ({ page }) => {
    await page.goto('/');

    for (const [id, title] of RELEASE_ROWS) {
      const row = page.getByTestId(id);
      await expect(row).toBeVisible();
      await expect(row).toHaveAttribute('href', SPOTIFY_TRACK_HREF);
      await expect(row).toHaveAttribute('target', '_blank');
      // The row is the catalog's only listen action, so its accessible name
      // must carry the action — the visible "Listen" label is decorative and
      // the description alone reads as a run-on to a screen reader.
      await expect(row).toHaveAccessibleName(`${title} — listen on Spotify`);
    }

    // The Listen label is decorative (aria-hidden) but must still be visible
    // — on mobile too, which is why this test is not project-gated.
    await expect(page.getByTestId('release-lusg').getByText(/listen/i)).toBeVisible();
  });

  test('shop rows mirror the Ko-fi listing: the plate prints three, the screen prints all', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('shop-section')).toBeVisible();
    expect(shop.products.length, 'the synced shop must not be empty').toBeGreaterThan(0);

    // The plate is a page of the catalog, not the whole of it: three rows,
    // then More opens /shop with the rest.
    const printed = shop.products.slice(0, 3);

    // The listing is generated by scripts/sync-kofi-shop.mjs, so the rows
    // must match it exactly — data and page cannot drift apart.
    for (const product of printed) {
      const price = product.payWhatYouWant ? 'pay what you want' : product.price;
      const row = page.getByTestId(`shop-${product.slug}`);
      await expect(row).toBeVisible();
      await expect(row).toHaveAttribute('href', product.url);
      await expect(row).toHaveAttribute('target', '_blank');
      await expect(row).toHaveAccessibleName(`${product.name} — ${price} on Ko-fi`);
      // The visible listing is the data too: summary, price label and art.
      await expect(row).toContainText(product.summary);
      await expect(row).toContainText(product.price);
      await expect(row.locator('img')).toBeVisible();
    }

    const rest = shop.products.slice(3);
    for (const product of rest) {
      await expect(page.getByTestId(`shop-${product.slug}`)).toHaveCount(0);
    }
  });

  test('nav anchor scrolls to shop: clicking Shop brings the store into view', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('primary-nav').getByRole('link', { name: 'Shop' }).click();

    await expect(page.getByTestId('shop-section')).toBeInViewport();
  });

  test('writing rows mirror the Medium feed: every printed post links to its canonical page', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('writing-section')).toBeVisible();
    expect(posts.posts.length, 'the synced feed must not be empty').toBeGreaterThan(0);

    // Same contract as the shop: the page cannot drift from the synced data.
    for (const post of posts.posts.slice(0, 3)) {
      const row = page.getByTestId(`post-${post.slug}`);
      await expect(row).toBeVisible();
      await expect(row).toHaveAttribute('href', post.url);
      await expect(row).toHaveAttribute('target', '_blank');
      await expect(row).toHaveAccessibleName(`${post.title} — read on Medium`);
      await expect(row).toContainText(post.excerpt);
    }
  });

  test('nav anchor scrolls to writing: clicking Writing brings the feed into view', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('primary-nav').getByRole('link', { name: 'Writing' }).click();

    await expect(page.getByTestId('writing-section')).toBeInViewport();
  });

  test('elsewhere carries the writing and the tip jar', async ({ page }) => {
    await page.goto('/');

    const links = page.getByTestId('connect-links');
    await expect(links.getByRole('link', { name: /medium/i })).toHaveAttribute(
      'href',
      'https://medium.com/@lazyperfectist',
    );
    await expect(links.getByRole('link', { name: /ko-fi/i })).toHaveAttribute(
      'href',
      'https://ko-fi.com/lazyperfectionist',
    );
  });

  test('every plate is a ruled card: rows and their labels sit inside the page measure', async ({ page }, testInfo) => {
    const viewportWidth = testInfo.project.use.viewport?.width ?? 1280;
    // The card's inner margin: 16px on phones, 24px from md up. The row is
    // the card (its hover band spans the full measure); the type, art and
    // the plate label all sit that far inside it, so a row never hugs its
    // own edge. Padded parents rather than padded text, hence geometry.
    const inset = viewportWidth >= 768 ? 24 : 16;

    await page.goto('/');

    for (const section of ['releases-section', 'shop-section', 'writing-section', 'connect-section']) {
      const plate = page.getByTestId(section);
      const row = plate
        .locator('[data-testid^="release-"], [data-testid^="shop-"], [data-testid^="post-"], nav a')
        .first();
      const label = plate.locator('.eyebrow').first();

      const [rowBox, labelBox] = await Promise.all([row.boundingBox(), label.boundingBox()]);
      expect(rowBox, `${section} row must have a box`).not.toBeNull();

      // Connections place their margin column second in the DOM, so measure
      // the children rather than assuming document order matches the grid.
      const { left, right } = await row.locator(':scope > *').evaluateAll((cells) => {
        const boxes = cells.map((cell) => cell.getBoundingClientRect());
        return {
          left: Math.min(...boxes.map((box) => box.x)),
          right: Math.max(...boxes.map((box) => box.right)),
        };
      });

      expect(left - rowBox!.x, `${section} row must start ${inset}px inside its card`).toBeCloseTo(inset, 0);
      expect(rowBox!.x + rowBox!.width - right, `${section} row must end ${inset}px inside`).toBeCloseTo(inset, 0);
      // The plate's own label travels with the rows rather than out-denting.
      expect(labelBox!.x, `${section} label must align with the row content`).toBeCloseTo(left, 0);
    }
  });

  test('the metadata routes answer: sitemap is served as XML', async ({ page }) => {
    const response = await page.request.get('/sitemap.xml');
    expect(response.status()).toBe(200);
    // Without NEXT_PUBLIC_SITE_URL the sitemap is deliberately empty rather
    // than pointing at a host the site does not own.
    expect(await response.text()).toContain('<urlset');
  });

  test('each growing plate ends with a More row onto its own screen', async ({ page }) => {
    await page.goto('/');

    // The foot of the list is the action: every plate that can grow hands
    // off to its own screen, where the full list and its search live.
    await expect(
      page.getByRole('link', { name: 'More releases — open the full release list' }),
    ).toHaveAttribute('href', '/music');
    await expect(
      page.getByRole('link', { name: 'More items — open the full shop' }),
    ).toHaveAttribute('href', '/shop');
    await expect(
      page.getByRole('link', { name: 'More posts — open the full archive' }),
    ).toHaveAttribute('href', '/writing');
    // Elsewhere is the list of destinations itself — nowhere to send a More.
    await expect(
      page.getByTestId('connect-section').getByRole('link', { name: /^more$/i }),
    ).toHaveCount(0);
  });

  test('a plate screen carries the full list and searches it on the server', async ({ page }) => {
    // Shop: the screen prints everything the plate held back.
    await page.goto('/shop');
    const shopScreen = page.getByTestId('shop-screen');
    const shopRows = shopScreen.locator('[data-testid^="shop-"]');
    await expect(shopRows).toHaveCount(shop.products.length);

    // The search is a GET form — the query is in the URL, the server
    // filters, and no client script is involved.
    await page.getByRole('searchbox').fill('orbit');
    // The arrow is decoration: the name is the verb alone, so voice control
    // hears "Find", not "Find north east arrow".
    await expect(page.getByRole('button', { name: 'Find', exact: true })).toBeVisible();
    await page.getByRole('button', { name: /find/i }).click();
    await expect(page).toHaveURL(/\/shop\?q=orbit$/);

    const matching = shop.products.filter((product) =>
      `${product.name} ${product.summary}`.toLowerCase().includes('orbit'),
    );
    expect(matching.length, 'the fixture must match something').toBeGreaterThan(0);
    await expect(shopRows).toHaveCount(matching.length);
    for (const product of matching) {
      await expect(page.getByTestId(`shop-${product.slug}`)).toBeVisible();
    }

    // A miss says so and offers the way back.
    await page.goto('/shop?q=zzzz');
    await expect(page.getByText(/nothing matches/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /clear search/i })).toHaveAttribute('href', '/shop');

    // The other two screens answer with their own lists.
    await page.goto('/music');
    await expect(
      page.getByTestId('music-screen').locator('[data-testid^="release-"]'),
    ).toHaveCount(3);
    // A filter narrows the list but does not renumber the catalog: Orbit is
    // the third release whether or not the other two are on screen.
    await page.goto('/music?q=orbit');
    const orbit = page.getByTestId('release-orbit');
    await expect(orbit).toHaveCount(1);
    await expect(orbit.locator('span').first()).toHaveText('03');
    await page.goto('/writing');
    await expect(
      page.getByTestId('writing-screen').locator('[data-testid^="post-"]'),
    ).toHaveCount(posts.posts.length);
  });

  test('tags narrow a screen and ride along with the search', async ({ page }) => {
    // Every synced product carries a shelf — the Ko-fi category where the
    // artist assigned one, otherwise the kind derived from its name — so
    // the filter row always has something honest to show.
    for (const product of shop.products) {
      expect(product.tags, `${product.slug} must carry tags`).not.toHaveLength(0);
    }
    expect(posts.posts.some((post) => post.tags.length > 0), 'the feed must carry tags').toBe(true);

    const slugOf = (label: string) => label.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    await page.goto('/shop');
    const shopScreen = page.getByTestId('shop-screen');
    const shopRows = shopScreen.locator('[data-testid^="shop-"]');
    const shopTags = shopScreen.getByRole('navigation', { name: 'Tags' });

    // "All" is the resting state.
    await expect(shopTags.getByRole('link', { name: 'All' })).toHaveAttribute('aria-current', 'true');

    // A tag is a link, not a script: the URL says what is filtered.
    await shopTags.getByRole('link', { name: 'Tabs', exact: true }).click();
    await expect(page).toHaveURL(/\/shop\?tag=tabs$/);
    const tabs = shop.products.filter((product) =>
      product.tags.some((tag) => slugOf(tag) === 'tabs'),
    );
    await expect(shopRows).toHaveCount(tabs.length);
    await expect(shopTags.getByRole('link', { name: 'Tabs', exact: true })).toHaveAttribute(
      'aria-current',
      'true',
    );

    // A search started inside a tag stays inside it.
    await page.getByRole('searchbox').fill('lusg');
    await page.getByRole('button', { name: /find/i }).click();
    await expect(page).toHaveURL(/\/shop\?tag=tabs&q=lusg$/);
    await expect(shopRows).toHaveCount(1);
    await expect(page.getByTestId('shop-lusg-tabs')).toBeVisible();

    // "All" drops the tag and keeps the search.
    await shopTags.getByRole('link', { name: 'All' }).click();
    await expect(page).toHaveURL(/\/shop\?q=lusg$/);
    await expect(shopRows).toHaveCount(1);

    // A tagged miss clears the search, not the shelf.
    await page.goto('/shop?tag=tabs&q=zzzz');
    await expect(page.getByText(/nothing matches/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /clear search/i })).toHaveAttribute(
      'href',
      '/shop?tag=tabs',
    );

    // Writing filters on the tags Medium itself carries.
    await page.goto('/writing');
    const writingScreen = page.getByTestId('writing-screen');
    const writingTags = writingScreen.getByRole('navigation', { name: 'Tags' });
    const firstTag = posts.posts.find((post) => post.tags.length > 0)!.tags[0];
    await writingTags.getByRole('link', { name: firstTag, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/writing\\?tag=${slugOf(firstTag)}$`));
    const taggedPosts = posts.posts.filter((post) =>
      post.tags.some((tag) => slugOf(tag) === slugOf(firstTag)),
    );
    await expect(writingScreen.locator('[data-testid^="post-"]')).toHaveCount(taggedPosts.length);
  });

  test('no horizontal scroll on mobile: document fits the viewport width', async ({ page }, testInfo) => {
    const viewportWidth = testInfo.project.use.viewport?.width ?? 1280;
    test.skip(viewportWidth > 500, 'only meaningful on narrow viewports');

    await page.goto('/');
    await expect(page.getByTestId('hero-title')).toBeVisible();

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow, 'documentElement.scrollWidth must not exceed window.innerWidth').toBeLessThanOrEqual(0);
  });
});

test.describe('poster hero', () => {
  test('the print is full-bleed: it fills the fold edge to edge', async ({ page }, testInfo) => {
    const viewport = testInfo.project.use.viewport ?? { width: 1280, height: 720 };
    const landscape = viewport.width > viewport.height;
    await page.goto('/');

    const section = page.getByTestId('hero-section');
    const artwork = page.getByTestId('hero-artwork');
    // The anchor holds one plate per screen shape; only one is displayed.
    const plate = artwork.locator('img:visible');
    await expect(plate).toHaveCount(1);
    await expect(plate).toHaveCSS('object-fit', 'cover');

    const [sectionBox, artBox] = await Promise.all([
      section.boundingBox(),
      artwork.boundingBox(),
    ]);
    expect(sectionBox, 'hero section must have a layout box').not.toBeNull();
    expect(artBox, 'hero artwork must have a layout box').not.toBeNull();

    // The anchor is the fold: no paper margin on any side, so the print
    // touches the sheet's left and right edges at every width and gives up
    // its overflow to the crop instead.
    expect(Math.abs(artBox!.x - sectionBox!.x), 'print reaches the left edge').toBeLessThanOrEqual(1);
    expect(Math.abs(artBox!.y - sectionBox!.y), 'print starts at the fold').toBeLessThanOrEqual(1);
    expect(Math.abs(artBox!.width - sectionBox!.width), 'print reaches the right edge').toBeLessThanOrEqual(1);
    expect(Math.abs(artBox!.height - sectionBox!.height), 'print fills the fold height').toBeLessThanOrEqual(1);

    // The plate for this screen shape — 3:4 print on a portrait screen, the
    // 16:9 strike on a landscape one — and its source is that shape.
    const src = await plate.getAttribute('src');
    if (landscape) {
      expect(src, 'a landscape fold uses the 16:9 plate').toContain('lusg-poster-wide');
    } else {
      expect(src, 'a portrait fold uses the 3:4 print').not.toContain('wide');
    }
    const natural = await plate.evaluate((img: HTMLImageElement) => [
      img.naturalWidth,
      img.naturalHeight,
    ]);
    expect(natural[0] / natural[1], 'the plate is struck at its own ratio').toBeCloseTo(
      landscape ? 16 / 9 : 3 / 4,
      2,
    );

    // Cover trims the overflow: unless the fold happens to have the plate's
    // exact ratio, the visible picture is a crop of it.
    const foldRatio = sectionBox!.width / sectionBox!.height;
    expect(Math.abs(foldRatio - natural[0] / natural[1]), 'the fold is not the plate').toBeGreaterThan(0);

    // Landscape plates hug the right edge, so a narrow window trims the
    // figure rather than the wordmark.
    if (landscape) {
      const position = await plate.evaluate(
        (img) => getComputedStyle(img).objectPosition,
      );
      expect(position, 'the wide plate is anchored right').toMatch(/100%|\bright\b/);
    }

    // The section ends at the fold: the print is the first screen's subject,
    // starting directly under the announcement bar and header.
    expect(sectionBox!.y, 'fold starts below the chrome').toBeGreaterThan(0);
    expect(
      Math.abs(sectionBox!.y + sectionBox!.height - viewport.height),
      'fold must end at the viewport bottom',
    ).toBeLessThanOrEqual(2);
  });

  test('the fold crops the plate instead of letterboxing it', async ({ page }) => {
    // Full-bleed means the plate is scaled to cover the fold and cut on the
    // overflowing axis: a phone's fold is taller than the 3:4 print (sides
    // trimmed), a 16:9 fold is wider than the wide plate (top and bottom
    // trimmed). Nothing is ever letterboxed.
    const measure = async (width: number, height: number) => {
      await page.setViewportSize({ width, height });
      await page.goto('/');
      const artwork = page.getByTestId('hero-artwork');
      const [section, art] = await Promise.all([
        page.getByTestId('hero-section').boundingBox(),
        artwork.boundingBox(),
      ]);
      const plate = artwork.locator('img:visible');
      const natural = await plate.evaluate((img: HTMLImageElement) => [
        img.naturalWidth,
        img.naturalHeight,
      ]);
      const position = await plate.evaluate((img) => getComputedStyle(img).objectPosition);
      return {
        section: section!,
        art: art!,
        plateRatio: natural[0] / natural[1],
        position,
        src: (await plate.getAttribute('src')) ?? '',
      };
    };

    const phone = await measure(390, 844);
    expect(Math.abs(phone.art.width - phone.section.width)).toBeLessThanOrEqual(1);
    expect(Math.abs(phone.art.height - phone.section.height)).toBeLessThanOrEqual(1);
    expect(phone.src).not.toContain('wide');
    expect(
      phone.section.width / phone.section.height,
      'a phone fold is taller than the 3:4 print, so its sides are trimmed',
    ).toBeLessThan(phone.plateRatio);

    const desktop = await measure(1920, 1080);
    expect(Math.abs(desktop.art.width - desktop.section.width)).toBeLessThanOrEqual(1);
    expect(Math.abs(desktop.art.height - desktop.section.height)).toBeLessThanOrEqual(1);
    expect(desktop.src).toContain('lusg-poster-wide');
    expect(
      desktop.section.width / desktop.section.height,
      'a desktop fold is wider than the 16:9 plate, so its top and bottom are trimmed',
    ).toBeGreaterThan(desktop.plateRatio);
    expect(desktop.position, 'the wide plate is anchored right').toMatch(/100%|\bright\b/);
  });

  test('the page h1 is the band name: the poster carries it for the outline', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('h1')).toHaveText('Lazy Perfectionist');
  });
});
