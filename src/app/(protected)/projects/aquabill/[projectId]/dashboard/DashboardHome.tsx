'use client'
import {
    AlertCircle, ArrowRight, FileText, MoreHorizontal, Plus, TrendingDown, TrendingUp, Users, Wallet
} from 'lucide-react';
import React from 'react';
import {
    Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts';

// --- Mock Data ---
const revenueData = [
    { name: 'Jan', flat: 4000, meter: 2400 },
    { name: 'Feb', flat: 3000, meter: 1398 },
    { name: 'Mar', flat: 2000, meter: 9800 },
    { name: 'Apr', flat: 2780, meter: 3908 },
    { name: 'May', flat: 1890, meter: 4800 },
    { name: 'Jun', flat: 2390, meter: 3800 },
    { name: 'Jul', flat: 3490, meter: 4300 },
];

const recentPayments = [
    { id: "TXN-8821", name: "Kirti Gopal Patil", amount: "₹450.00", date: "Today, 10:23 AM", status: "Success", method: "UPI" },
    { id: "TXN-8822", name: "Devansh M Patil", amount: "₹1,200.00", date: "Today, 09:15 AM", status: "Success", method: "Cash" },
    { id: "TXN-8823", name: "Amit Sharma", amount: "₹850.00", date: "Yesterday", status: "Pending", method: "Cheque" },
    { id: "TXN-8824", name: "Priya Deshmukh", amount: "₹300.00", date: "Yesterday", status: "Success", method: "Online" },
];

const alerts = [
    { id: 1, type: "critical", message: "3 Meters reported 'Out of Order' in North Zone", time: "2h ago" },
    { id: 2, type: "warning", message: "Billing cycle for 'Commercial' is ending soon", time: "5h ago" },
    { id: 3, type: "info", message: "New tariff rates applied successfully", time: "1d ago" },
];

// --- Sub-Components ---

const StatCard = ({ title, value, trend, trendValue, icon: Icon, trendUp }: any) => (
    <div className="p-6 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <div className="p-2 bg-secondary rounded-lg">
                <Icon className="h-5 w-5 text-foreground" />
            </div>
        </div>
        <div className="flex items-baseline space-x-2">
            <h2 className="text-3xl font-bold text-foreground">{value}</h2>
            <span className={`flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${trendUp
                ? 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400'
                : 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400'
                }`}>
                {trendUp ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {trendValue}
            </span>
        </div>
        <p className="text-xs text-muted-foreground mt-2">{trend}</p>
    </div>
);

const SectionHeader = ({ title, action }: any) => (
    <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {action && (
            <button className="text-sm text-primary hover:text-primary/80 font-medium flex items-center transition-colors">
                {action} <ArrowRight className="ml-1 h-4 w-4" />
            </button>
        )}
    </div>
);

export default function DashboardHome() {
    return (
        <div className="max-w-400 mx-auto p-6 md:p-8 space-y-8 animate-in fade-in duration-500 text-foreground">

            {/* 1. Header & Quick Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground text-sm mt-1">Overview of your billing operations and network status.</p>
                </div>
                <div className="flex gap-3">
                    <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-foreground bg-card border border-border rounded-lg hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-sm transition-all">
                        <FileText className="h-4 w-4 mr-2" />
                        Generate Report
                    </button>
                    <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-sm transition-all">
                        <Plus className="h-4 w-4 mr-2" />
                        New Connection
                    </button>
                </div>
            </div>

            {/* 2. Key Performance Indicators (KPIs) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Revenue"
                    value="₹4,23,050"
                    trend="vs last month"
                    trendValue="+12.5%"
                    trendUp={true}
                    icon={Wallet}
                />
                <StatCard
                    title="Active Connections"
                    value="1,248"
                    trend="New enrollments"
                    trendValue="+34"
                    trendUp={true}
                    icon={Users}
                />
                <StatCard
                    title="Pending Dues"
                    value="₹86,400"
                    trend="Uncollected bills"
                    trendValue="-2.4%"
                    trendUp={true}
                    icon={AlertCircle}
                />
                <StatCard
                    title="Meter Efficiency"
                    value="98.2%"
                    trend="Working meters"
                    trendValue="-0.8%"
                    trendUp={false}
                    icon={TrendingUp}
                />
            </div>

            {/* 3. Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Analytics (Span 2) */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Revenue Chart */}
                    <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                        <SectionHeader title="Revenue Overview" action="View Full Report" />
                        <div className="h-75 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorMeter" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorFlat" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#64748b" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#64748b" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    {/* Updated Grid Color for Dark Mode */}
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'hsl(var(--card))',
                                            borderRadius: '8px',
                                            border: '1px solid hsl(var(--border))',
                                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                            color: 'hsl(var(--foreground))'
                                        }}
                                        itemStyle={{ fontSize: '12px', fontWeight: 500 }}
                                    />
                                    <Area type="monotone" dataKey="meter" name="Metered" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorMeter)" />
                                    <Area type="monotone" dataKey="flat" name="Flat Rate" stroke="#64748b" strokeWidth={2} fillOpacity={1} fill="url(#colorFlat)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Recent Payments Table */}
                    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                        <div className="p-6 pb-4 border-b border-border">
                            <SectionHeader title="Recent Transactions" action="View All Payments" />
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-muted/50 text-muted-foreground font-medium">
                                    <tr>
                                        <th className="px-6 py-3">Transaction ID</th>
                                        <th className="px-6 py-3">Customer</th>
                                        <th className="px-6 py-3">Date</th>
                                        <th className="px-6 py-3">Amount</th>
                                        <th className="px-6 py-3">Status</th>
                                        <th className="px-6 py-3 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {recentPayments.map((payment, i) => (
                                        <tr key={i} className="hover:bg-muted/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-foreground">{payment.id}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-foreground font-medium">{payment.name}</span>
                                                    <span className="text-xs text-muted-foreground">{payment.method}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-muted-foreground">{payment.date}</td>
                                            <td className="px-6 py-4 font-medium text-foreground">{payment.amount}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${payment.status === 'Success'
                                                    ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400'
                                                    : payment.status === 'Pending'
                                                        ? 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400'
                                                        : 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400'
                                                    }`}>
                                                    {payment.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-muted-foreground hover:text-foreground">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column: Alerts & Quick Actions (Span 1) */}
                <div className="space-y-6">

                    {/* Operational Alerts */}
                    <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                        <h3 className="font-semibold text-foreground mb-4 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-2 text-primary" />
                            Operational Alerts
                        </h3>
                        <div className="space-y-4">
                            {alerts.map((alert) => (
                                <div key={alert.id} className="flex gap-3 p-3 rounded-lg bg-secondary/50 border border-border">
                                    <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${alert.type === 'critical' ? 'bg-red-500' :
                                        alert.type === 'warning' ? 'bg-orange-400' : 'bg-blue-400'
                                        }`} />
                                    <div>
                                        <p className="text-sm text-foreground leading-snug">{alert.message}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-dashed border-border rounded-lg hover:bg-muted/50 transition-colors">
                            View All Notifications
                        </button>
                    </div>

                    {/* Quick Actions Grid (Kept dark violet brand color even in light mode) */}
                    <div className="bg-violet-900 p-6 rounded-xl shadow-lg text-white">
                        <h3 className="font-semibold mb-4 text-violet-100">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {/* Buttons use white/10 for transparency, works on the dark violet background */}
                            <button className="p-3 bg-white/10 hover:bg-white/20 rounded-lg text-left transition-colors">
                                <Wallet className="h-5 w-5 mb-2 text-violet-200" />
                                <span className="text-xs font-medium block">Record Payment</span>
                            </button>
                            <button className="p-3 bg-white/10 hover:bg-white/20 rounded-lg text-left transition-colors">
                                <Users className="h-5 w-5 mb-2 text-violet-200" />
                                <span className="text-xs font-medium block">New Customer</span>
                            </button>
                            <button className="p-3 bg-white/10 hover:bg-white/20 rounded-lg text-left transition-colors">
                                <FileText className="h-5 w-5 mb-2 text-violet-200" />
                                <span className="text-xs font-medium block">Print Bill</span>
                            </button>
                            <button className="p-3 bg-white/10 hover:bg-white/20 rounded-lg text-left transition-colors">
                                <AlertCircle className="h-5 w-5 mb-2 text-violet-200" />
                                <span className="text-xs font-medium block">Log Complaint</span>
                            </button>
                        </div>
                    </div>

                    {/* Mini Zone Stat */}
                    <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-muted-foreground">Zone Performance</h3>
                            <span className="text-xs text-green-600 dark:text-green-400 font-medium">+5%</span>
                        </div>
                        <div className="space-y-3">
                            {[
                                { label: "North-West", pct: 78, color: "bg-violet-500" },
                                { label: "West-East", pct: 62, color: "bg-blue-400" },
                                { label: "South Block", pct: 45, color: "bg-slate-300 dark:bg-slate-700" }
                            ].map((zone, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-foreground">{zone.label}</span>
                                        <span className="text-muted-foreground">{zone.pct}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                                        <div className={`h-full ${zone.color}`} style={{ width: `${zone.pct}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}