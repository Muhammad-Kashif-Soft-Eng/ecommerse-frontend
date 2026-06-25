import { NextResponse } from 'next/server';

export function proxy(request) {
    const { pathname } = request.nextUrl;

    // Protected routes that require authentication
    const protectedRoutes = ['/dashboard'];
    
    // Check if the current route is protected
    const isProtectedRoute = protectedRoutes.some(route => 
        pathname.startsWith(route)
    );

    if (isProtectedRoute) {
        // Check for authentication token in cookies
        const cookie = request.cookies.get('isLoggedIn');
        
        if (!cookie) {
            // Redirect to login if not authenticated
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/profile/:path*'],
};
