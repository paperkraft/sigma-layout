'use client'
import React from 'react';
import {
    TrendingUp,
    TrendingDown,
    Users,
    AlertCircle,
    Wallet,
    ArrowRight,
    MoreHorizontal,
    Plus,
    FileText
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar
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
    <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500">{title}</h3>
            <div className="p-2 bg-slate-50 rounded-lg">
                <Icon className="h-5 w-5 text-slate-700" />
            </div>
        </div>
        <div className="flex items-baseline space-x-2">
            <h2 className="text-3xl font-bold text-slate-900">{value}</h2>
            <span className={`flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${trendUp ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                {trendUp ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {trendValue}
            </span>
        </div>
        <p className="text-xs text-slate-400 mt-2">{trend}</p>
    </div>
);

const SectionHeader = ({ title, action }: any) => (
    <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
        {action && (
            <button className="text-sm text-violet-600 hover:text-violet-700 font-medium flex items-center transition-colors">
                {action} <ArrowRight className="ml-1 h-4 w-4" />
            </button>
        )}
    </div>
);

export default function DashboardHome() {
    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500">

            {/* 1. Header & Quick Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
                    <p className="text-slate-500 text-sm mt-1">Overview of your billing operations and network status.</p>
                </div>
                <div className="flex gap-3">
                    <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 shadow-sm transition-all">
                        <FileText className="h-4 w-4 mr-2" />
                        Generate Report
                    </button>
                    <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 shadow-sm transition-all">
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
                    trendUp={true} // Interpreting reduction in dues as positive
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
                    <div className="bg-white p-6 rounded-xl border shadow-sm">
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
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        itemStyle={{ fontSize: '12px', fontWeight: 500 }}
                                    />
                                    <Area type="monotone" dataKey="meter" name="Metered" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorMeter)" />
                                    <Area type="monotone" dataKey="flat" name="Flat Rate" stroke="#64748b" strokeWidth={2} fillOpacity={1} fill="url(#colorFlat)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Recent Payments Table */}
                    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                        <div className="p-6 pb-4 border-b">
                            <SectionHeader title="Recent Transactions" action="View All Payments" />
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50 text-slate-500 font-medium">
                                    <tr>
                                        <th className="px-6 py-3">Transaction ID</th>
                                        <th className="px-6 py-3">Customer</th>
                                        <th className="px-6 py-3">Date</th>
                                        <th className="px-6 py-3">Amount</th>
                                        <th className="px-6 py-3">Status</th>
                                        <th className="px-6 py-3 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {recentPayments.map((payment, i) => (
                                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-slate-700">{payment.id}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-slate-900 font-medium">{payment.name}</span>
                                                    <span className="text-xs text-slate-400">{payment.method}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500">{payment.date}</td>
                                            <td className="px-6 py-4 font-medium text-slate-900">{payment.amount}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${payment.status === 'Success' ? 'bg-green-100 text-green-700' :
                                                    payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                                    }`}>
                                                    {payment.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-slate-400 hover:text-slate-600">
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
                    <div className="bg-white p-6 rounded-xl border shadow-sm">
                        <h3 className="font-semibold text-slate-800 mb-4 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-2 text-violet-600" />
                            Operational Alerts
                        </h3>
                        <div className="space-y-4">
                            {alerts.map((alert) => (
                                <div key={alert.id} className="flex gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                                    <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${alert.type === 'critical' ? 'bg-red-500' :
                                        alert.type === 'warning' ? 'bg-orange-400' : 'bg-blue-400'
                                        }`} />
                                    <div>
                                        <p className="text-sm text-slate-700 leading-snug">{alert.message}</p>
                                        <p className="text-xs text-slate-400 mt-1">{alert.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-4 py-2 text-sm text-slate-500 hover:text-slate-800 border border-dashed rounded-lg hover:bg-slate-50 transition-colors">
                            View All Notifications
                        </button>
                    </div>

                    {/* Quick Actions Grid */}
                    <div className="bg-violet-900 p-6 rounded-xl shadow-lg text-white">
                        <h3 className="font-semibold mb-4 text-violet-100">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-3">
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
                    <div className="bg-white p-6 rounded-xl border shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-slate-500">Zone Performance</h3>
                            <span className="text-xs text-green-600 font-medium">+5%</span>
                        </div>
                        <div className="space-y-3">
                            {[
                                { label: "North-West", pct: 78, color: "bg-violet-500" },
                                { label: "West-East", pct: 62, color: "bg-blue-400" },
                                { label: "South Block", pct: 45, color: "bg-slate-300" }
                            ].map((zone, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-slate-700">{zone.label}</span>
                                        <span className="text-slate-500">{zone.pct}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
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