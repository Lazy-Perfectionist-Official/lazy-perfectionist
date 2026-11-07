import { expect, test, type Page } from '@playwright/test';

import content from '../../src/lib/content.json';

/**
 * The discography is the ordered catalog: one separator card per year and
 * the releases under it, with search, year facets and order all resolved on
 * the server from the URL. Nothing here needs client JS.
 */
const RELEASES = content.releases;
const YEARS = [...new Set(RELEASES.map((release) => release.year))].sort(
  (a, b) => Number(b) - Number(a),
);

// DOM order of the year cards, which is the order the page prints them in.
const yearOrder = (page: Page) =>
  page
    .getByTestId(/^year-group-/)
    .evaluateAll((cards) => cards.map((card) => card.getAttribute('data-testid')));

test.describe('discography', () => {
  test('every release is filed under its year, newest year first', async ({ page }) => {
    await page.goto('/discography');

    const screen = page.getByTestId('discography-screen');
    await expect(
      screen.getByRole('heading', { name: 'Discography', level: 1 }),
    ).toBeVisible();

    await expect(page.getByTestId(/^year-group-/)).toHaveCount(YEARS.length);
    expect(await yearOrder(page)).toEqual(
      YEARS.map((year) => `year-group-${year}`),
    );

    // Each year card names its year and counts its own rows.
    for (const year of YEARS) {
      const card = page.getByTestId(`year-group-${year}`);
      const count = RELEASES.filter((release) => release.year === year).length;
      await expect(
        card.getByRole('heading', { name: year, level: 2 }),
      ).toBeVisible();
      await expect(
        card.getByText(`${count} ${count === 1 ? 'release' : 'releases'}`),
      ).toBeVisible();
    }

    // Every release is on the page exactly once.
    for (const release of RELEASES) {
      await expect(
        page.getByTestId(`release-${release.title.toLowerCase()}`),
      ).toHaveCount(1);
    }

    // The year lives in the separator, not repeated on every row.
    const first = RELEASES[0];
    await expect(
      page.getByTestId(`release-${first.title.toLowerCase()}`),
    ).not.toContainText(first.year);
  });

  test('a search narrows the list and the years to the matches', async ({ page }) => {
    await page.goto('/discography?q=orbit');

    await expect(page.getByTestId('release-orbit')).toBeVisible();
    await expect(page.getByTestId('release-lusg')).toHaveCount(0);
    await expect(page.getByTestId(/^year-group-/)).toHaveCount(1);
    await expect(page.getByTestId('year-group-2025')).toBeVisible();

    // The count line reports the narrowing rather than the catalog size.
    await expect(page.getByText(`1 of ${RELEASES.length}`)).toBeVisible();
  });

  test('a year facet keeps the year and drops the others', async ({ page }) => {
    await page.goto('/discography?tag=2025');

    const facets = page.getByRole('navigation', { name: 'Year' });
    await expect(facets.getByRole('link', { name: '2025' })).toHaveAttribute(
      'aria-current',
      'true',
    );

    await expect(page.getByTestId(/^year-group-/)).toHaveCount(1);
    await expect(page.getByTestId('year-group-2025')).toBeVisible();
    await expect(page.getByTestId('release-orbit')).toBeVisible();
    await expect(page.getByTestId('release-lusg')).toHaveCount(0);

    // The facet row is a link, so the filter is a URL anyone can share.
    await expect(page).toHaveURL(/[?&]tag=2025\b/);
  });

  test('oldest reverses the years and the rows inside each year', async ({ page }) => {
    await page.goto('/discography?sort=oldest');

    await expect(
      page.getByRole('navigation', { name: 'Sort' }).getByRole('link', { name: 'Oldest' }),
    ).toHaveAttribute('aria-current', 'true');

    expect(await yearOrder(page)).toEqual(
      [...YEARS].reverse().map((year) => `year-group-${year}`),
    );

    // 2026 carries two releases; oldest-first prints them bottom-up, so
    // Cyclothymia comes before LUSG.
    const lusg = await page.getByTestId('release-lusg').boundingBox();
    const cyclothymia = await page.getByTestId('release-cyclothymia').boundingBox();
    expect(cyclothymia?.y ?? 0).toBeLessThan(lusg?.y ?? 0);

    // The order rides along on the other controls rather than resetting.
    await expect(
      page.getByRole('navigation', { name: 'Year' }).getByRole('link', { name: '2025' }),
    ).toHaveAttribute('href', '/discography?tag=2025&sort=oldest');
  });

  test('the masthead offers the discography from every screen', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByTestId('primary-nav').getByRole('link', { name: 'Discography' }),
    ).toHaveAttribute('href', '/discography');
  });
});
