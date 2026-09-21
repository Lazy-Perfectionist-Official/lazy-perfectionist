import { test, expect } from '@playwright/test'

/**
 * 404 page functional tests — both recovery CTAs.
 */

test.describe('Not-found page', () => {
  test('renders the custom 404 with recovery links', async ({ page }) => {
    await page.goto('/this-route-does-not-exist')
    await expect(page.getByTestId('not-found-page')).toBeVisible()
    await expect(page.getByTestId('not-found-home')).toHaveAttribute('href', '/')
    await expect(page.getByTestId('not-found-music')).toHaveAttribute('href', '/music')
  })

  test('Back to Home returns to the homepage', async ({ page }) => {
    await page.goto('/this-route-does-not-exist')
    await page.getByTestId('not-found-home').click()
    await expect(page).toHaveURL(/\/$/)
    await expect(page.getByTestId('hero-content')).toBeVisible()
  })

  test('Listen Instead navigates to the music page', async ({ page }) => {
    await page.goto('/this-route-does-not-exist')
    await page.getByTestId('not-found-music').click()
    await expect(page).toHaveURL(/\/music$/)
    await expect(page.getByTestId('music-page')).toBeVisible()
  })
})
