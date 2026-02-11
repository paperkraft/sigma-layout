import { NavMenuGroup } from "@/components/layout/nav-sidebar";
import { FolderKanban, Home, MessagesSquare, Share2, Wallet } from "lucide-react";

export const sidebarMenuGroups: NavMenuGroup[] = [
    {
        label: "Overview",
        items: [
            {
                title: "Home",
                url: "/dashboard",
                icon: Home,
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
