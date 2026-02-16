"use client"

import { Filter, FilterX, PencilLine, RefreshCcw, Table2 } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Table } from '@tanstack/react-table';

import DeleteRecordDialog from './data-table-delete';
import { DataTableExport } from './data-table-export';
import { DataTableSearch } from './data-table-search';
import { DensityState } from './data-table';
import { DataTableViewOptions } from './data-table-view-options';

const ALLOWED_TOOLBARS = ["export", "density", "columns"] as const;
export type ToolbarOptions = (typeof ALLOWED_TOOLBARS)[number];

interface DataTableToolbarProps<TData>
    extends React.HTMLAttributes<HTMLDivElement> {
    table: Table<TData>;
    deleteRecord?: (id: number | number[]) => Promise<void>;
    toolbar?: ToolbarOptions[];
    children?: React.ReactNode;
    setShowFilters?: React.Dispatch<React.SetStateAction<boolean>>;
    showFilters?: boolean;
    density?: DensityState;
    onDensityChange?: (density: DensityState) => void;
}

export function DataTableToolbar<TData>({ children, table, deleteRecord, density, onDensityChange, toolbar = [], showFilters, setShowFilters }: DataTableToolbarProps<TData>) {

    const isSelectionEnabled =
        !!table.options.enableRowSelection &&
        table.getAllColumns().some(col => col.id === "select");

    const hasSelectedRows = table.getSelectedRowModel().rows.length > 0;

    const toggleDensity = () => {
        const currentDensity = density;
        const nextDensity = currentDensity === "md" ? "sm" : "md";
        onDensityChange?.(nextDensity);
    }

    const toggleFilters = () => {
        setShowFilters && setShowFilters((prev) => !prev);
    }

    return (
        <>
            <div className="flex flex-col p-4 pb-1 gap-2 border-b">
                {showFilters && children}

                <div className="flex items-center gap-1 justify-between">
                    {hasSelectedRows && (
                        <div className="flex items-center gap-2">
                            <DeleteRecordDialog table={table} deleteRecord={deleteRecord} />
                            {table.getFilteredSelectedRowModel().rows.length === 1 && <Button variant="outline" size="sm"><PencilLine /> Edit</Button>}
                        </div>
                    )}

                    {isSelectionEnabled && !hasSelectedRows && <span className="text-xs text-muted-foreground italic pl-1">Select rows to perform bulk actions</span>}

                    <div className="flex items-center gap-1 justify-end">
                        <DataTableSearch table={table} />
                        <Button variant="ghost" size="sm" onClick={toggleFilters} aria-label="toggle filters" className="text-muted-foreground text-xs">
                            {showFilters ? <FilterX /> : <Filter />}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={toggleDensity} aria-label="toggle density" className="text-muted-foreground text-xs">
                            <Table2 />
                        </Button>
                        <DataTableViewOptions table={table} />
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-2">
                    {toolbar.includes("export") && <DataTableExport table={table} />}
                </div>
            </div>
        </>
    )
}