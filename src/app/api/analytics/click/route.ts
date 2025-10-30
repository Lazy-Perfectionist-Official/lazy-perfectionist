import { NextResponse } from 'next/server'

interface PlatformClickEvent {
  trackId: string
  trackName: string
  artistName: string
  platform: string
  platformName: string
  url: string
  timestamp: number
  userAgent: string
  referrer?: string
  country?: string
}

// Simple in-memory storage for demo purposes
// In production, you'd use a database like Prisma or an analytics service
let clickEvents: PlatformClickEvent[] = []
const MAX_EVENTS = 10000

export async function POST(request: Request) {
  try {
    const event: PlatformClickEvent = await request.json()

    // Validate required fields
    if (!event.trackId || !event.platform || !event.trackName) {
      return NextResponse.json(
        { error: 'Missing required fields: trackId, platform, trackName' },
        { status: 400 }
      )
    }

    // Add timestamp if not provided
    const clickEventWithTimestamp = {
      ...event,
      timestamp: event.timestamp || Date.now()
    }

    // Store the event
    clickEvents.push(clickEventWithTimestamp)

    // Keep only the most recent events
    if (clickEvents.length > MAX_EVENTS) {
      clickEvents = clickEvents.slice(-MAX_EVENTS)
    }

    // Log the event (in production, you'd use proper logging)
    console.log('Platform click tracked:', {
      track: event.trackName,
      platform: event.platformName,
      artist: event.artistName,
      timestamp: new Date(clickEventWithTimestamp.timestamp).toISOString()
    })

    return NextResponse.json({
      success: true,
      message: 'Click tracked successfully',
      timestamp: clickEventWithTimestamp.timestamp
    })
  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json(
      { error: 'Failed to track click' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const trackId = searchParams.get('trackId')
    const platform = searchParams.get('platform')
    const limit = parseInt(searchParams.get('limit') || '100')

    let filteredEvents = [...clickEvents]

    // Apply filters
    if (trackId) {
      filteredEvents = filteredEvents.filter(event => event.trackId === trackId)
    }

    if (platform) {
      filteredEvents = filteredEvents.filter(event => event.platform === platform)
    }

    // Apply limit
    const limitedEvents = filteredEvents.slice(-limit)

    // Generate stats
    const stats = {
      totalClicks: clickEvents.length,
      filteredClicks: filteredEvents.length,
      clicksByTrack: {} as Record<string, number>,
      clicksByPlatform: {} as Record<string, number>,
      clicksByDate: {} as Record<string, number>
    }

    clickEvents.forEach(event => {
      stats.clicksByTrack[event.trackId] = (stats.clicksByTrack[event.trackId] || 0) + 1
      stats.clicksByPlatform[event.platform] = (stats.clicksByPlatform[event.platform] || 0) + 1

      const date = new Date(event.timestamp).toISOString().split('T')[0]
      stats.clicksByDate[date] = (stats.clicksByDate[date] || 0) + 1
    })

    return NextResponse.json({
      success: true,
      stats,
      events: limitedEvents,
      total: filteredEvents.length
    })
  } catch (error) {
    console.error('Analytics GET API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics data', success: false },
      { status: 500 }
    )
  }
}