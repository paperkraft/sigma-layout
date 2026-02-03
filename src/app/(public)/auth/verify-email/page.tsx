import { Metadata } from "next";

import VerifyEmailPage from "@/features/auth/components/VerifyEmail";

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify email",
};

export default function page() {
  return <VerifyEmailPage />;
}
