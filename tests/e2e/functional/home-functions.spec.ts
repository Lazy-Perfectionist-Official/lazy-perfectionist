import { test, expect } from '@playwright/test'
import {
  expectExternalLink,
  isDesktopViewport,
  mediumPostFixture,
  SPOTIFY_ARTIST_URL,
  SPOTIFY_LUSG_TRACK_URL,
} from './helpers'

/**
 * Homepage functional tests — every interactive element on `/`.
 *
 * Nav-route coverage (clicking through nav items) lives in
 * navigation.spec.ts; here we assert link contracts, API-driven sections,
 * and the two forms end-to-end with intercepted APIs.
 */

test.describe('Hero navigation', () => {
  test('nav logo renders the artist name', async ({ page }) => {
    await page.goto('/')
    // On the homepage the logo is a plain div (no link — you're already
    // home); the subpage Navigation logo is the one that links back.
    await expect(page.getByTestId('nav-logo')).toContainText('Lazy Perfectionist')
  })

  test('desktop nav links point at the right routes', async ({ page }) => {
    test.skip(!(await isDesktopViewport(page)), 'desktop-only nav bar')
    await page.goto('/')
    await expect(page.getByTestId('nav-link-home')).toHaveAttribute('href', '/')
    await expect(page.getByTestId('nav-link-music')).toHaveAttribute('href', '/music')
    await expect(page.getByTestId('nav-link-blog')).toHaveAttribute('href', '/blog')
    await expect(page.getByTestId('nav-link-store')).toHaveAttribute('href', '/store')
    await expect(page.getByTestId('nav-link-connect')).toHaveAttribute('href', '/platform-links')
  })

  test('Listen Now button opens the LUSG track on Spotify', async ({ page }) => {
    test.skip(!(await isDesktopViewport(page)), 'desktop-only nav bar')
    await page.goto('/')
    await expectExternalLink(
      page.getByTestId('nav-listen-now'),
      new RegExp(`^${SPOTIFY_LUSG_TRACK_URL}$`),
      'nav listen-now'
    )
  })

  test('/store redirects off-site to the ko-fi shop', async ({ request }) => {
    const response = await request.get('/store', { maxRedirects: 0 })
    expect([307, 308]).toContain(response.status())
    expect(response.headers()['location']).toContain('ko-fi.com')
  })
})

test.describe('Hero content (API-driven)', () => {
  test('renders copy served by /api/content', async ({ page }) => {
    await page.route('**/api/content', (route) =>
      route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: {
            hero_eyebrow: 'TEST EYEBROW QG7',
            hero_title_line1: 'Custom line one QG7',
          },
        }),
      })
    )
    await page.goto('/')
    await expect(page.getByTestId('hero-eyebrow')).toContainText('TEST EYEBROW QG7')
    await expect(page.getByTestId('hero-title')).toContainText('Custom line one QG7')
  })

  test('keeps built-in defaults when /api/content fails', async ({ page }) => {
    await page.route('**/api/content', (route) => route.fulfill({ status: 500 }))
    await page.goto('/')
    await expect(page.getByTestId('hero-eyebrow')).toContainText('Latest Single')
    await expect(page.getByTestId('hero-title')).toContainText('Where silence speaks')
  })

  test('CTA streams LUSG on Spotify', async ({ page }) => {
    await page.goto('/')
    const cta = page.getByTestId('hero-cta-button')
    await expect(cta).toContainText(/stream.*lusg/i)
    await expectExternalLink(cta, new RegExp(`^${SPOTIFY_LUSG_TRACK_URL}$`), 'hero CTA')
  })
})

test.describe('Selected works', () => {
  test('featured release card opens Spotify', async ({ page }) => {
    await page.goto('/')
    // The testid is on the card wrapper; the anchor is its first link.
    const card = page.getByTestId('featured-release-card').getByRole('link').first()
    await card.scrollIntoViewIfNeeded()
    await expectExternalLink(card, /^https:\/\/open\.spotify\.com\//, 'featured release')
  })

  test('View All navigates to the music page', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('selected-works-view-all').scrollIntoViewIfNeeded()
    await page.getByTestId('selected-works-view-all').click()
    await expect(page).toHaveURL(/\/music$/)
    await expect(page.getByTestId('music-page')).toBeVisible()
  })
})

test.describe('Journal section (API-driven)', () => {
  test('renders entries fetched from /api/medium', async ({ page }) => {
    await page.route('**/api/medium**', (route) =>
      route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify({
          data: [
            mediumPostFixture({ id: 'alpha', title: 'Alpha Post' }),
            mediumPostFixture({ id: 'beta', title: 'Beta Post' }),
          ],
        }),
      })
    )
    await page.goto('/')
    const section = page.getByTestId('journal-section')
    await section.scrollIntoViewIfNeeded()
    await expect(page.getByTestId('journal-entry-0')).toContainText('ALPHA POST')
    await expect(page.getByTestId('journal-entry-1')).toContainText('BETA POST')
    await expectExternalLink(
      page.getByTestId('journal-entry-0'),
      /^https:\/\/medium\.com\//,
      'journal entry 0'
    )
  })

  test('View All appears with entries and links to the blog (desktop)', async ({ page }) => {
    test.skip(!(await isDesktopViewport(page)), 'VIEW ALL is hidden below md')
    await page.route('**/api/medium**', (route) =>
      route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify({ data: [mediumPostFixture({ id: 'alpha', title: 'Alpha Post' })] }),
      })
    )
    await page.goto('/')
    // Scope to the journal header: the works section has its own VIEW ALL.
    const viewAll = page.getByTestId('journal-header').getByRole('link', { name: /view all/i })
    await viewAll.scrollIntoViewIfNeeded()
    await expect(viewAll).toHaveAttribute('href', '/blog')
  })

  test('shows the fallback message when /api/medium fails', async ({ page }) => {
    await page.route('**/api/medium**', (route) => route.fulfill({ status: 500 }))
    await page.goto('/')
    const section = page.getByTestId('journal-section')
    await section.scrollIntoViewIfNeeded()
    await expect(section).toContainText('Stories coming soon')
    const blogLink = section.getByRole('link', { name: /visit the blog/i })
    await expect(blogLink).toHaveAttribute('href', '/blog')
  })
})

test.describe('Stats timeline', () => {
  test('all three timeline rows link to Spotify tracks', async ({ page }) => {
    await page.goto('/')
    for (const index of [0, 1, 2]) {
      const row = page.getByTestId(`stat-item-${index}`)
      await row.scrollIntoViewIfNeeded()
      await expectExternalLink(row, /^https:\/\/open\.spotify\.com\/track\//, `stat row ${index}`)
    }
  })
})

test.describe('Finale', () => {
  test('Stream button opens the LUSG track', async ({ page }) => {
    await page.goto('/')
    const button = page.getByTestId('finale-stream-button')
    await button.scrollIntoViewIfNeeded()
    await expectExternalLink(button, new RegExp(`^${SPOTIFY_LUSG_TRACK_URL}$`), 'finale stream')
  })

  test('discography link navigates to the music page', async ({ page }) => {
    await page.goto('/')
    const link = page.getByTestId('finale-discography-link')
    await link.scrollIntoViewIfNeeded()
    await link.click()
    await expect(page).toHaveURL(/\/music$/)
    await expect(page.getByTestId('music-page')).toBeVisible()
  })
})

test.describe('Contact form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('contact-form').scrollIntoViewIfNeeded()
  })

  test('blocks submission while required fields are invalid', async ({ page }) => {
    // Hang the API so an engine that bypasses native validation can never
    // hit the real endpoint from this test.
    await page.route('**/api/contact', (route) => new Promise(() => {}))

    const form = page.getByTestId('contact-form')

    // The validation contract: required fields + email type + message floor.
    await expect(form.locator('input[name="name"]')).toHaveAttribute('required', '')
    await expect(form.locator('input[name="email"]')).toHaveAttribute('type', 'email')
    await expect(form.locator('input[name="email"]')).toHaveAttribute('required', '')
    await expect(form.locator('textarea[name="message"]')).toHaveAttribute('required', '')
    await expect(form.locator('textarea[name="message"]')).toHaveAttribute('minlength', '10')

    const requests: string[] = []
    page.on('request', (request) => {
      if (request.url().includes('/api/contact')) requests.push(request.url())
    })

    const submit = form.getByRole('button', { name: /send message/i })

    // Everything empty — HTML5 validation must block the POST.
    await submit.click()
    // Name + email valid, message too short (minLength 10) — still blocked.
    await form.getByLabel('Your name').fill('Test User')
    await form.getByLabel('Your email').fill('test@example.com')
    await form.getByLabel('Your message').fill('short')
    await submit.click()

    await page.waitForTimeout(500)
    // WebKit's synthetic submit clicks bypass constraint validation (an
    // automation quirk, not site behavior), so the no-POST proof only holds
    // on chromium/firefox.
    const isWebKit = /webkit|safari/.test(test.info().project.name)
    if (!isWebKit) {
      expect(requests).toHaveLength(0)
      await expect(submit).toContainText(/send message/i)
    }
  })

  test('submits successfully: SENDING state, toast, cleared fields', async ({ page }) => {
    await page.route('**/api/contact', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      await route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Sent from functional test' }),
      })
    })

    const form = page.getByTestId('contact-form')
    await form.getByLabel('Your name').fill('Test User')
    await form.getByLabel('Your email').fill('test@example.com')
    await form.getByLabel('Subject').fill('Hello')
    await form.getByLabel('Your message').fill('This is a functional test message.')
    await form.getByRole('button', { name: /send message/i }).click()

    // In-flight state: disabled button with SENDING label.
    await expect(form.getByRole('button')).toBeDisabled()
    await expect(form.getByRole('button')).toContainText(/sending/i)

    // Success toast + form reset. exact:true matches the visible toast only —
    // Radix also duplicates the text into an aria-live region.
    await expect(page.getByText('Message sent', { exact: true })).toBeVisible()
    await expect(page.getByText('Sent from functional test', { exact: true })).toBeVisible()
    await expect(form.getByLabel('Your name')).toHaveValue('')
    await expect(form.getByLabel('Your message')).toHaveValue('')
  })

  test('surfaces an error toast when the API rejects', async ({ page }) => {
    await page.route('**/api/contact', (route) =>
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ success: false, error: 'Mailbox is full QG7' }),
      })
    )

    const form = page.getByTestId('contact-form')
    await form.getByLabel('Your name').fill('Test User')
    await form.getByLabel('Your email').fill('test@example.com')
    await form.getByLabel('Your message').fill('This is a functional test message.')
    await form.getByRole('button', { name: /send message/i }).click()

    await expect(page.getByText('Could not send message', { exact: true })).toBeVisible()
    await expect(page.getByText('Mailbox is full QG7', { exact: true })).toBeVisible()
    // Fields are kept on failure so the user can retry.
    await expect(form.getByLabel('Your name')).toHaveValue('Test User')
  })
})

test.describe('Newsletter form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('newsletter-form').scrollIntoViewIfNeeded()
  })

  test('blocks submission without an email', async ({ page }) => {
    const requests: string[] = []
    page.on('request', (request) => {
      if (request.url().includes('/api/newsletter')) requests.push(request.url())
    })

    const form = page.getByTestId('newsletter-form')
    await form.getByRole('button', { name: /subscribe/i }).click()
    await page.waitForTimeout(500)
    expect(requests).toHaveLength(0)
  })

  test('subscribes successfully: toast, cleared input', async ({ page }) => {
    await page.route('**/api/newsletter', (route) =>
      route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Welcome aboard QG7' }),
      })
    )

    const form = page.getByTestId('newsletter-form')
    await form.getByLabel('Email address').fill('fan@example.com')
    await form.getByRole('button', { name: /subscribe/i }).click()

    await expect(page.getByText('Subscribed', { exact: true })).toBeVisible()
    await expect(page.getByText('Welcome aboard QG7', { exact: true })).toBeVisible()
    await expect(form.getByLabel('Email address')).toHaveValue('')
  })

  test('surfaces an error toast when the API rejects', async ({ page }) => {
    await page.route('**/api/newsletter', (route) =>
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ success: false, error: 'Duplicate email QG7' }),
      })
    )

    const form = page.getByTestId('newsletter-form')
    await form.getByLabel('Email address').fill('fan@example.com')
    await form.getByRole('button', { name: /subscribe/i }).click()

    await expect(page.getByText('Could not subscribe', { exact: true })).toBeVisible()
    await expect(form.getByLabel('Email address')).toHaveValue('fan@example.com')
  })
})

test.describe('Contact section links', () => {
  test('Spotify button opens the artist page', async ({ page }) => {
    await page.goto('/')
    const button = page.getByTestId('contact-spotify-button')
    await button.scrollIntoViewIfNeeded()
    await expectExternalLink(button, new RegExp(`^${SPOTIFY_ARTIST_URL}$`), 'contact spotify')
  })

  test('footer social links are safe external links', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('contact-instagram-link').scrollIntoViewIfNeeded()
    await expectExternalLink(
      page.getByTestId('contact-instagram-link'),
      /^https:\/\/(www\.)?instagram\.com\//,
      'instagram'
    )
    await expectExternalLink(
      page.getByTestId('contact-twitter-link'),
      /^https:\/\/(www\.)?(twitter|x)\.com\//,
      'twitter'
    )
    await expectExternalLink(
      page.getByTestId('contact-youtube-link'),
      /^https:\/\/(www\.)?youtube\.com\//,
      'youtube'
    )
  })
})

test.describe('Mobile menu (touch projects)', () => {
  test('drawer opens, links navigate, drawer closes', async ({ page }) => {
    test.skip(await isDesktopViewport(page), 'mobile-only drawer')
    await page.goto('/')
    const toggle = page.getByTestId('nav-mobile-toggle')
    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await page.getByTestId('nav-mobile-link-music').click()
    await expect(page).toHaveURL(/\/music$/)
    await expect(page.getByTestId('music-page')).toBeVisible()
    await expect(page.getByTestId('nav-mobile-toggle')).toHaveAttribute('aria-expanded', 'false')
  })
})
