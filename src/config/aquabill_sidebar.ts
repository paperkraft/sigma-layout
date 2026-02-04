import { NavMenuGroup } from "@/components/layout/nav-sidebar";
import { BarChart3, CreditCard, Droplets, FileText, Home, Settings, Users } from "lucide-react";

export const aquabillMenuGroups: NavMenuGroup[] = [
    {
        label: "Overview",
        items: [
            { title: "Dashboard", icon: Home, url: "/dashboard" },
        ],
    },
    {
        label: "Main",
        items: [
            { title: "Connections", icon: Users, url: "/connections" },
            { title: "Flat Bill Gen", icon: FileText, url: "/flat-bill" },
            { title: "Meter Bill Gen", icon: Droplets, url: "/meter-bill" },
            { title: "Payments", icon: CreditCard, url: "/payments" },
        ]
    },
    {
        label: "Admin",
        items: [
            {
                title: "Configuration",
                icon: Settings,
                subItems: [
                    {
                        label: "Billing Config",
                        items: [
                            { title: "General Settings", url: "/configuration/general-settings" },
                            { title: "Master", url: "/configuration/master" },
                            { title: "Tariff Config", url: "/configuration/tariff" }
                        ]
                    },
                    {
                        label: "Zones",
                        items: [
                            { title: "Manage Zones", url: "/configuration/#" },
                            { title: "Zone Tags", url: "/configuration/#" }
                        ]
                    },
                    {
                        label: "Payment Settings",
                        items: [
                            { title: "Payment Gateway", url: "/configuration/payment-gateway" }
                        ]
                    }
                ]
            },
        ],
    },
    {
        label: "Analytics",
        items: [
            {
                title: "Reports",
                icon: BarChart3,
                subItems: [
                    {
                        label: "Connection Details",
                        items: [
                            { title: "All Connections", url: "/reports/connections" },
                            { title: "Meter Details", url: "#" },
                            { title: "Migration Details", url: "#" }
                        ]
                    },
                    {
                        label: "Connection Count",
                        items: [
                            { title: "Enrollment", url: "#" },
                            { title: "By Billing Method", url: "#" },
                            { title: "By Cycle", url: "#" }
                        ]
                    },
                    {
                        label: "Meter Status",
                        items: [
                            { title: "Out of Order", url: "#" },
                            { title: "Unavailables", url: "#" }
                        ]
                    },
                    {
                        label: "Billing Details",
                        items: [
                            { title: "Zone Summary", url: "#" },
                            { title: "Demand Register", url: "#" }
                        ]
                    }
                ]
            }
        ]
    }
];
