import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Sigma",
    template: "%s | Sigma Toolbox",
  },
  description: "Sigma Toolbox Authorization",
};

const layout = ({ children }: { children: ReactNode }) => {
  return children;
};

export default layout;
