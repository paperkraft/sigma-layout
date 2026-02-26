"use client";

import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { base_url } from '@/config';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { signupSchema } from '@/schema/auth/sign-up';
import { zodResolver } from '@hookform/resolvers/zod';

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      terms: false
    }
  });

  const onSubmit = useCallback(async (data: SignupFormValues) => {

    const { firstName, lastName, ...rest } = data;
    const payload = {
      ...rest,
      "countryName": "India",
      "countryCode": "+91",
      "roleId": "8f6b9c1e-5d6f-4f9e-9a4a-1b2c3d4e5f07",
      "invitedProjectId": null,
      "userTypeId": null,
    }

    localStorage.setItem('emailId', rest.emailId);

    try {
      const res = await fetch(`${base_url}/api/User/signup`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Sign Up failed");
      }

      if (result.isSuccess) {
        router.replace("/auth/verify-email");
      } else {
        toast.error(result.resMsg);
        return;
      }

    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  }, []);

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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* First + Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              placeholder="First Name"
              {...register("firstName")}
              maxLength={20}
              className="bg-slate-50 border-slate-200 text-slate-900 dark:bg-slate-50 dark:border-slate-200 dark:text-slate-900"
            />
            {errors.firstName && (
              <p className="text-xs text-red-500 mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <Input
              placeholder="Last Name"
              {...register("lastName")}
              maxLength={20}
              className="bg-slate-50 border-slate-200 text-slate-900 dark:bg-slate-50 dark:border-slate-200 dark:text-slate-900"
            />
            {errors.lastName && (
              <p className="text-xs text-red-500 mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {/* Email + Mobile */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              type="email"
              placeholder="name@company.com"
              {...register("emailId")}
              className="bg-slate-50 border-slate-200 text-slate-900 dark:bg-slate-50 dark:border-slate-200 dark:text-slate-900"
            />
            {errors.emailId && (
              <p className="text-xs text-red-500 mt-1">
                {errors.emailId.message}
              </p>
            )}
          </div>

          <div>
            <Input
              type="tel"
              placeholder="8888XXXXXXX"
              {...register("mobileNo")}
              maxLength={10}
              className="bg-slate-50 border-slate-200 text-slate-900 dark:bg-slate-50 dark:border-slate-200 dark:text-slate-900"
            />
            {errors.mobileNo && (
              <p className="text-xs text-red-500 mt-1">
                {errors.mobileNo.message}
              </p>
            )}
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="relative">
            <Input
              type={showPass ? "text" : "password"}
              placeholder="Create a password"
              {...register("password")}
              maxLength={20}
              className="bg-slate-50 border-slate-200 pr-10 text-slate-900 dark:bg-slate-50 dark:border-slate-200 dark:text-slate-900"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Terms */}
        <div className="flex items-start gap-3 pt-2">
          <input
            type="checkbox"
            {...register("terms")}
            className="mt-1 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label className="text-xs text-slate-500 leading-relaxed">
            I agree to the{" "}
            <Link href="#" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </label>
        </div>
        {errors.terms && (
          <p className="text-xs text-red-500">
            {errors.terms.message}
          </p>
        )}

        {/* Submit */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 shadow-md text-white dark:bg-primary dark:hover:bg-primary dark:text-white"
        >
          {isSubmitting ? "Creating Account..." : "Get Started"}
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