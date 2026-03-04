"use client";

import { ArrowRight, CheckCircle2, Mail } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { user_api } from '@/config';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { getEmailProviderLink } from '@/utils';
import { useApi } from '@/hooks/use-api';
import { FloatingInputController } from '@/components/form-controls/floating/InputController';

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const { post, isLoading } = useApi();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data: result, error } = await post(`${user_api}/ForgotPassword`, {
      emailId: email
    });

    if (error) {
      toast.error(error);
      return;
    }

    if (result && !result.isSuccess) {
      toast.error(result.resMsg);
      setIsSubmitted(false);
      return;
    }

    if (result && result.isSuccess) {
      toast.success(result.resMsg);
      setIsSubmitted(true);
    }
  };

  const emailProvider = getEmailProviderLink(email);

  return (
    <AuthLayout
      heroTitle="Recover access to your engineering workspace."
      heroSubtitle="Don't worry, it happens to the best of us. We'll help you get back to your simulations in no time."
      heroImage="https://images.unsplash.com/photo-1651314427522-6ea58411ca20?q=80&w=2670&auto=format&fit=crop"
      showBackToLogin
    >
      {!isSubmitted ? (
        <>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Forgot password?
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Enter the email address associated with your account and we'll
              send you a link to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <FloatingInputController
              type='email'
              name='email'
              label='Email'
              value={email}
              placeholder="name@company.com"
              onChange={(e) => setEmail(e.target.value)}
              required
              forcelightmode
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 shadow-md text-white dark:bg-primary dark:hover:bg-primary dark:text-white"
            >
              {isLoading ? "Sending Link..." : "Send Reset Link"}
            </Button>
          </form>
        </>
      ) : (
        <div className="text-center animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Check your email
          </h2>
          <p className="text-slate-500 text-sm mb-8">
            We have sent a password reset link to <br />
            <span className="font-semibold text-slate-900">{email}</span>
          </p>

          <div className="space-y-4">
            {emailProvider && (
              <Button
                onClick={() => window.open(emailProvider.url, "_blank")}
                variant="outline"
                className="w-full h-11 border-slate-300 text-slate-900 dark:text-slate-900 dark:border-slate-300 dark:bg-transparent dark:hover:bg-slate-100"
              >
                Open {emailProvider.name} <ArrowRight size={16} className="ml-2" />
              </Button>

            )}
            <div className="text-xs text-slate-400">
              Didn't receive the email?{" "}
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-primary hover:underline"
              >
                Click to resend
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthLayout>
  );
}
