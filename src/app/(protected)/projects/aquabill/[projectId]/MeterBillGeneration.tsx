import React, { useState } from 'react';
import {
    Droplets,
    Calculator,
    CheckCircle2,
    AlertTriangle,
    MoreHorizontal,
    FileInput,
    Play,
    History,
    Download,
    Eye,
    ArrowRight
} from 'lucide-react';

// --- Mock Data ---
const METER_CYCLES = [
    {
        id: "cycle_monthly",
        title: "Monthly Cycle",
        period: "January 2026",
        groups: [
            {
                id: 1,
                type: "Commercial",
                total: 150,
                readingsCaptured: 45,
                billsGenerated: 0,
                status: "In Progress" // Readings are being entered
            },
            {
                id: 2,
                type: "Domestic",
                total: 840,
                readingsCaptured: 840,
                billsGenerated: 0,
                status: "Ready" // All readings in, ready to bill
            },
            {
                id: 3,
                type: "Industrial",
                total: 25,
                readingsCaptured: 25,
                billsGenerated: 25,
                status: "Completed" // Done
            },
        ]
    },
    {
        id: "cycle_yearly",
        title: "Yearly Cycle",
        period: "2025 - 2026",
        groups: [
            {
                id: 4,
                type: "Institutional",
                total: 12,
                readingsCaptured: 0,
                billsGenerated: 0,
                status: "Pending"
            }
        ]
    }
];

// --- Components ---

const Button = ({ children, variant = "secondary", size = "default", className, icon: Icon, ...props }: any) => {
    const variants: Record<string, string> = {
        primary: "bg-violet-600 text-white hover:bg-violet-700 shadow-sm",
        secondary: "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50",
        ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
        outline: "border border-dashed border-slate-300 text-slate-600 hover:border-slate-400"
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

const ProgressBar = ({ current, total }: any) => {
    const percentage = Math.round((current / total) * 100) || 0;
    const isComplete = percentage === 100;

    return (
        <div className="w-full max-w-xs">
            <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-600 font-medium">Reading Progress</span>
                <span className={`font-medium ${isComplete ? 'text-green-600' : 'text-slate-500'}`}>
                    {current}/{total} ({percentage}%)
                </span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                    className={`h-full transition-all duration-500 ${isComplete ? 'bg-green-500' : 'bg-violet-500'}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};

const StatusBadge = ({ status }: { status: "Ready" | "Completed" | "In Progress" | "Pending" }) => {
    const styles = {
        "Ready": "bg-violet-100 text-violet-700 border-violet-200",
        "Completed": "bg-green-50 text-green-700 border-green-200",
        "In Progress": "bg-blue-50 text-blue-700 border-blue-200",
        "Pending": "bg-slate-100 text-slate-500 border-slate-200"
    };

    const icons = {
        "Ready": AlertTriangle, // Needs attention (to generate)
        "Completed": CheckCircle2,
        "In Progress": FileInput,
        "Pending": MoreHorizontal
    };

    const Icon = icons[status] || MoreHorizontal;

    return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
            <Icon className="w-3.5 h-3.5 mr-1.5" />
            {status === 'Ready' ? 'Ready to Bill' : status}
        </span>
    );
};

export default function MeterBillGeneration() {
    const [activeMenu, setActiveMenu] = useState<number | null>(null);

    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500">

            {/* 1. Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Meter Bill Generation</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage usage-based billing. Input readings and generate invoices.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" icon={Download}>Export Template</Button>
                    <Button variant="secondary" icon={History}>View Logs</Button>
                </div>
            </div>

            {/* 2. Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: "Total Metered Conn.", value: "1,027", icon: Droplets, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Readings Collected", value: "885", icon: FileInput, color: "text-violet-600", bg: "bg-violet-50" },
                    { label: "Pending Readings", value: "142", icon: AlertTriangle, color: "text-orange-600", bg: "bg-orange-50" },
                    { label: "Bills Generated", value: "25", icon: Calculator, color: "text-green-600", bg: "bg-green-50" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-5 rounded-xl border shadow-sm flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-slate-900 mt-2">{stat.value}</h3>
                        </div>
                        <div className={`p-2.5 rounded-lg ${stat.bg} ${stat.color}`}>
                            <stat.icon className="h-5 w-5" />
                        </div>
                    </div>
                ))}
            </div>

            {/* 3. Cycle Tables */}
            <div className="space-y-8">
                {METER_CYCLES.map((cycle) => (
                    <div key={cycle.id} className="bg-white border rounded-xl shadow-sm overflow-hidden">
                        {/* Table Header Section */}
                        <div className="px-6 py-4 border-b bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-base font-semibold text-slate-800">{cycle.title}</h3>
                                <p className="text-sm text-slate-500">Period: {cycle.period}</p>
                            </div>

                            {/* Cycle Level Actions */}
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-slate-500 mr-2">Bulk Actions:</span>
                                <Button size="sm" variant="secondary" icon={FileInput}>Import Readings</Button>
                            </div>
                        </div>

                        {/* Table Content */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-slate-500 font-medium border-b bg-slate-50/30">
                                    <tr>
                                        <th className="px-6 py-3 w-[20%]">Connection Type</th>
                                        <th className="px-6 py-3 w-[35%]">Data Collection</th>
                                        <th className="px-6 py-3 text-center">Status</th>
                                        <th className="px-6 py-3 text-center">Generated</th>
                                        <th className="px-6 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {cycle.groups.map((row) => (
                                        <tr key={row.id} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <span className="font-medium text-slate-700 block">{row.type}</span>
                                                <span className="text-xs text-slate-400">{row.total} Connections</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <ProgressBar current={row.readingsCaptured} total={row.total} />
                                                {row.status === 'In Progress' && (
                                                    <p className="text-xs text-orange-600 mt-1.5 flex items-center">
                                                        <AlertTriangle className="h-3 w-3 mr-1" />
                                                        {row.total - row.readingsCaptured} readings pending
                                                    </p>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <StatusBadge status={row.status as any} />
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="font-mono font-medium text-slate-700 bg-slate-100 px-2 py-1 rounded">
                                                    {row.billsGenerated}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 relative">
                                                    {/* Contextual Primary Action */}
                                                    {row.status === 'Ready' ? (
                                                        <Button variant="primary" size="sm" icon={Calculator}>
                                                            Generate Bills
                                                        </Button>
                                                    ) : row.status === 'Completed' ? (
                                                        <Button variant="secondary" size="sm" icon={Eye}>
                                                            View Bills
                                                        </Button>
                                                    ) : (
                                                        <Button variant="secondary" size="sm" icon={ArrowRight}>
                                                            Enter Readings
                                                        </Button>
                                                    )}

                                                    <button
                                                        className="p-1.5 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
                                                        onClick={() => setActiveMenu(activeMenu === row.id ? null : row.id)}
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </button>

                                                    {/* Dropdown Menu */}
                                                    {activeMenu === row.id && (
                                                        <div className="absolute right-0 top-10 w-52 bg-white rounded-lg shadow-xl border border-slate-100 z-10 animate-in zoom-in-95 duration-200 text-left">
                                                            <div className="py-1">
                                                                <button className="flex items-center w-full px-4 py-2 text-xs text-slate-700 hover:bg-violet-50 hover:text-violet-700">
                                                                    View Connections List
                                                                </button>
                                                                <button className="flex items-center w-full px-4 py-2 text-xs text-slate-700 hover:bg-violet-50 hover:text-violet-700">
                                                                    Download Reading Sheet (Excel)
                                                                </button>
                                                                <div className="border-t border-slate-100 my-1"></div>
                                                                <button className="flex items-center w-full px-4 py-2 text-xs text-red-600 hover:bg-red-50">
                                                                    Reset Readings
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

                        {/* Footer Alert if there are issues */}
                        {cycle.groups.some(g => g.status === 'In Progress') && (
                            <div className="bg-orange-50 px-6 py-2 border-t border-orange-100 flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-orange-600" />
                                <span className="text-xs text-orange-700 font-medium">
                                    Billing cannot be generated for some groups until all meter readings are submitted.
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Backdrop */}
            {activeMenu && (
                <div className="fixed inset-0 z-0" onClick={() => setActiveMenu(null)}></div>
            )}
        </div>
    );
}