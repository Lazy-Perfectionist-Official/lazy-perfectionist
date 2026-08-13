import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ADMIN_COOKIE, verifyToken } from '@/lib/admin-auth'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Public: the login page itself and the login API endpoint
  const isLoginPage = pathname === '/admin'
  const isLoginApi = pathname === '/api/admin/auth/login'

  if (isLoginPage || isLoginApi) {
    return NextResponse.next()
  }

  const token = req.cookies.get(ADMIN_COOKIE)?.value
  if (!(await verifyToken(token))) {
    const loginUrl = new URL('/admin', req.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
