"use client";

import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { base_url } from '@/config';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { signInSchema } from '@/schema/auth/sign-in';
import { zodResolver } from '@hookform/resolvers/zod';
import { useApi } from '@/hooks/use-api';

type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { post } = useApi();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = useCallback(async (data: SignInFormValues) => {
    const { data: result, error } = await post(`${base_url}/api/User/Login`, data);

    if (error) {
      toast.error(error);
      return;
    }

    if (result && !result.isSuccess) {
      toast.error(result.resMsg);
      return;
    }

    if (result && result.isSuccess) {
      window.location.href = "/home";
    }
  }, [post]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <AuthLayout
      heroTitle="Simulate your world, faster than ever."
      heroSubtitle="Join 500,000+ engineers designing the future with cloud-native simulation. No hardware required."
      heroImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop"
      topRightElement={
        <div className="text-xs sm:text-sm">
          <span className="text-slate-500">New here?</span>
          <Link
            href="/auth/sign-up"
            className="ml-2 font-semibold text-primary hover:text-primary hover:underline"
          >
            Create an account
          </Link>
        </div>
      }
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
        <p className="text-slate-500 text-sm mt-1">
          Enter your credentials to access your workbench.
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
            {...register("emailId")}
            placeholder="name@company.com"
            className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all text-slate-900 dark:bg-slate-50 dark:border-slate-200 dark:focus:bg-white dark:text-slate-900"
            required
          />
          {errors.emailId && (
            <p className="text-xs text-red-500">{errors.emailId.message}</p>
          )}
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
              {...register("password")}
              placeholder="••••••••"
              className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all pr-10 text-slate-900 dark:bg-slate-50 dark:border-slate-200 dark:focus:bg-white dark:text-slate-900"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 bg-primary hover:bg-primary text-base font-medium shadow-md hover:shadow-lg transition-all text-white dark:bg-primary dark:hover:bg-primary dark:text-white"
        >
          {isSubmitting ? (
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