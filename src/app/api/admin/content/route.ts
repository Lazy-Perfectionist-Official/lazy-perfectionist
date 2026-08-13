import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const rows = await db.siteContent.findMany()
    const map: Record<string, string> = {}
    for (const row of rows) map[row.key] = row.value
    return NextResponse.json({ success: true, data: map })
  } catch (error) {
    console.error('Error fetching site content:', error)
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = (await req.json()) as Record<string, string>
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    const ops = Object.entries(body).map(([key, value]) =>
      db.siteContent.upsert({
        where: { key },
        update: { value: String(value ?? '') },
        create: { key, value: String(value ?? '') },
      })
    )

    await db.$transaction(ops)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving site content:', error)
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 })
  }
}
