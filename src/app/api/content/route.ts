import { NextResponse } from 'next/server'
import { getSiteContent } from '@/lib/site-content'

// Revalidate every 60 seconds so admin edits appear without a full rebuild.
export const revalidate = 60

export async function GET() {
  const content = await getSiteContent()
  return NextResponse.json({ success: true, data: content })
}
