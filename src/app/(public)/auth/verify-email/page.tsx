import { Metadata } from 'next';

import EmailVerification from '@/features/auth/components/VerifyEmail';

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify your email address",
};

interface PageProps {
  searchParams: {
    accesskey: string;
    token: string;
  };
}

export default async function page({ searchParams }: PageProps) {
  const { accesskey, token } = await searchParams;
  return <EmailVerification accesskey={accesskey} token={token} />;
}