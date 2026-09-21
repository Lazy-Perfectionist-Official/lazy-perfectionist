import { NextResponse } from 'next/server'
import { getMediumPosts, type MediumSort } from '@/lib/medium'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = Math.min(parseInt(searchParams.get('limit') || '15'), 15)
  const sort = (searchParams.get('sort') || 'latest') as MediumSort

  try {
    const { posts, source, cached } = await getMediumPosts(limit, sort)

    return NextResponse.json({
      data: posts,
      lastUpdated: new Date().toISOString(),
      source: cached ? 'cache' : source,
      totalPosts: posts.length,
      hasMore: posts.length >= limit
    })
  } catch (error) {
    console.error('Medium API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Medium data' },
      { status: 500 }
    )
  }
}
