import React, { useState } from 'react';
import {
    Search,
    RefreshCw,
    FilterX,
    Trash2,
    Edit3,
    MoreHorizontal,
    Eye,
    History,
    PowerOff,
    XCircle,
    ChevronDown,
    ChevronsLeft,
    ChevronLeft,
    ChevronRight,
    ChevronsRight,
    Download
} from 'lucide-react';

// --- Mock Data ---
const MOCK_CONNECTIONS = [
    { id: "10001114", firstName: "Kirti", middleName: "Gopal", lastName: "Patil", method: "Flat", size: "0.5 Inch", type: "Domestic", zone: "North-West", status: "Active" },
    { id: "10001115", firstName: "Devansh", middleName: "Mangesh", lastName: "Patil", method: "Flat", size: "0.5 Inch", type: "Domestic", zone: "West-East", status: "Active" },
    { id: "10001116", firstName: "Devansh", middleName: "M", lastName: "Patil", method: "Meter", size: "0.75 Inch", type: "Commercial", zone: "North-West", status: "Active" },
    { id: "10001117", firstName: "Kirti", middleName: "G", lastName: "Patil", method: "Meter", size: "1.0 Inch", type: "Industrial", zone: "West-East", status: "Active" },
    { id: "10001118", firstName: "Rahul", middleName: "S", lastName: "Deshmukh", method: "Flat", size: "0.5 Inch", type: "Domestic", zone: "South-Block", status: "Disconnected" },
    { id: "10001119", firstName: "Priya", middleName: "A", lastName: "Sharma", method: "Meter", size: "0.5 Inch", type: "Institutional", zone: "North-West", status: "Suspended" },
];

// --- Reusable Components (In a real app, these would be imported) ---

const Button = ({ children, variant = "secondary", size = "default", className, icon: Icon, ...props }: any) => {
    const variants: Record<string, string> = {
        primary: "bg-violet-600 text-white hover:bg-violet-700 shadow-sm",
        secondary: "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50",
        ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
        danger: "bg-white border border-red-200 text-red-600 hover:bg-red-50",
        outline: "border border-dashed border-slate-300 text-slate-600 hover:border-slate-400"
    };

    const sizes: Record<string, string> = {
        sm: "px-3 py-1.5 text-xs",
        default: "px-4 py-2 text-sm",
        icon: "p-2"
    };

    return (
        <button className={`inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-violet-500 ${variants[variant as keyof typeof variants] || variants.secondary} ${sizes[size as keyof typeof sizes] || sizes.default} ${className}`} {...props}>
            {Icon && <Icon className={`h-4 w-4 ${children ? 'mr-2' : ''}`} />}
            {children}
        </button>
    );
};

const Select = ({ label, options }: any) => (
    <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</label>
        <div className="relative">
            <select className="w-full appearance-none bg-white border border-slate-200 text-slate-700 text-sm rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-shadow">
                <option>All</option>
                {options.map((opt: any) => <option key={opt}>{opt}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
        </div>
    </div>
);

const Badge = ({ status }: any) => {
    const styles: Record<string, string> = {
        Active: "bg-green-100 text-green-700 border-green-200",
        Disconnected: "bg-red-100 text-red-700 border-red-200",
        Suspended: "bg-orange-100 text-orange-700 border-orange-200",
    };
    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || "bg-slate-100 text-slate-700"}`}>
            {status}
        </span>
    );
};

export default function ConnectionsPage() {
    const [selectedRows, setSelectedRows] = useState<any[]>([]);
    const [activeActionRow, setActiveActionRow] = useState<string | null>(null);

    const toggleRow = (id: any) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter(rowId => rowId !== id));
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
        <div className="p-8 space-y-6 animate-in fade-in duration-500">

            {/* 1. Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Connections</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage all water connections, meters, and subscriber details.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" icon={Download}>Export Data</Button>
                    <Button variant="primary" icon={RefreshCw}>Sync Data</Button>
                </div>
            </div>

            {/* 2. Filters Section */}
            <div className="bg-white border rounded-xl shadow-sm p-5">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-4">
                    <Select label="Billing Method" options={["Flat Rate", "Metered"]} />
                    <Select label="Conn Type" options={["Domestic", "Commercial", "Industrial"]} />
                    <Select label="Conn Size" options={["0.5 Inch", "0.75 Inch", "1.0 Inch"]} />
                    <Select label="Status" options={["Active", "Disconnected", "Suspended"]} />
                    <Select label="Meter Status" options={["Working", "Faulty", "N/A"]} />
                    <Select label="Zone" options={["North-West", "West-East", "South-Block"]} />
                    <Select label="Zone Tag" options={["Tag A", "Tag B"]} />
                </div>

                {/* Action Toolbar */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 w-full lg:w-auto">
                        <Button variant="secondary" icon={RefreshCw} size="sm">Refresh</Button>
                        <Button variant="ghost" icon={FilterX} size="sm" className="text-slate-500">Reset</Button>

                        {selectedRows.length > 0 && (
                            <>
                                <div className="h-6 w-px bg-slate-200 mx-2"></div>
                                <span className="text-xs font-medium text-slate-500">{selectedRows.length} selected</span>
                                <Button variant="danger" icon={Trash2} size="sm">Delete</Button>
                                <Button variant="secondary" icon={Edit3} size="sm">Update</Button>
                            </>
                        )}
                    </div>

                    <div className="flex items-center gap-2 w-full lg:w-auto">
                        <div className="relative flex-1 lg:w-64">
                            <input
                                type="text"
                                placeholder="Search by ID or Name..."
                                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
                            />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        </div>
                        <Select label="" options={["Starts with", "Contains", "Exact match"]} />
                    </div>
                </div>
            </div>

            {/* 3. Data Table */}
            <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto min-h-100">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50/80 border-b text-slate-500 font-medium">
                            <tr>
                                <th className="px-4 py-3 w-10">
                                    <input
                                        type="checkbox"
                                        className="rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                                        checked={selectedRows.length === MOCK_CONNECTIONS.length && MOCK_CONNECTIONS.length > 0}
                                        onChange={toggleAll}
                                    />
                                </th>
                                <th className="px-4 py-3">Customer ID</th>
                                <th className="px-4 py-3">First Name</th>
                                <th className="px-4 py-3">Middle</th>
                                <th className="px-4 py-3">Last Name</th>
                                <th className="px-4 py-3">Method</th>
                                <th className="px-4 py-3">Size</th>
                                <th className="px-4 py-3">Type</th>
                                <th className="px-4 py-3">Zone</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {MOCK_CONNECTIONS.map((row) => (
                                <tr key={row.id} className={`group hover:bg-slate-50 transition-colors ${selectedRows.includes(row.id) ? 'bg-violet-50/50' : ''}`}>
                                    <td className="px-4 py-3">
                                        <input
                                            type="checkbox"
                                            className="rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                                            checked={selectedRows.includes(row.id)}
                                            onChange={() => toggleRow(row.id)}
                                        />
                                    </td>
                                    <td className="px-4 py-3 font-medium text-slate-700 font-mono">{row.id}</td>
                                    <td className="px-4 py-3 text-slate-600">{row.firstName}</td>
                                    <td className="px-4 py-3 text-slate-600">{row.middleName}</td>
                                    <td className="px-4 py-3 text-slate-600">{row.lastName}</td>
                                    <td className="px-4 py-3">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-600 border border-slate-200">
                                            {row.method}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-slate-600">{row.size}</td>
                                    <td className="px-4 py-3 text-slate-600">{row.type}</td>
                                    <td className="px-4 py-3 text-slate-600">{row.zone}</td>
                                    <td className="px-4 py-3">
                                        <Badge status={row.status} />
                                    </td>
                                    <td className="px-4 py-3 text-right relative">
                                        <button
                                            onClick={() => setActiveActionRow(activeActionRow === row.id ? null : row.id)}
                                            className="p-1.5 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                        </button>

                                        {/* Context Menu (Dropdown) */}
                                        {activeActionRow === row.id && (
                                            <div className="absolute right-8 top-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-100 z-10 animate-in zoom-in-95 duration-200">
                                                <div className="py-1">
                                                    <button className="flex items-center w-full px-4 py-2 text-xs text-slate-700 hover:bg-violet-50 hover:text-violet-700">
                                                        <Eye className="h-3.5 w-3.5 mr-2" /> View Details
                                                    </button>
                                                    <button className="flex items-center w-full px-4 py-2 text-xs text-slate-700 hover:bg-violet-50 hover:text-violet-700">
                                                        <History className="h-3.5 w-3.5 mr-2" /> Connection History
                                                    </button>
                                                    <div className="border-t border-slate-100 my-1"></div>
                                                    <button className="flex items-center w-full px-4 py-2 text-xs text-red-600 hover:bg-red-50">
                                                        <PowerOff className="h-3.5 w-3.5 mr-2" /> Disconnect
                                                    </button>
                                                    <button className="flex items-center w-full px-4 py-2 text-xs text-red-600 hover:bg-red-50">
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
                <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-white">
                    <div className="text-sm text-slate-500">
                        Showing <span className="font-medium text-slate-900">1</span> to <span className="font-medium text-slate-900">6</span> of <span className="font-medium text-slate-900">1240</span> results
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="secondary" size="icon" disabled><ChevronsLeft className="h-4 w-4" /></Button>
                        <Button variant="secondary" size="icon" disabled><ChevronLeft className="h-4 w-4" /></Button>
                        <div className="flex items-center space-x-1">
                            <button className="h-8 w-8 rounded-lg bg-violet-600 text-white text-sm font-medium">1</button>
                            <button className="h-8 w-8 rounded-lg hover:bg-slate-50 text-slate-600 text-sm font-medium">2</button>
                            <button className="h-8 w-8 rounded-lg hover:bg-slate-50 text-slate-600 text-sm font-medium">3</button>
                            <span className="text-slate-400 px-1">...</span>
                        </div>
                        <Button variant="secondary" size="icon"><ChevronRight className="h-4 w-4" /></Button>
                        <Button variant="secondary" size="icon"><ChevronsRight className="h-4 w-4" /></Button>
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