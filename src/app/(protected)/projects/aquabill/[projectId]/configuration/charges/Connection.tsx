'use client'

import React, { useState, useMemo } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    ColumnDef,
    RowData
} from '@tanstack/react-table';
import { Save, Trash2, Plus, AlertCircle } from 'lucide-react';
import SelectControl from '@/features/projects/aquabill/form-controls/select-control';
import InputControl from '@/features/projects/aquabill/form-controls/input-control';

// --- Types ---
interface ChargeRow {
    id: string;
    connectionSize: string;
    installationCharge: string;
    securityDeposit: string;
    disconnectionCharge: string;
    reconnectionCharge: string;
}

// Extend TanStack Table meta to include our update handler
declare module '@tanstack/react-table' {
    interface TableMeta<TData extends RowData> {
        updateData: (rowIndex: number, columnId: string, value: string) => void
    }
}

export default function ConnectionCharges() {
    // --- State ---
    const [billingMethod, setBillingMethod] = useState('');
    const [connectionType, setConnectionType] = useState('');
    const [rowSelection, setRowSelection] = useState({});

    // Initial Dummy Data
    const [data, setData] = useState<ChargeRow[]>([
        { id: '1', connectionSize: '0.5', installationCharge: '1500', securityDeposit: '500', disconnectionCharge: '100', reconnectionCharge: '200' },
        { id: '2', connectionSize: '1.0', installationCharge: '2500', securityDeposit: '1000', disconnectionCharge: '150', reconnectionCharge: '300' },
    ]);

    const sizeOptions = [
        { label: '0.5 Inch', value: '0.5' },
        { label: '0.75 Inch', value: '0.75' },
        { label: '1.0 Inch', value: '1.0' },
        { label: '1.5 Inch', value: '1.5' },
        { label: '2.0 Inch', value: '2.0' },
    ];

    const billingMethodOptions = [
        { label: 'Flat', value: 'Flat' },
        { label: 'Meter', value: 'Meter' },
    ];

    const connectionOptions = [
        { label: 'Domestic', value: 'Domestic' },
        { label: 'Commercial', value: 'Commercial' },
        { label: 'Industrial', value: 'Industrial' },
        { label: 'Institutional', value: 'Institutional' },
    ];

    // --- Table Configuration ---

    // 1. Column Definitions
    const columns = useMemo<ColumnDef<ChargeRow>[]>(() => [
        {
            id: 'select',
            header: ({ table }) => (
                <div className="flex justify-center">
                    <input
                        type="checkbox"
                        checked={table.getIsAllRowsSelected()}
                        onChange={table.getToggleAllRowsSelectedHandler()}
                        className="rounded border-input bg-background text-primary focus:ring-primary transition-all cursor-pointer h-4 w-4"
                    />
                </div>
            ),
            cell: ({ row }) => (
                <div className="flex justify-center">
                    <input
                        type="checkbox"
                        checked={row.getIsSelected()}
                        disabled={!row.getCanSelect()}
                        onChange={row.getToggleSelectedHandler()}
                        className="rounded border-input bg-background text-primary focus:ring-primary transition-all cursor-pointer h-4 w-4"
                    />
                </div>
            ),
            size: 50,
        },
        {
            accessorKey: 'connectionSize',
            header: 'Connection Size',
            cell: ({ getValue, row, column, table }) => (
                <SelectControl
                    name='type'
                    value={getValue()}
                    onChange={(val) => table.options.meta?.updateData(row.index, column.id, val)}
                    options={sizeOptions}
                    placeholder="Select Size"
                />
            ),
        },
        {
            accessorKey: 'installationCharge',
            header: () => (
                <div className="text-center">
                    Installation Charges
                    <div className="text-[10px] font-normal mt-0.5 text-muted-foreground/70">(₹) One-time</div>
                </div>
            ),
            cell: ({ getValue, row, column, table }) => (
                <InputControl name={row.id} type='number' currency value={getValue()} onChange={(val: string) => table.options.meta?.updateData(row.index, column.id, val)} />
            ),
        },
        {
            accessorKey: 'securityDeposit',
            header: () => (
                <div className="text-center">
                    Security Deposit
                    <div className="text-[10px] font-normal mt-0.5 text-muted-foreground/70">(₹) Refundable</div>
                </div>
            ),
            cell: ({ getValue, row, column, table }) => (
                <InputControl name={row.id} type='number' currency value={getValue()} onChange={(val: string) => table.options.meta?.updateData(row.index, column.id, val)} />
            ),
        },
        {
            accessorKey: 'disconnectionCharge',
            header: () => (
                <div className="text-center">
                    Dis-Connection
                    <div className="text-[10px] font-normal mt-0.5 text-muted-foreground/70">(₹) Penalty</div>
                </div>
            ),
            cell: ({ getValue, row, column, table }) => (
                <InputControl name={row.id} type='number' currency value={getValue()} onChange={(val: string) => table.options.meta?.updateData(row.index, column.id, val)} />
            ),
        },
        {
            accessorKey: 'reconnectionCharge',
            header: () => (
                <div className="text-center">
                    Re-Connection
                    <div className="text-[10px] font-normal mt-0.5 text-muted-foreground/70">(₹) Fee</div>
                </div>
            ),
            cell: ({ getValue, row, column, table }) => (
                <InputControl name={row.id} type='number' currency value={getValue()} onChange={(val: string) => table.options.meta?.updateData(row.index, column.id, val)} />
            ),
        },
    ], []);

    // 2. Table Instance
    const table = useReactTable({
        data,
        columns,
        state: {
            rowSelection,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getRowId: (row) => row.id, // Use our ID instead of index
        meta: {
            updateData: (rowIndex, columnId, value) => {
                setData((old) =>
                    old.map((row, index) => {
                        if (index === rowIndex) {
                            return {
                                ...old[rowIndex]!,
                                [columnId]: value,
                            }
                        }
                        return row
                    })
                )
            },
        },
    });

    // --- Handlers ---

    const handleAddRow = () => {
        const newId = Date.now().toString();
        setData([...data, {
            id: newId,
            connectionSize: '',
            installationCharge: '',
            securityDeposit: '',
            disconnectionCharge: '',
            reconnectionCharge: ''
        }]);
    };

    const handleDeleteSelected = () => {
        // Filter out rows where ID exists in rowSelection keys
        const selectedIds = Object.keys(rowSelection);
        if (selectedIds.length === 0) return;

        setData(data.filter(row => !rowSelection[row.id as keyof typeof rowSelection]));
        setRowSelection({}); // Clear selection after delete
    };

    const selectedCount = Object.keys(rowSelection).length;

    return (
        <div className="p-6 md:p-8 space-y-4 animate-in fade-in duration-500">

            {/* 1. Header */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Connection Charges</h1>
                <p className="text-muted-foreground text-sm mt-1">Configure one-time charges for new connections, disconnections, and reconnections.</p>
            </div>

            {/* 2. Context Selectors */}
            <div className="flex flex-wrap gap-6 p-5 bg-card border border-border rounded-lg items-end shadow-md">
                <SelectControl
                    name='method'
                    label='Billing Method'
                    value={billingMethod}
                    onChange={setBillingMethod}
                    options={billingMethodOptions}
                    className='sm:w-48'
                />
                <SelectControl
                    name='type'
                    label='Connection Type'
                    value={connectionType}
                    onChange={setConnectionType}
                    options={connectionOptions}
                    className='sm:w-48'
                />
            </div>

            {/* 3. Actions Toolbar */}
            <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                    <button
                        onClick={handleDeleteSelected}
                        disabled={selectedCount === 0}
                        className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${selectedCount > 0 ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30' : 'text-muted-foreground/50 cursor-not-allowed'}`}
                    >
                        <Trash2 className="w-4 h-4" /> Delete ({selectedCount})
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-all">
                        <Save className="w-4 h-4" /> Save Configuration
                    </button>
                </div>
            </div>

            {/* 4. Data Table (TanStack Powered) */}
            <div className="bg-card border border-border rounded-lg overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse min-w-250">
                        <thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id} className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                                    {headerGroup.headers.map(header => (
                                        <th key={header.id} className={`p-4 ${header.id === 'select' ? 'w-12' : 'w-48'} border-r border-border last:border-r-0 ${
                                            // Apply striped background logic to headers if needed, matching cells below
                                            ['installationCharge', 'disconnectionCharge'].includes(header.id) ? 'bg-muted/30' : ''
                                            }`}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="divide-y divide-border">
                            {table.getRowModel().rows.length > 0 ? (
                                table.getRowModel().rows.map(row => (
                                    <tr key={row.id} className={`group transition-colors ${row.getIsSelected() ? 'bg-primary/5' : 'hover:bg-muted/30'}`}>
                                        {row.getVisibleCells().map(cell => (
                                            <td
                                                key={cell.id}
                                                className={`p-3 border-r border-border last:border-r-0 ${
                                                    // Apply striped background to specific data columns for visual grouping
                                                    ['installationCharge', 'disconnectionCharge'].includes(cell.column.id) ? 'bg-muted/10' : ''
                                                    }`}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length} className="p-8 text-center text-muted-foreground">
                                        No charges configured. Add a row below to start.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* 5. Footer Actions */}
                <div className="p-4 border-t border-border bg-muted/20 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-100 dark:border-amber-900/30">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Security deposits are refundable upon permanent disconnection.</span>
                    </div>
                    <button
                        onClick={handleAddRow}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary bg-primary/5 hover:bg-primary/10 rounded-lg border border-primary/20 transition-all active:scale-95"
                    >
                        <Plus className="w-4 h-4" /> Add Charge Row
                    </button>
                </div>

            </div>
        </div>
    );
}