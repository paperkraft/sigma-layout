"use client";

import { AlertCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { auth_api } from '@/config';
import { AuthLayout } from '@/features/auth/components/AuthLayout';
import { useApi } from '@/hooks/use-api';
import LoaderEffect from '@/components/shared/loader-effect';

interface VerifyPageProps {
    accesskey: string;
    token: string;
}

export default function EmailVerification({ accesskey, token }: VerifyPageProps) {
    const router = useRouter();
    const [error, setError] = useState("");
    const { post, isLoading: loading } = useApi();

    const handleVerify = async () => {
        setError("");

        const { data: result, error: apiError } = await post(`${auth_api}/ConfirmMail`, {
            verificationKey: accesskey,
            userId: token
        });

        if (apiError) {
            setError("Verification link is invalid or expired.");
            return;
        }

        if (result && !result.isSuccess) {
            toast.error(result.resMsg);
            return;
        } else if (result && result.isSuccess) {
            router.replace("/auth/verified-success");
            localStorage.removeItem('emailId');
        }
    };

    return (
        <AuthLayout
            heroTitle="Verify your account"
            heroSubtitle="Click below to complete your email verification."
            heroImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop"
        >
            <div className="flex flex-col items-center text-center space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                        Confirm Your Email
                    </h2>
                    <p className="text-slate-500 text-sm mt-2 max-w-md">
                        Please verify your account to activate access.
                    </p>
                </div>

                {error && (
                    <div className="flex items-center gap-2 text-red-500 text-sm">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                <Button
                    onClick={handleVerify}
                    disabled={loading}
                    className="w-full h-11 shadow-md"
                >
                    <LoaderEffect loading={loading} loadingText="Verifying..." text="Verify Account" />
                </Button>
            </div>
        </AuthLayout>
    );
}