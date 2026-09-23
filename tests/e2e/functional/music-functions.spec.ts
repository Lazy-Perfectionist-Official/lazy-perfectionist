import { test, expect } from '@playwright/test'
import { expectExternalLink, SPOTIFY_ARTIST_URL, SPOTIFY_LUSG_TRACK_URL } from './helpers'

/**
 * Music page functional tests — every interactive element on `/music`.
 * All destinations are external Spotify / Linktree URLs, so each element is
 * verified by link contract (href + target + rel) rather than navigation.
 */

const EXPECTED_CATALOG = [
  { title: 'LUSG', href: SPOTIFY_LUSG_TRACK_URL },
  { title: 'Cyclothymia', href: 'https://open.spotify.com/track/5gQpSHmOlmQTrz2H1iznYV' },
  { title: 'Orbit', href: 'https://open.spotify.com/track/1XIv8JGEDU9MZT6HEFmdk8' },
]

test.describe('Music page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/music')
    await expect(page.getByTestId('music-page')).toBeVisible()
  })

  test('featured release streams the LUSG single', async ({ page }) => {
    const stream = page.getByTestId('music-stream-button')
    await stream.scrollIntoViewIfNeeded()
    await expect(stream).toContainText(/stream now/i)
    await expectExternalLink(stream, new RegExp(`^${SPOTIFY_LUSG_TRACK_URL}$`), 'stream button')
  })

  test('follow button opens the Spotify artist page', async ({ page }) => {
    const follow = page.getByTestId('music-follow-button')
    await follow.scrollIntoViewIfNeeded()
    await expectExternalLink(follow, new RegExp(`^${SPOTIFY_ARTIST_URL}$`), 'follow button')
  })

  test('featured cover art links to Spotify', async ({ page }) => {
    const cover = page.getByTestId('music-featured').getByRole('link', {
      name: /play lusg on spotify/i,
    })
    await cover.scrollIntoViewIfNeeded()
    await expectExternalLink(cover, new RegExp(`^${SPOTIFY_LUSG_TRACK_URL}$`), 'featured cover')
  })

  test('catalog lists all three releases with Spotify links', async ({ page }) => {
    const cards = page.getByTestId('music-card')
    await cards.first().scrollIntoViewIfNeeded()
    await expect(cards).toHaveCount(EXPECTED_CATALOG.length)

    for (let i = 0; i < EXPECTED_CATALOG.length; i++) {
      const card = cards.nth(i)
      await expect(card).toContainText(EXPECTED_CATALOG[i].title)
      await expectExternalLink(
        card,
        new RegExp(`^${EXPECTED_CATALOG[i].href}$`),
        `catalog card ${i}`
      )
    }
  })

  test('closing strip links to Spotify artist and Linktree', async ({ page }) => {
    const closing = page.getByTestId('music-closing')
    await closing.scrollIntoViewIfNeeded()

    const follow = closing.getByRole('link', { name: /follow on spotify/i })
    await expectExternalLink(follow, new RegExp(`^${SPOTIFY_ARTIST_URL}$`), 'closing follow')

    const allLinks = closing.getByRole('link', { name: /all links/i })
    await expectExternalLink(allLinks, /^https:\/\/linktr\.ee\//, 'closing all links')
  })
})
