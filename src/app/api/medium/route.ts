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

function extractThumbnailFromContent(content: string): string {
  // Try to extract the first image from the content
  const imgMatch = content.match(/<img[^>]+src="([^"]+)"[^>]*>/i)
  if (imgMatch && imgMatch[1]) {
    // Convert Medium's CDN images to proper size
    const imageUrl = imgMatch[1]
    if (imageUrl.includes('miro.medium.com')) {
      // Get a medium-sized thumbnail
      return imageUrl.replace(/v2\/resize:\w+/, 'v2/resize:fit:800')
    }
    return imageUrl
  }

  // Fallback to Medium's default post thumbnail
  return 'https://miro.medium.com/v2/resize:fit:800/1*Kp77tzjwdHidXpZ0lYMadw.png'
}

function extractTagsFromItem(item: string): string[] {
  const categoryMatches = item.match(/<category>(.*?)<\/category>/g) || []
  const tags = categoryMatches.map(match => {
    const tagMatch = match.match(/<category>(.*?)<\/category>/)
    return tagMatch ? tagMatch[1].replace(/[^a-zA-Z0-9\s]/g, '').trim() : ''
  }).filter(tag => tag.length > 0)

  return tags.length > 0 ? tags.slice(0, 5) : ['music', 'creativity', 'writing']
}

function estimateReadTime(content: string): string {
  // Estimate read time based on content length (average reading speed: 200 words/min)
  const cleanContent = content.replace(/<[^>]*>/g, '')
  const wordCount = cleanContent.split(/\s+/).length
  const readTime = Math.max(1, Math.ceil(wordCount / 200))
  return `${readTime} min read`
}

export async function GET(request: Request) {
  // Check cache first
    if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
      console.log('Returning cached Medium data')
      return NextResponse.json({
        data: cache.data,
        lastUpdated: new Date(cache.timestamp).toISOString(),
        source: 'cache',
        totalPosts: cache.data.length
      })
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const limit = Math.min(parseInt(searchParams.get('limit') || '15'), 15)
    const sort = searchParams.get('sort') || 'latest'

    try {
      // Try to fetch real Medium RSS feed
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

          // Parse RSS feed (enhanced parsing)
          const itemMatches = rssText.match(/<item>([\s\S]*?)<\/item>/g) || []

          posts = itemMatches.slice(0, 15).map((item, index) => {
            const titleMatch = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)
            const linkMatch = item.match(/<link>(.*?)<\/link>/)
            const pubDateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/)
            const descMatch = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/)
            const contentMatch = item.match(/<content:encoded><!\[CDATA\[(.*?)\]\]><\/content:encoded>/)

            const title = titleMatch ? titleMatch[1] : `Medium Post ${index + 1}`
            const link = linkMatch ? linkMatch[1] : `https://medium.com/@lazyperfectist`
            const pubDate = pubDateMatch ? new Date(pubDateMatch[1]).toISOString() : new Date().toISOString()
            const description = descMatch ? descMatch[1].replace(/<[^>]*>/g, '').substring(0, 200) : 'Latest article from Lazy Perfectionist'
            const content = contentMatch ? contentMatch[1] : description

            // Extract real thumbnail from content
            const thumbnail = extractThumbnailFromContent(content)

            // Extract tags from categories
            const tags = extractTagsFromItem(item)

            // Estimate read time
            const readTime = estimateReadTime(content)

            // Simulate popularity based on recency and content length
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
          })

          // Sort posts
          if (sort === 'oldest') {
            posts.sort((a, b) => new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime())
          } else if (sort === 'popular') {
            posts.sort((a, b) => (b.claps || 0) - (a.claps || 0))
          } else {
            // latest (default)
            posts.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
          }

          // Apply limit
          posts = posts.slice(0, limit)

          // Cache the results
          cache = {
            data: posts,
            timestamp: Date.now()
          }

        }
      } catch (rssError) {
        console.log('Could not fetch RSS feed, using fallback data')

        // Fallback data based on real Medium profile structure
        posts = [
          {
            id: 'fallback-1',
            title: 'Read writing from Lazy Perfectionist on Medium',
            subtitle: 'Lazy Perfectionist is a bedroom instrumental prog project based in Hong Kong 🇭🇰. It began as a side hobby during university days.',
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