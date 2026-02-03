import { Metadata } from "next";
import { ReactNode } from "react";
import NotFound from "./not-found";
import { DUMMY_PROJECTS } from "@/config/project_dummy";
import { Header } from "@/components/layout/app-header";

export const metadata: Metadata = {
    title: {
        default: "AquaBill",
        template: "%s | AquaBill",
    },
    description: "AquaBill",
};

type LayoutProps = {
    params: Promise<{
        projectId: string;
    }>;
    children: ReactNode;
};

const layout = async ({ children, params }: LayoutProps) => {
    const { projectId } = await params;
    const project = DUMMY_PROJECTS.find((p) => p.type === 'aquabill' && p.id === projectId);

    if (!project) {
        NotFound();
    }

    return (
        <div className="w-full flex flex-col font-sans text-slate-700">
            <div className="sticky top-0 z-50">
                <Header isWorkbench projectName={project?.name} description={project?.description} />
            </div>
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
};

export default layout;
