import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect old ID-based product URLs to slug-based URLs
  if (pathname.startsWith('/products/') && pathname.split('/').length === 3) {
    const id = pathname.split('/')[2];
    
    // Check if it's a valid MongoDB ObjectId (24 character hex string)
    if (/^[0-9a-fA-F]{24}$/.test(id)) {
      // This is an old ID-based URL, redirect to the new slug-based URL
      // We'll redirect to the products page and let the client handle the slug generation
      return NextResponse.redirect(new URL('/products', request.url));
    }
  }

  // Redirect old ID-based service URLs to slug-based URLs
  if (pathname.startsWith('/services/') && pathname.split('/').length === 3) {
    const id = pathname.split('/')[2];
    
    // Check if it's a valid MongoDB ObjectId (24 character hex string)
    if (/^[0-9a-fA-F]{24}$/.test(id)) {
      // This is an old ID-based URL, redirect to the new slug-based URL
      // We'll redirect to the services page and let the client handle the slug generation
      return NextResponse.redirect(new URL('/services', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/products/:path*',
    '/services/:path*',
  ],
}; 