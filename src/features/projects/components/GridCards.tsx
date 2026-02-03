import CustomToolTip from "@/components/shared/CustomToolTip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Clock, ExternalLink, FolderOpen, GitFork, ReceiptIndianRupee, Tangent } from "lucide-react";

const PROJECT_STYLES: any = {
    aquabill: {
        base: "bg-green-100 text-green-600",
        selected: "bg-green-600 text-background",
    },
    waterlab: {
        base: "bg-primary-foreground text-primary",
        selected: "bg-primary text-primary-foreground",
    },
} as const;


export function GridCard({ data, type, onClick, isSelected, openProject }: any) {
    const styles = PROJECT_STYLES[type];
    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
            className={cn(
                'bg-background rounded-md border cursor-pointer transition-all p-4 overflow-hidden',
                isSelected
                    ? 'ring-2 ring-primary shadow-md'
                    : 'hover:border-primary/50'
            )}
        >
            <div className="flex justify-between mb-3">
                <div
                    className={cn("size-10 rounded flex items-center justify-center transition-colors",
                        isSelected ? styles.selected : styles.base
                    )}
                >
                    {type === 'aquabill' ? <ReceiptIndianRupee size={18} /> : <GitFork size={18} />}
                </div>

                {isSelected && (
                    <CustomToolTip tooltip="Open">
                        <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={(e: any) => {
                                e.stopPropagation();
                                openProject();
                            }}
                        >
                            <ExternalLink size={14} />
                        </Button>
                    </CustomToolTip>
                )}
            </div>

            <h3 className="text-sm font-semibold truncate">{data.name}</h3>
            <div className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
                <Clock size={12} />
                {data.lastModified}
            </div>
        </div>
    );
}