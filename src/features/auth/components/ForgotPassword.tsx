"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle2 } from "lucide-react";
import { AuthLayout } from "@/features/auth/components/AuthLayout";

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <AuthLayout
      heroTitle="Recover access to your engineering workspace."
      heroSubtitle="Don't worry, it happens to the best of us. We'll help you get back to your simulations in no time."
      // heroImage="https://images.unsplash.com/photo-1569403617727-13af6b24d342?q=80&w=2670&auto=format&fit=crop"
      heroImage="https://images.unsplash.com/photo-1651314427522-6ea58411ca20?q=80&w=2670&auto=format&fit=crop"
      showBackToLogin
    >
      {!isSubmitted ? (
        <>
          <div className="mb-8">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-primary mb-4">
              <Mail size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Forgot password?
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Enter the email address associated with your account and we'll
              send you a link to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 bg-slate-50 border-slate-200"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 shadow-md"
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
            <Button
              onClick={() => window.open("https://gmail.com", "_blank")}
              variant="outline"
              className="w-full h-11 border-slate-300"
            >
              Open Email App
            </Button>
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
