'use client'
import React, { useState } from 'react';
import {
    Download,
    Printer,
    RefreshCw,
    Layout,
    ChevronLeft,
    ChevronRight,
    MapPin,
    Phone,
    Mail,
    Calendar,
    Hash,
    Activity
} from 'lucide-react';
import { Badge } from '@/components/shared/custom-badge';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import SelectControl from '@/features/projects/aquabill/form-controls/select-control';
import { billingMethodOptions, connectionOptions, statusOptions, zoneOptions } from '@/config/master_dummy';
import InputControl from '@/features/projects/aquabill/form-controls/input-control';

// --- Mock Data ---
const REPORT_DATA = Array.from({ length: 15 }).map((_, i) => ({
    id: `100011${14 + i}`,
    appNo: `${222 + i}`,
    migrated: i % 4 === 0,
    firstName: ["Nilesh", "Rohit", "Rahul", "Priya", "Amit"][i % 5],
    middleName: ["J", "P", "S", "A", "K"][i % 5],
    lastName: "Patil",
    mobile: `88888888${40 + i}`,
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

const allOption = [{ label: "All", value: "all" }]

export default function AllConnectionsReport() {
    const [isCompact, setIsCompact] = useState(false);

    return (
        <div className="max-w-screen-2xl mx-auto p-4 md:p-7 space-y-4">

            {/* 1. Header & Actions */}
            <PageHeader title={'Connections Master Report'} description={'Unified view of subscriber data, technical specs, and location details.'}>
                <div className="flex flex-wrap gap-2">
                    <Button variant="outline"><Printer size={16} />Print</Button>
                    <Button><Download size={16} />Export Data</Button>
                </div>
            </PageHeader>

            {/* 2. Filter Bar */}
            <div className="bg-card border border-border rounded-xl shadow-sm p-4 shrink-0">
                <div className="flex flex-col lg:flex-row gap-4 items-end">
                    <div className="flex-1 overflow-x-auto pb-2 lg:pb-0 w-full">
                        <div className="flex gap-3 min-w-max p-1">
                            <SelectControl value={'all'} onChange={(v) => { console.log(v) }} name='method' label="Billing Method" options={[...allOption, ...billingMethodOptions]} />
                            <SelectControl value={'all'} onChange={(v) => { console.log(v) }} name='type' label="Conn Type" options={[...allOption, ...connectionOptions]} />
                            <SelectControl value={'all'} onChange={(v) => { console.log(v) }} name='zone' label="Zone" options={[...allOption, ...zoneOptions]} />
                            <SelectControl value={'all'} onChange={(v) => { console.log(v) }} name='status' label="Status" options={[...allOption, ...statusOptions]} />
                        </div>
                    </div>
                    <div className="flex gap-2 w-full lg:w-auto shrink-0 p-1">
                        <Button variant="outline" size={'icon'}><RefreshCw /></Button>
                        <InputControl
                            search
                            name='search'
                            placeholder='Search...'
                            value={''}
                            onChange={(v) => console.log(v)}
                            className='w-64'
                        />
                    </div>
                </div>
            </div>

            {/* 3. Grouped Data Grid */}
            <div className="bg-card border border-border rounded-xl h-[calc(100vh-300px)] shadow-sm flex-1 flex flex-col overflow-hidden relative">

                {/* Toolbar */}
                <div className="px-4 py-2 border-b border-border bg-muted/30 flex justify-between items-center shrink-0">
                    <div className="text-xs text-muted-foreground font-medium">1,240 Total Connections</div>

                    <button
                        onClick={() => setIsCompact(!isCompact)}
                        className={`p-1.5 rounded hover:bg-secondary transition-colors ${isCompact ? 'text-primary bg-primary/10' : 'text-muted-foreground'}`}
                        title="Compact View"
                    >
                        <Layout className="h-4 w-4" />
                    </button>
                </div>

                {/* Table */}
                <div className="flex-1 overflow-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-muted/50 text-muted-foreground text-xs font-bold uppercase tracking-wider sticky top-0 z-20 shadow-sm backdrop-blur-sm">
                            <tr>
                                <th className="px-6 py-3 border-b border-border">Customer Identity</th>
                                <th className="px-6 py-3 border-b border-border">Contact Info</th>
                                <th className="px-6 py-3 border-b border-border">Billing Config</th>
                                <th className="px-6 py-3 border-b border-border">Technical Specs</th>
                                <th className="px-6 py-3 border-b border-border">Location</th>
                                <th className="px-6 py-3 border-b border-border text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className={`divide-y divide-border ${isCompact ? 'text-xs' : 'text-sm'}`}>
                            {REPORT_DATA.map((row, idx) => (
                                <tr key={idx} className="hover:bg-accent/50 transition-colors group">

                                    {/* Column 1: Customer Identity */}
                                    <td className={`px-6 ${isCompact ? 'py-2' : 'py-4'} align-top`}>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-foreground text-base">
                                                {row.firstName} {row.middleName} {row.lastName}
                                            </span>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="font-mono text-xs text-muted-foreground bg-secondary px-1.5 rounded border border-border">ID: {row.id}</span>
                                                {row.migrated && <Badge variant="secondary">Migrated</Badge>}
                                            </div>
                                            <span className="text-xs text-muted-foreground mt-0.5">App No: {row.appNo}</span>
                                        </div>
                                    </td>

                                    {/* Column 2: Contact Info */}
                                    <td className={`px-6 ${isCompact ? 'py-2' : 'py-4'} align-top`}>
                                        <div className="space-y-1">
                                            <div className="flex items-center text-foreground">
                                                <Phone className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                                                {row.mobile}
                                            </div>
                                            <div className="flex items-center text-muted-foreground">
                                                <Mail className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                                                {row.email}
                                            </div>
                                        </div>
                                    </td>

                                    {/* Column 3: Billing Config */}
                                    <td className={`px-6 ${isCompact ? 'py-2' : 'py-4'} align-top`}>
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center justify-between">
                                                <span className="text-muted-foreground text-xs">Method:</span>
                                                <span className="font-medium text-foreground">{row.billMethod}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-muted-foreground text-xs">Cycle:</span>
                                                <span className="font-medium text-foreground">{row.billCycle}</span>
                                            </div>
                                            <div className="flex items-center justify-between border-t border-dashed border-border pt-1 mt-0.5">
                                                <span className="text-muted-foreground text-xs">Type:</span>
                                                <span className="font-medium text-foreground">{row.connType}</span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Column 4: Technical Specs */}
                                    <td className={`px-6 ${isCompact ? 'py-2' : 'py-4'} align-top`}>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <Badge variant="default">{row.connSize}</Badge>
                                                {row.meterNo ? (
                                                    <Badge variant="info">Metered</Badge>
                                                ) : (
                                                    <Badge variant="warning">Flat</Badge>
                                                )}
                                            </div>
                                            <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
                                                <div className="flex items-center">
                                                    <Activity className="h-3 w-3 mr-1.5 opacity-50" />
                                                    Meter: <span className="text-foreground ml-1 font-mono">{row.meterNo || 'N/A'}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Hash className="h-3 w-3 mr-1.5 opacity-50" />
                                                    GIS: <span className="text-foreground ml-1 font-mono">{row.gisId}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Column 5: Location */}
                                    <td className={`px-6 ${isCompact ? 'py-2' : 'py-4'} align-top`}>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-foreground flex items-center">
                                                <MapPin className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                                                {row.zone}
                                            </span>
                                            <span className="text-xs text-muted-foreground ml-5">{row.address}</span>
                                            <div className="ml-5 mt-1">
                                                <span className="text-[10px] bg-secondary text-muted-foreground px-1.5 py-0.5 rounded border border-border">{row.zoneTag}</span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Column 6: Status */}
                                    <td className={`px-6 ${isCompact ? 'py-2' : 'py-4'} align-top text-center`}>
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                                            Active
                                        </span>
                                        <div className="text-[10px] text-muted-foreground mt-1 flex items-center justify-center">
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
                <div className="p-3 border-t border-border bg-card shrink-0 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Rows per page:</span>
                        <select className="bg-card border border-border text-xs rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary">
                            <option>15</option>
                            <option>50</option>
                            <option>100</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">1-15 of 1,240</span>
                        <div className="flex gap-1">
                            <button className="p-1.5 hover:bg-secondary rounded border border-border disabled:opacity-50 text-muted-foreground hover:text-foreground">
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <button className="p-1.5 hover:bg-secondary rounded border border-border text-muted-foreground hover:text-foreground">
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}