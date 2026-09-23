import { expect, type Locator, type Page } from '@playwright/test'

/**
 * Shared helpers for the functional suite.
 *
 * Conventions (see changelogs/2026-09-17_visual-determinism):
 * - External links are never navigated to. We assert the contract instead:
 *   correct origin, target="_blank", rel containing noopener + noreferrer.
 * - API-driven UI states are produced with route interception, never by
 *   depending on live third-party data.
 * - No soft "if visible" guards: every assertion must be able to fail.
 */

/** Click a nav link, opening the mobile drawer first when it exists. */
export async function clickNavLink(page: Page, item: string) {
  const toggle = page.getByTestId('nav-mobile-toggle')
  if (await toggle.isVisible({ timeout: 1500 }).catch(() => false)) {
    await toggle.click()
  }
  await page
    .locator(
      `[data-testid="nav-link-${item}"]:visible, [data-testid="nav-mobile-link-${item}"]:visible`
    )
    .first()
    .click()
}

/** True when the current project viewport is at desktop width (md: 768px). */
export async function isDesktopViewport(page: Page): Promise<boolean> {
  const width = page.viewportSize()?.width ?? 1280
  return width >= 768
}

/**
 * Mark the intro loader as already shown for this session. Every test gets
 * a fresh context (= fresh sessionStorage), so without this the '/'-visiting
 * suites would all sit through the once-per-session intro overlay. Dedicated
 * loader behavior is covered by loading-screen-functions.spec.ts.
 */
export async function skipIntro(page: Page) {
  await page.addInitScript(() => {
    try {
      sessionStorage.setItem('lp-intro-shown', '1')
    } catch {}
  })
}

/**
 * Assert the external-link contract on an anchor: href matches pattern,
 * opens in a new tab, and is hardened with noopener/noreferrer.
 */
export async function expectExternalLink(
  locator: Locator,
  hrefPattern: RegExp,
  description = 'external link'
) {
  const href = await locator.getAttribute('href')
  expect(href, `${description} href`).toMatch(hrefPattern)
  await expect(locator, `${description} target`).toHaveAttribute('target', '_blank')
  const rel = await locator.getAttribute('rel')
  expect(rel, `${description} rel`).toContain('noopener')
  expect(rel, `${description} rel`).toContain('noreferrer')
}

export const SPOTIFY_ARTIST_URL = 'https://open.spotify.com/artist/7ELTTbYXSvCIXh0W6IV3um'
export const SPOTIFY_LUSG_TRACK_URL = 'https://open.spotify.com/track/4RnwmBIaSuOqGEu8R2nIsU'
export const MEDIUM_PROFILE_URL = 'https://medium.com/@lazyperfectist'
export const KOFI_SHOP_URL = 'https://ko-fi.com/lazyperfectionist/shop'

/** Minimal Medium post shape consumed by the Journal section. */
export function mediumPostFixture(overrides: Partial<Record<string, string>> & { id: string; title: string }) {
  return {
    id: overrides.id,
    title: overrides.title,
    thumbnail: '',
    readTime: '3 min read',
    publishedDate: '2026-09-01T00:00:00.000Z',
    link: `https://medium.com/@lazyperfectist/${overrides.id}`,
    ...overrides,
  }
}
