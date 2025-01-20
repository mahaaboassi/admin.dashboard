import { NextResponse } from 'next/server'
import { checkTokenOnServer } from './lib/checkToken'

export async function middleware(request) {

  // Use next-auth's getToken for secure token retrieval
  const token = await  checkTokenOnServer()
  // Define protected and public routes
  const protectedRoutes = ['/dashboards', '/user/list', "/user/add",
    "/features/list","/features/add" , "/features/addSub",
    "/properties/list", "/properties/add"
  ]
  const authRoutes = ['/auth/sign-in']

  const { pathname } = request.nextUrl
  
  // Case 1: Redirect unauthenticated users from protected routes to sign-in
  if (!token && protectedRoutes.some(route => {
    return pathname.startsWith(route)
  })) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url))
  }

  // Case 2: Redirect authenticated users away from auth routes
  if (token && authRoutes.includes(pathname)) {
    console.log("here");
    
    return NextResponse.redirect(new URL('/dashboards', request.url))
  }

  // Case 3: Redirect root path based on authentication status
  if (pathname === '/') {
    return token 
      ? NextResponse.redirect(new URL('/dashboards', request.url))
      : NextResponse.redirect(new URL('/auth/sign-in', request.url))
  }

  return NextResponse.next()
}

// Matching paths for middleware
export const config = {
  matcher: [
    '/', 
    '/dashboards/:path*', 
    '/profile/:path*', 
    '/auth/:path*'
  ]
}