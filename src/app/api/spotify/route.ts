import { NextResponse } from 'next/server'
import { getAllArtistTracks, getArtist } from '@/lib/spotify'

export async function GET() {
  try {
    // Fetch artist data and all tracks from Spotify API
    const [artist, tracks] = await Promise.all([
      getArtist(),
      getAllArtistTracks()
    ])

    if (!tracks || tracks.length === 0) {
      return NextResponse.json({
        data: [],
        lastUpdated: new Date().toISOString(),
        source: 'spotify-api',
        totalTracks: 0,
        artist: null
      })
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

    // Fallback to a basic response if API fails
    return NextResponse.json({
      data: [],
      lastUpdated: new Date().toISOString(),
      source: 'fallback',
      totalTracks: 0,
      artist: null,
      error: 'Failed to fetch Spotify data'
    })
  }
}