import React, { useState } from 'react';
import {
    FileText,
    Calendar,
    Play,
    MoreHorizontal,
    Users,
    Filter,
    CheckCircle2,
    AlertCircle,
    Download,
    History
} from 'lucide-react';

// --- Mock Data based on Screenshot ---
const BILLING_GROUPS = [
    {
        id: "grp_monthly",
        title: "Monthly Cycle",
        items: [
            { id: 1, period: "N/A - N/A", type: "Commercial", size: "5 Inch", generated: 0, pending: 0, status: "No Data" },
            { id: 2, period: "N/A - N/A", type: "Commercial", size: "10 Inch", generated: 0, pending: 0, status: "No Data" },
            { id: 3, period: "1st Dec 2025 - 1st Jan 2026", type: "Domestic", size: "5 Inch", generated: 142, pending: 12, status: "Ready" },
            { id: 4, period: "1st Dec 2025 - 1st Jan 2026", type: "Domestic", size: "10 Inch", generated: 45, pending: 0, status: "Completed" },
        ]
    },
    {
        id: "grp_yearly",
        title: "Yearly Cycle",
        items: [
            { id: 5, period: "N/A - N/A", type: "Commercial", size: "5 Inch", generated: 0, pending: 0, status: "No Data" },
            { id: 6, period: "1st Jan 2025 - 1st Jan 2026", type: "Domestic", size: "5 Inch", generated: 850, pending: 120, status: "Ready" },
            { id: 7, period: "1st Jan 2025 - 1st Jan 2026", type: "Domestic", size: "10 Inch", generated: 0, pending: 0, status: "No Data" },
        ]
    }
];

// --- Components ---

const Button = ({ children, variant = "secondary", size = "default", className, icon: Icon, ...props }: any) => {
    const variants: Record<string, string> = {
        primary: "bg-violet-600 text-white hover:bg-violet-700 shadow-sm",
        secondary: "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50",
        ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
    };
    const sizes: Record<string, string> = {
        sm: "px-3 py-1.5 text-xs",
        default: "px-4 py-2 text-sm",
        icon: "p-2"
    };
    return (
        <button className={`inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
            {Icon && <Icon className={`h-4 w-4 ${children ? 'mr-2' : ''}`} />}
            {children}
        </button>
    );
};

const StatusBadge = ({ status }: any) => {
    const styles: Record<string, string> = {
        "Ready": "bg-violet-100 text-violet-700 border-violet-200",
        "Completed": "bg-green-50 text-green-700 border-green-200",
        "No Data": "bg-slate-100 text-slate-500 border-slate-200"
    };
    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${styles[status]}`}>
            {status === 'Ready' && <AlertCircle className="w-3 h-3 mr-1" />}
            {status === 'Completed' && <CheckCircle2 className="w-3 h-3 mr-1" />}
            {status}
        </span>
    );
};

export default function FlatBillGeneration() {
    const [activeMenu, setActiveMenu] = useState<number | null>(null);

    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500">

            {/* 1. Header & Global Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Flat Bill Generation</h1>
                    <p className="text-slate-500 text-sm mt-1">Generate bulk bills based on fixed rates for Domestic and Commercial connections.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="secondary" icon={History}>View Logs</Button>
                    <Button variant="secondary" icon={Download}>Export Report</Button>
                </div>
            </div>

            {/* 2. Stats / Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500">Total Pending Bills</p>
                        <p className="text-2xl font-bold text-slate-900 mt-1">132</p>
                    </div>
                    <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                        <AlertCircle className="h-5 w-5" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500">Bills Generated (Today)</p>
                        <p className="text-2xl font-bold text-slate-900 mt-1">1,037</p>
                    </div>
                    <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                        <CheckCircle2 className="h-5 w-5" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500">Next Cycle Start</p>
                        <p className="text-lg font-bold text-slate-900 mt-1">Feb 1, 2026</p>
                    </div>
                    <div className="h-10 w-10 bg-violet-100 rounded-lg flex items-center justify-center text-violet-600">
                        <Calendar className="h-5 w-5" />
                    </div>
                </div>
            </div>

            {/* 3. Main Content - Grouped Table */}
            <div className="space-y-6">
                {BILLING_GROUPS.map((group) => (
                    <div key={group.id} className="bg-white border rounded-xl shadow-sm overflow-hidden">
                        {/* Group Header */}
                        <div className="bg-slate-50/80 px-6 py-3 border-b flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="h-6 w-6 rounded-md bg-white border flex items-center justify-center text-slate-500">
                                    <Calendar className="h-3.5 w-3.5" />
                                </span>
                                <h3 className="font-semibold text-slate-800">{group.title}</h3>
                            </div>
                            <span className="text-xs font-medium text-slate-500 bg-white px-2 py-1 rounded border">
                                {group.items.length} Configurations
                            </span>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-slate-500 font-medium border-b">
                                    <tr>
                                        <th className="px-6 py-3 w-[25%]">Billing Period</th>
                                        <th className="px-6 py-3">Type</th>
                                        <th className="px-6 py-3">Size</th>
                                        <th className="px-6 py-3 text-center">Status</th>
                                        <th className="px-6 py-3 text-center">Counts</th>
                                        <th className="px-6 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {group.items.map((row) => (
                                        <tr key={row.id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center text-slate-700 font-medium">
                                                    {row.period}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600">{row.type}</td>
                                            <td className="px-6 py-4 text-slate-600">{row.size}</td>
                                            <td className="px-6 py-4 text-center">
                                                <StatusBadge status={row.status} />
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex flex-col items-center">
                                                    <span className="text-xs text-slate-400 uppercase tracking-wide">Gen / Pending</span>
                                                    <span className="font-medium text-slate-700">
                                                        {row.generated} / <span className={row.pending > 0 ? "text-orange-600 font-bold" : ""}>{row.pending}</span>
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 relative">
                                                    <Button
                                                        variant={row.status === 'Ready' ? 'primary' : 'secondary'}
                                                        size="sm"
                                                        disabled={row.status === 'No Data'}
                                                        icon={Play}
                                                    >
                                                        Generate
                                                    </Button>

                                                    <button
                                                        className="p-1.5 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
                                                        onClick={() => setActiveMenu(activeMenu === row.id ? null : row.id)}
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </button>

                                                    {/* Context Menu */}
                                                    {activeMenu === row.id && (
                                                        <div className="absolute right-0 top-10 w-48 bg-white rounded-lg shadow-xl border border-slate-100 z-10 animate-in zoom-in-95 duration-200">
                                                            <div className="py-1">
                                                                <button className="flex items-center w-full px-4 py-2 text-xs text-slate-700 hover:bg-violet-50 hover:text-violet-700">
                                                                    <Users className="h-3.5 w-3.5 mr-2" /> View Connections
                                                                </button>
                                                                <button className="flex items-center w-full px-4 py-2 text-xs text-slate-700 hover:bg-violet-50 hover:text-violet-700">
                                                                    <FileText className="h-3.5 w-3.5 mr-2" /> View Previous Bills
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>

            {/* Backdrop for closing dropdown */}
            {activeMenu && (
                <div className="fixed inset-0 z-0" onClick={() => setActiveMenu(null)}></div>
            )}
        </div>
    );
}