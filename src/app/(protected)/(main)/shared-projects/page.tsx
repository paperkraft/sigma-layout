import { Placeholder } from "@/components/shared/Placeholder";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: {
      default: "Shared Project",
      template: "%s | Sigma Toolbox",
   },
   description: "Shared Project",
};

export default function Page() {
   return (<Placeholder title={"Shared Projects"} description={"Manage your shared project with team."} />);
}
