import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const { name, spotifyUrl, previewUrl, imageUrl } = body as {
      name?: string
      spotifyUrl?: string
      previewUrl?: string
      imageUrl?: string
    }

    const existing = await db.track.findUnique({ where: { id }, include: { album: true } })
    if (!existing) {
      return NextResponse.json({ error: 'Track not found' }, { status: 404 })
    }

    const updated = await db.track.update({
      where: { id },
      data: {
        name: name ?? existing.name,
        spotifyUrl: spotifyUrl ?? existing.spotifyUrl,
        previewUrl: previewUrl ?? existing.previewUrl,
      },
      include: { album: true, platformLinks: true },
    })

    // Update album artwork if provided
    if (imageUrl && existing.album) {
      await db.album.update({
        where: { id: existing.album.id },
        data: { imageUrl },
      })
    }

    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error('Error updating track:', error)
    return NextResponse.json({ error: 'Failed to update track' }, { status: 500 })
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await db.track.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting track:', error)
    return NextResponse.json({ error: 'Failed to delete track' }, { status: 500 })
  }
}
