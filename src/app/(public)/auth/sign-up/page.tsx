import { Metadata } from "next";

import SignUpPage from "@/features/auth/components/SignUp";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Signup new user",
};

export default function page() {
  return <SignUpPage />;
}
