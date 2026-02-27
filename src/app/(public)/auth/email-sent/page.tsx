import { Metadata } from "next";

import EmailSent from "@/features/auth/components/EmailSent";

export const metadata: Metadata = {
  title: "Email Sent",
  description: "Check email",
};

export default function page() {
  return <EmailSent />;
}
