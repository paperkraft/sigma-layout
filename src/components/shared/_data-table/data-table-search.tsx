import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataTableSearchProps<TData> {
    table: Table<TData>;
    reset?: () => void;
}

export function DataTableSearch<TData>({ table, reset }: DataTableSearchProps<TData>) {

    const globalFilter = table.getState().globalFilter ?? "";

    const handleReset = () => {
        reset?.();
        table.resetGlobalFilter();
    }

    return (
        <div className="relative w-full max-w-sm p-1">
            <span className="absolute left-3 top-3.5 text-muted-foreground text-sm"><Search size={16} /></span>
            <Input
                className="pl-8"
                placeholder="Search"
                value={globalFilter}
                onChange={e => table.setGlobalFilter(String(e.target.value))}
            />
            {
                globalFilter?.length > 0 &&
                <X onClick={handleReset}
                    className={cn("opacity-50 hover:opacity-100 size-7 absolute top-[50%] right-1 -translate-y-1/2 px-1.5 font-normal cursor-pointer")}
                />
            }
        </div>
    )
}