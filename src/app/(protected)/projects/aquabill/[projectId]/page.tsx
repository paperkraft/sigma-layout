import { notFound } from 'next/navigation';

import { DUMMY_PROJECTS, getProjectMetadata } from '@/config/project_dummy';
import AquaBillDashboard from './Dashboard';

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

    return (
        <>
            <AquaBillDashboard />
            {/* <div className="space-y-8 p-6 md:p-8">
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className='flex flex-col gap-4'>
                        <h6>WaterLab Project Content</h6>
                        <p>{project.name}</p>
                        <p>{project.description}</p>
                    </div>
                </div>
            </div> */}
        </>
    );
}

