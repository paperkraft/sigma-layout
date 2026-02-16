"use client";
import { Activity, Hash, Mail, MapPin, Phone } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { Badge } from '@/components/shared/custom-badge';
import { CustomCheckbox } from '@/components/shared/custom-checkbox';
import { useMount } from '@/hooks/use-mount';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/shared/_data-table/data-table-header';

interface AllConnectionProps {
    id: string;
    appNo?: string;
    migrated?: boolean;
    firstName: string;
    middleName: string;
    lastName: string;
    mobile: string;
    email?: string;
    address?: string;
    billMethod?: string;
    billCycle?: string;
    connType?: string;
    connSize?: string;
    zone?: string;
    zoneTag?: string;
    status?: string;
    meterNo?: string | null;
    gisId?: string;
    dateCreated?: string;

}

export const AllConnectionReportColumns = () => {

    const isMounted = useMount();
    const path = usePathname();

    const columns: ColumnDef<AllConnectionProps>[] = useMemo(() => [
        {
            id: "select",
            size: 40,      // Default width
            minSize: 40,   // Prevent it from getting smaller
            maxSize: 40,   // Prevent it from getting larger
            enableResizing: false, // Optional: Stop user from dragging to resize this specific column
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
            accessorKey: "firstName",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
            cell: ({ row, table }) => {
                const { firstName, middleName, lastName, migrated, appNo, id } = row.original;
                const name = `${firstName} ${middleName} ${lastName}`;
                const currentDensity = table.getState()?.density;

                return (
                    <div className="flex flex-col">
                        <span className={cn("font-semibold text-foreground", currentDensity === "sm" ? "text-sm" : currentDensity === "md" ? "text-base" : "text-sm")}>
                            {name}
                        </span>
                        <div className='flex gap-1 items-center flex-wrap'>
                            <Badge variant="default">ID: {id}</Badge>
                            {migrated && <Badge variant="secondary">Migrated</Badge>}
                        </div>
                        <span className="text-xs text-muted-foreground mt-0.5">App No: {appNo}</span>
                    </div>
                );
            },
            meta: { title: "Customer" }

        },
        {
            accessorKey: "mobile",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Contact Info" />,
            cell: ({ row }) => {
                const { mobile, email } = row.original;
                return (
                    <div className="space-y-1">
                        <div className="flex items-center text-foreground">
                            <Phone className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                            {mobile}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                            <Mail className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                            {email}
                        </div>
                    </div>
                )
            },
            meta: { title: "Contact Info" }
        },
        {
            accessorKey: "billCycle",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Billing Config" />,
            cell: ({ row }) => {
                const { billCycle, connType } = row.original;
                return (
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground text-xs">Cycle:</span>
                            <span className="font-medium text-foreground">{billCycle}</span>
                        </div>
                        <div className="flex items-center justify-between border-t border-dashed border-border pt-1 mt-0.5">
                            <span className="text-muted-foreground text-xs">Type:</span>
                            <span className="font-medium text-foreground">{connType}</span>
                        </div>
                    </div>
                )
            },
            meta: { title: "Billing Config" }
        },
        {
            accessorKey: "meterNo",
            header: ({ column }) => <DataTableColumnHeader column={column} title="Technical Specs" />,
            cell: ({ row }) => {
                const { connSize, meterNo, gisId } = row.original;
                return (
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <Badge variant="default">{connSize}</Badge>
                            {meterNo ? (
                                <Badge variant="info">Metered</Badge>
                            ) : (
                                <Badge variant="warning">Flat</Badge>
                            )}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
                            <div className="flex items-center">
                                <Activity className="h-3 w-3 mr-1.5 opacity-50" />
                                Meter: <span className="text-foreground ml-1 font-mono">{meterNo || 'N/A'}</span>
                            </div>
                            <div className="flex items-center">
                                <Hash className="h-3 w-3 mr-1.5 opacity-50" />
                                GIS: <span className="text-foreground ml-1 font-mono">{gisId}</span>
                            </div>
                        </div>
                    </div>
                )
            },
            meta: { title: "Technical Specs" }
        },
        {
            accessorKey: "zone",
            enableSorting: false,
            header: ({ column }) => <DataTableColumnHeader column={column} title="Zone Info" />,
            cell: ({ row }) => {
                const { address, zone, zoneTag } = row.original;
                return (
                    <div className="flex flex-col">
                        <span className="font-medium text-foreground flex flex-wrap gap-0.5 items-center">
                            <MapPin className="size-3.5 mr-1.5 text-muted-foreground shrink-0" />
                            {zone}
                            <Badge variant="default" className='ml-1'>{zoneTag}</Badge>
                        </span>
                        <span className="text-xs text-muted-foreground ml-5 truncate" title={address}>{address}</span>
                    </div>
                )
            },
            meta: { title: "Zone Info" }
        },
        {
            accessorKey: "status",
            enableSorting: false,
            size: 70,
            minSize: 40,
            maxSize: 80,
            // enableResizing: false,
            header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
            cell: ({ row }) => {
                const { status } = row.original;
                return <Badge variant="success">{status}</Badge>
            },
            meta: { title: "Status" }
        }
    ], [path]);

    return isMounted ? { columns } : { columns: [] };
};