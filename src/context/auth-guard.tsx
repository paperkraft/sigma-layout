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
    const isPublicRoute = PUBLIC_ROUTE_SET.has(pathname);

    useEffect(() => {
        if (loading) return;

        if (!user && !isPublicRoute) {
            // Unauthenticated user trying to access a private route
            router.replace('/auth/sign-in');
        } else if (user && isPublicRoute) {
            // Authenticated user trying to access a public route (e.g., login, register)
            router.replace('/home');
        }
    }, [user, loading, isPublicRoute, router]);

    // Loading
    if (loading) return <Loading />;

    // For unauthenticated users on private routes, or authenticated users on public routes,
    // we return null to avoid flashing content before the redirect in useEffect takes effect.
    if (!user && !isPublicRoute) return <Loading />;
    if (user && isPublicRoute) return <Loading />;

    // Authorized
    return <>{children}</>;
}