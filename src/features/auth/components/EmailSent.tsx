"use client";

import { ArrowRight, CheckCircle2, Mail, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import React, { useCallback, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { auth_api } from '@/config';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { cn } from '@/lib/utils';
import { getEmailProviderLink } from '@/utils';
import { useApi } from '@/hooks/use-api';

export default function EmailSent() {
  const [resendStatus, setResendStatus] = useState<"idle" | "sent">("idle");
  const { post, isLoading: isResending } = useApi();

  const email = typeof window !== "undefined" ? localStorage.getItem("emailId") ?? "" : "";
  const emailProvider = getEmailProviderLink(email);

  const handleResend = useCallback(async () => {
    setResendStatus("sent");

    const { data: result, error } = await post(`${auth_api}/ResendConfirmation`, { emailId: email });

    if (error) {
      toast.error(error);
      setResendStatus("idle");
      return;
    }

    if (result && !result.isSuccess) {
      toast.error(result.resMsg);
      setResendStatus("idle");
      return;
    } else if (result && result.isSuccess) {
      toast.success("Email sent");
      setResendStatus("idle");
    }
  }, [post, email]);

  return (
    <AuthLayout
      heroTitle="Verify your identity."
      heroSubtitle="Security is our priority. Please verify your email address to access the simulation workbench."
      heroImage="https://images.unsplash.com/photo-1557264337-e8a93017fe92?q=80&w=2670&auto=format&fit=crop"
    >
      <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Icon Circle */}
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 relative group">
          <div className="absolute inset-0 rounded-full border border-blue-100 animate-ping opacity-20" />
          <Mail className="text-primary w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
          <div className="absolute -right-1 -bottom-1 bg-white p-1 rounded-full shadow-sm">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">
              <CheckCircle2 size={14} strokeWidth={3} />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <h2 className="text-2xl font-bold text-slate-900 mb-3">
          Check your inbox
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed mb-8">
          We have sent a verification link to <br />
          <span className="font-bold text-slate-900 text-base">{email}</span>
        </p>

        {/* Main Actions */}
        <div className="space-y-4">
          {emailProvider && (
            <Button
              className="w-full h-11 shadow-md"
              onClick={() => window.open(emailProvider.url, "_blank")}
            >
              Open {emailProvider.name} <ArrowRight size={16} className="ml-2" />
            </Button>
          )}

          <Button
            variant="outline"
            className="w-full h-11 border-slate-200 hover:bg-slate-50 text-slate-600"
            asChild
          >
            <Link href="/auth/sign-in">Skip to Sign In</Link>
          </Button>
        </div>

        {/* Resend Section */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <p className="text-xs text-slate-400 mb-3">
            Didn't receive the email? Check your spam folder or
          </p>

          <button
            onClick={handleResend}
            disabled={isResending || resendStatus === "sent"}
            className={cn(
              "text-sm font-semibold flex items-center justify-center gap-2 mx-auto transition-colors",
              resendStatus === "sent"
                ? "text-green-600 cursor-default"
                : "text-primary hover:underline",
            )}
          >
            {isResending ? (
              <>
                <RefreshCw size={14} className="animate-spin" />
                Sending...
              </>
            ) : resendStatus === "sent" ? (
              <>
                <CheckCircle2 size={14} />
                Email sent!
              </>
            ) : (
              "Click to resend"
            )}
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
