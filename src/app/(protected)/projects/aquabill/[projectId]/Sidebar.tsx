'use client';

import {
    Settings,
    Users,
    FileText,
    CreditCard,
    BarChart3,
    Droplets,
    ChevronDown,
    ChevronRight,
    Home
} from 'lucide-react';
import { useState } from 'react';

const NAV_ITEMS = [
    {
        title: "Dashboard",
        icon: Home,
        path: "/dashboard"
    },
    {
        title: "Operations",
        label: "Main",
        items: [
            { title: "Connections", icon: Users, path: "/connections" },
            { title: "Flat Bill Gen", icon: FileText, path: "/flat-bill" },
            { title: "Meter Bill Gen", icon: Droplets, path: "/meter-bill" },
            { title: "Payments", icon: CreditCard, path: "/payments" },
        ]
    },
    {
        title: "Configuration",
        label: "Admin",
        icon: Settings,
        items: [
            {
                title: "Billing Config",
                subItems: ["General Settings", "Billing Cycle", "Connection Config"]
            },
            { title: "Zones", subItems: ["Manage Zones", "Zone Tags"] },
            { title: "Payment Settings", subItems: ["Payment Gateway"] }
        ]
    },
    {
        title: "Reports",
        label: "Analytics",
        icon: BarChart3,
        items: [
            { title: "Connection Details", subItems: ["All Connections", "Meter Details", "Migration Details"] },
            { title: "Connection Count", subItems: ["Enrollment", "By Billing Method", "By Cycle"] },
            { title: "Meter Status", subItems: ["Out of Order", "Unavailables"] },
            { title: "Billing Details", subItems: ["Zone Summary", "Demand Register"] }
        ]
    }
];

export default function AquabillSidebar() {
    const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({ "Configuration": false, "Reports": false });

    const toggleMenu = (title: string) => {
        setExpandedMenus(prev => ({ ...prev, [title]: !prev[title] }));
    };

    return (
        <aside className={`fixed inset-y-0 left-0 top-14 z-50 bg-white border-r transition-all duration-300 w-64 hidden md:flex flex-col`}>
            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
                {NAV_ITEMS.map((group, idx) => (
                    <div key={idx}>
                        {group.label && (
                            <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                {group.label}
                            </h3>
                        )}

                        <div className="space-y-1">
                            {/* Single Link (Dashboard) */}
                            {!group.items && (
                                <button className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-slate-600 hover:bg-accent hover:text-primary transition-colors">
                                    <group.icon className="size-4 mr-3" />
                                    <span>{group.title}</span>
                                </button>
                            )}

                            {/* Group with Submenu */}
                            {group.items && group.items.map((item, i) => {
                                // Handle Simple Items in Groups (Connections, etc)
                                if (!('subItems' in item)) {
                                    return (
                                        <button key={i} className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-slate-600 hover:bg-accent hover:text-primary transition-colors">
                                            <item.icon className="size-4 mr-3" />
                                            <span>{item.title}</span>
                                        </button>
                                    );
                                }

                                // Handle Nested Accordions (Config/Reports)
                                const isExpanded = expandedMenus[group.title] ?? false;
                                return (
                                    <div key={i} className="block">
                                        {/* Only show header for the group if it's the first item or we are iterating complex objects */}
                                        {i === 0 && (
                                            <button
                                                onClick={() => toggleMenu(group.title)}
                                                className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md text-slate-700 hover:bg-accent transition-colors mb-1"
                                            >
                                                <div className="flex items-center">
                                                    {group.icon && <group.icon className="size-4 mr-3" />}
                                                    <span>{group.title}</span>
                                                </div>
                                                {isExpanded ? <ChevronDown className="h-4 w-4 opacity-50" /> : <ChevronRight className="h-4 w-4 opacity-50" />}
                                            </button>
                                        )}

                                        {/* Sub-items Render */}
                                        {isExpanded && (
                                            <div className="ml-9 border-l border-slate-200 pl-4 space-y-1 mt-1 mb-4">
                                                {/* In your real app, this map would flatten the Config/Report structures */}
                                                <div className="text-xs font-semibold text-slate-400 mb-2 uppercase">{item.title}</div>
                                                {item.subItems.map((sub, sIdx) => (
                                                    <button key={sIdx} className="w-full text-left py-1 text-sm text-slate-500 hover:text-primary transition-colors">
                                                        {sub}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    )
}