import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { trackId, platformName, platformUrl } = body as {
      trackId?: string
      platformName?: string
      platformUrl?: string
    }

    if (!trackId || !platformName || !platformUrl) {
      return NextResponse.json(
        { error: 'trackId, platformName, and platformUrl are required' },
        { status: 400 }
      )
    }

    const link = await db.platformLink.create({
      data: { trackId, platformName, platformUrl, isActive: true },
    })
    return NextResponse.json({ success: true, data: link }, { status: 201 })
  } catch (error) {
    console.error('Error creating platform link:', error)
    return NextResponse.json({ error: 'Failed to create platform link' }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json()
    const { id, platformName, platformUrl, isActive } = body as {
      id?: string
      platformName?: string
      platformUrl?: string
      isActive?: boolean
    }

    if (!id) {
      return NextResponse.json({ error: 'Link id is required' }, { status: 400 })
    }

    const updated = await db.platformLink.update({
      where: { id },
      data: {
        ...(platformName !== undefined ? { platformName } : {}),
        ...(platformUrl !== undefined ? { platformUrl } : {}),
        ...(isActive !== undefined ? { isActive } : {}),
      },
    })
    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error('Error updating platform link:', error)
    return NextResponse.json({ error: 'Failed to update platform link' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json() as { id?: string }
    if (!id) {
      return NextResponse.json({ error: 'Link id is required' }, { status: 400 })
    }
    await db.platformLink.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting platform link:', error)
    return NextResponse.json({ error: 'Failed to delete platform link' }, { status: 500 })
  }
}
