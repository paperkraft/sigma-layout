import { Metadata } from "next";

export interface ProjectMetadata {
    id: string;
    type: string;
    name: string;
    description?: string;
    lastModified: string;
}

export const DUMMY_PROJECTS: ProjectMetadata[] = [
    {
        id: "proj-1",
        type: "waterlab",
        name: "Water Network Analysis",
        description: "Urban water distribution modeling",
        lastModified: '1/24/2026',
    },
    {
        id: "proj-2",
        type: "aquabill",
        name: "City Water Billing",
        description: "Water Billing for area",
        lastModified: '1/24/2026',
    },
    {
        id: "proj-3",
        type: "waterlab",
        name: "EPANET Simulation",
        description: "Hydraulic simulation project",
        lastModified: '1/24/2026',
    },
    {
        id: "proj-4",
        type: "aquabill",
        name: "Villlage Water Billing",
        description: "Monitoring utilities and assets",
        lastModified: '1/24/2026',
    },
];


export async function getProjectMetadata(
    params: Promise<{ projectId: string }>,
    type: "waterlab" | "aquabill"
): Promise<Metadata> {
    const { projectId } = await params;

    const project = DUMMY_PROJECTS.find(
        (p) => p.type === type && p.id === projectId
    );

    return project
        ? { title: project.name, description: project.description }
        : { title: "Project Not Found" };
}
