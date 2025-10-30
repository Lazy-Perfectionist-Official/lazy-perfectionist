import { NextResponse } from 'next/server'
import { getAllArtistTracks } from '@/lib/spotify'

export async function GET() {
  try {
    const tracks = await getAllArtistTracks()

    if (!tracks || tracks.length === 0) {
      return NextResponse.json(
        { error: 'No tracks found', data: [] },
        { status: 404 }
      )
    }

    // Transform the data to match our interface
    const transformedTracks = tracks.map((track) => ({
      id: track.id,
      name: track.name,
      albumId: track.album.id,
      albumName: track.album.name,
      albumImage: track.album.images[0]?.url || null,
      releaseDate: track.album.release_date,
      trackNumber: track.track_number,
      durationMs: track.duration_ms,
      previewUrl: track.preview_url,
      isrc: track.external_ids.isrc,
      spotifyUrl: track.external_urls.spotify,
      explicit: track.explicit,
      popularity: track.popularity,
      albumType: track.album.album_type,
    }))

    return NextResponse.json({
      data: transformedTracks,
      total: transformedTracks.length,
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error in tracks API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tracks data', data: [] },
      { status: 500 }
    )
  }
}