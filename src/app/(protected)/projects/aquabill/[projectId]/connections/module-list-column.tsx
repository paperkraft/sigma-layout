"use client";
import { MapPin, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { useMount } from '@/hooks/use-mount';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { CheckedState } from '@radix-ui/react-checkbox';

interface ConnectionProps {
    id: string;
    name: string;
    mobile: string;
    method?: string;
    size?: string;
    type?: string;
    zone?: string;
    zoneTag?: string;
    status?: string;
}

const CustomCheckbox = ({ checked, onCheckedChange }: { checked: CheckedState; onCheckedChange: (value: boolean) => void }) => (
    <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        aria-label="Select row"
        className={"mx-2 translate-y-0.5 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-0 border-gray-300 shadow-none"}
    />
);

export const ConnectionColumns = () => {

    const isMounted = useMount();
    const path = usePathname();

    const columns: ColumnDef<ConnectionProps>[] = useMemo(() => [
        {
            id: "select",
            header: ({ table }) => (
                <CustomCheckbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />


            ),
            cell: ({ row }) => (
                <CustomCheckbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
        },
        {
            accessorKey: "name",
            header: "Subscriber",
            enableExpanding: true,
            cell: ({ row }) => {
                const { name, mobile, id } = row.original;
                return (
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <div>
                                <span className="block font-semibold text-foreground text-sm">{name}</span>
                                <span className="block text-xs text-muted-foreground">{mobile}</span>
                            </div>
                        </div>
                        <div className="mt-2">
                            <span className="font-mono text-[10px] text-muted-foreground bg-secondary/50 border border-border px-1.5 py-0.5 rounded">
                                ID: {id}
                            </span>
                        </div>
                    </div>
                );
            }

        },
        {
            accessorKey: "method",
            header: "Configuration",
            cell: ({ row }) => {
                const { method, type, size } = row.original;
                return (
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between max-w-35">
                            <span className="text-xs text-muted-foreground">Method</span>
                            <span className="text-xs font-medium text-foreground bg-secondary/50 border border-border px-1.5 rounded">{method}</span>
                        </div>
                        <div className="flex items-center justify-between max-w-35">
                            <span className="text-xs text-muted-foreground">Type</span>
                            <span className="text-xs font-medium text-foreground">{type}</span>
                        </div>
                        <div className="flex items-center justify-between max-w-35 border-t border-border border-dashed pt-1 mt-1">
                            <span className="text-xs text-muted-foreground">Pipe Size</span>
                            <span className="text-xs font-bold text-foreground">{size}</span>
                        </div>
                    </div>
                )
            }
        },
        {
            accessorKey: "zone",
            header: "Zone",
            cell: ({ row }) => {
                const { zone, zoneTag } = row.original;
                return (
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center text-foreground font-medium">
                            <MapPin className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                            {zone}
                        </div>
                        <div className="ml-5">
                            <span className="text-[10px] bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded border border-blue-100 dark:border-blue-900/50">
                                {zoneTag}
                            </span>
                        </div>
                    </div>
                )
            }
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const { status } = row.original;
                const isActive = status === "Active";
                return (
                    <span
                        className={cn(
                            "text-xs font-medium px-2 py-0.5 rounded",
                            isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        )}
                    >
                        {status}
                    </span>
                )
            }
        }
    ], [path]);

    return isMounted ? { columns } : { columns: [] };
};