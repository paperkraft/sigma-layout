"use client";

import React, { useEffect, useState } from 'react';

import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import {
    Column, ColumnDef, ColumnPinningState, flexRender, getCoreRowModel, getFilteredRowModel,
    getPaginationRowModel, getSortedRowModel, PaginationState, SortingState, useReactTable,
    VisibilityState
} from '@tanstack/react-table';

import { DataTablePagination } from './data-table-pagination';
import { DataTableToolbar, ToolbarOptions } from './data-table-toolbar';

// Define density locally to avoid external dependency
export type DensityState = "sm" | "md" | "lg";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    // Optional props
    toolbar?: ToolbarOptions[];
    pageSize?: number;
    isLoading?: boolean;
    searchKey?: string; // Key to filter by default (e.g., "email" or "name")
    deleteRecord?: (id: number | number[]) => Promise<void>;
    children?: React.ReactNode;
    className?: string;
    // Configuration
    initialPinning?: {
        left?: string[];
        right?: string[];
    };
}

export function DataTable<TData, TValue>({
    columns,
    data,
    toolbar,
    pageSize,
    isLoading = false,
    searchKey,
    deleteRecord,
    children,
    className,
    initialPinning = { left: [], right: [] },
}: DataTableProps<TData, TValue>) {
    // State
    const [isMounted, setIsMounted] = useState(false);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState<string>("");
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [columnPinning, setColumnPinning] = useState<ColumnPinningState>(initialPinning);
    const [density, setDensity] = useState<DensityState>("md");
    const [showFilters, setShowFilters] = useState(false);

    // Pagination State
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: pageSize ?? 10,
    });

    // Hydration fix
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            pagination,
            globalFilter,
            columnVisibility,
            rowSelection,
            columnPinning,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        onColumnVisibilityChange: setColumnVisibility,
        onColumnPinningChange: setColumnPinning,
        onPaginationChange: setPagination,

        // Core models
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),

        // Global Filter Logic (Generic)
        globalFilterFn: (row, _columnId, filterValue: string) => {
            if (!filterValue) return true;
            const search = String(filterValue).toLowerCase().trim();

            // If a specific searchKey is provided, only search that column
            if (searchKey) {
                const value = row.getValue(searchKey);
                return String(value).toLowerCase().includes(search);
            }

            // Otherwise search all columns
            return Object.values(row.original as Record<string, any>)
                .filter(Boolean)
                .map((val) => String(val).toLowerCase())
                .some((val) => val.includes(search));
        },
    });

    if (!isMounted) return null;

    return (
        <div className={cn("rounded-md border bg-card relative flex flex-col overflow-hidden", className)}>
            {isLoading ? (
                <TableLoadingState density={density} />
            ) : (
                <div className={cn("overflow-auto flex-1 flex flex-col")}>
                    <DataTableToolbar
                        table={table}
                        toolbar={toolbar}
                        density={density}
                        showFilters={showFilters}
                        deleteRecord={deleteRecord}
                        onDensityChange={setDensity}
                        setShowFilters={setShowFilters}
                    >
                        {children}
                    </DataTableToolbar>

                    <Table className="border-collapse table-fixed w-full">
                        <TableHeader className="bg-muted sticky top-0 z-20 shadow-sm">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            style={getPinningStyles(header.column)}
                                            className={cn(
                                                "transition-all whitespace-nowrap group",
                                                getDensityPadding(density),
                                                header.column.getIsPinned() && "bg-muted font-bold"
                                            )}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        className="group"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                style={getPinningStyles(cell.column)}
                                                className={cn(
                                                    "transition-all truncate",
                                                    getDensityPadding(density),
                                                    // Pinning styles
                                                    cell.column.getIsPinned() && "bg-card group-hover:bg-muted",
                                                    row.getIsSelected() && cell.column.getIsPinned() && "bg-muted"
                                                )}
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center text-muted-foreground"
                                    >
                                        No results found.
                                    </TableCell>
                                </TableRow>
                            )}
                            {/* Filler rows to maintain height if needed */}
                            {/* {table.getPageCount() > 0 && table.getRowModel().rows.length < pagination.pageSize && (
                                <EmptyRows
                                    count={pagination.pageSize - table.getRowModel().rows.length}
                                    colSpan={columns.length}
                                    density={density}
                                />
                            )} */}
                        </TableBody>
                    </Table>
                    {pageSize && <div className='mt-auto'><DataTablePagination table={table} /></div>}
                </div>
            )}
        </div>
    );
}

// --- Helper Components & Functions ---

function TableLoadingState({ density }: { density: DensityState }) {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <div className={cn("animate-pulse flex flex-col gap-2 items-center")}>
                <div className="h-4 w-32 bg-muted rounded"></div>
                <div className="text-xs">Loading data...</div>
            </div>
        </div>
    );
}

function EmptyRows({ count, colSpan, density }: { count: number, colSpan: number, density: DensityState }) {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <TableRow key={`empty-${index}`} className="invisible border-none hover:bg-transparent">
                    <TableCell
                        colSpan={colSpan}
                        className={getDensityPadding(density)}
                    >
                        &nbsp;
                    </TableCell>
                </TableRow>
            ))}
        </>
    )
}

function getDensityPadding(density: DensityState) {
    switch (density) {
        case "sm": return "py-1 px-3 text-xs h-8";
        case "lg": return "py-3 px-4 text-base h-16";
        case "md":
        default: return "py-2 px-4 text-sm h-12";
    }
}

function getPinningStyles(column: Column<any>): React.CSSProperties {
    const isPinned = column.getIsPinned();
    if (!isPinned) {
        return {
            width: column.getSize(),
        };
    }

    const isLastLeft = column.getIsLastColumn("left");
    const isFirstRight = column.getIsFirstColumn("right");

    return {
        boxShadow: isLastLeft
            ? "-4px 0 4px -4px gray inset" // Inset shadow is cleaner for tables
            : isFirstRight
                ? "4px 0 4px -4px gray inset"
                : undefined,
        left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
        right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
        opacity: 1,
        position: "sticky",
        width: column.getSize(),
        zIndex: isPinned ? 10 : 0,
    };
}