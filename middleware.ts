import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const queryId = request.nextUrl.searchParams.get('id')
  const subscriptionStatus = request.nextUrl.searchParams.get('success')
  const sessionId = request.nextUrl.searchParams.get('session_id')
  const token = request.cookies.get('token')
  const isAuthRoute = path === '/login' || path === '/register'
  const isPrivateRoute = path.startsWith('/dashboard')

  if (isAuthRoute && token?.value) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (isPrivateRoute && !token?.value) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('referer', request.url)
  if (queryId !== null) {
    requestHeaders.set('queryId', queryId)
  }

  if (subscriptionStatus !== null) {
    requestHeaders.set('subscriptionStatus', subscriptionStatus)
  }

  if (sessionId !== null) {
    requestHeaders.set('sessionId', sessionId)
  }

  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    }
  })
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/login',
    '/register',
    '/faq',
    '/legal-notice',
    '/personal-data',
    '/forgot-password',
    '/restaurant/:path*'
  ],
}