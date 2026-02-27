import { Metadata } from "next";

import ResetPasswordPage from "@/features/auth/components/ResetPassword";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset password",
};

interface PageProps {
  searchParams: {
    id: string;
  };
}

export default async function page({ searchParams }: PageProps) {
  const { id } = await searchParams;
  return <ResetPasswordPage id={id} />;
}
