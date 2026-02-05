'use client'
import {
    Building2, ChevronRight, Clock, Database, Edit3, Map, Plus, Ruler, Search, Trash2
} from 'lucide-react';
import React, { useState } from 'react';

// --- Mock Data ---
const DATA_SETS: Record<string, any[]> = {
    cycles: [
        { id: 1, title: "Monthly", subtitle: "12 Times/Year", tag: "Recurring", meta: "1st of Month" },
        { id: 2, title: "Yearly", subtitle: "Once/Year", tag: "Recurring", meta: "1st Jan" },
    ],
    types: [
        { id: 1, title: "Commercial", subtitle: "Business", tag: "COM", meta: "High Rate" },
        { id: 2, title: "Domestic", subtitle: "Residential", tag: "DOM", meta: "Standard Rate" },
        { id: 3, title: "Industrial", subtitle: "Factory/Plant", tag: "IND", meta: "Special Rate" },
    ],
    sizes: [
        { id: 1, title: "0.5 Inch", subtitle: "Standard", tag: "STD", meta: "Dia: 15mm" },
        { id: 2, title: "0.75 Inch", subtitle: "Large", tag: "LRG", meta: "Dia: 20mm" },
        { id: 3, title: "1.0 Inch", subtitle: "Extra Large", tag: "XL", meta: "Dia: 25mm" },
    ],
    zones: [
        { id: 1, title: "North-West", subtitle: "Sector 1-4", tag: "N-W", meta: "Active" },
        { id: 2, title: "West-East", subtitle: "Sector 5-9", tag: "W-E", meta: "Maintenance" },
    ],
    buildings: [
        { id: 1, title: "Apartment Complex", subtitle: "Multi-story (> 4 floors)", tag: "APT", meta: "Bulk Connection" },
        { id: 2, title: "Independent Bungalow", subtitle: "Single Unit / Villa", tag: "IND", meta: "Individual" },
        { id: 3, title: "Row House", subtitle: "Joined Single Units", tag: "ROW", meta: "Individual" },
        { id: 4, title: "Commercial Complex", subtitle: "Shopping Mall / Office", tag: "CPLX", meta: "Bulk Connection" },
        { id: 5, title: "Slum Settlement", subtitle: "High Density Area", tag: "SLM", meta: "Subsidized" },
    ]
};

// --- Sub-Components ---

const SidebarItem = ({ id, label, icon: Icon, active, onClick }: any) => (
    <button
        onClick={() => onClick(id)}
        className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-all duration-200 border-l-2 ${active
            ? 'bg-primary/10 text-primary border-primary'
            : 'border-transparent text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
    >
        <div className="flex items-center gap-3">
            <Icon className={`h-4 w-4 ${active ? 'text-primary' : 'text-muted-foreground'}`} />
            {label}
        </div>
        {active && <ChevronRight className="h-3 w-3 opacity-50" />}
    </button>
);

const DataTable = ({ data }: any) => (
    <div className="rounded-lg bg-card flex flex-col h-full overflow-hidden">
        {/* Scroll wrapper for the table specifically */}
        <div className="flex-1 overflow-auto w-full">
            <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border sticky top-0 z-10 backdrop-blur-sm">
                    <tr>
                        <th className="px-6 py-4 whitespace-nowrap">Title / Name</th>
                        <th className="px-6 py-4 whitespace-nowrap">Code / Tag</th>
                        <th className="px-6 py-4 whitespace-nowrap">Description</th>
                        <th className="px-6 py-4 whitespace-nowrap">Metadata</th>
                        <th className="px-6 py-4 text-right whitespace-nowrap">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {data.length > 0 ? (
                        data.map((row: any) => (
                            <tr key={row.id} className="group hover:bg-muted/30 transition-colors text-foreground">
                                <td className="px-6 py-4 font-semibold whitespace-nowrap">{row.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="font-mono text-xs bg-secondary text-foreground px-2 py-1 rounded border border-border">
                                        {row.tag}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">{row.subtitle}</td>
                                <td className="px-6 py-4 text-muted-foreground text-xs whitespace-nowrap">{row.meta}</td>
                                <td className="px-6 py-4 text-right whitespace-nowrap">
                                    <div className="flex justify-end gap-2 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 hover:bg-secondary rounded-lg text-muted-foreground hover:text-primary transition-colors">
                                            <Edit3 className="h-4 w-4" />
                                        </button>
                                        <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-muted-foreground hover:text-red-600 dark:hover:text-red-400 transition-colors">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                                No records found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
);

export default function MasterDataManager() {
    const [activeTab, setActiveTab] = useState('cycles');

    const tabs = [
        { id: 'cycles', label: 'Billing Cycles', icon: Clock },
        { id: 'types', label: 'Connection Types', icon: Database },
        { id: 'sizes', label: 'Pipe Sizes', icon: Ruler },
        { id: 'zones', label: 'Zones & Geography', icon: Map },
        { id: 'buildings', label: 'Building Types', icon: Building2 },
    ];

    // Get current data
    const currentData = DATA_SETS[activeTab] || [];
    const currentLabel = tabs.find(t => t.id === activeTab)?.label;

    return (
        <div className="p-4 md:p-8 text-foreground w-full lg:h-[calc(100vh-4rem)] flex flex-col overflow-hidden animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex justify-between items-end mb-6 shrink-0">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Master Data</h1>
                    <p className="text-muted-foreground mt-1 text-sm">Manage system reference lists and configuration categories.</p>
                </div>
            </div>

            {/* Main Layout: Stack on Mobile, Row on Desktop */}
            <div className="flex flex-col lg:flex-row gap-6 h-full lg:overflow-hidden">

                {/* Left Sidebar */}
                <div className="w-full lg:w-64 shrink-0 flex flex-col border border-border rounded-xl bg-card overflow-hidden max-h-48 lg:max-h-full lg:h-full">
                    <div className="p-4 border-b border-border bg-muted/30 sticky top-0 z-10">
                        <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Categories</h3>
                    </div>
                    <div className="overflow-y-auto py-2">
                        {tabs.map((tab) => (
                            <SidebarItem
                                key={tab.id}
                                {...tab}
                                active={activeTab === tab.id}
                                onClick={setActiveTab}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Content Area */}
                <div className="flex-1 flex flex-col min-w-0 space-y-4 lg:h-full overflow-hidden">

                    {/* Action Toolbar */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-4 rounded-lg border border-border shrink-0 w-full">
                        <div className="flex items-center gap-2 overflow-hidden">
                            <h2 className="font-bold text-lg text-foreground truncate">{currentLabel}</h2>
                            <span className="bg-secondary text-muted-foreground text-xs px-2 py-0.5 rounded-full shrink-0">
                                {currentData.length}
                            </span>
                        </div>

                        <div className="flex gap-3 w-full sm:w-auto">
                            <div className="relative group flex-1 sm:flex-none">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full sm:w-64 pl-10 pr-4 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground"
                                />
                            </div>
                            <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 shadow-sm transition-all active:scale-95 whitespace-nowrap">
                                <Plus className="h-4 w-4 mr-2" />
                                Add New
                            </button>
                        </div>
                    </div>

                    {/* Table Container */}
                    <div className="flex-1 min-h-100 lg:min-h-0 rounded-xl border border-border bg-card overflow-hidden">
                        <DataTable data={currentData} />
                    </div>
                </div>
            </div>
        </div>
    );
}