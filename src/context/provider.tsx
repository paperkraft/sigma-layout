"use client";

import { ReactNode } from 'react';

import { ThemeProvider } from '@/context/theme-provider';
import { AuthProvider } from '@/context/auth-provider';
import { AuthGuard } from '@/context/auth-guard';

interface ProvidersProps {
    children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <AuthProvider>
                <AuthGuard>
                    {children}
                </AuthGuard>
            </AuthProvider>
        </ThemeProvider>
    );
}