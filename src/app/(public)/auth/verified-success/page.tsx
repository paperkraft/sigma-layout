import { Metadata } from "next";

import VerifiedSuccess from "@/features/auth/components/VerifiedSuccess";

export const metadata: Metadata = {
    title: "Verified",
    description: "Verified User Success",
};

export default function page() {
    return <VerifiedSuccess />;
}
