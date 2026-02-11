import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/layout/app-logo";

interface AuthLayoutProps {
  children: React.ReactNode;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  showBackToLogin?: boolean;
}

export function AuthLayout({
  children,
  heroTitle,
  heroSubtitle,
  heroImage,
  showBackToLogin,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex bg-white font-sans">
      {/* LEFT SIDE: HERO VISUAL */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-slate-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent" />

        <div className="relative z-10 flex flex-col justify-end h-full p-16 text-white max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight mb-4 leading-tight whitespace-pre-line">
            {heroTitle}
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            {heroSubtitle}
          </p>

          {/* Footer Stats */}
          <div className="flex items-center gap-6 pt-8 mt-8 border-t border-white/10 text-xs font-medium tracking-wide uppercase text-slate-400">
            <div>
              <span className="text-white block text-lg font-bold">500k+</span>
              Engineers
            </div>
            <div>
              <span className="text-white block text-lg font-bold">10M+</span>
              Simulations
            </div>
            <div>
              <span className="text-white block text-lg font-bold">100%</span>
              Web-Based
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: CONTENT */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-10 relative bg-white">
        {/* Back Link */}
        {showBackToLogin && (
          <div className="absolute top-8 left-8">
            <Link
              href="/auth/sign-in"
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft size={16} /> Back to Login
            </Link>
          </div>
        )}

        <div className="w-full max-w-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <Logo />
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
