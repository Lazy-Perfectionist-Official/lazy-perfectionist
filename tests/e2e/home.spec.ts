import { expect, test } from '@playwright/test';

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
const RELEASE_ROW_IDS = ['release-lusg', 'release-cyclothymia', 'release-orbit'] as const;

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

  test('hero links are honest: the print and the artist profile point where they claim', async ({ page }) => {
    await page.goto('/');

    const artwork = page.getByTestId('hero-artwork');
    await expect(artwork).toBeVisible();
    await expect(artwork).toHaveAttribute('href', TRACK_URL);
    await expect(artwork).toHaveAttribute('target', '_blank');

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

    for (const id of RELEASE_ROW_IDS) {
      const row = page.getByTestId(id);
      await expect(row).toBeVisible();
      await expect(row).toHaveAttribute('href', SPOTIFY_TRACK_HREF);
      await expect(row).toHaveAttribute('target', '_blank');
    }

    // The Listen label is decorative (aria-hidden) but must still be visible
    // — on mobile too, which is why this test is not project-gated.
    await expect(page.getByTestId('release-lusg').getByText(/listen/i)).toBeVisible();
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
  test('the print fills the first screen: the artwork covers the section to the fold', async ({ page }, testInfo) => {
    const viewport = testInfo.project.use.viewport ?? { width: 1280, height: 720 };
    await page.goto('/');

    const section = page.getByTestId('hero-section');
    const artwork = page.getByTestId('hero-artwork');
    const poster = artwork.locator('img');
    await expect(poster).toBeVisible();
    await expect(poster).toHaveCSS('object-fit', 'cover');

    const [sectionBox, artBox] = await Promise.all([
      section.boundingBox(),
      artwork.boundingBox(),
    ]);
    expect(sectionBox, 'hero section must have a layout box').not.toBeNull();
    expect(artBox, 'hero artwork must have a layout box').not.toBeNull();

    // Edge to edge: the listen link covers the section on all four sides.
    expect(Math.abs(artBox!.x - sectionBox!.x), 'artwork must start at the section edge').toBeLessThanOrEqual(1);
    expect(Math.abs(artBox!.y - sectionBox!.y), 'artwork must start at the section top').toBeLessThanOrEqual(1);
    expect(Math.abs(artBox!.width - sectionBox!.width), 'artwork must span the section width').toBeLessThanOrEqual(1);
    expect(Math.abs(artBox!.height - sectionBox!.height), 'artwork must span the section height').toBeLessThanOrEqual(1);

    // The section ends at the fold: the print is the whole first screen,
    // starting directly under the announcement bar and header.
    expect(sectionBox!.y, 'print starts below the chrome').toBeGreaterThan(0);
    expect(
      Math.abs(sectionBox!.y + sectionBox!.height - viewport.height),
      'print must end at the viewport bottom',
    ).toBeLessThanOrEqual(2);
  });

  test('the page h1 is the band name: the poster carries it for the outline', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('h1')).toHaveText('Lazy Perfectionist');
  });
});
