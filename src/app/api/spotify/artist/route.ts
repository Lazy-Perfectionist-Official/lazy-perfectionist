import { NextResponse } from 'next/server'
import { getArtist } from '@/lib/spotify'

export async function GET() {
  try {
    const artist = await getArtist()

    if (!artist) {
      return NextResponse.json(
        { error: 'Artist not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      id: artist.id,
      name: artist.name,
      followers: artist.followers.total,
      popularity: artist.popularity,
      imageUrl: artist.images[0]?.url || null,
      genres: artist.genres,
    })
  } catch (error) {
    console.error('Error in artist API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch artist data' },
      { status: 500 }
    )
  }
}