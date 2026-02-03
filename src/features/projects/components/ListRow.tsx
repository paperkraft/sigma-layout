import { cn } from "@/lib/utils";
import { ExternalLink, FolderOpen } from "lucide-react";

export function ListRow({ data, onClick, isSelected, openProject }: any) {
    return (
        <tr
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
            className={cn(
                'cursor-pointer border-b border-border transition-colors [&_td]:px-4 [&_td]:py-3',
                isSelected
                    ? 'bg-muted/60'
                    : 'bg-card hover:bg-muted/30'
            )}
        >
            <td className="w-full">
                <div className="flex items-center gap-3">
                    <div className={cn(
                        "p-1.5 rounded-md",
                        isSelected ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                    )}>
                        <FolderOpen size={16} />
                    </div>
                    <div className="flex flex-col">
                        <span className={cn("text-sm font-medium", isSelected ? "text-primary" : "text-foreground")}>
                            {data.name}
                        </span>
                        <span className="text-xs text-muted-foreground block md:hidden">
                            {data.lastModified}
                        </span>
                    </div>
                </div>
            </td>
            <td className="text-right hidden md:table-cell text-xs text-muted-foreground whitespace-nowrap">
                {data.lastModified}
            </td>
            <td className="text-right">
                <button
                    className='p-1.5 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors'
                    onClick={(e: any) => {
                        e.stopPropagation();
                        openProject();
                    }}
                >
                    <ExternalLink size={16} />
                </button>
            </td>
        </tr>
    );
}