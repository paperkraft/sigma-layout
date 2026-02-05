"use client"

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import NextTopLoader from 'nextjs-toploader';
import * as React from 'react';

import { useMount } from '@/hooks/use-mount';

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const isMounted = useMount();
  return (
    <NextThemesProvider {...props}>
      <NextTopLoader
        color="var(--primary)"
        initialPosition={0.08}
        crawlSpeed={200}
        height={4}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 10px var(--primary),0 0 5px var(--primary)"
        zIndex={99999}
      />

      {isMounted && children}
    </NextThemesProvider>
  )
}