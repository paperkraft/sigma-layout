"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { AuthHeader } from "./AuthHeader";

export default function VerifiedSuccess() {
    return (
        <AuthLayout
            heroTitle="You're all set!"
            heroSubtitle="Your email has been successfully verified. You now have full access to your account."
            heroImage="https://images.unsplash.com/photo-1557264337-e8a93017fe92?q=80&w=2670&auto=format&fit=crop"
        >
            <div className="flex flex-col items-center text-center space-y-6">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-100">
                    <CheckCircle2 className="text-green-600" size={40} />
                </div>

                <AuthHeader
                    title="Email Verified Successfully 🎉"
                    description="Your account is now active. You can log in and start simulating immediately using our powerful cloud computing platform."
                />

                <Link href="/auth/sign-in" className="w-full">
                    <Button className="w-full h-11 shadow-md">Go to Login</Button>
                </Link>

                <p className="text-xs text-slate-400">
                    Didn't verify manually? No worries — this confirmation happens automatically after signup.
                </p>
            </div>
        </AuthLayout>
    );
}