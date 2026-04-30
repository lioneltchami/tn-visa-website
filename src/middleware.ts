import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

const protectedRoutes = ['/dashboard', '/my-documents', '/profile', '/onboarding', '/analyzer']

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request)

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )

  if (isProtected && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/my-documents/:path*', '/profile/:path*', '/onboarding/:path*', '/analyzer/:path*'],
}
