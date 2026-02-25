import type { Metadata } from "next";
import '@/styles/globals.css';

import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';

import Providers from '@/context/provider';
import { cn } from '@/lib/utils';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Sigma Toolbox",
    template: "%s | Sigma Toolbox",
  },
  description: "Water Network Simulation",
  keywords: ["waterlab", "auqabill", "simulation"],
  authors: [{ name: "Sigma" }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(geistSans.variable, geistMono.variable, 'antialiased font-sans')}>
        <Providers>
          {children}
        </Providers>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
