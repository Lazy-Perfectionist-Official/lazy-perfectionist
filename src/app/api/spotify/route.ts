import { NextResponse } from 'next/server'
import { getAllArtistTracks, getArtist } from '@/lib/spotify'
import { db } from '@/lib/db'

export async function GET() {
  try {
    // Fetch artist data and all tracks from Spotify API
    const [artist, tracks] = await Promise.all([
      getArtist(),
      getAllArtistTracks()
    ])

    if (!tracks || tracks.length === 0) {
      // Fall back to admin-managed DB tracks before returning empty
      return await dbFallback('spotify-api-empty', null)
    }

    // Transform the data to match the expected interface
    const transformedTracks = tracks.map((track) => ({
      id: track.id,
      name: track.name,
      artists: [{ name: artist?.name || 'Lazy Perfectionist' }],
      album: {
        name: track.album.name,
        images: track.album.images.map(img => ({ url: img.url })),
        release_date: track.album.release_date
      },
      duration_ms: track.duration_ms,
      external_urls: {
        spotify: track.external_urls.spotify
      },
      preview_url: track.preview_url,
      popularity: track.popularity,
      explicit: track.explicit,
      track_number: track.track_number,
      isrc: track.external_ids.isrc
    }))

    const response = {
      data: transformedTracks,
      lastUpdated: new Date().toISOString(),
      source: 'spotify-api',
      totalTracks: transformedTracks.length,
      artist: artist ? {
        id: artist.id,
        name: artist.name,
        followers: artist.followers.total,
        popularity: artist.popularity,
        imageUrl: artist.images[0]?.url || null,
        genres: artist.genres
      } : null
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Spotify API Error:', error)

    // Fallback to admin-managed DB tracks before returning empty
    return await dbFallback('spotify-api-error', String(error instanceof Error ? error.message : error))
  }
}

/**
 * Read tracks from the DB (admin-managed). Used when the Spotify API is
 * unavailable (invalid_client, network, etc.). Returns them in the same
 * shape as the Spotify payload so the MusicPage works unchanged.
 */
async function dbFallback(source: string, error: string | null) {
  try {
    const dbTracks = await db.track.findMany({
      include: {
        album: true,
        platformLinks: { where: { isActive: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    if (dbTracks.length === 0) {
      return NextResponse.json({
        data: [],
        lastUpdated: new Date().toISOString(),
        source,
        totalTracks: 0,
        artist: null,
        error,
      })
    }

    const transformedTracks = dbTracks.map((track) => ({
      id: track.id,
      name: track.name,
      artists: [{ name: 'Lazy Perfectionist' }],
      album: {
        name: track.album?.name || track.name,
        images: track.album?.imageUrl ? [{ url: track.album.imageUrl }] : [],
        release_date: track.album?.releaseDate?.toISOString().slice(0, 10) || new Date().toISOString().slice(0, 10),
      },
      duration_ms: track.durationMs,
      external_urls: {
        spotify: track.spotifyUrl || track.platformLinks.find((p) => p.platformName === 'spotify')?.platformUrl || '',
      },
      preview_url: track.previewUrl,
      popularity: track.popularity,
      explicit: track.explicit,
      track_number: track.trackNumber,
      isrc: track.isrc,
    }))

    return NextResponse.json({
      data: transformedTracks,
      lastUpdated: new Date().toISOString(),
      source,
      totalTracks: transformedTracks.length,
      artist: null,
      error,
    })
  } catch (dbError) {
    console.error('DB fallback failed:', dbError)
    return NextResponse.json({
      data: [],
      lastUpdated: new Date().toISOString(),
      source,
      totalTracks: 0,
      artist: null,
      error: error || 'Database unavailable',
    })
  }
}