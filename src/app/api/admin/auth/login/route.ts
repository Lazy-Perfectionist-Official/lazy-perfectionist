import { NextResponse } from 'next/server'
import { verifyPassword, signToken, ADMIN_COOKIE, COOKIE_OPTIONS } from '@/lib/admin-auth'

export async function POST(req: Request) {
  let body: { password?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const password = typeof body.password === 'string' ? body.password : ''
  if (!password) {
    return NextResponse.json({ error: 'Password required' }, { status: 400 })
  }

  if (!verifyPassword(password)) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  const token = await signToken()
  const res = NextResponse.json({ success: true })
  res.cookies.set(ADMIN_COOKIE, token, COOKIE_OPTIONS)
  return res
}
