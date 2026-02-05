'use client'

import React, { useState } from 'react';
import { Save, Trash2, Plus, ChevronDown, AlertCircle, Search } from 'lucide-react';

// --- Types ---
interface MeterRentRow {
    id: string;
    selected: boolean;
    billingCycle: string;
    connectionType: string;
    rentAmount: string;
}

// --- Sub-Components ---

const SelectInput = ({ value, onChange, options, placeholder }: any) => (
    <div className="relative w-full">
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full appearance-none bg-background border border-input text-foreground text-sm rounded-lg pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
        >
            <option value="" disabled>{placeholder}</option>
            {options.map((opt: string) => (
                <option key={opt} value={opt}>{opt}</option>
            ))}
        </select>
        <div className="absolute right-3 top-2.5 pointer-events-none text-muted-foreground">
            <ChevronDown className="h-4 w-4" />
        </div>
    </div>
);

const CurrencyInput = ({ value, onChange, placeholder = "0" }: any) => (
    <div className="relative w-full">
        <span className="absolute left-3 top-2 text-muted-foreground text-sm">₹</span>
        <input
            type="number"
            min="0"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-8 pr-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
            placeholder={placeholder}
        />
    </div>
);

export default function MeterRentScreen() {
    // --- State ---
    const [filterCycle, setFilterCycle] = useState('All');
    const [filterType, setFilterType] = useState('All');

    const [rows, setRows] = useState<MeterRentRow[]>([
        { id: '1', selected: false, billingCycle: 'Monthly', connectionType: 'Domestic', rentAmount: '10' },
        { id: '2', selected: false, billingCycle: 'Monthly', connectionType: 'Commercial', rentAmount: '25' },
    ]);

    // --- Handlers ---
    const handleAddRow = () => {
        const newId = Date.now().toString();
        setRows([...rows, {
            id: newId,
            selected: false,
            billingCycle: 'Monthly',
            connectionType: 'Domestic',
            rentAmount: ''
        }]);
    };

    const handleUpdateRow = (id: string, field: keyof MeterRentRow, value: any) => {
        setRows(rows.map(row => row.id === id ? { ...row, [field]: value } : row));
    };

    const toggleSelectRow = (id: string) => {
        setRows(rows.map(row => row.id === id ? { ...row, selected: !row.selected } : row));
    };

    const toggleSelectAll = (checked: boolean) => {
        setRows(rows.map(row => ({ ...row, selected: checked })));
    };

    const handleDeleteSelected = () => {
        setRows(rows.filter(row => !row.selected));
    };

    // --- Derived State ---
    const selectedCount = rows.filter(r => r.selected).length;
    const allSelected = rows.length > 0 && selectedCount === rows.length;

    const cycleOptions = ['Monthly', 'Quarterly', 'Yearly'];
    const typeOptions = ['Domestic', 'Commercial', 'Industrial', 'Institutional'];

    return (
        <div className="p-6 md:p-8 space-y-8 animate-in fade-in duration-500">

            {/* 1. Header */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Meter Rent Configuration</h1>
                <p className="text-muted-foreground text-sm mt-1">Configure recurring meter rental charges based on cycle and connection type.</p>
            </div>

            {/* 2. Top Controls (Context Filters) */}
            <div className="flex flex-wrap gap-6 p-5 bg-card border border-border rounded-xl shadow-sm items-end">
                <div className="space-y-1.5 w-full sm:w-48">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Filter Cycle</label>
                    <SelectInput
                        value={filterCycle}
                        onChange={setFilterCycle}
                        options={['All', ...cycleOptions]}
                        placeholder="Select Cycle"
                    />
                </div>
                <div className="space-y-1.5 w-full sm:w-48">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Filter Type</label>
                    <SelectInput
                        value={filterType}
                        onChange={setFilterType}
                        options={['All', ...typeOptions]}
                        placeholder="Select Type"
                    />
                </div>
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

            {/* 4. Data Table */}
            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col relative mb-16">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse min-w-200">
                        <thead>
                            <tr className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                                <th className="p-4 w-12 text-center">
                                    <input
                                        type="checkbox"
                                        checked={allSelected}
                                        onChange={(e) => toggleSelectAll(e.target.checked)}
                                        className="rounded border-input bg-background text-primary focus:ring-primary transition-all"
                                    />
                                </th>
                                <th className="p-4 w-1/3 border-r border-border">Billing Cycle</th>
                                <th className="p-4 w-1/3 border-r border-border">Connection Type</th>
                                <th className="p-4 w-1/3 text-center bg-muted/30">
                                    Rent Amount
                                    <div className="text-[10px] font-normal mt-0.5 text-muted-foreground/70">(₹) Per Cycle</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {rows.map((row) => (
                                <tr key={row.id} className={`group transition-colors ${row.selected ? 'bg-primary/5' : 'hover:bg-muted/30'}`}>
                                    <td className="p-4 text-center">
                                        <input
                                            type="checkbox"
                                            checked={row.selected}
                                            onChange={() => toggleSelectRow(row.id)}
                                            className="rounded border-input bg-background text-primary focus:ring-primary transition-all"
                                        />
                                    </td>
                                    <td className="p-3 border-r border-border">
                                        <SelectInput
                                            value={row.billingCycle}
                                            onChange={(val: string) => handleUpdateRow(row.id, 'billingCycle', val)}
                                            options={cycleOptions}
                                            placeholder="Select Cycle"
                                        />
                                    </td>
                                    <td className="p-3 border-r border-border">
                                        <SelectInput
                                            value={row.connectionType}
                                            onChange={(val: string) => handleUpdateRow(row.id, 'connectionType', val)}
                                            options={typeOptions}
                                            placeholder="Select Type"
                                        />
                                    </td>
                                    <td className="p-3 bg-muted/10">
                                        <CurrencyInput
                                            value={row.rentAmount}
                                            onChange={(val: string) => handleUpdateRow(row.id, 'rentAmount', val)}
                                            placeholder="0.00"
                                        />
                                    </td>
                                </tr>
                            ))}
                            {rows.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-muted-foreground">
                                        No meter rent rules configured. Add a row below to start.
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
                        <span>Rent is automatically added to the bill based on the consumer's cycle.</span>
                    </div>
                    <button
                        onClick={handleAddRow}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary bg-primary/5 hover:bg-primary/10 rounded-lg border border-primary/20 transition-all active:scale-95"
                    >
                        <Plus className="w-4 h-4" /> Add Rent Rule
                    </button>
                </div>

            </div>
        </div>
    );
}