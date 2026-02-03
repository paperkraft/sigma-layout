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
                'cursor-pointer border-b hover:bg-muted [&_td]:px-4 [&_td]:py-2',
                isSelected && 'bg-primary-foreground'
            )}
        >
            <td className="flex items-center gap-2">
                <FolderOpen size={16} />
                {data.name}
            </td>
            <td className="text-right">
                <button
                    className='size-5'
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