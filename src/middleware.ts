import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-here-make-it-long-and-random';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '');

  // Admin routes that require admin authentication
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

  if (isAdminRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/sign-in?redirect=/admin', request.url));
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { isAdmin: boolean };
      
      if (!decoded.isAdmin) {
        return NextResponse.redirect(new URL('/sign-in?error=unauthorized', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/sign-in?error=invalid_token', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/account/:path*'
  ]
};
