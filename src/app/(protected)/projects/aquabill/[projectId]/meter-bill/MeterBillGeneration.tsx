'use client'
import {
    AlertTriangle, ArrowRight, Calculator, CheckCircle2, Download, Droplets, Eye, FileInput,
    History, MoreHorizontal, Play
} from 'lucide-react';
import React, { useState } from 'react';

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
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        secondary: "bg-card border border-border text-foreground hover:bg-accent hover:text-accent-foreground",
        ghost: "bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground",
        outline: "border border-border text-foreground hover:bg-accent hover:text-accent-foreground"
    };
    const sizes: Record<string, string> = {
        sm: "px-3 py-1.5 text-xs",
        default: "px-4 py-2 text-sm",
        icon: "p-2"
    };
    return (
        <button className={`inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
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
                <span className="text-muted-foreground font-medium">Reading Progress</span>
                <span className={`font-medium ${isComplete ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>
                    {current}/{total} ({percentage}%)
                </span>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div
                    className={`h-full transition-all duration-500 ${isComplete ? 'bg-green-500' : 'bg-primary'}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};

const StatusBadge = ({ status }: { status: "Ready" | "Completed" | "In Progress" | "Pending" }) => {
    const styles = {
        "Ready": "bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800",
        "Completed": "bg-green-50 dark:bg-green-500/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800",
        "In Progress": "bg-blue-50 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800",
        "Pending": "bg-secondary text-muted-foreground border-border"
    };

    const icons = {
        "Ready": AlertTriangle,
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
        <div className="p-8 space-y-8 animate-in fade-in duration-500 text-foreground">

            {/* 1. Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Meter Bill Generation</h1>
                    <p className="text-muted-foreground text-sm mt-1">Manage usage-based billing. Input readings and generate invoices.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="secondary" icon={History}>View Logs</Button>
                    <Button variant="secondary" icon={Download}>Export Report</Button>
                </div>
            </div>

            {/* 2. Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: "Total Metered Conn.", value: "1,027", icon: Droplets, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/20" },
                    { label: "Readings Collected", value: "885", icon: FileInput, color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-500/20" },
                    { label: "Pending Readings", value: "142", icon: AlertTriangle, color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-500/20" },
                    { label: "Bills Generated", value: "25", icon: Calculator, color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-500/20" },
                ].map((stat, i) => (
                    <div key={i} className="bg-card p-5 rounded-xl border border-border shadow-sm flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-foreground mt-2">{stat.value}</h3>
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
                    <div key={cycle.id} className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                        {/* Table Header Section */}
                        <div className="px-6 py-4 border-b border-border bg-muted/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-base font-semibold text-foreground">{cycle.title}</h3>
                                <p className="text-sm text-muted-foreground">Period: {cycle.period}</p>
                            </div>

                            {/* Cycle Level Actions */}
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-muted-foreground mr-2">Bulk Actions:</span>
                                <Button size="sm" variant="secondary" icon={FileInput}>Import Readings</Button>
                            </div>
                        </div>

                        {/* Table Content */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-muted-foreground font-medium border-b border-border bg-muted/50">
                                    <tr>
                                        <th className="px-6 py-3 w-[20%]">Connection Type</th>
                                        <th className="px-6 py-3 w-[35%]">Data Collection</th>
                                        <th className="px-6 py-3 text-center">Status</th>
                                        <th className="px-6 py-3 text-center">Generated</th>
                                        <th className="px-6 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {cycle.groups.map((row) => (
                                        <tr key={row.id} className="group hover:bg-accent/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <span className="font-medium text-foreground block">{row.type}</span>
                                                <span className="text-xs text-muted-foreground">{row.total} Connections</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <ProgressBar current={row.readingsCaptured} total={row.total} />
                                                {row.status === 'In Progress' && (
                                                    <p className="text-xs text-orange-600 dark:text-orange-400 mt-1.5 flex items-center">
                                                        <AlertTriangle className="h-3 w-3 mr-1" />
                                                        {row.total - row.readingsCaptured} readings pending
                                                    </p>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <StatusBadge status={row.status as any} />
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="font-mono font-medium text-foreground bg-secondary px-2 py-1 rounded">
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
                                                        className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                                                        onClick={() => setActiveMenu(activeMenu === row.id ? null : row.id)}
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </button>

                                                    {/* Dropdown Menu */}
                                                    {activeMenu === row.id && (
                                                        <div className="absolute right-0 top-10 w-52 bg-card rounded-lg shadow-xl border border-border z-10 animate-in zoom-in-95 duration-200 text-left">
                                                            <div className="py-1">
                                                                <button className="flex items-center w-full px-4 py-2 text-xs text-foreground hover:bg-primary/10 hover:text-primary">
                                                                    View Connections List
                                                                </button>
                                                                <button className="flex items-center w-full px-4 py-2 text-xs text-foreground hover:bg-primary/10 hover:text-primary">
                                                                    Download Reading Sheet (Excel)
                                                                </button>
                                                                <div className="border-t border-border my-1"></div>
                                                                <button className="flex items-center w-full px-4 py-2 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20">
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
                            <div className="bg-orange-50 dark:bg-orange-500/10 px-6 py-2 border-t border-orange-100 dark:border-orange-900/50 flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                <span className="text-xs text-orange-700 dark:text-orange-300 font-medium">
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