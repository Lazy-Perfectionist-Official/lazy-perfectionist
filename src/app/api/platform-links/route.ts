import { NextResponse } from 'next/server'
import { platformLinksService } from '@/lib/platform-links'
import { getAllArtistTracks } from '@/lib/spotify'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const trackId = searchParams.get('trackId')
    const fetchAll = searchParams.get('fetchAll') === 'true'

    if (fetchAll) {
      // Fetch platform links for all tracks
      const tracks = await getAllArtistTracks()
      const platformLinksMap = new Map()

      for (const track of tracks) {
        try {
          const platformLinks = await platformLinksService.getPlatformLinks(
            track.name,
            'Lazy Perfectionist',
            track.external_ids.isrc,
            track.id
          )

          if (platformLinks) {
            const availablePlatforms = platformLinksService.getAvailablePlatforms(platformLinks)
            platformLinksMap.set(track.id, {
              trackId: track.id,
              trackName: track.name,
              albumName: track.album.name,
              albumImage: track.album.images[0]?.url,
              platforms: availablePlatforms,
              lastUpdated: new Date().toISOString()
            })
          }
        } catch (error) {
          console.error(`Error fetching platform links for track ${track.id}:`, error)
          // Continue with other tracks even if one fails
        }
      }

      return NextResponse.json({
        success: true,
        data: Array.from(platformLinksMap.values()),
        totalTracks: platformLinksMap.size,
        lastUpdated: new Date().toISOString()
      })
    } else if (trackId) {
      // Fetch platform links for a specific track
      const tracks = await getAllArtistTracks()
      const track = tracks.find(t => t.id === trackId)

      if (!track) {
        return NextResponse.json(
          { error: 'Track not found' },
          { status: 404 }
        )
      }

      const platformLinks = await platformLinksService.getPlatformLinks(
        track.name,
        'Lazy Perfectionist',
        track.external_ids.isrc,
        track.id
      )

      if (!platformLinks) {
        return NextResponse.json(
          { error: 'Platform links not found' },
          { status: 404 }
        )
      }

      const availablePlatforms = platformLinksService.getAvailablePlatforms(platformLinks)

      return NextResponse.json({
        success: true,
        data: {
          trackId: track.id,
          trackName: track.name,
          albumName: track.album.name,
          albumImage: track.album.images[0]?.url,
          platforms: availablePlatforms,
          entities: platformLinks.entities,
          pageUrl: platformLinks.pageUrl,
          lastUpdated: new Date().toISOString()
        }
      })
    } else {
      return NextResponse.json(
        { error: 'Either trackId or fetchAll parameter is required' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Error in platform links API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch platform links', success: false },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { trackName, artistName, isrc, spotifyId } = body

    if (!trackName || !artistName) {
      return NextResponse.json(
        { error: 'trackName and artistName are required' },
        { status: 400 }
      )
    }

    const platformLinks = await platformLinksService.getPlatformLinks(
      trackName,
      artistName,
      isrc,
      spotifyId
    )

    if (!platformLinks) {
      return NextResponse.json(
        { error: 'Platform links not found' },
        { status: 404 }
      )
    }

    const availablePlatforms = platformLinksService.getAvailablePlatforms(platformLinks)

    return NextResponse.json({
      success: true,
      data: {
        trackName,
        artistName,
        platforms: availablePlatforms,
        entities: platformLinks.entities,
        pageUrl: platformLinks.pageUrl,
        lastUpdated: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Error in platform links POST API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch platform links', success: false },
      { status: 500 }
    )
  }
}