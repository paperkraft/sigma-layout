"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2 } from "lucide-react";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { base_url } from "@/config";

interface VerifyPageProps {
    token: string;
    userId: string;
}

export default function EmailVerificationPage({ token, userId }: VerifyPageProps) {
    const router = useRouter();

    console.log(token, userId)

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleVerify = async () => {
        try {
            setLoading(true);
            setError("");

            const res = await fetch(`${base_url}/api/User/confirm-mail`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    verificationKey: token,
                    userId,
                }),
            });

            if (!res.ok) {
                throw new Error("Verification failed");
            }

            router.replace("/auth/verified-success");
        } catch (err) {
            setError("Verification link is invalid or expired.");
        } finally {
            setLoading(false);
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
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Verifying...
                        </>
                    ) : (
                        "Verify Account"
                    )}
                </Button>
            </div>
        </AuthLayout>
    );
}