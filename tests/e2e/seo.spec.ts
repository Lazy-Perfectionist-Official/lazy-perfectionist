import { expect, test } from '@playwright/test';

import content from '../../src/lib/content.json';

/**
 * The site's machine-readable surfaces: per-page social copy, the JSON-LD
 * graph, and the crawler files. These run without NEXT_PUBLIC_SITE_URL, so
 * canonicals and the sitemap are deliberately empty here — the tests cover
 * everything that must hold with or without a host.
 */
const RELEASES = content.releases;
const PAGES = [
  { path: '/', title: 'Lazy Perfectionist — Instrumental Rock/Metal | Hong Kong' },
  { path: '/discography', title: 'Discography | Lazy Perfectionist' },
  { path: '/music', title: 'Singles | Lazy Perfectionist' },
  { path: '/shop', title: 'Shop | Lazy Perfectionist' },
  { path: '/writing', title: 'Writing | Lazy Perfectionist' },
] as const;

test.describe('seo', () => {
  test('every screen shares its own title and description, not the cover’s', async ({ page }) => {
    for (const { path, title } of PAGES) {
      await page.goto(path);

      expect(await page.title(), `${path} document title`).toBe(title);

      const head = await page.evaluate(() => {
        const content = (selector: string) =>
          document.querySelector(selector)?.getAttribute('content') ?? null;
        return {
          description: content('meta[name="description"]'),
          ogTitle: content('meta[property="og:title"]'),
          ogDescription: content('meta[property="og:description"]'),
          ogImage: content('meta[property="og:image"]'),
          ogSite: content('meta[property="og:site_name"]'),
          twitterCard: content('meta[name="twitter:card"]'),
          twitterTitle: content('meta[name="twitter:title"]'),
        };
      });

      expect(head.ogTitle, `${path} og:title`).toBe(title);
      expect(head.twitterTitle, `${path} twitter:title`).toBe(title);
      expect(head.ogDescription, `${path} og:description`).toBe(head.description);
      expect(head.ogImage, `${path} og:image`).toContain('og-card.png');
      expect(head.ogSite, `${path} og:site_name`).toBe('Lazy Perfectionist');
      expect(head.twitterCard, `${path} twitter:card`).toBe('summary_large_image');
    }
  });

  test('the cover carries the band, the site and every single as JSON-LD', async ({ page }) => {
    await page.goto('/');

    const graph = await page.evaluate(() => {
      const script = document.querySelector('script[type="application/ld+json"]');
      const data = JSON.parse(script?.textContent ?? '{}');
      return data['@graph'] ?? [];
    });
    const types = graph.map((node: { '@type': string }) => node['@type']);

    expect(types).toContain('WebSite');
    expect(types).toContain('MusicGroup');

    const group = graph.find((node: { '@type': string }) => node['@type'] === 'MusicGroup');
    expect(group.genre).toEqual(['Instrumental Rock', 'Instrumental Metal']);
    expect(group.locationCreated.name).toBe('Hong Kong');

    const recordings = graph.filter(
      (node: { '@type': string }) => node['@type'] === 'MusicRecording',
    );
    expect(recordings).toHaveLength(RELEASES.length);
    expect(recordings.map((node: { name: string }) => node.name)).toEqual(
      RELEASES.map((release) => release.title),
    );
  });

  test('the catalog screens list their releases as an ItemList', async ({ page }) => {
    for (const path of ['/discography', '/music']) {
      await page.goto(path);

      const graph = await page.evaluate(() => {
        const script = [...document.querySelectorAll('script[type="application/ld+json"]')].at(-1);
        const data = JSON.parse(script?.textContent ?? '{}');
        return data['@graph'] ?? [];
      });

      const list = graph.find((node: { '@type': string }) => node['@type'] === 'ItemList');
      expect(list, `${path} must carry an ItemList`).toBeTruthy();
      expect(list.numberOfItems, `${path} ItemList size`).toBe(RELEASES.length);
      expect(list.itemListElement[0].item.name, `${path} first item`).toBe(
        RELEASES[0].title,
      );

      const page_ = graph.find(
        (node: { '@type': string }) => node['@type'] === 'CollectionPage',
      );
      expect(page_.mainEntity['@id'], `${path} CollectionPage mainEntity`).toBe(
        list['@id'],
      );
    }
  });

  test('robots.txt welcomes the crawlers and points at nothing it cannot name', async ({ page }) => {
    const response = await page.goto('/robots.txt');
    expect(response?.status()).toBe(200);
    expect(response?.headers()['content-type']).toContain('text/plain');

    const body = (await page.textContent('body')) ?? '';

    for (const agent of [
      'Googlebot',
      'Bingbot',
      'GPTBot',
      'ClaudeBot',
      'Claude-User',
      'Claude-SearchBot',
      'PerplexityBot',
      'Spotify',
      'Applebot',
    ]) {
      expect(body, `robots.txt must address ${agent}`).toContain(`User-Agent: ${agent}`);
    }

    // The admin back office and the API stay out of every crawler's reach.
    expect(body).toContain('Disallow: /admin/');
    expect(body).toContain('Disallow: /api/');
    // Without a host there is no sitemap URL to print — never a localhost.
    expect(body).not.toContain('localhost');
  });

  test('llms.txt summarizes the project from the same content as the pages', async ({ page }) => {
    const response = await page.goto('/llms.txt');
    expect(response?.status()).toBe(200);
    expect(response?.headers()['content-type']).toContain('text/plain');

    const body = (await page.textContent('body')) ?? '';
    expect(body.startsWith('# Lazy Perfectionist')).toBe(true);

    for (const release of RELEASES) {
      expect(body, `llms.txt must list ${release.title}`).toContain(release.title);
      expect(body).toContain(release.href);
    }
    for (const path of ['/discography', '/music', '/shop', '/writing']) {
      expect(body, `llms.txt must link ${path}`).toContain(path);
    }
  });
});
