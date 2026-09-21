import { getMediumPosts } from '@/lib/medium'

const SITE_URL = 'https://lazyperfectionist.com'
const FEED_URL = `${SITE_URL}/feed.xml`

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// Hourly revalidation keeps the feed fresh while staying effectively static.
export const revalidate = 3600

export async function GET() {
  const { posts } = await getMediumPosts(15, 'latest')

  const items = posts
    .map((post) => {
      // Drop Medium's ?source=rss-* tracking param so guid/link are clean
      // permalinks (a guid marked isPermaLink must be a stable canonical URL).
      const link = escapeXml(post.link.replace(/\?source=[^?\s]*/, ''))
      return [
        '    <item>',
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${link}</link>`,
        `      <guid isPermaLink="true">${link}</guid>`,
        `      <pubDate>${new Date(post.publishedDate).toUTCString()}</pubDate>`,
        `      <description>${escapeXml(post.subtitle)}</description>`,
        '    </item>',
      ].join('\n')
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Lazy Perfectionist — Journal</title>
    <link>${SITE_URL}/blog</link>
    <description>Stories, process notes, and creative insights from the Lazy Perfectionist journey — bedroom instrumental progressive rock from Hong Kong.</description>
    <language>en</language>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
