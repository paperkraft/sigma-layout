import { notFound, redirect } from 'next/navigation';

import { DUMMY_PROJECTS, getProjectMetadata } from '@/config/project_dummy';
import { Placeholder } from '@/components/shared/Placeholder';

type PageProps = {
    params: Promise<{
        projectId: string;
    }>;
};

export async function generateMetadata({ params }: PageProps) {
    return getProjectMetadata(params, "aquabill");
}

export default async function Page({ params }: PageProps) {
    const { projectId } = await params;
    const project = DUMMY_PROJECTS.find((p) => p.type === 'aquabill' && p.id === projectId);

    if (!project) {
        notFound();
    }

    return redirect(`${projectId}/dashboard`);
    // return (<Placeholder title={project.name} description={project.description!} />);
}

