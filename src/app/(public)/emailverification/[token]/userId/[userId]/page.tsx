import { Metadata } from 'next';

import EmailVerificationPage from '@/features/auth/components/EmailVerification';

export const metadata: Metadata = {
    title: "Verify Email",
    description: "Verify your email address",

};

interface PageProps {
    params: {
        token: string;
        userId: string;
    };
}

export default async function page({ params }: PageProps) {
    const { token, userId } = await params;

    return <EmailVerificationPage token={token} userId={userId} />;
}
