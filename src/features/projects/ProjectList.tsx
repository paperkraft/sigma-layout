'use client';

import { Info, LayoutGrid, List, Plus, Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

import { FormInput } from '@/components/form-controls/FormInput';
import { Button } from '@/components/ui/button';
import { DUMMY_PROJECTS, ProjectMetadata } from '@/config/project_dummy';
import { cn } from '@/lib/utils';

import { GridCard } from './components/GridCards';
import { ListRow } from './components/ListRow';
import { RightPanel } from './components/RightPanel';

export const ProjectList = () => {
    const router = useRouter();

    const [projects] = useState<ProjectMetadata[]>(DUMMY_PROJECTS);
    const [loading] = useState(false);

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [viewPanel, setViewPanel] = useState(true);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [features, setFeatures] = useState<string[]>([]);
    const [loadingThumbnail, setLoadingThumbnail] = useState(false);

    const activeProject = projects.find((p) => p.id === selectedId);

    useEffect(() => {
        if (!selectedId) {
            setFeatures([]);
            return;
        }

        setLoadingThumbnail(true);

        const timer = setTimeout(() => {
            setFeatures([
                'Pipe Network',
                'Junctions',
                'Valves',
                'Hydraulic Simulation',
            ]);
            setLoadingThumbnail(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [selectedId]);

    const handleOpenProject = useCallback(({ type, id }: { type: string, id: string }) => {
        if (type == 'aquabill') {
            router.replace(`/projects/${type}/${id}/dashboard`);
        } else {
            router.replace(`/projects/${type}/${id}`);
        }

    }, []);

    const filteredProjects = projects.filter((p) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase().trim();
        return (
            p.name.toLowerCase().includes(q) ||
            p.description?.toLowerCase().includes(q)
        );
    });

    return (
        <div className="flex h-full">
            <div className="flex-1 flex flex-col min-w-0 z-0 p-6 md:p-8 space-y-4" onClick={() => setSelectedId(null)}>
                {/* HEADER & ACTIONS */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Projects</h1>
                        <p className="text-muted-foreground text-sm mt-1">Manage your projects</p>
                    </div>
                    <Button><Plus size={16} className="mr-1" />New Project</Button>
                </div>

                <div className='flex gap-2 items-center justify-end'>
                    <div className="relative w-full md:w-64">
                        <FormInput
                            label=""
                            type="text"
                            value={searchQuery}
                            onChange={setSearchQuery}
                            placeholder="Search projects..."
                            className="bg-background"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground hover:bg-muted p-0.5 rounded-full"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>

                    <div className="flex bg-muted p-1 rounded border border-border">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={cn(
                                'p-1.5 rounded transition-colors',
                                viewMode === 'grid'
                                    ? 'bg-background text-primary shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground'
                            )}
                        >
                            <LayoutGrid size={16} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={cn(
                                'p-1.5 rounded transition-colors',
                                viewMode === 'list'
                                    ? 'bg-background text-primary shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground'
                            )}
                        >
                            <List size={16} />
                        </button>
                    </div>

                    {!viewPanel && (
                        <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                setViewPanel(true);
                            }}
                        >
                            <Info size={16} className='text-muted-foreground' />
                        </Button>
                    )}
                </div>

                {/* CONTENT */}
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="flex-1 overflow-y-auto p-2">
                        {!loading && filteredProjects.length === 0 && (
                            <div className="text-center py-20">
                                <Search className="mx-auto text-muted-foreground/50 mb-3" />
                                <p className="text-sm text-muted-foreground">
                                    No projects match "{searchQuery}"
                                </p>
                            </div>
                        )}

                        {viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {filteredProjects.map((p) => (
                                    <GridCard
                                        key={p.id}
                                        data={p}
                                        type={p.type}
                                        isSelected={selectedId === p.id}
                                        onClick={() => setSelectedId(p.id)}
                                        openProject={() => handleOpenProject({ type: p.type, id: p.id })}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-md border border-border overflow-hidden">
                                <table className="w-full text-sm">
                                    <tbody>
                                        {filteredProjects.map((p) => (
                                            <ListRow
                                                key={p.id}
                                                data={p}
                                                type={p.type}
                                                isSelected={selectedId === p.id}
                                                onClick={() => setSelectedId(p.id)}
                                                openProject={() => handleOpenProject({ type: p.type, id: p.id })}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {viewPanel && (
                <RightPanel
                    loadingThumbnail={loadingThumbnail}
                    features={features}
                    activeProject={activeProject}
                    handleClose={() => setViewPanel(false)}
                />
            )}
        </div>
    );
};

export default ProjectList;