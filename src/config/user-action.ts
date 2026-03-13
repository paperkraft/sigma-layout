import { CreditCard, LogOut, LucideIcon, Settings, UserIcon } from "lucide-react";

interface IUserAction {
    title: string;
    url?: string;
    icon: LucideIcon;
    shortcut: string;
}

export const userActions: IUserAction[] = [
    {
        title: "Profile",
        url: "/settings/profile",
        icon: UserIcon,
        shortcut: "⇧⌘P"
    },
    {
        title: "Billing",
        url: "/subscription",
        icon: CreditCard,
        shortcut: "⌘B"
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
        shortcut: "⌘S"
    },
]