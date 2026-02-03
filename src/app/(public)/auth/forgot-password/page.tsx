import { Metadata } from "next";

import ForgotPasswordPage from "@/features/auth/components/ForgotPassword";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Forgot password",
};

export default function page() {
  return <ForgotPasswordPage />;
}
