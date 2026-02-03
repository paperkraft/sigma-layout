import { FolderKanban, LayoutDashboard, LucideIcon, MessagesSquare, Share2, Wallet } from "lucide-react";

export interface SidebarMenuItem {
    title: string;
    url: string;
    icon: LucideIcon;
    exact?: boolean;
}

export interface SidebarMenuGroup {
    label: string;
    items: SidebarMenuItem[];
}

export const sidebarMenuGroups: SidebarMenuGroup[] = [
    {
        label: "Overview",
        items: [
            {
                title: "Dashboard",
                url: "/dashboard",
                icon: LayoutDashboard,
                exact: true,
            },
        ],
    },
    {
        label: "Projects",
        items: [
            {
                title: "My Projects",
                url: "/projects",
                icon: FolderKanban,
            },
            {
                title: "Shared with me",
                url: "/shared-projects",
                icon: Share2,
            },
        ],
    },
    {
        label: "Organization",
        items: [
            {
                title: "Collaboration",
                url: "/collaboration",
                icon: MessagesSquare,
            },
        ],
    },
    {
        label: "Billing",
        items: [
            {
                title: "Subscription",
                url: "/subscription",
                icon: Wallet,
            },
        ],
    },
];
