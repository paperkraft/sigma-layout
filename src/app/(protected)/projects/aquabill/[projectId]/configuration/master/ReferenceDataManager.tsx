'use client'
import { Building2, Clock, Database, Edit2, Map, Plus, Ruler, Search, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

// --- Mock Data ---
const DATA_SETS = {
    cycles: [
        { id: 1, name: "Monthly", duration: "1 Month", recurring: "1st of Month" },
        { id: 2, name: "Yearly", duration: "12 Months", recurring: "1st Jan" },
    ],
    types: [
        { id: 1, name: "Commercial", code: "COM", desc: "For business establishments" },
        { id: 2, name: "Domestic", code: "DOM", desc: "For residential housing" },
    ],
    sizes: [
        { id: 1, val: "0.5", unit: "Inch", desc: "Standard residential" },
        { id: 2, val: "0.75", unit: "Inch", desc: "Large residential" },
        { id: 3, val: "1.0", unit: "Inch", desc: "Commercial standard" },
    ],
    buildings: [
        { id: 1, val: "RCC", unit: "Domestic", desc: "Standard residential" },
        { id: 3, val: "PVC", unit: "Commercial", desc: "Commercial standard" },
    ],
    zones: [
        { id: 1, name: "North-West", tag: "N-W", desc: "Kolhapur North Sector" },
        { id: 2, name: "West-East", tag: "W-E", desc: "Kolhapur Center" },
    ]
};

const Button = ({ children, variant = "secondary", className, icon: Icon, ...props }: any) => (
    <button className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${variant === "primary"
        ? "bg-primary text-primary-foreground hover:bg-primary/90"
        : "bg-card border border-border text-foreground hover:bg-secondary hover:text-foreground"
        } ${className}`} {...props}>
        {Icon && <Icon className="h-4 w-4 mr-2" />}
        {children}
    </button>
);

export default function ReferenceDataManager() {
    const [activeTab, setActiveTab] = useState('cycles');

    const tabs = [
        { id: 'cycles', label: 'Billing Cycles', icon: Clock },
        { id: 'types', label: 'Connection Types', icon: Database },
        { id: 'sizes', label: 'Pipe Sizes', icon: Ruler },
        { id: 'buildings', label: 'Building Types', icon: Building2 },
        { id: 'zones', label: 'Zones & Tags', icon: Map },
    ];

    return (
        <div className="p-8 space-y-6 text-foreground">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Master Data</h1>
                    <p className="text-muted-foreground text-sm mt-1">Manage system-wide reference lists and categories.</p>
                </div>
                <Button variant="primary" icon={Plus}>Add New Record</Button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar Tabs */}
                <div className="w-full lg:w-64 flex flex-col gap-1">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === tab.id
                                ? 'bg-primary/10 text-primary'
                                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                                }`}
                        >
                            <tab.icon className={`h-4 w-4 mr-3 ${activeTab === tab.id ? 'text-primary' : 'text-muted-foreground'}`} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="flex-1 bg-card border border-border rounded-xl shadow-sm overflow-hidden min-h-125">
                    {/* Toolbar */}
                    <div className="p-4 border-b border-border flex justify-between items-center bg-muted/30">
                        <h3 className="font-semibold text-foreground">{tabs.find(t => t.id === activeTab)?.label} List</h3>
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search records..."
                                className="pl-9 pr-4 py-2 text-sm bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground"
                            />
                        </div>
                    </div>

                    {/* Dynamic Table Content */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-muted-foreground font-medium border-b border-border bg-muted/50">
                                <tr>
                                    <th className="px-6 py-3 w-10">
                                        <input type="checkbox" className="rounded border-border bg-card text-primary focus:ring-primary" />
                                    </th>
                                    <th className="px-6 py-3">Name / Value</th>
                                    <th className="px-6 py-3">Attributes</th>
                                    <th className="px-6 py-3">Description</th>
                                    <th className="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {/* Logic to render different data based on tab */}
                                {activeTab === 'cycles' && DATA_SETS.cycles.map(row => (
                                    <Row key={row.id} col1={row.name} col2={row.duration} col3={row.recurring} />
                                ))}
                                {activeTab === 'types' && DATA_SETS.types.map(row => (
                                    <Row key={row.id} col1={row.name} col2={<span className="font-mono text-xs bg-secondary text-foreground px-2 py-1 rounded border border-border">{row.code}</span>} col3={row.desc} />
                                ))}
                                {activeTab === 'sizes' && DATA_SETS.sizes.map(row => (
                                    <Row key={row.id} col1={`${row.val} ${row.unit}`} col2="Standard" col3={row.desc} />
                                ))}
                                {activeTab === 'buildings' && DATA_SETS.buildings.map(row => (
                                    <Row key={row.id} col1={`${row.val}`} col2={row.unit} col3={row.desc} />
                                ))}
                                {activeTab === 'zones' && DATA_SETS.zones.map(row => (
                                    <Row key={row.id} col1={row.name} col2={<span className="bg-blue-50 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50 px-2 py-1 rounded text-xs">{row.tag}</span>} col3={row.desc} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Row = ({ col1, col2, col3 }: any) => (
    <tr className="hover:bg-accent/50 group transition-colors">
        <td className="px-6 py-4">
            <input type="checkbox" className="rounded border-border bg-card text-primary focus:ring-primary" />
        </td>
        <td className="px-6 py-4 font-medium text-foreground">{col1}</td>
        <td className="px-6 py-4 text-muted-foreground">{col2}</td>
        <td className="px-6 py-4 text-muted-foreground">{col3}</td>
        <td className="px-6 py-4 text-right">
            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 hover:bg-secondary rounded text-muted-foreground hover:text-primary transition-colors">
                    <Edit2 className="h-4 w-4" />
                </button>
                <button className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded text-muted-foreground hover:text-red-600 dark:hover:text-red-400 transition-colors">
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>
        </td>
    </tr>
);