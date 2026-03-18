'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';

import Loading from '@/app/loading';
import { PUBLIC_PATHS } from '@/config';
import { useAuth } from '@/context/auth-provider';

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const PUBLIC_ROUTE_SET = useMemo(() => new Set(PUBLIC_PATHS), []);

    const isPublicRoute = useMemo(() => {
        // exact match
        if (PUBLIC_ROUTE_SET.has(pathname)) return true;
        return false;
    }, [pathname, PUBLIC_ROUTE_SET]);

    useEffect(() => {
        if (loading) return;

        if (!user && !isPublicRoute) {
            // Unauthenticated user trying to access a private route
            router.replace(`/auth/sign-in?redirect=${encodeURIComponent(pathname)}`);
        } else if (user && isPublicRoute) {
            // Authenticated user trying to access a public route (e.g., login, register)
            router.replace('/home');
        }
    }, [user, loading, isPublicRoute, router]);

    // While determining auth state
    if (loading) return <Loading />;

    // To avoid flashing content before the redirect in useEffect takes effect we return null.
    if ((!user && !isPublicRoute) || (user && isPublicRoute)) return null;

    // Authorized
    return <>{children}</>;
}