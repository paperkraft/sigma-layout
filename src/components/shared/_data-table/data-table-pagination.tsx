import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import SelectControl from '@/features/projects/aquabill/form-controls/select-control';
import { Table } from '@tanstack/react-table';

interface DataTablePaginationProps<TData> {
    table: Table<TData>
    pageSizeOptions?: number[]
}

export function DataTablePagination<TData>({ table, pageSizeOptions = [5, 10, 15, 20, 25, 50, 100] }: DataTablePaginationProps<TData>) {
    return (
        <div className="z-10 flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto py-2 px-4 sm:flex-row sm:gap-8 border-t shadow-[0_-4px_6px_rgba(0,0,0,0.05)]">
            <div className="text-xs select-none">
                {`Showing ${(table.getState().pagination.pageIndex * table.getState().pagination.pageSize) + 1} 
                    - ${Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getRowCount())} 
                    of ${table.getRowCount().toLocaleString()} records`}
            </div>

            <div className="hidden flex-1 whitespace-nowrap text-muted-foreground select-none text-xs">
                {table.getFilteredSelectedRowModel().rows.length} of&nbsp;
                {table.getFilteredRowModel().rows.length} row(s) selected
            </div>

            <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
                <div className="flex items-center space-x-2 select-none">
                    <p className="whitespace-nowrap text-xs">Rows per page</p>
                    <SelectControl
                        name="rows"
                        value={`${table.getState().pagination.pageSize}`}
                        onChange={(value) => { table.setPageSize(Number(value)) }}
                        options={pageSizeOptions.map((pageSize) => ({ label: pageSize.toString(), value: pageSize.toString() }))}
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        aria-label="Go to first page"
                        variant="outline"
                        size="icon-sm"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronsLeft aria-hidden="true" />
                    </Button>
                    <Button
                        aria-label="Go to previous page"
                        variant="outline"
                        size="icon-sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft aria-hidden="true" />
                    </Button>

                    <div className="flex items-center justify-center select-none text-xs">
                        Page {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </div>

                    <Button
                        aria-label="Go to next page"
                        variant="outline"
                        size="icon-sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronRight aria-hidden="true" />
                    </Button>
                    <Button
                        aria-label="Go to last page"
                        variant="outline"
                        size="icon-sm"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronsRight aria-hidden="true" />
                    </Button>
                </div>
            </div>
        </div>
    )
}