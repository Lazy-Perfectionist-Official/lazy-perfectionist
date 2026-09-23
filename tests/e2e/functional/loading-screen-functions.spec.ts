import { test, expect } from '@playwright/test'

/**
 * Intro loading screen — the behaviors the component promises:
 * shows on a fresh session and self-removes, shows once per session, and
 * never appears under prefers-reduced-motion. No exact-timing asserts: the
 * duration is clamped by readiness, so only bounds are asserted.
 *
 * This is the one '/'-visiting spec WITHOUT skipIntro — every other suite
 * sets the lp-intro-shown session flag in its beforeEach.
 */

const SCREEN = '[data-testid="loading-screen"]'
// Mount decision happens in useEffect after hydration; prod/dev hydration
// plus the 900–1600ms clamp and 380ms fade gives generous headroom.
const DETACHED_BOUND_MS = 5000

test.describe('Loading screen', () => {
  test('appears on a fresh visit and self-removes', async ({ page }) => {
    // Record the mount from document start: under parallel-suite load the
    // ~1.3s overlay lifecycle can complete before an in-page locator gets
    // its first poll, so observe the DOM itself instead of racing it.
    await page.addInitScript(() => {
      (window as unknown as Record<string, unknown>).__lpLoaderSeen = false
      new MutationObserver(() => {
        if (document.querySelector('[data-testid="loading-screen"]')) {
          (window as unknown as Record<string, unknown>).__lpLoaderSeen = true
        }
      }).observe(document, { childList: true, subtree: true })
    })

    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await expect
      .poll(() => page.evaluate(() => (window as unknown as Record<string, unknown>).__lpLoaderSeen), { timeout: 8000 })
      .toBe(true)
    // Content is never gated — it renders beneath the overlay from the start.
    await expect(page.getByTestId('hero-title')).toBeAttached()
    await page.locator(SCREEN).waitFor({ state: 'detached', timeout: DETACHED_BOUND_MS })
    await expect(page.getByTestId('loading-progress-bar')).toHaveCount(0)
  })

  test('skips on the second visit in the same session', async ({ page }) => {
    await page.goto('/')
    await page.locator(SCREEN).waitFor({ state: 'detached', timeout: DETACHED_BOUND_MS })

    // Same tab navigation keeps sessionStorage for the origin.
    await page.goto('/music')
    await page.goBack()
    // If the overlay were showing it would be attached right away; give the
    // hydration a moment and assert it never mounted.
    await page.getByTestId('hero-title').waitFor({ state: 'visible' })
    await page.waitForTimeout(400)
    await expect(page.locator(SCREEN)).toHaveCount(0)
  })

  test('skips under prefers-reduced-motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await page.getByTestId('hero-title').waitFor({ state: 'visible' })
    await page.waitForTimeout(400)
    await expect(page.locator(SCREEN)).toHaveCount(0)
  })
})
