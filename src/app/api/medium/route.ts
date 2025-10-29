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
}

export async function GET() {
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
        
        // Parse RSS feed (basic parsing)
        const itemMatches = rssText.match(/<item>([\s\S]*?)<\/item>/g) || []
        
        posts = itemMatches.slice(0, 5).map((item, index) => {
          const titleMatch = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)
          const linkMatch = item.match(/<link>(.*?)<\/link>/)
          const pubDateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/)
          const descMatch = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/)
          
          const title = titleMatch ? titleMatch[1] : `Medium Post ${index + 1}`
          const link = linkMatch ? linkMatch[1] : `https://medium.com/@lazyperfectist`
          const pubDate = pubDateMatch ? new Date(pubDateMatch[1]).toISOString() : new Date().toISOString()
          const description = descMatch ? descMatch[1].replace(/<[^>]*>/g, '').substring(0, 200) : 'Latest article from Lazy Perfectionist'
          
          return {
            id: `medium-${index}`,
            title,
            subtitle: description,
            author: 'Lazy Perfectionist',
            publishedDate: pubDate,
            readTime: `${Math.floor(Math.random() * 10) + 3} min read`,
            link,
            thumbnail: 'https://miro.medium.com/v2/resize:fit:2400/1*Kp77tzjwdHidXpZ0lYMadw.png',
            tags: ['music', 'creativity', 'life']
          }
        })
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
          thumbnail: 'https://miro.medium.com/v2/resize:fit:2400/1*Kp77tzjwdHidXpZ0lYMadw.png',
          tags: ['music', 'hong-kong', 'instrumental']
        }
      ]
    }

    const response = {
      data: posts,
      lastUpdated: new Date().toISOString(),
      source: posts.length > 1 ? 'medium-rss' : 'fallback',
      totalPosts: posts.length
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