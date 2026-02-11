"use client";

import React, { ReactNode } from 'react';

import { Header } from '@/components/layout/app-header';
import { cn } from '@/lib/utils';

import { SidebarProvider } from '../ui/sidebar';
import { AppSidebar } from './app-sidebar';

export default function AppLayout({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <SidebarProvider>
      <div className="w-full flex flex-col font-sans">
        <div className="sticky top-0 z-50">
          <Header />
        </div>

        <div className="flex flex-1">
          <AppSidebar className="top-14" />
          <main className={cn("flex-1 min-w-0 overflow-x-hidden bg-slate-50 dark:bg-background text-foreground transition-colors duration-300", className)}>{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}