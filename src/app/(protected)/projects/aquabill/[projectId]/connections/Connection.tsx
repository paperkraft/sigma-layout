'use client'
import {
    ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Download, Edit3,
    Eye, FilterX, History, MapPin, MoreHorizontal, Plus, PowerOff, RefreshCw, Search, Settings, Trash2,
    User, XCircle
} from 'lucide-react';
import React, { useState } from 'react';

// --- Mock Data ---
const MOCK_CONNECTIONS = [
    {
        id: "10001114",
        name: "Rahul Shinde",
        mobile: "8888823455",
        method: "Flat",
        size: "0.5 Inch",
        type: "Domestic",
        zone: "North-West",
        zoneTag: "Tag A",
        status: "Active"
    },
    {
        id: "10001115",
        name: "Nilesh Patil",
        mobile: "9822334455",
        method: "Flat",
        size: "0.5 Inch",
        type: "Domestic",
        zone: "West-East",
        zoneTag: "Tag B",
        status: "Active"
    },
    {
        id: "10001116",
        name: "Suresh Kumar",
        mobile: "8887776655",
        method: "Meter",
        size: "0.75 Inch",
        type: "Commercial",
        zone: "North-West",
        zoneTag: "Tag A",
        status: "Active"
    },
    {
        id: "10001117",
        name: "Ajit Patil",
        mobile: "9998887776",
        method: "Meter",
        size: "1.0 Inch",
        type: "Industrial",
        zone: "West-East",
        zoneTag: "Tag B",
        status: "Active"
    },
    {
        id: "10001118",
        name: "Rahul Deshmukh",
        mobile: "7776665544",
        method: "Flat",
        size: "0.5 Inch",
        type: "Domestic",
        zone: "South-Block",
        zoneTag: "Tag C",
        status: "Disconnected"
    },
];

// --- Components ---

const Button = ({ children, variant = "secondary", size = "default", className, icon: Icon, ...props }: any) => {
    const variants: Record<string, string> = {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        secondary: "bg-card border border-border text-foreground hover:bg-accent hover:text-accent-foreground",
        ghost: "bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground",
        danger: "bg-card border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50",
    };

    const sizes: Record<string, string> = {
        sm: "px-3 py-1.5 text-xs",
        default: "px-4 py-2 text-sm",
        icon: "p-2"
    };

    return (
        <button className={`inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary/50 ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
            {Icon && <Icon className={`h-4 w-4 ${children ? 'mr-2' : ''}`} />}
            {children}
        </button>
    );
};

const Select = ({ label, options }: any) => (
    <div className="space-y-1">
        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{label}</label>
        <div className="relative">
            <select className="w-full appearance-none bg-card border border-border text-foreground text-sm rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow">
                <option>All</option>
                {options.map((opt: any) => <option key={opt}>{opt}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
        </div>
    </div>
);

const Badge = ({ status }: any) => {
    const styles: Record<string, string> = {
        Active: "bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
        Disconnected: "bg-red-50 dark:bg-red-500/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800",
        Suspended: "bg-orange-50 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800",
    };
    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || "bg-secondary text-foreground border-border"}`}>
            {status}
        </span>
    );
};

export default function ConnectionsPage() {
    const [selectedRows, setSelectedRows] = useState<any>([]);
    const [activeActionRow, setActiveActionRow] = useState<any>(null);

    const toggleRow = (id: any) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter((rowId: any) => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    const toggleAll = () => {
        if (selectedRows.length === MOCK_CONNECTIONS.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(MOCK_CONNECTIONS.map(c => c.id));
        }
    };

    return (
        <div className="p-8 max-w-400 mx-auto space-y-6 animate-in fade-in duration-500 text-foreground">

            {/* 1. Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Connections</h1>
                    <p className="text-muted-foreground text-sm mt-1">Manage subscriber database and connection lifecycles.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="secondary" icon={Download}>Export List</Button>
                    <Button variant="primary" icon={Plus}>New Connection</Button>
                </div>
            </div>

            {/* 2. Filters & Toolbar */}
            <div className="bg-card border border-border rounded-xl shadow-sm p-4">
                {/* Filter Grid */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-4">
                    <Select label="Billing Method" options={["Flat Rate", "Metered"]} />
                    <Select label="Type" options={["Domestic", "Commercial", "Industrial"]} />
                    <Select label="Size" options={["0.5 Inch", "0.75 Inch", "1.0 Inch"]} />
                    <Select label="Status" options={["Active", "Disconnected"]} />
                    <Select label="Zone" options={["North-West", "West-East"]} />
                    <Select label="Zone Tag" options={["Tag A", "Tag B"]} />
                </div>

                {/* Action Bar */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 w-full lg:w-auto">
                        {selectedRows.length > 0 ? (
                            <>
                                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20">{selectedRows.length} selected</span>
                                <div className="h-4 w-px bg-border mx-1"></div>
                                <Button variant="danger" icon={Trash2} size="sm">Delete</Button>
                                <Button variant="secondary" icon={Edit3} size="sm">Edit</Button>
                            </>
                        ) : (
                            <span className="text-xs text-muted-foreground italic pl-1">Select rows to perform bulk actions</span>
                        )}
                    </div>

                    <div className="flex items-center gap-2 w-full lg:w-auto">
                        <div className="relative flex-1 lg:w-72">
                            <input
                                type="text"
                                placeholder="Search by ID, Name or Mobile..."
                                className="w-full pl-9 pr-4 py-2 bg-secondary/30 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
                            />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        </div>
                        <Button variant="ghost" icon={FilterX} size="sm">Reset</Button>
                    </div>
                </div>
            </div>

            {/* 3. Merged Columns Table */}
            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto min-h-100">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead className="bg-muted/50 border-b border-border text-muted-foreground text-xs font-bold uppercase tracking-wider">
                            <tr>
                                <th className="px-4 py-3 w-10">
                                    <input
                                        type="checkbox"
                                        className="rounded border-border text-primary focus:ring-primary bg-card"
                                        checked={selectedRows.length === MOCK_CONNECTIONS.length && MOCK_CONNECTIONS.length > 0}
                                        onChange={toggleAll}
                                    />
                                </th>
                                <th className="px-6 py-3">Subscriber</th>
                                <th className="px-6 py-3">Configuration</th>
                                <th className="px-6 py-3">Location</th>
                                <th className="px-6 py-3 text-center">Status</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {MOCK_CONNECTIONS.map((row) => (
                                <tr key={row.id} className={`group hover:bg-accent/50 transition-colors ${selectedRows.includes(row.id) ? 'bg-primary/5' : ''}`}>

                                    {/* Checkbox */}
                                    <td className="px-4 py-4 align-top pt-5">
                                        <input
                                            type="checkbox"
                                            className="rounded border-border text-primary focus:ring-primary bg-card"
                                            checked={selectedRows.includes(row.id)}
                                            onChange={() => toggleRow(row.id)}
                                        />
                                    </td>

                                    {/* 1. Subscriber Column (Merged Name & ID) */}
                                    <td className="px-6 py-4 align-top">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2">
                                                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
                                                    <User className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <span className="block font-semibold text-foreground text-sm">{row.name}</span>
                                                    <span className="block text-xs text-muted-foreground">{row.mobile}</span>
                                                </div>
                                            </div>
                                            <div className="mt-2 ml-10">
                                                <span className="font-mono text-[10px] text-muted-foreground bg-secondary/50 border border-border px-1.5 py-0.5 rounded">
                                                    ID: {row.id}
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* 2. Configuration Column (Merged Type, Method, Size) */}
                                    <td className="px-6 py-4 align-top">
                                        <div className="space-y-1.5">
                                            <div className="flex items-center justify-between max-w-35">
                                                <span className="text-xs text-muted-foreground">Method</span>
                                                <span className="text-xs font-medium text-foreground bg-secondary/50 border border-border px-1.5 rounded">{row.method}</span>
                                            </div>
                                            <div className="flex items-center justify-between max-w-35">
                                                <span className="text-xs text-muted-foreground">Type</span>
                                                <span className="text-xs font-medium text-foreground">{row.type}</span>
                                            </div>
                                            <div className="flex items-center justify-between max-w-35 border-t border-border border-dashed pt-1 mt-1">
                                                <span className="text-xs text-muted-foreground">Pipe Size</span>
                                                <span className="text-xs font-bold text-foreground">{row.size}</span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* 3. Location Column (Merged Zone & Tag) */}
                                    <td className="px-6 py-4 align-top">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center text-foreground font-medium">
                                                <MapPin className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                                                {row.zone}
                                            </div>
                                            <div className="ml-5">
                                                <span className="text-[10px] bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded border border-blue-100 dark:border-blue-900/50">
                                                    {row.zoneTag}
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* 4. Status Column */}
                                    <td className="px-6 py-4 align-top text-center pt-5">
                                        <Badge status={row.status} />
                                    </td>

                                    {/* Actions Column */}
                                    <td className="px-6 py-4 align-top text-right relative pt-4">
                                        <button
                                            onClick={() => setActiveActionRow(activeActionRow === row.id ? null : row.id)}
                                            className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                        </button>

                                        {/* Context Menu */}
                                        {activeActionRow === row.id && (
                                            <div className="absolute right-8 top-8 mt-1 w-48 bg-card rounded-lg shadow-xl border border-border z-10 animate-in zoom-in-95 duration-200 text-left">
                                                <div className="py-1">
                                                    <button className="flex items-center w-full px-4 py-2 text-xs text-foreground hover:bg-primary/10 hover:text-primary">
                                                        <Eye className="h-3.5 w-3.5 mr-2" /> View Details
                                                    </button>
                                                    <button className="flex items-center w-full px-4 py-2 text-xs text-foreground hover:bg-primary/10 hover:text-primary">
                                                        <History className="h-3.5 w-3.5 mr-2" /> Connection History
                                                    </button>
                                                    <div className="border-t border-border my-1"></div>
                                                    <button className="flex items-center w-full px-4 py-2 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                                                        <PowerOff className="h-3.5 w-3.5 mr-2" /> Disconnect
                                                    </button>
                                                    <button className="flex items-center w-full px-4 py-2 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                                                        <XCircle className="h-3.5 w-3.5 mr-2" /> Close Connection
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-card">
                    <div className="text-xs text-muted-foreground">
                        Showing <span className="font-bold text-foreground">1-5</span> of <span className="font-bold text-foreground">1,240</span> records
                    </div>
                    <div className="flex items-center space-x-1">
                        <Button variant="secondary" size="icon" className="h-8 w-8"><ChevronsLeft className="h-3 w-3" /></Button>
                        <Button variant="secondary" size="icon" className="h-8 w-8"><ChevronLeft className="h-3 w-3" /></Button>
                        <span className="text-xs text-muted-foreground px-2">Page 1 of 52</span>
                        <Button variant="secondary" size="icon" className="h-8 w-8"><ChevronRight className="h-3 w-3" /></Button>
                        <Button variant="secondary" size="icon" className="h-8 w-8"><ChevronsRight className="h-3 w-3" /></Button>
                    </div>
                </div>
            </div>

            {/* Backdrop for closing dropdown */}
            {activeActionRow && (
                <div
                    className="fixed inset-0 z-0"
                    onClick={() => setActiveActionRow(null)}
                ></div>
            )}
        </div>
    );
}