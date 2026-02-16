'use client'
import { Download, Printer, RefreshCcw } from 'lucide-react';
import React, { useState } from 'react';

import { DataTable } from '@/components/shared/_data-table/data-table';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import {
    billingMethodOptions, connectionOptions, statusOptions, zoneOptions
} from '@/config/master_dummy';
import SelectControl from '@/features/projects/aquabill/form-controls/select-control';

import { AllConnectionReportColumns } from './all-connections';

// --- Mock Data ---
const REPORT_DATA = Array.from({ length: 18 }).map((_, i) => ({
    id: `100011${14 + i}`,
    appNo: `${220 + i}`,
    migrated: i % 4 === 0,
    firstName: ["Nilesh", "Rohit", "Rahul", "Priya", "Amit"][i % 5],
    middleName: ["J", "P", "S", "A", "K"][i % 5],
    lastName: ["Patil", "Jadhav", "Sawant", "Deshmukh", "Kulkarni"][i % 5],
    mobile: `88888888${40 + i}`,
    email: `user${i}@gmail.com`,
    address: `Kolhapur, Ward ${["A", "B", "C", "D", "E"][i % 5]}, Near Main Square, Building No. ${i + 1}`,
    billMethod: i % 2 === 0 ? "Flat" : "Meter",
    billCycle: i % 2 === 0 ? "Monthly" : "Yearly",
    connType: "Domestic",
    connSize: "0.5 Inch",
    zone: i % 3 === 0 ? "North-West" : "West-East",
    zoneTag: `Tag ${["A", "B", "C", "D", "E"][i % 5]}`,
    status: "Active",
    meterNo: i % 2 === 0 ? null : `MTR-${8839 + i}`,
    gisId: `${10 + i}`,
    dateCreated: "12-Jan-2026"
}));

const allOption = [{ label: "All", value: "all" }]

export default function AllConnectionsReport() {
    const { columns } = AllConnectionReportColumns();

    const [filters, setFilters] = useState({
        method: 'all',
        type: 'all',
        zone: 'all',
        status: 'all',
        search: ''
    });

    const resetAllFilters = () => {
        setFilters({
            method: 'all',
            type: 'all',
            zone: 'all',
            status: 'all',
            search: ''
        });
    }

    const filteredData = REPORT_DATA.filter(item => {
        const methodMatch = filters.method === 'all' || item.billMethod === filters.method;
        const typeMatch = filters.type === 'all' || item.connType === filters.type;
        const zoneMatch = filters.zone === 'all' || item.zone === filters.zone;
        const statusMatch = filters.status === 'all' || item.status === filters.status;
        return methodMatch && typeMatch && zoneMatch && statusMatch;
    })

    return (
        <div className="p-4 md:p-7 space-y-4">

            {/* 1. Header & Actions */}
            <PageHeader
                title={'Connections Master Report'}
                description={'Unified view of subscriber data, technical specs, and location details.'}
            >
                <div className="flex flex-wrap gap-2">
                    <Button variant="outline"><Printer size={16} />Print</Button>
                    <Button><Download size={16} />Export Data</Button>
                </div>
            </PageHeader>

            {/* 2. Filters */}
            <DataTable
                columns={columns}
                data={filteredData}
                pageSize={5}
                className="lg:h-[calc(100vh-184px)] overflow-hidden"
            // initialPinning={{ left: ["select", "firstName"] }}
            >
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 w-full p-1 pb-2 border-b">
                    <SelectControl label_bg='bg-card' value={filters.method} onChange={(v) => setFilters({ ...filters, method: v })} name='method' label="Billing Method" options={[...allOption, ...billingMethodOptions]} />
                    <SelectControl label_bg='bg-card' value={filters.type} onChange={(v) => setFilters({ ...filters, type: v })} name='type' label="Conn Type" options={[...allOption, ...connectionOptions]} />
                    <SelectControl label_bg='bg-card' value={filters.zone} onChange={(v) => setFilters({ ...filters, zone: v })} name='zone' label="Zone" options={[...allOption, ...zoneOptions]} />
                    <SelectControl label_bg='bg-card' value={filters.status} onChange={(v) => setFilters({ ...filters, status: v })} name='status' label="Status" options={[...allOption, ...statusOptions]} />
                    <div className='mt-auto'>
                        <Button variant="ghost" size="sm" onClick={resetAllFilters} aria-label="reset" className="text-muted-foreground text-xs">
                            <RefreshCcw /> Reset
                        </Button>
                    </div>
                </div>

            </DataTable>
        </div>
    );
}