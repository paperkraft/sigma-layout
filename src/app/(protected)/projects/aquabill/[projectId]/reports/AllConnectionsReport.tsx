import React, { useState } from 'react';
import {
    Download,
    Printer,
    Search,
    Filter,
    RefreshCw,
    Layout,
    Settings2,
    ChevronLeft,
    ChevronRight,
    MapPin,
    Phone,
    Mail,
    Calendar,
    Hash,
    Activity
} from 'lucide-react';

// --- Mock Data based on Screenshot ---
const REPORT_DATA = Array.from({ length: 15 }).map((_, i) => ({
    id: `100011${14 + i}`,
    appNo: `${222 + i}`,
    migrated: i % 4 === 0,
    firstName: ["Kirti", "Devansh", "Rahul", "Priya", "Amit"][i % 5],
    middleName: ["Gopal", "Mangesh", "S", "A", "Kumar"][i % 5],
    lastName: "Patil",
    mobile: `74482293${40 + i}`,
    email: `user${i}@gmail.com`,
    address: "Kolhapur, Ward A, Near Main Sq",
    billMethod: i % 2 === 0 ? "Flat" : "Meter",
    billCycle: i % 2 === 0 ? "Monthly" : "Yearly",
    connType: "Domestic",
    connSize: "0.5 Inch",
    zone: i % 3 === 0 ? "North-West" : "West-East",
    zoneTag: "Tag A",
    status: "Active",
    meterNo: i % 2 === 0 ? null : `MTR-${8839 + i}`,
    gisId: `${10 + i}`,
    dateCreated: "12-Jan-2026"
}));

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
        <button className={`inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-violet-500 ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
            {Icon && <Icon className={`h-4 w-4 ${children ? 'mr-2' : ''}`} />}
            {children}
        </button>
    );
};

const Select = ({ label, options }: any) => (
    <div className="space-y-1 min-w-30">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</label>
        <select className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-md px-2 py-1.5 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500">
            <option>All</option>
            {options.map((opt: any) => <option key={opt}>{opt}</option>)}
        </select>
    </div>
);

const Badge = ({ children, variant }: any) => {
    const styles: Record<string, string> = {
        green: "bg-emerald-50 text-emerald-700 border-emerald-100",
        blue: "bg-blue-50 text-blue-700 border-blue-100",
        slate: "bg-slate-100 text-slate-600 border-slate-200",
        purple: "bg-violet-50 text-violet-700 border-violet-100",
        orange: "bg-orange-50 text-orange-700 border-orange-100"
    };
    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wide ${styles[variant] || styles.slate}`}>
            {children}
        </span>
    );
};

export default function AllConnectionsReport() {
    const [isCompact, setIsCompact] = useState(false);

    return (
        <div className="p-6 space-y-6 h-screen flex flex-col bg-slate-50/50">

            {/* 1. Header & Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Connections Master Report</h1>
                    <p className="text-slate-500 text-sm mt-1">Unified view of subscriber data, technical specs, and location details.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="secondary" icon={Printer}>Print</Button>
                    <Button variant="primary" icon={Download}>Export Data</Button>
                </div>
            </div>

            {/* 2. Filter Bar */}
            <div className="bg-white border rounded-xl shadow-sm p-4 shrink-0">
                <div className="flex flex-col lg:flex-row gap-4 items-end">
                    <div className="flex-1 overflow-x-auto pb-2 lg:pb-0 w-full">
                        <div className="flex gap-3 min-w-max">
                            <Select label="Billing Method" options={["Flat Rate", "Metered"]} />
                            <Select label="Conn Type" options={["Domestic", "Commercial"]} />
                            <Select label="Zone" options={["North-West", "West-East"]} />
                            <Select label="Status" options={["Active", "Disconnected"]} />
                            <Select label="Migrated" options={["Yes", "No"]} />
                        </div>
                    </div>
                    <div className="flex gap-2 w-full lg:w-auto shrink-0">
                        <Button variant="secondary" icon={RefreshCw} className="px-3" />
                        <div className="relative w-64">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                            />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Grouped Data Grid */}
            <div className="bg-white border rounded-xl shadow-sm flex-1 flex flex-col overflow-hidden relative">

                {/* Toolbar */}
                <div className="px-4 py-2 border-b bg-slate-50/50 flex justify-between items-center shrink-0">
                    <div className="text-xs text-slate-500 font-medium">1,240 Total Connections</div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsCompact(!isCompact)}
                            className={`p-1.5 rounded hover:bg-slate-200 transition-colors ${isCompact ? 'text-violet-600 bg-violet-50' : 'text-slate-500'}`}
                            title="Compact View"
                        >
                            <Layout className="h-4 w-4" />
                        </button>
                        <button className="flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded border bg-white">
                            <Settings2 className="h-3.5 w-3.5" /> Columns
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="flex-1 overflow-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider sticky top-0 z-20 shadow-sm">
                            <tr>
                                <th className="px-6 py-3 border-b">Customer Identity</th>
                                <th className="px-6 py-3 border-b">Contact Info</th>
                                <th className="px-6 py-3 border-b">Billing Config</th>
                                <th className="px-6 py-3 border-b">Technical Specs</th>
                                <th className="px-6 py-3 border-b">Location</th>
                                <th className="px-6 py-3 border-b text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className={`divide-y divide-slate-100 ${isCompact ? 'text-xs' : 'text-sm'}`}>
                            {REPORT_DATA.map((row, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">

                                    {/* Column 1: Customer Identity */}
                                    <td className={`px-6 ${isCompact ? 'py-2' : 'py-4'} align-top`}>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-slate-900 text-base">
                                                {row.firstName} {row.middleName} {row.lastName}
                                            </span>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="font-mono text-xs text-slate-500 bg-slate-100 px-1.5 rounded border">ID: {row.id}</span>
                                                {row.migrated && <Badge variant="purple">Migrated</Badge>}
                                            </div>
                                            <span className="text-xs text-slate-400 mt-0.5">App No: {row.appNo}</span>
                                        </div>
                                    </td>

                                    {/* Column 2: Contact Info */}
                                    <td className={`px-6 ${isCompact ? 'py-2' : 'py-4'} align-top`}>
                                        <div className="space-y-1">
                                            <div className="flex items-center text-slate-700">
                                                <Phone className="h-3.5 w-3.5 mr-2 text-slate-400" />
                                                {row.mobile}
                                            </div>
                                            <div className="flex items-center text-slate-600">
                                                <Mail className="h-3.5 w-3.5 mr-2 text-slate-400" />
                                                {row.email}
                                            </div>
                                        </div>
                                    </td>

                                    {/* Column 3: Billing Config */}
                                    <td className={`px-6 ${isCompact ? 'py-2' : 'py-4'} align-top`}>
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center justify-between">
                                                <span className="text-slate-500 text-xs">Method:</span>
                                                <span className="font-medium text-slate-700">{row.billMethod}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-slate-500 text-xs">Cycle:</span>
                                                <span className="font-medium text-slate-700">{row.billCycle}</span>
                                            </div>
                                            <div className="flex items-center justify-between border-t border-dashed pt-1 mt-0.5">
                                                <span className="text-slate-500 text-xs">Type:</span>
                                                <span className="font-medium text-slate-700">{row.connType}</span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Column 4: Technical Specs */}
                                    <td className={`px-6 ${isCompact ? 'py-2' : 'py-4'} align-top`}>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <Badge variant="slate">{row.connSize}</Badge>
                                                {row.meterNo ? (
                                                    <Badge variant="blue">Metered</Badge>
                                                ) : (
                                                    <Badge variant="orange">Flat</Badge>
                                                )}
                                            </div>
                                            <div className="text-xs text-slate-500 mt-1 space-y-0.5">
                                                <div className="flex items-center">
                                                    <Activity className="h-3 w-3 mr-1.5 opacity-50" />
                                                    Meter: <span className="text-slate-700 ml-1 font-mono">{row.meterNo || 'N/A'}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Hash className="h-3 w-3 mr-1.5 opacity-50" />
                                                    GIS: <span className="text-slate-700 ml-1 font-mono">{row.gisId}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Column 5: Location */}
                                    <td className={`px-6 ${isCompact ? 'py-2' : 'py-4'} align-top`}>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-slate-700 flex items-center">
                                                <MapPin className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                                                {row.zone}
                                            </span>
                                            <span className="text-xs text-slate-500 ml-5">{row.address}</span>
                                            <div className="ml-5 mt-1">
                                                <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border">{row.zoneTag}</span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Column 6: Status */}
                                    <td className={`px-6 ${isCompact ? 'py-2' : 'py-4'} align-top text-center`}>
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                                            Active
                                        </span>
                                        <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-center">
                                            <Calendar className="h-3 w-3 mr-1" />
                                            {row.dateCreated}
                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="p-3 border-t bg-white shrink-0 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span>Rows per page:</span>
                        <select className="bg-slate-50 border border-slate-200 text-xs rounded px-2 py-1">
                            <option>15</option>
                            <option>50</option>
                            <option>100</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-slate-500">1-15 of 1,240</span>
                        <div className="flex gap-1">
                            <button className="p-1.5 hover:bg-slate-100 rounded border disabled:opacity-50"><ChevronLeft className="h-4 w-4" /></button>
                            <button className="p-1.5 hover:bg-slate-100 rounded border"><ChevronRight className="h-4 w-4" /></button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}