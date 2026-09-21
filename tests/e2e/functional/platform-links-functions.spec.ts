import { test, expect } from '@playwright/test'
import { expectExternalLink, SPOTIFY_LUSG_TRACK_URL } from './helpers'

/**
 * Platform-links page functional tests — every state of `/platform-links`.
 *
 * The page is fully API-driven (/api/platform-links?trackId=...), so all
 * data states are produced by route interception. Platform rows intercept
 * clicks (preventDefault) and call window.open — the stub records the URL
 * the user would land on without spawning a popup.
 */

const PLATFORM_FIXTURE = {
  success: true,
  data: {
    platforms: [
      {
        platform: 'spotify',
        name: 'Spotify',
        url: 'https://open.spotify.com/track/fixture',
        color: '#1DB954',
        icon: '🎵',
        order: 1,
      },
      {
        platform: 'youtube',
        name: 'YouTube Music',
        url: 'https://music.youtube.com/watch?v=fixture',
        color: '#FF0000',
        icon: '▶',
        order: 2,
      },
    ],
    albumImage: null,
  },
}

test.describe('Platform links — no track context', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/platform-links')
  })

  test('shows the start-listening state with a working music link', async ({ page }) => {
    await expect(page.getByText('START LISTENING')).toBeVisible()
    const browse = page.getByRole('link', { name: /browse music/i })
    await expect(browse).toHaveAttribute('href', '/music')
    await browse.click()
    await expect(page).toHaveURL(/\/music$/)
    await expect(page.getByTestId('music-page')).toBeVisible()
  })

  test('default stream button opens the LUSG track', async ({ page }) => {
    const stream = page.getByRole('link', { name: /stream "lusg" on spotify/i })
    await expectExternalLink(stream, new RegExp(`^${SPOTIFY_LUSG_TRACK_URL}$`), 'default stream')
  })

  test('back-to-music link navigates to the music page', async ({ page }) => {
    const back = page.getByRole('link', { name: /back to music/i })
    await back.click()
    await expect(page).toHaveURL(/\/music$/)
  })
})

test.describe('Platform links — platforms loaded', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/platform-links**', (route) =>
      route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify(PLATFORM_FIXTURE),
      })
    )
    await page.goto(
      '/platform-links?trackId=4RnwmBIaSuOqGEu8R2nIsU&trackName=LUSG&artistName=Lazy%20Perfectionist'
    )
  })

  test('renders the track context and every platform row', async ({ page }) => {
    await expect(page.getByText('Choose Your Platform')).toBeVisible()
    await expect(page.getByText(/Listen to "LUSG"/)).toBeVisible()
    await expect(page.getByRole('link', { name: /open$/i })).toHaveCount(2)
    await expect(page.getByRole('link', { name: /spotify/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /youtube music/i })).toBeVisible()
  })

  test('clicking a platform opens its URL in a new context', async ({ page }) => {
    await page.evaluate(() => {
      (window as unknown as Record<string, unknown>).__openedUrls = []
      window.open = ((url: string) => {
        (window as unknown as Record<string, string[]>).__openedUrls.push(url)
        return null
      }) as typeof window.open
    })

    await page.getByRole('link', { name: /youtube music/i }).click()
    const opened = await page.evaluate(
      () => (window as unknown as Record<string, string[]>).__openedUrls
    )
    expect(opened).toEqual(['https://music.youtube.com/watch?v=fixture'])
  })
})

test.describe('Platform links — API failure', () => {
  test('falls back to a direct Spotify link for the requested track', async ({ page }) => {
    await page.route('**/api/platform-links**', (route) =>
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ success: false }),
      })
    )
    await page.goto('/platform-links?trackId=fixture-track-id')

    await expect(page.getByText('PLATFORM LINKS UNAVAILABLE')).toBeVisible()
    const stream = page.getByRole('link', { name: /stream on spotify/i })
    await expectExternalLink(
      stream,
      /^https:\/\/open\.spotify\.com\/track\/fixture-track-id$/,
      'failure stream'
    )

    const browse = page.getByRole('link', { name: /browse music/i })
    await expect(browse).toHaveAttribute('href', '/music')
  })
})
