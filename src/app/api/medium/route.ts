import { NextResponse } from 'next/server'

interface MediumPost {
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

// Simple cache to avoid frequent RSS fetching
let cache: { data: MediumPost[], timestamp: number } | null = null
const CACHE_DURATION = 15 * 60 * 1000 // 15 minutes

// Clear cache to force fresh data
cache = null

function cleanText(text: string): string {
  if (!text) return ''
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')  // Strip CDATA (any whitespace, newlines)
    .replace(/<[^>]*>/g, '')                      // Strip all HTML tags
    .replace(/&[#a-zA-Z0-9]+;/g, '')               // Strip HTML entities
    .replace(/\s+/g, ' ')                         // Collapse whitespace
    .trim()
}

function extractThumbnailFromContent(content: string): string {
  const imgMatch = content.match(/<img[^>]+src="([^"]+)"[^>]*>/i)
  if (imgMatch && imgMatch[1]) {
    const imageUrl = imgMatch[1]
    if (imageUrl.includes('miro.medium.com')) {
      return imageUrl.replace(/v2\/resize:\w+/, 'v2/resize:fit:800')
    }
    return imageUrl
  }
  return 'https://miro.medium.com/v2/resize:fit:800/1*Kp77tzjwdHidXpZ0lYMadw.png'
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
  const description = cleanText(rawDescription).substring(0, 200) || 'Latest article from Lazy Perfectionist'
  const content = rawContent

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

export async function GET(request: Request) {
  // Check cache
  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    console.log('Returning cached Medium data')
    return NextResponse.json({
      data: cache.data,
      lastUpdated: new Date(cache.timestamp).toISOString(),
      source: 'cache',
      totalPosts: cache.data.length
    })
  }

  const { searchParams } = new URL(request.url)
  const limit = Math.min(parseInt(searchParams.get('limit') || '15'), 15)
  const sort = searchParams.get('sort') || 'latest'

  try {
    const mediumRssUrl = 'https://medium.com/feed/@lazyperfectist'
    let posts: MediumPost[] = []

    try {
      const response = await fetch(mediumRssUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; RSS-Reader)',
          'Accept': 'application/rss+xml, application/xml, text/xml'
        }
      })

      if (response.ok) {
        const rssText = await response.text()
        console.log('RSS feed fetched successfully')

        const itemMatches = rssText.match(/<item>([\s\S]*?)<\/item>/g) || []

        posts = itemMatches
          .slice(0, 15)
          .map((item, index) => parseItem(item, index))
          .filter((post): post is MediumPost => post !== null)

        // Sort posts
        if (sort === 'oldest') {
          posts.sort((a, b) => new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime())
        } else if (sort === 'popular') {
          posts.sort((a, b) => (b.claps || 0) - (a.claps || 0))
        } else {
          posts.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
        }

        posts = posts.slice(0, limit)

        cache = {
          data: posts,
          timestamp: Date.now()
        }
      }
    } catch (rssError) {
      console.log('Could not fetch RSS feed, using fallback data')
      posts = [
        {
          id: 'fallback-1',
          title: 'Read writing from Lazy Perfectionist on Medium',
          subtitle: 'Lazy Perfectionist is a bedroom instrumental prog project based in Hong Kong. It began as a side hobby during university days.',
          author: 'Lazy Perfectionist',
          publishedDate: new Date().toISOString(),
          readTime: '5 min read',
          link: 'https://medium.com/@lazyperfectist',
          thumbnail: 'https://miro.medium.com/v2/resize:fit:800/1*Kp77tzjwdHidXpZ0lYMadw.png',
          tags: ['music', 'hong-kong', 'instrumental'],
          claps: 50
        }
      ]
    }

    const response = {
      data: posts,
      lastUpdated: cache ? new Date(cache.timestamp).toISOString() : new Date().toISOString(),
      source: posts.length > 1 ? 'medium-rss' : 'fallback',
      totalPosts: posts.length,
      hasMore: posts.length >= limit
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Medium API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Medium data' },
      { status: 500 }
    )
  }
}