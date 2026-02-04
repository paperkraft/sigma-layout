"use client";

import { ChevronRight, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

// --- Generic Types ---
export interface NavMenuItem {
    title: string;
    url?: string;
    icon?: any;
    exact?: boolean;
    subItems?: NavMenuGroup[];
}

export interface NavMenuGroup {
    label?: string;
    items: NavMenuItem[];
}

interface NavSidebarProps extends React.ComponentProps<typeof Sidebar> {
    groups: NavMenuGroup[];
    footerContent?: React.ReactNode;
}

export function NavSidebar({ groups, footerContent, ...props }: NavSidebarProps) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarContent className="bg-background dark:bg-popover">
                {groups.map((group, idx) => (
                    <SidebarGroup key={group.label || idx}>
                        {group.label && (
                            <SidebarGroupLabel>
                                {group.label}
                            </SidebarGroupLabel>
                        )}
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((menu) => (
                                    <SidebarItemResolver key={menu.title} item={menu} />
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            <SidebarFooter className="bg-background dark:bg-popover md:mb-14">
                {footerContent ? footerContent : (
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                tooltip="Help & Support"
                                className="text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                            >
                                <HelpCircle />
                                <span>Help & Support</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                )}
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}

// --- Helper: Resolves Active State & Rendering ---
function SidebarItemResolver({ item }: { item: NavMenuItem }) {
    const pathname = usePathname();

    // Robust Active Check
    const isActive = (path?: string, exact?: boolean) => {
        if (!path) return false;

        // 1. Exact Match (Always returns true if identical)
        if (pathname === path) return true;

        // 2. If 'exact' is strictly required, stop here.
        if (exact) return false;

        // 3. Directory Match (Prevents partial matches)
        // Correct: path="/app/users", pathname="/app/users/123" -> Matches
        // Incorrect: path="/app/users", pathname="/app/users-list" -> No Match
        return pathname.startsWith(`${path}/`);
    };

    // Case 1: Has Sub-Items -> Render Collapsible
    if (item.subItems && item.subItems.length > 0) {
        return <CollapsibleMenuItem item={item} isActiveChecker={isActive} />;
    }

    // Case 2: Standard Link
    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                asChild
                isActive={isActive(item.url, item.exact)}
                tooltip={item.title}
            >
                {item.url ? (
                    <Link href={item.url} className={cn(
                        "transition-colors duration-200 hover:text-primary!",
                        isActive(item.url, item.exact) && "font-semibold text-primary!"
                    )}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                    </Link>
                ) : (
                    <span className="cursor-default">
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                    </span>
                )}
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}

// --- Helper: Handles Collapsible State ---
function CollapsibleMenuItem({ item, isActiveChecker }: { item: NavMenuItem, isActiveChecker: any }) {
    const [isOpen, setIsOpen] = useState(false);

    // Auto-expand if any child is active
    useEffect(() => {
        const hasActiveChild = item.subItems?.some(group =>
            group.items.some(subItem => isActiveChecker(subItem.url))
        );
        if (hasActiveChild) setIsOpen(true);
    }, [item, isActiveChecker]);

    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                onClick={() => setIsOpen(!isOpen)}
                tooltip={item.title}
                isActive={isOpen}
                className="justify-between group/collapsible hover:text-primary!"
            >
                <div className="flex items-center gap-2">
                    {item.icon && <item.icon className="size-4" />}
                    <span>{item.title}</span>
                </div>
                <ChevronRight
                    className={cn(
                        "ml-auto h-4 w-4 transition-transform duration-200",
                        isOpen && "rotate-90"
                    )}
                />
            </SidebarMenuButton>

            {isOpen && (
                <SidebarMenuSub>
                    {item.subItems?.map((group, gIdx) => (
                        <div key={gIdx} className="mb-2 last:mb-0">
                            {group.label && (
                                <div className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">
                                    {group.label}
                                </div>
                            )}
                            {group.items.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                    <SidebarMenuSubButton
                                        asChild
                                        isActive={isActiveChecker(subItem.url, subItem.exact)}
                                        className={cn('hover:text-primary!',
                                            isActiveChecker(subItem.url, subItem.exact) && "font-semibold text-primary!"
                                        )}
                                    >
                                        <Link href={subItem.url || "#"}>
                                            <span>{subItem.title}</span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            ))}
                        </div>
                    ))}
                </SidebarMenuSub>
            )}
        </SidebarMenuItem>
    );
}