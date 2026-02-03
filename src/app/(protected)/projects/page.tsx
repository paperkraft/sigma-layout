import { Metadata } from 'next';

import AppLayout from '@/components/layout/app-layout';
import ProjectList from '@/features/projects/ProjectList';

export const metadata: Metadata = {
    title: {
        default: "Projects",
        template: "%s | Sigma Toolbox",
    },
    description: "Projects",
};

export default function Page() {
    return (
        <AppLayout>
            <ProjectList />
        </AppLayout>
    );
}