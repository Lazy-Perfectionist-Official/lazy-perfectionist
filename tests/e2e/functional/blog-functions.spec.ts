import { test, expect } from '@playwright/test'
import { expectExternalLink, MEDIUM_PROFILE_URL } from './helpers'

/**
 * Blog page functional tests — sort control, story cards, Medium links.
 *
 * Stories are server-rendered (see changelogs/2026-09-21_agent-readable-web),
 * so cards must be present in the DOM without waiting on any client fetch —
 * from either the live Medium feed or the built-in fallback post (both link
 * to medium.com), which keeps these assertions deterministic.
 */

test.describe('Blog page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog')
    await expect(page.getByTestId('blog-header')).toBeVisible()
  })

  test('server-renders at least one story card linking to Medium', async ({ page }) => {
    const cards = page.getByTestId('blog-card')
    await cards.first().scrollIntoViewIfNeeded()
    const count = await cards.count()
    expect(count).toBeGreaterThanOrEqual(1)
    for (let i = 0; i < count; i++) {
      await expectExternalLink(cards.nth(i), /^https:\/\/medium\.com\//, `blog card ${i}`)
    }
  })

  test('follow button and archive link open the Medium profile', async ({ page }) => {
    const follow = page.getByTestId('blog-follow-medium')
    await follow.scrollIntoViewIfNeeded()
    await expect(follow).toContainText(/follow on medium/i)
    await expectExternalLink(follow, new RegExp(`^${MEDIUM_PROFILE_URL}$`), 'follow medium')

    const archive = page.getByTestId('blog-archive-link')
    await archive.scrollIntoViewIfNeeded()
    await expectExternalLink(archive, new RegExp(`^${MEDIUM_PROFILE_URL}$`), 'archive link')
  })

  test('sort select switches the active sort', async ({ page }) => {
    const trigger = page.getByRole('combobox', { name: /sort blog posts/i })
    await trigger.scrollIntoViewIfNeeded()
    await expect(trigger).toContainText(/latest first/i)

    await trigger.click()
    await page.getByRole('option', { name: /oldest first/i }).click()
    await expect(trigger).toContainText(/oldest first/i)

    await trigger.click()
    await page.getByRole('option', { name: /most popular/i }).click()
    await expect(trigger).toContainText(/most popular/i)
  })
})
