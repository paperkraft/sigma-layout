"use client";

import { Check, Lock } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { FloatingInputController } from '@/components/form-controls/floating/InputController';
import LoaderEffect from '@/components/shared/loader-effect';
import { Button } from '@/components/ui/button';
import { user_api } from '@/config';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { useApi } from '@/hooks/use-api';
import { cn } from '@/lib/utils';

export default function ResetPasswordPage({ id }: { id: string }) {
  const { put, isLoading } = useApi();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // Simple Validation
  const validations = [
    { label: "At least 8 characters", valid: password.length >= 6 },
    { label: "Contains a number", valid: /\d/.test(password) },
    { label: "Contains a symbol", valid: /[!@#$%^&*]/.test(password) },
  ];

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) return toast.error("Passwords do not match");

    const { data: result, error } = await put(`${user_api}/ChangeForgotPassword`, {
      id: id,
      newPassword: password
    });

    if (error) {
      toast.error(error);
      return;
    }

    if (result && !result.isSuccess) {
      toast.error(result.resMsg);
      return;
    }

    if (result && result.isSuccess) {
      toast.success("Password reset successful");
      window.location.href = "/auth/sign-in";
    }
  };

  return (
    <AuthLayout
      heroTitle="Secure your account."
      heroSubtitle="Choose a strong password to protect your simulation data and engineering projects."
      heroImage="https://images.unsplash.com/photo-1651314427522-6ea58411ca20?q=80&w=2670&auto=format&fit=crop"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Set new password</h2>
        <p className="text-slate-500 text-sm mt-2">
          Your new password must be different to previously used passwords.
        </p>
      </div>

      <form onSubmit={handleReset} className="space-y-4">

        <FloatingInputController
          type='password'
          name='password'
          label='New Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          forcelightmode
        />

        {/* Password Strength Meter */}
        <div className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
          {validations.map((v, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <div
                className={cn(
                  "w-4 h-4 rounded-full flex items-center justify-center transition-colors",
                  v.valid
                    ? "bg-green-500 text-white"
                    : "bg-slate-200 text-slate-400",
                )}
              >
                <Check size={10} strokeWidth={4} />
              </div>
              <span
                className={cn(
                  v.valid ? "text-slate-700 font-medium" : "text-slate-400",
                )}
              >
                {v.label}
              </span>
            </div>
          ))}
        </div>

        <FloatingInputController
          type='password'
          name='password'
          label='Confirm Password'
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          forcelightmode
          error={confirm && password !== confirm ? "Passwords do not match" : ""}
        />

        <Button
          type="submit"
          disabled={isLoading || !validations.every((v) => v.valid)}
          className="w-full h-11 shadow-md dark:text-white"
        >
          <LoaderEffect loading={isLoading} text='Reset Password' loadingText='Resetting Password...' />
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/auth/sign-in"
          className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          ← Back to Login
        </Link>
      </div>
    </AuthLayout>
  );
}
