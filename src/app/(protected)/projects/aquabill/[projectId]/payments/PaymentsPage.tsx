'use client'
import {
    AlertCircle, ArrowUpRight, Banknote, CheckCircle2, ChevronDown, Clock, CreditCard, Download,
    Filter, MoreHorizontal, Search
} from 'lucide-react';
import React, { useState } from 'react';

// --- Mock Data based on Screenshot ---
const TRANSACTIONS = [
    {
        id: "10001116",
        billNo: "13931",
        name: "Ajit Patil",
        method: "Meter",
        type: "Domestic",
        zone: "North-West",
        cycle: "Monthly",
        billDate: "12-Jan-2026",
        amount: 40.00,
        status: "Unpaid",
        dueDate: "20-Jan-2026"
    },
    {
        id: "10001117",
        billNo: "13932",
        name: "Nilesh Patil",
        method: "Meter",
        type: "Domestic",
        zone: "West-East",
        cycle: "Monthly",
        billDate: "12-Jan-2026",
        amount: 240.00,
        status: "Unpaid",
        dueDate: "22-Jan-2026"
    },
    {
        id: "10001115",
        billNo: "13928",
        name: "Amit Sharma",
        method: "Flat",
        type: "Commercial",
        zone: "South-Block",
        cycle: "Yearly",
        billDate: "10-Jan-2026",
        amount: 1200.00,
        status: "Paid",
        paymentDate: "14-Jan-2026",
        paymentMode: "UPI"
    },
    {
        id: "10001119",
        billNo: "13925",
        name: "Umesh Deshmukh",
        method: "Meter",
        type: "Domestic",
        zone: "North-West",
        cycle: "Monthly",
        billDate: "05-Jan-2026",
        amount: 450.00,
        status: "Paid",
        paymentDate: "06-Jan-2026",
        paymentMode: "Cash"
    }
];

// --- Components ---

const Button = ({ children, variant = "secondary", size = "default", className, icon: Icon, ...props }: any) => {
    const variants: Record<string, string> = {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        secondary: "bg-card border border-border text-foreground hover:bg-accent hover:text-accent-foreground",
        ghost: "bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground",
        success: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
    };
    const sizes: Record<string, string> = {
        sm: "px-3 py-1.5 text-xs",
        default: "px-4 py-2 text-sm",
        icon: "p-2"
    };
    return (
        <button className={`inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary/50 ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
            {Icon && <Icon className={`h-4 w-4 ${children ? 'mr-2' : ''}`} />}
            {children}
        </button>
    );
};

const Select = ({ label, options }: any) => (
    <div className="space-y-1 min-w-35">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</label>
        <div className="relative">
            <select className="w-full appearance-none bg-card border border-border text-foreground text-sm rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow">
                <option>All</option>
                {options.map((opt: any) => <option key={opt}>{opt}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
        </div>
    </div>
);

const AmountDisplay = ({ amount, status }: any) => {
    return (
        <div className="flex flex-col items-end">
            <span className={`text-base font-bold font-mono ${status === 'Unpaid' ? 'text-foreground' : 'text-emerald-600 dark:text-emerald-400'}`}>
                ₹{amount.toFixed(2)}
            </span>
            {status === 'Unpaid' && <span className="text-xs text-muted-foreground">Due</span>}
        </div>
    );
};

// Helper Icon for the Bill Type
function FileIcon({ type }: any) {
    if (type === 'Paid') return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
    return <CreditCard className="h-4 w-4 text-muted-foreground" />;
}

export default function PaymentsPage() {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    return (
        <div className="p-8 space-y-6 animate-in fade-in duration-500 text-foreground">

            {/* 1. Page Header & Stats */}
            <div className="flex flex-col space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Bills & Payments</h1>
                        <p className="text-muted-foreground text-sm mt-1">Track bill history, record collections, and manage dues.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="secondary" icon={Download}>Export Statement</Button>
                        <Button variant="primary" icon={Banknote}>Bulk Payment</Button>
                    </div>
                </div>

                {/* Financial Context Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase">Collected Today</p>
                            <h3 className="text-2xl font-bold text-foreground mt-1">₹24,500</h3>
                        </div>
                        <div className="p-2 bg-emerald-50 dark:bg-emerald-500/20 rounded-lg text-emerald-600 dark:text-emerald-400"><Banknote className="h-6 w-6" /></div>
                    </div>
                    <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase">Pending Dues</p>
                            <h3 className="text-2xl font-bold text-foreground mt-1">₹1.2L</h3>
                        </div>
                        <div className="p-2 bg-orange-50 dark:bg-orange-500/20 rounded-lg text-orange-600 dark:text-orange-400"><Clock className="h-6 w-6" /></div>
                    </div>
                    <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase">Success Rate</p>
                            <h3 className="text-2xl font-bold text-foreground mt-1">98.5%</h3>
                        </div>
                        <div className="p-2 bg-blue-50 dark:bg-blue-500/20 rounded-lg text-blue-600 dark:text-blue-400"><ArrowUpRight className="h-6 w-6" /></div>
                    </div>
                </div>
            </div>

            {/* 2. Filters & Search */}
            <div className="bg-card border border-border rounded-xl shadow-sm p-5">
                <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-end">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full lg:w-auto">
                        <Select label="Payment Status" options={["Unpaid", "Paid", "Overdue"]} />
                        <Select label="Method" options={["Flat Rate", "Metered"]} />
                        <Select label="Zone" options={["North-West", "West-East"]} />
                        <Select label="Cycle" options={["Monthly", "Yearly"]} />
                    </div>

                    <div className="flex items-center gap-2 w-full lg:w-auto">
                        <div className="relative flex-1 lg:w-80">
                            <input
                                type="text"
                                placeholder="Search Bill No, Customer Name..."
                                className="w-full pl-9 pr-4 py-2 bg-secondary/30 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground placeholder:text-muted-foreground"
                            />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        </div>
                        <Button variant="secondary" icon={Filter}>Filter</Button>
                    </div>
                </div>
            </div>

            {/* 3. Main Transactions Table */}
            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto min-h-100">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/50 border-b border-border text-muted-foreground font-medium">
                            <tr>
                                <th className="px-6 py-3">Bill Details</th>
                                <th className="px-6 py-3">Customer</th>
                                <th className="px-6 py-3">Connection Info</th>
                                <th className="px-6 py-3">Dates</th>
                                <th className="px-6 py-3 text-right">Amount</th>
                                <th className="px-6 py-3 text-center">Status</th>
                                <th className="px-6 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {TRANSACTIONS.map((row) => (
                                <tr key={row.billNo} className="group hover:bg-accent/50 transition-colors">

                                    {/* Bill Details */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-secondary rounded text-muted-foreground">
                                                <FileIcon type={row.status} />
                                            </div>
                                            <div>
                                                <span className="block font-medium text-foreground">#{row.billNo}</span>
                                                <span className="text-xs text-muted-foreground">{row.cycle}</span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Customer */}
                                    <td className="px-6 py-4">
                                        <span className="block font-medium text-foreground">{row.name}</span>
                                        <span className="text-xs text-muted-foreground font-mono">ID: {row.id}</span>
                                    </td>

                                    {/* Connection Info */}
                                    <td className="px-6 py-4">
                                        <div className="text-muted-foreground text-xs space-y-1">
                                            <div className="flex items-center gap-1">
                                                <span className="px-1.5 py-0.5 rounded border border-border bg-secondary/50 text-foreground">{row.method}</span>
                                                <span>{row.type}</span>
                                            </div>
                                            <div className="text-muted-foreground/70">{row.zone}</div>
                                        </div>
                                    </td>

                                    {/* Dates */}
                                    <td className="px-6 py-4 text-muted-foreground">
                                        <div className="flex flex-col text-xs">
                                            <span>Gen: {row.billDate}</span>
                                            {row.status === 'Paid' ? (
                                                <span className="text-emerald-600 dark:text-emerald-400 font-medium mt-1">Paid: {row.paymentDate}</span>
                                            ) : (
                                                <span className="text-orange-600 dark:text-orange-400 font-medium mt-1">Due: {row.dueDate}</span>
                                            )}
                                        </div>
                                    </td>

                                    {/* Amount */}
                                    <td className="px-6 py-4 text-right">
                                        <AmountDisplay amount={row.amount} status={row.status} />
                                    </td>

                                    {/* Status Badge */}
                                    <td className="px-6 py-4 text-center">
                                        {row.status === 'Paid' ? (
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                                                <CheckCircle2 className="w-3 h-3 mr-1" /> Paid
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                                                <AlertCircle className="w-3 h-3 mr-1" /> Unpaid
                                            </span>
                                        )}
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 relative">
                                            {row.status === 'Unpaid' ? (
                                                <Button variant="primary" size="sm">
                                                    Record Payment
                                                </Button>
                                            ) : (
                                                <Button variant="ghost" size="sm" icon={Download} className="text-muted-foreground hover:text-foreground">
                                                    Receipt
                                                </Button>
                                            )}

                                            <button
                                                className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                                                onClick={() => setActiveMenu(activeMenu === row.billNo ? null : row.billNo)}
                                            >
                                                <MoreHorizontal className="h-4 w-4" />
                                            </button>

                                            {/* Dropdown Menu */}
                                            {activeMenu === row.billNo && (
                                                <div className="absolute right-0 top-10 w-48 bg-card rounded-lg shadow-xl border border-border z-10 animate-in zoom-in-95 duration-200 text-left">
                                                    <div className="py-1">
                                                        <button className="flex items-center w-full px-4 py-2 text-xs text-foreground hover:bg-primary/10 hover:text-primary">
                                                            View Bill Details
                                                        </button>
                                                        <button className="flex items-center w-full px-4 py-2 text-xs text-foreground hover:bg-primary/10 hover:text-primary">
                                                            Billing History
                                                        </button>
                                                        {row.status === 'Unpaid' && (
                                                            <>
                                                                <div className="border-t border-border my-1"></div>
                                                                <button className="flex items-center w-full px-4 py-2 text-xs text-foreground hover:bg-primary/10 hover:text-primary">
                                                                    Edit Bill Amount
                                                                </button>
                                                            </>
                                                        )}
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

            {/* Backdrop */}
            {activeMenu && (
                <div className="fixed inset-0 z-0" onClick={() => setActiveMenu(null)}></div>
            )}
        </div>
    );
}