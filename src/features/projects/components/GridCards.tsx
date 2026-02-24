import React, { memo, useCallback } from "react";
import CustomToolTip from "@/components/shared/custom-tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Clock, ExternalLink, FileText, GitFork } from "lucide-react";
import Link from "next/link";
import { ProjectMetadata } from "@/config/project_dummy";

interface ProjectStyles {
    base: string;
    selected: string;
}

const PROJECT_STYLES: Record<string, ProjectStyles> = {
    aquabill: {
        base: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        selected: "bg-green-600 text-white dark:bg-green-600 dark:text-white",
    },
    waterlab: {
        base: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        selected: "bg-blue-600 text-white dark:bg-blue-600 dark:text-white",
    },
};

export interface GridCardProps {
    data: ProjectMetadata;
    type: string;
    onClick: () => void;
    isSelected: boolean;
    projectUrl: string;
}

export const GridCard = memo(function GridCard({ data, type, onClick, isSelected, projectUrl }: GridCardProps) {
    const styles = PROJECT_STYLES[type] || PROJECT_STYLES.aquabill;

    const handleCardClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        onClick();
    }, [onClick]);

    const handleButtonClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
    }, []);

    return (
        <div
            onClick={handleCardClick}
            className={cn(
                'bg-card rounded-xl border border-border cursor-pointer transition-all p-4 overflow-hidden relative group',
                isSelected
                    ? 'ring-2 ring-primary shadow-lg scale-[1.02]'
                    : 'hover:border-primary/50 hover:shadow-md'
            )}
        >
            <div className="flex justify-between mb-4">
                <div
                    className={cn("size-10 rounded-lg flex items-center justify-center transition-colors shadow-sm",
                        isSelected ? styles.selected : styles.base
                    )}
                >
                    {type === 'aquabill' ? <FileText size={20} /> : <GitFork size={20} />}
                </div>

                <div className={cn("transition-opacity duration-200", isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100")} onClick={handleButtonClick}>
                    <CustomToolTip tooltip="Open Project">
                        <Button
                            asChild
                            variant="ghost"
                            size="icon-sm"
                            className="size-8 hover:bg-muted text-muted-foreground hover:text-foreground"
                        >
                            <Link href={projectUrl}>
                                <ExternalLink size={16} />
                            </Link>
                        </Button>
                    </CustomToolTip>
                </div>
            </div>

            <h3 className="text-sm font-semibold truncate text-foreground mb-1">{data.name}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2 min-h-[2.5em] mb-3">{data.description || "No description provided."}</p>

            <div className="text-[10px] text-muted-foreground pt-3 border-t border-border flex items-center gap-1.5 font-medium">
                <Clock size={10} />
                Last modified: {data.lastModified}
            </div>
        </div>
    );
}, (prevProps, nextProps) => {
    return (
        prevProps.isSelected === nextProps.isSelected &&
        prevProps.projectUrl === nextProps.projectUrl &&
        prevProps.type === nextProps.type &&
        prevProps.data.id === nextProps.data.id &&
        prevProps.data.name === nextProps.data.name &&
        prevProps.data.description === nextProps.data.description &&
        prevProps.data.lastModified === nextProps.data.lastModified
    );
});