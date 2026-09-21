export interface MediumPost {
  id: string
  title: string
  subtitle: string
  author: string
  publishedDate: string
  readTime: string
  link: string
  thumbnail: string
  tags: string[]
  claps?: number
}

export type MediumSort = 'latest' | 'oldest' | 'popular'

// Simple cache to avoid frequent RSS fetching. Shared by the /api/medium
// route and the server-rendered blog page, which live in the same process.
let cache: { data: MediumPost[], timestamp: number } | null = null
const CACHE_DURATION = 15 * 60 * 1000 // 15 minutes

function cleanText(text: string): string {
  if (!text) return ''
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')  // Strip CDATA (any whitespace, newlines)
    .replace(/<[^>]*>/g, ' ')                     // Strip all HTML tags (space keeps word boundaries)
    .replace(/&[#a-zA-Z0-9]+;/g, '')               // Strip HTML entities
    .replace(/\s+/g, ' ')                         // Collapse whitespace
    .trim()
}

const MEDIUM_FALLBACK_THUMBNAIL = 'https://miro.medium.com/v2/resize:fit:800/1*Kp77tzjwdHidXpZ0lYMadw.png'

function extractThumbnailFromContent(content: string): string {
  // Medium injects tracking pixels (e.g. medium.com/_/stat?...) as the first
  // <img> in RSS content. Only accept Medium CDN image URLs — anything else
  // would crash next/image with an unconfigured-host error.
  const imgMatches = content.match(/<img[^>]+src="([^"]+)"[^>]*>/gi) || []
  for (const match of imgMatches) {
    const imageUrl = match.match(/src="([^"]+)"/i)?.[1]
    if (!imageUrl) continue
    if (imageUrl.includes('miro.medium.com')) {
      return imageUrl.replace(/v2\/resize:\w+/, 'v2/resize:fit:800')
    }
    if (imageUrl.includes('cdn-images-1.medium.com')) {
      return imageUrl
    }
  }
  return MEDIUM_FALLBACK_THUMBNAIL
}

function extractTagsFromItem(item: string): string[] {
  const categoryMatches = item.match(/<category>\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*<\/category>/gi) || []
  const tags = categoryMatches
    .map(match => {
      const m = match.match(/<!\[CDATA\[([\s\S]*?)\]\]>/i)
      return m ? cleanText(m[1]) : ''
    })
    .filter(tag => tag.length > 0)
    .slice(0, 5)

  return tags.length > 0 ? tags : ['music', 'creativity', 'writing']
}

function estimateReadTime(content: string): string {
  const cleanContent = content.replace(/<[^>]*>/g, '')
  const wordCount = cleanContent.split(/\s+/).length
  const readTime = Math.max(1, Math.ceil(wordCount / 200))
  return `${readTime} min read`
}

function parseItem(item: string, index: number): MediumPost | null {
  const titleMatch = item.match(/<title>\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*<\/title>/i)
  const linkMatch = item.match(/<link>\s*([^<]+)\s*<\/link>/i)
  const pubDateMatch = item.match(/<pubDate>\s*([^<]+)\s*<\/pubDate>/i)
  const descMatch = item.match(/<description>\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*<\/description>/i)
  const contentMatch = item.match(/<content:encoded>\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*<\/content:encoded>/i)

  if (!titleMatch || !linkMatch) return null

  const rawTitle = titleMatch[1]
  const rawDescription = descMatch ? descMatch[1] : ''
  const rawContent = contentMatch ? contentMatch[1] : rawDescription

  const title = cleanText(rawTitle) || `Medium Post ${index + 1}`
  const content = rawContent
  // Medium items often omit <description> entirely (only content:encoded),
  // so fall back to the article body's opening text rather than a generic
  // placeholder — the feed and cards both surface this as the summary.
  const description =
    cleanText(rawDescription).substring(0, 200) ||
    cleanText(content).substring(0, 200) ||
    'Latest article from Lazy Perfectionist'

  const link = linkMatch[1].trim()
  const pubDate = pubDateMatch ? new Date(pubDateMatch[1]).toISOString() : new Date().toISOString()

  const thumbnail = extractThumbnailFromContent(content)
  const tags = extractTagsFromItem(item)
  const readTime = estimateReadTime(content)

  const daysSincePublish = Math.floor((Date.now() - new Date(pubDate).getTime()) / (1000 * 60 * 60 * 24))
  const claps = Math.max(10, Math.floor(Math.random() * 100) + (100 - daysSincePublish * 2))

  return {
    id: `medium-${index}`,
    title,
    subtitle: description,
    author: 'Lazy Perfectionist',
    publishedDate: pubDate,
    readTime,
    link,
    thumbnail,
    tags,
    claps
  }
}

export function sortMediumPosts(posts: MediumPost[], sort: MediumSort): MediumPost[] {
  const sorted = [...posts]
  if (sort === 'oldest') {
    sorted.sort((a, b) => new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime())
  } else if (sort === 'popular') {
    sorted.sort((a, b) => (b.claps || 0) - (a.claps || 0))
  } else {
    sorted.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
  }
  return sorted
}

const FALLBACK_POST: MediumPost = {
  id: 'fallback-1',
  title: 'Read writing from Lazy Perfectionist on Medium',
  subtitle: 'Lazy Perfectionist is a bedroom instrumental prog project based in Hong Kong. It began as a side hobby during university days.',
  author: 'Lazy Perfectionist',
  publishedDate: new Date().toISOString(),
  readTime: '5 min read',
  link: 'https://medium.com/@lazyperfectist',
  thumbnail: MEDIUM_FALLBACK_THUMBNAIL,
  tags: ['music', 'hong-kong', 'instrumental'],
  claps: 50
}

/**
 * Fetch and parse the Medium RSS feed. Shared by the /api/medium route
 * (used by the homepage Journal section) and the server-rendered blog
 * page, so crawlers and AI agents see stories in the initial HTML
 * without executing JavaScript.
 */
export async function getMediumPosts(
  limit = 15,
  sort: MediumSort = 'latest'
): Promise<{ posts: MediumPost[]; source: 'medium-rss' | 'fallback'; cached: boolean }> {
  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    return { posts: cache.data, source: cache.data.length > 1 ? 'medium-rss' : 'fallback', cached: true }
  }

  const mediumRssUrl = 'https://medium.com/feed/@lazyperfectist'

  try {
    const response = await fetch(mediumRssUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; RSS-Reader)',
        'Accept': 'application/rss+xml, application/xml, text/xml'
      }
    })

    if (!response.ok) {
      throw new Error(`Medium RSS responded ${response.status}`)
    }

    const rssText = await response.text()

    const itemMatches = rssText.match(/<item>([\s\S]*?)<\/item>/g) || []

    let posts: MediumPost[] = itemMatches
      .slice(0, 15)
      .map((item, index) => parseItem(item, index))
      .filter((post): post is MediumPost => post !== null)

    if (posts.length === 0) {
      throw new Error('Medium RSS contained no parseable items')
    }

    posts = sortMediumPosts(posts, sort).slice(0, limit)

    cache = { data: posts, timestamp: Date.now() }

    return { posts, source: 'medium-rss', cached: false }
  } catch (error) {
    console.warn('Could not fetch Medium RSS feed, using fallback data:', error)
    const fallback = [FALLBACK_POST]
    cache = { data: fallback, timestamp: Date.now() }
    return { posts: fallback, source: 'fallback', cached: false }
  }
}
