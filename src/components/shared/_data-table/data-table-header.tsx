"use client"

import {
    ArrowDownIcon, ArrowUpDown, ArrowUpIcon, EyeOff, Pin, PinOff, RefreshCcw
} from 'lucide-react';

import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Column } from '@tanstack/react-table';

interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>
    title: string
}

export function DataTableColumnHeader<TData, TValue>({
    column,
    title,
    className,
}: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort() && !column.getCanHide() && !column.getCanPin()) {
        return <div className={cn(className)}>{title}</div>
    }

    const isPinned = column.getIsPinned();

    return (
        <div className={cn(className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div
                        className={cn("cursor-pointer flex items-center gap-1 text-xs select-none",
                            isPinned ? "md:flex-wrap lg:flex-nowrap" : "flex-wrap lg:flex-nowrap",
                            "group-data-[state=open]:bg-accent rounded-sm px-1.5 py-1 -ml-1",
                            "font-semibold text-muted-foreground uppercase tracking-wider",
                            "hover:text-foreground data-[state=open]:text-foreground",
                            "[&_svg]:shrink-0 [&_svg]:size-3 [&_svg]:ml-0.5",
                        )}
                    >
                        <span>{title}</span>
                        {column.getCanSort() && (
                            column.getIsSorted() === "desc" ? (
                                <ArrowDownIcon />
                            ) : column.getIsSorted() === "asc" ? (
                                <ArrowUpIcon />
                            ) : (
                                !isPinned && <ArrowUpDown />
                            )
                        )}
                        {/* Show visual indicator if pinned */}
                        {isPinned && <Pin className="rotate-45 text-muted-foreground/70" />}
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="[&_svg]:text-muted-foreground/70 [&_svg]:mr-1">

                    {/* SORTING OPTIONS */}
                    {column.getCanSort() && (
                        <>
                            <DropdownMenuItem onClick={() => column.toggleSorting(false)} disabled={column.getIsSorted() === "asc"}>
                                <ArrowUpIcon /> Asc
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => column.toggleSorting(true)} disabled={column.getIsSorted() === "desc"}>
                                <ArrowDownIcon /> Desc
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                        </>
                    )}

                    {column.getIsSorted() && (
                        <>
                            <DropdownMenuItem onClick={() => column.clearSorting()}>
                                <RefreshCcw /> Reset
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                        </>
                    )}

                    {/* PINNING OPTIONS */}
                    {column.getCanPin() && (
                        <>
                            {isPinned !== "left" && (
                                <DropdownMenuItem onClick={() => column.pin("left")}>
                                    <Pin /> Pin Left
                                </DropdownMenuItem>
                            )}
                            {isPinned !== "right" && (
                                <DropdownMenuItem onClick={() => column.pin("right")}>
                                    <Pin /> Pin Right
                                </DropdownMenuItem>
                            )}
                            {isPinned && (
                                <DropdownMenuItem onClick={() => column.pin(false)}>
                                    <PinOff /> Unpin
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                        </>
                    )}

                    {/* VISIBILITY OPTIONS */}
                    <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                        <EyeOff /> Hide
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}