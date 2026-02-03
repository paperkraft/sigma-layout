import { Metadata } from "next";

import ResetPasswordPage from "@/features/auth/components/ResetPassword";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset password",
};

export default function page() {
  return <ResetPasswordPage />;
}
