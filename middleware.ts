import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Define protected routes
  const protectedRoutes = ["/dashboard"]
  const authRoutes = ["/login", "/registo"]

  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route))
  const isAuthRoute = authRoutes.some((route) => path.startsWith(route))

  // Get the token from cookies (simulated)
  const token = request.cookies.get("auth-token")?.value

  // Redirect to login if accessing protected route without token
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Redirect to dashboard if accessing auth routes with token
  if (isAuthRoute && token) {
    // In a real implementation, decode the token to get the user role
    // For simulation, we'll redirect to a default dashboard
    return NextResponse.redirect(new URL("/dashboard/joba", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/registo/:path*"],
}
