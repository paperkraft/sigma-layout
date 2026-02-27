"use client";

import { Check, Eye, EyeOff, Lock } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { user_api } from '@/config';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { cn } from '@/lib/utils';
import { useApi } from '@/hooks/use-api';

export default function ResetPasswordPage({ id }: { id: string }) {
  const [showPass, setShowPass] = useState(false);
  const { put, isLoading } = useApi();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // Simple Validation
  const validations = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "Contains a number", valid: /\d/.test(password) },
    { label: "Contains a symbol", valid: /[!@#$%^&*]/.test(password) },
  ];

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return alert("Passwords do not match");

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
    } else if (result && result.isSuccess) {
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
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-primary mb-4">
          <Lock size={24} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Set new password</h2>
        <p className="text-slate-500 text-sm mt-2">
          Your new password must be different to previously used passwords.
        </p>
      </div>

      <form onSubmit={handleReset} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 uppercase">
            New Password
          </label>
          <div className="relative">
            <Input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 bg-slate-50 border-slate-200 pr-10 text-slate-900 dark:bg-slate-50 dark:border-slate-200 dark:text-slate-900"
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

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

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 uppercase">
            Confirm Password
          </label>
          <Input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className={cn(
              "h-11 bg-slate-50 border-slate-200 text-slate-900 dark:bg-slate-50 dark:border-slate-200 dark:text-slate-900",
              confirm && password !== confirm
                ? "border-red-300 focus:ring-red-200"
                : "",
            )}
            required
          />
          {confirm && password !== confirm && (
            <p className="text-[10px] text-red-500">Passwords do not match</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading || !validations.every((v) => v.valid)}
          className="w-full h-11 shadow-md text-white dark:bg-primary dark:hover:bg-primary dark:text-white"
        >
          {isLoading ? "Resetting Password..." : "Reset Password"}
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
