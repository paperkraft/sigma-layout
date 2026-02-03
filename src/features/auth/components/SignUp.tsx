"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.replace("/auth/verify-email");
    }, 2000);
  };

  return (
    <AuthLayout
      heroTitle="Join the world's largest simulation community."
      heroSubtitle="Start simulating in minutes. No installation required. Access powerful cloud computing resources directly from your browser."
      heroImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop"
      showBackToLogin
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Create your account
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Start your 14-day free trial. No credit card required.
        </p>
      </div>

      <form onSubmit={handleSignup} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase">
              First Name
            </label>
            <Input
              placeholder="First Name"
              className="bg-slate-50 border-slate-200"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase">
              Last Name
            </label>
            <Input
              placeholder="Last Name"
              className="bg-slate-50 border-slate-200"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 uppercase">
            Work Email
          </label>
          <Input
            type="email"
            placeholder="name@company.com"
            className="bg-slate-50 border-slate-200"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 uppercase">
            Password
          </label>
          <div className="relative">
            <Input
              type={showPass ? "text" : "password"}
              placeholder="Create a password"
              className="bg-slate-50 border-slate-200 pr-10"
              required
              minLength={8}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <p className="text-[10px] text-slate-400">
            Must be at least 8 characters
          </p>
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-3 pt-2">
          <input
            type="checkbox"
            id="terms"
            className="mt-1 rounded border-gray-300 text-primary focus:ring-primary"
            required
          />
          <label
            htmlFor="terms"
            className="text-xs text-slate-500 leading-relaxed"
          >
            I agree to the&nbsp;<Link href="#" className="text-primary hover:underline">Terms of Service</Link>&nbsp; and&nbsp;
            <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>. I consent to receive product updates.
          </label>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 shadow-md"
        >
          {isLoading ? "Creating Account..." : "Get Started"}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-slate-500">
        Already have an account?
        <Link
          href="/auth/sign-in"
          className="ml-2 font-semibold text-primary"
        >
          Sign in
        </Link>
      </div>
    </AuthLayout>
  );
}
