import AppLayout from "@/components/layout/app-layout";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Dashboard",
    template: "%s | Sigma Toolbox",
  },
  description: "Homepage",
};

const layout = ({ children }: { children: ReactNode }) => {
  return <AppLayout>{children}</AppLayout>;
};

export default layout;
