import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const token = request.cookies.get('token')?.value;

    // Public auth routes (no auth needed)
    const publicAuthRoutes = [
        '/auth/sign-in',
        '/auth/sign-up',
        '/auth/forgot-password',
        '/auth/reset-password',
        '/auth/verify-email',
    ];

    // Allow public auth routes
    if (publicAuthRoutes.some((route) => pathname.startsWith(route))) {
        return NextResponse.next();
    }

    // Redirect ROOT "/" → "/auth/sign-in" if not logged in
    if (pathname === '/' && !token) {
        return NextResponse.redirect(
            new URL('/auth/sign-in', request.url)
        );
    }

    // Protect PROJECT routes
    if (pathname.startsWith('/projects') && !token) {
        const signInUrl = new URL('/auth/sign-in', request.url);
        signInUrl.searchParams.set('redirect', pathname);

        return NextResponse.redirect(signInUrl);
    }

    // Optional: prevent logged-in users from visiting auth pages
    if (token && pathname.startsWith('/auth')) {
        return NextResponse.redirect(
            new URL('/dashboard', request.url)
        );
    }

    return NextResponse.next();
}

// Runs ONLY on these routes
export const config = {
    matcher: [
        '/',                 // root
        '/auth/:path*',      // auth pages
        '/projects/:path*',  // all projects
    ],
};
