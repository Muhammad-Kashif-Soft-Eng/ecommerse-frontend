import { NextResponse } from "next/server";

export function proxy(request) {

    const authMarker = request.cookies.get("isLoggedIn");
    const { pathname } = request.nextUrl;

    if (!authMarker && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (authMarker && (pathname === "/login" || pathname === "/register")) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/login',
        '/register'
    ]
};
