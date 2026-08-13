import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const tracks = await db.track.findMany({
      include: {
        album: true,
        platformLinks: { where: { isActive: true }, orderBy: { platformName: 'asc' } },
      },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ success: true, data: tracks })
  } catch (error) {
    console.error('Error fetching tracks:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch tracks' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, spotifyUrl, previewUrl, imageUrl, albumName, isrc, platformLinks } = body as {
      name?: string
      spotifyUrl?: string
      previewUrl?: string
      imageUrl?: string
      albumName?: string
      isrc?: string
      platformLinks?: { platformName: string; platformUrl: string }[]
    }

    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Track name is required' }, { status: 400 })
    }

    // Reuse or create a default artist so manually-added tracks satisfy the schema.
    let artist = await db.artist.findFirst({ where: { spotifyId: 'manual-lp' } })
    if (!artist) {
      artist = await db.artist.create({
        data: {
          spotifyId: 'manual-lp',
          name: 'Lazy Perfectionist',
          bio: 'Instrumental progressive rock from Hong Kong.',
        },
      })
    }

    // Reuse or create an album for this track.
    let album
    if (albumName) {
      album = await db.album.findFirst({ where: { spotifyId: `manual-${albumName}` } })
      if (!album) {
        album = await db.album.create({
          data: {
            spotifyId: `manual-${albumName}`,
            artistId: artist.id,
            name: albumName,
            releaseDate: new Date(),
            imageUrl,
            albumType: 'single',
          },
        })
      }
    } else {
      album = await db.album.create({
        data: {
          spotifyId: `manual-${Date.now()}`,
          artistId: artist.id,
          name: name,
          releaseDate: new Date(),
          imageUrl,
          albumType: 'single',
        },
      })
    }

    const track = await db.track.create({
      data: {
        spotifyId: `manual-${Date.now()}`,
        albumId: album.id,
        artistId: artist.id,
        name,
        previewUrl: previewUrl || null,
        isrc: isrc || null,
        spotifyUrl: spotifyUrl || null,
        platformLinks: platformLinks && platformLinks.length > 0
          ? {
              create: platformLinks
                .filter((p) => p.platformName && p.platformUrl)
                .map((p) => ({
                  platformName: p.platformName,
                  platformUrl: p.platformUrl,
                  isActive: true,
                })),
            }
          : undefined,
      },
      include: {
        album: true,
        platformLinks: true,
      },
    })

    return NextResponse.json({ success: true, data: track }, { status: 201 })
  } catch (error) {
    console.error('Error creating track:', error)
    return NextResponse.json({ success: false, error: 'Failed to create track' }, { status: 500 })
  }
}
