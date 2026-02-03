"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, ArrowRight, Github } from "lucide-react";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.replace("/dashboard");
    }, 2000);
  };

  return (
    <AuthLayout
      heroTitle="Simulate your world, faster than ever."
      heroSubtitle="Join 500,000+ engineers designing the future with cloud-native simulation. No hardware required."
      heroImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop"
    >
      <div className="absolute top-8 right-8 lg:right-16 text-xs sm:text-sm">
        <span className="text-slate-500">New here?</span>
        <Link
          href="/auth/sign-up"
          className="ml-2 font-semibold text-primary hover:text-primary hover:underline"
        >
          Create an account
        </Link>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
        <p className="text-slate-500 text-sm mt-1">
          Enter your credentials to access your workbench.
        </p>
      </div>

      {/* Social Login */}
      <div className="hidden">
        <div className="grid grid-cols-2 gap-3 mb-6">
          <SocialButton icon={<GoogleIcon />} label="Google" />
          <SocialButton icon={<Github size={18} />} label="Github" />
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-wide">
            <span className="bg-white px-2 text-slate-400 font-medium">
              Or continue with email
            </span>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <form onSubmit={handleLogin} className="space-y-5">
        <div className="space-y-1.5">
          <label
            className="text-xs font-semibold text-slate-700 uppercase"
            htmlFor="email"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="name@company.com"
            className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all"
            required
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              className="text-xs font-semibold text-slate-700 uppercase"
              htmlFor="password"
            >
              Password
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-xs font-medium text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="remember"
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label
            htmlFor="remember"
            className="text-sm text-slate-600 select-none cursor-pointer"
          >
            Remember me
          </label>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 bg-primary hover:bg-primary text-base font-medium shadow-md hover:shadow-lg transition-all"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Signing in...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              Sign In <ArrowRight size={18} />
            </div>
          )}
        </Button>
      </form>

      {/* Footer */}
      <p className="text-xs text-center text-slate-400 mt-8 leading-relaxed px-4">
        By clicking sign in, you agree to our&nbsp;
        <Link href="#" className="underline hover:text-primary">Terms of Service</Link>&nbsp; and&nbsp;
        <Link href="#" className="underline hover:text-primary">Privacy Policy</Link>.
      </p>
    </AuthLayout>
  );
}

// --- SUB COMPONENTS ---

function SocialButton({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-2 h-10 px-4 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all font-medium text-slate-700 text-sm bg-white"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.52 12.29C23.52 11.43 23.44 10.61 23.3 9.81H12V14.45H18.47C18.18 15.96 17.34 17.26 16.08 18.1L19.95 21.1C22.21 19.01 23.52 15.92 23.52 12.29Z"
        fill="#4285F4"
      />
      <path
        d="M12 24C15.24 24 17.96 22.92 19.95 21.1L16.08 18.1C15 18.82 13.62 19.25 12 19.25C8.87 19.25 6.22 17.14 5.27 14.29L1.29 17.38C3.26 21.3 7.31 24 12 24Z"
        fill="#34A853"
      />
      <path
        d="M5.27 14.29C5.02 13.43 4.88 12.52 4.88 11.6C4.88 10.68 5.02 9.77 5.27 8.91L1.29 5.82C0.47 7.45 0 9.27 0 11.6C0 13.93 0.47 15.75 1.29 17.38L5.27 14.29Z"
        fill="#FBBC05"
      />
      <path
        d="M12 4.75C13.77 4.75 15.35 5.36 16.6 6.55L20.03 3.12C17.96 1.18 15.24 0 12 0C7.31 0 3.26 2.7 1.29 6.62L5.27 9.71C6.22 6.86 8.87 4.75 12 4.75Z"
        fill="#EA4335"
      />
    </svg>
  );
}
