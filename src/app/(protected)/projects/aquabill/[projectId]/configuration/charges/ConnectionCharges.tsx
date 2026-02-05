'use client'

import React, { useState } from 'react';
import { Save, Trash2, Plus, ChevronDown, AlertCircle } from 'lucide-react';

// --- Types ---
interface ChargeRow {
    id: string;
    selected: boolean;
    connectionSize: string;
    installationCharge: string;
    securityDeposit: string;
    disconnectionCharge: string;
    reconnectionCharge: string;
}

// --- Sub-Components ---

// Styled Select Dropdown
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

// Styled Currency Input
const CurrencyInput = ({ value, onChange }: any) => (
    <div className="relative w-full">
        <span className="absolute left-3 top-2 text-muted-foreground text-sm">₹</span>
        <input
            type="number"
            min="0"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-8 pr-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
            placeholder="0"
        />
    </div>
);

export default function ConnectionChargesScreen() {
    // --- State ---
    const [billingMethod, setBillingMethod] = useState('Flat');
    const [connectionType, setConnectionType] = useState('Domestic');
    const [rows, setRows] = useState<ChargeRow[]>([
        { id: '1', selected: false, connectionSize: '0.5 Inch', installationCharge: '', securityDeposit: '', disconnectionCharge: '', reconnectionCharge: '' },
        { id: '2', selected: false, connectionSize: '1.0 Inch', installationCharge: '', securityDeposit: '', disconnectionCharge: '', reconnectionCharge: '' },
    ]);

    // --- Handlers ---
    const handleAddRow = () => {
        const newId = Date.now().toString();
        setRows([...rows, {
            id: newId,
            selected: false,
            connectionSize: '',
            installationCharge: '',
            securityDeposit: '',
            disconnectionCharge: '',
            reconnectionCharge: ''
        }]);
    };

    const handleUpdateRow = (id: string, field: keyof ChargeRow, value: any) => {
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

    const selectedCount = rows.filter(r => r.selected).length;
    const allSelected = rows.length > 0 && selectedCount === rows.length;

    const sizeOptions = ['0.5 Inch', '0.75 Inch', '1.0 Inch', '1.5 Inch', '2.0 Inch', '3.0 Inch', '4.0 Inch'];

    return (
        <div className="p-6 md:p-8 space-y-6 animate-in fade-in duration-500">

            {/* 1. Header */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Connection Charges</h1>
                <p className="text-muted-foreground text-sm mt-1">Configure one-time charges for new connections, disconnections, and reconnections.</p>
            </div>

            {/* 2. Context Selectors */}
            <div className="flex flex-wrap gap-6 p-5 bg-card border border-border rounded-xl shadow-sm items-end">
                <div className="space-y-1.5 w-full sm:w-48">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Billing Method</label>
                    <SelectInput
                        value={billingMethod}
                        onChange={setBillingMethod}
                        options={['Flat', 'Meter']}
                        placeholder="Select Method"
                    />
                </div>
                <div className="space-y-1.5 w-full sm:w-48">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Connection Type</label>
                    <SelectInput
                        value={connectionType}
                        onChange={setConnectionType}
                        options={['Domestic', 'Commercial', 'Industrial', 'Institutional']}
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
            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse min-w-250">
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
                                <th className="p-4 w-48 border-r border-border">Connection Size</th>
                                <th className="p-4 w-48 border-r border-border text-center bg-muted/30">
                                    Installation Charges
                                    <div className="text-[10px] font-normal mt-0.5 text-muted-foreground/70">(₹) One-time</div>
                                </th>
                                <th className="p-4 w-48 border-r border-border text-center">
                                    Security Deposit
                                    <div className="text-[10px] font-normal mt-0.5 text-muted-foreground/70">(₹) Refundable</div>
                                </th>
                                <th className="p-4 w-48 border-r border-border text-center bg-muted/30">
                                    Dis-Connection
                                    <div className="text-[10px] font-normal mt-0.5 text-muted-foreground/70">(₹) Penalty</div>
                                </th>
                                <th className="p-4 w-48 text-center">
                                    Re-Connection
                                    <div className="text-[10px] font-normal mt-0.5 text-muted-foreground/70">(₹) Fee</div>
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
                                            value={row.connectionSize}
                                            onChange={(val: string) => handleUpdateRow(row.id, 'connectionSize', val)}
                                            options={sizeOptions}
                                            placeholder="Select Size"
                                        />
                                    </td>
                                    <td className="p-3 border-r border-border bg-muted/10">
                                        <CurrencyInput
                                            value={row.installationCharge}
                                            onChange={(val: string) => handleUpdateRow(row.id, 'installationCharge', val)}
                                        />
                                    </td>
                                    <td className="p-3 border-r border-border">
                                        <CurrencyInput
                                            value={row.securityDeposit}
                                            onChange={(val: string) => handleUpdateRow(row.id, 'securityDeposit', val)}
                                        />
                                    </td>
                                    <td className="p-3 border-r border-border bg-muted/10">
                                        <CurrencyInput
                                            value={row.disconnectionCharge}
                                            onChange={(val: string) => handleUpdateRow(row.id, 'disconnectionCharge', val)}
                                        />
                                    </td>
                                    <td className="p-3">
                                        <CurrencyInput
                                            value={row.reconnectionCharge}
                                            onChange={(val: string) => handleUpdateRow(row.id, 'reconnectionCharge', val)}
                                        />
                                    </td>
                                </tr>
                            ))}
                            {rows.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-muted-foreground">
                                        No charges configured. Add a row below to start.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* 5. Footer Actions (Same style as Tariff Page) */}
                <div className="p-4 border-t border-border bg-muted/20 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-100 dark:border-amber-900/30">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Security deposits are refundable upon permanent disconnection.</span>
                    </div>
                    <button
                        onClick={handleAddRow}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary bg-primary/5 hover:bg-primary/10 rounded-lg border border-primary/20 transition-all active:scale-95"
                    >
                        <Plus className="w-4 h-4" /> Add New
                    </button>
                </div>

            </div>
        </div>
    );
}