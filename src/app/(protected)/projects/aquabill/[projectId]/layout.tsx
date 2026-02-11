import { Metadata } from 'next';
import { ReactNode } from 'react';

import { Header } from '@/components/layout/app-header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DUMMY_PROJECTS } from '@/config/project_dummy';
import { AquabillSidebar } from '@/features/projects/aquabill/aquabill-sidebar';
import { cn } from '@/lib/utils';

import NotFound from './not-found';

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
        <SidebarProvider>
            <div className="w-full flex flex-col font-sans text-foreground">
                <div className="sticky top-0 z-50">
                    <Header isWorkbench projectName={project?.name} description={project?.description} />
                </div>

                <div className="flex flex-1">
                    <AquabillSidebar className="top-14" />
                    <main className={cn("flex-1 min-w-0 overflow-x-hidden bg-gray-50 dark:bg-background transition-colors duration-300")}>
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
};

export default layout;