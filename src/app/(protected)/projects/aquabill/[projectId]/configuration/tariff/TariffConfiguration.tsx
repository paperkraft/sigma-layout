'use client'

import React, { useState } from 'react';
import { Save, Trash2, Plus, ChevronDown, AlertCircle, Zap, Droplets } from 'lucide-react';

// --- Types ---
interface TariffRow {
    id: string;
    selected: boolean;
    // Meter Specific
    slabFrom: string;
    slabTo: string;
    ratePerUnit: string;
    minBill: string;
    // Flat Specific
    pipeSize: string;
    flatRate: string;
    // Common
    serviceCharge: string;
    fineDueDays: string;
    fineAmount: string;
    rebateDays: string;
    rebatePercent: string;
}

// --- Sub-Components ---

const SelectInput = ({ value, onChange, options, placeholder, icon: Icon }: any) => (
    <div className="relative w-full">
        <div className="relative">
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
                {Icon ? <Icon className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
        </div>
    </div>
);

const CurrencyInput = ({ value, onChange, placeholder = "0" }: any) => (
    <div className="relative w-full">
        <span className="absolute left-2 top-2 text-muted-foreground text-[10px]">₹</span>
        <input
            type="number"
            min="0"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-5 pr-2 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
            placeholder={placeholder}
        />
    </div>
);

const NumberInput = ({ value, onChange, placeholder, suffix }: any) => (
    <div className="relative w-full">
        <input
            type="number"
            min="0"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full pl-3 ${suffix ? 'pr-6' : 'pr-3'} py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground`}
            placeholder={placeholder}
        />
        {suffix && <span className="absolute right-2 top-2 text-muted-foreground text-[10px]">{suffix}</span>}
    </div>
);

export default function TariffConfiguration() {
    // --- State ---
    const [billingMethod, setBillingMethod] = useState('Meter');
    const [billingCycle, setBillingCycle] = useState('Monthly');
    const [connectionType, setConnectionType] = useState('Domestic');

    const [rows, setRows] = useState<TariffRow[]>([
        {
            id: '1', selected: false,
            slabFrom: '0', slabTo: '10000', ratePerUnit: '10', minBill: '50',
            pipeSize: '', flatRate: '',
            serviceCharge: '20',
            fineDueDays: '15', fineAmount: '50',
            rebateDays: '5', rebatePercent: '2'
        },
        {
            id: '2', selected: false,
            slabFrom: '10000', slabTo: '20000', ratePerUnit: '20', minBill: '100',
            pipeSize: '', flatRate: '',
            serviceCharge: '20',
            fineDueDays: '15', fineAmount: '50',
            rebateDays: '5', rebatePercent: '2'
        },
    ]);

    // --- Handlers ---
    const handleAddRow = () => {
        const newId = Date.now().toString();
        setRows([...rows, {
            id: newId,
            selected: false,
            slabFrom: '', slabTo: '', ratePerUnit: '', minBill: '',
            pipeSize: '', flatRate: '',
            serviceCharge: '',
            fineDueDays: '', fineAmount: '',
            rebateDays: '', rebatePercent: ''
        }]);
    };

    const handleUpdateRow = (id: string, field: keyof TariffRow, value: any) => {
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

    const sizeOptions = ['0.5 Inch', '0.75 Inch', '1.0 Inch', '1.5 Inch', '2.0 Inch', '3.0 Inch'];

    return (
        <div className="p-8 space-y-6 animate-in fade-in duration-500">

            {/* 1. Header */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Tariff Configuration</h1>
                <p className="text-muted-foreground text-sm mt-1">Define billing rates, slabs, penalties, and rebates.</p>
            </div>

            {/* 2. Context Selectors */}
            <div className="flex flex-wrap gap-6 p-5 bg-card border border-border rounded-xl shadow-sm items-end">
                <div className="space-y-1.5 w-full sm:w-48">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Billing Method</label>
                    <SelectInput
                        value={billingMethod}
                        onChange={setBillingMethod}
                        options={['Meter', 'Flat']}
                        placeholder="Select Method"
                        icon={billingMethod === 'Meter' ? Droplets : Zap}
                    />
                </div>
                <div className="space-y-1.5 w-full sm:w-48">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Billing Cycle</label>
                    <SelectInput
                        value={billingCycle}
                        onChange={setBillingCycle}
                        options={['Monthly', 'Quarterly', 'Yearly']}
                        placeholder="Select Cycle"
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
                    <table className="w-full text-sm text-left border-collapse min-w-300">
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

                                {/* Dynamic Columns */}
                                {billingMethod === 'Meter' ? (
                                    <>
                                        <th className="p-4 w-32 border-r border-border">Slab From <span className="text-[10px] font-normal opacity-70">(Liters)</span></th>
                                        <th className="p-4 w-32 border-r border-border">Slab To <span className="text-[10px] font-normal opacity-70">(Liters)</span></th>
                                        <th className="p-4 w-32 border-r border-border bg-muted/30">Rate / Unit <span className="text-[10px] font-normal opacity-70">(₹)</span></th>
                                        <th className="p-4 w-32 border-r border-border">Min. Bill <span className="text-[10px] font-normal opacity-70">(₹)</span></th>
                                    </>
                                ) : (
                                    <>
                                        <th className="p-4 w-64 border-r border-border">Pipe Size</th>
                                        <th className="p-4 w-64 border-r border-border bg-muted/30">Flat Rate <span className="text-[10px] font-normal opacity-70">(₹)</span></th>
                                    </>
                                )}

                                <th className="p-4 w-32 border-r border-border text-center">Service Chg. <div className="text-[10px] font-normal opacity-70 mt-0.5">(₹) Fixed</div></th>

                                {/* Complex Columns */}
                                <th className="p-4 w-48 border-r border-border text-center bg-muted/30">
                                    Late Fine
                                    <div className="flex justify-between mt-1 px-1 text-[10px] font-normal opacity-70">
                                        <span>Due Days</span><span>(₹) Amount</span>
                                    </div>
                                </th>
                                <th className="p-4 w-48 text-center">
                                    Early Rebate
                                    <div className="flex justify-between mt-1 px-1 text-[10px] font-normal opacity-70">
                                        <span>Pre Days</span><span>(%) Rate</span>
                                    </div>
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

                                    {/* Dynamic Inputs */}
                                    {billingMethod === 'Meter' ? (
                                        <>
                                            <td className="p-3 border-r border-border">
                                                <NumberInput value={row.slabFrom} onChange={(val: string) => handleUpdateRow(row.id, 'slabFrom', val)} placeholder="0" />
                                            </td>
                                            <td className="p-3 border-r border-border">
                                                <NumberInput value={row.slabTo} onChange={(val: string) => handleUpdateRow(row.id, 'slabTo', val)} placeholder="∞" />
                                            </td>
                                            <td className="p-3 border-r border-border bg-muted/10">
                                                <CurrencyInput value={row.ratePerUnit} onChange={(val: string) => handleUpdateRow(row.id, 'ratePerUnit', val)} />
                                            </td>
                                            <td className="p-3 border-r border-border">
                                                <CurrencyInput value={row.minBill} onChange={(val: string) => handleUpdateRow(row.id, 'minBill', val)} />
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="p-3 border-r border-border">
                                                <SelectInput
                                                    value={row.pipeSize}
                                                    onChange={(val: string) => handleUpdateRow(row.id, 'pipeSize', val)}
                                                    options={sizeOptions}
                                                    placeholder="Select Size"
                                                />
                                            </td>
                                            <td className="p-3 border-r border-border bg-muted/10">
                                                <CurrencyInput value={row.flatRate} onChange={(val: string) => handleUpdateRow(row.id, 'flatRate', val)} />
                                            </td>
                                        </>
                                    )}

                                    <td className="p-3 border-r border-border">
                                        <CurrencyInput value={row.serviceCharge} onChange={(val: string) => handleUpdateRow(row.id, 'serviceCharge', val)} />
                                    </td>

                                    {/* Late Fine Group */}
                                    <td className="p-3 border-r border-border bg-muted/10">
                                        <div className="flex gap-2">
                                            <NumberInput value={row.fineDueDays} onChange={(val: string) => handleUpdateRow(row.id, 'fineDueDays', val)} placeholder="Day" />
                                            <CurrencyInput value={row.fineAmount} onChange={(val: string) => handleUpdateRow(row.id, 'fineAmount', val)} placeholder="Amt" />
                                        </div>
                                    </td>

                                    {/* Early Rebate Group */}
                                    <td className="p-3">
                                        <div className="flex gap-2">
                                            <NumberInput value={row.rebateDays} onChange={(val: string) => handleUpdateRow(row.id, 'rebateDays', val)} placeholder="Day" />
                                            <NumberInput value={row.rebatePercent} onChange={(val: string) => handleUpdateRow(row.id, 'rebatePercent', val)} placeholder="%" suffix="%" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {rows.length === 0 && (
                                <tr>
                                    <td colSpan={billingMethod === 'Meter' ? 8 : 6} className="p-8 text-center text-muted-foreground">
                                        No tariff rules configured. Click add to start.
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
                        <span>Changes will apply to the next billing cycle generated.</span>
                    </div>
                    <button
                        onClick={handleAddRow}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary bg-primary/5 hover:bg-primary/10 rounded-lg border border-primary/20 transition-all active:scale-95"
                    >
                        <Plus className="w-4 h-4" /> Add Tariff Slab
                    </button>
                </div>
            </div>
        </div>
    );
}