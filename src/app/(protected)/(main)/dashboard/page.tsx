import Dashboard from "@/features/dashboard/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};

export default function Page() {
  return (<Dashboard />);
}
