"use client";

import { ChevronRight, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

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
    SidebarRail,
    useSidebar
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';

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
    const [openMenu, setOpenMenu] = React.useState<string | null>(null)

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarContent className="bg-card">
                <ScrollArea className="h-full">
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
                                        <SidebarItemResolver
                                            key={menu.title}
                                            item={menu}
                                            openMenu={openMenu}
                                            setOpenMenu={setOpenMenu}
                                        />
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    ))}
                </ScrollArea>
            </SidebarContent>

            <SidebarFooter className="bg-card md:mb-14">
                {footerContent ? footerContent : (
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                tooltip="Help & Support"
                                className="text-sidebar-foreground/70"
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
interface ItemResolver {
    item: NavMenuItem;
    openMenu: string | null;
    setOpenMenu: (val: string | null) => void;
    isActive: (path?: string, exact?: boolean) => boolean;
}

function SidebarItemResolver({ item, openMenu, setOpenMenu }: Omit<ItemResolver, 'isActive'>) {
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
        return (
            <CollapsibleMenuItem
                item={item}
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
                isActive={isActive}
            />
        );
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
                    <Link
                        href={item.url}
                        onClick={() => setOpenMenu(null)}
                        className={cn(
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
function CollapsibleMenuItem({ item, isActive, openMenu, setOpenMenu }: ItemResolver) {

    const { state, isMobile } = useSidebar();
    const isCollapsed = state === "collapsed";

    const hasActiveChild = React.useMemo(() => {
        return item.subItems?.some(group =>
            group.items.some(subItem =>
                isActive(subItem.url, subItem.exact)
            )
        )
    }, [item, isActive]);

    const isOpen = openMenu === item.title // || hasActiveChild;

    // -----------------------------------
    // COLLAPSED MODE → DROPDOWN MENU
    // -----------------------------------
    if (isCollapsed && !isMobile) {
        return (
            <SidebarMenuItem>
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            tooltip={isOpen ? undefined : item.title}
                            isActive={hasActiveChild}
                            className={cn("group justify-center cursor-pointer", hasActiveChild && "text-primary!")}
                        >
                            {item.icon && <item.icon className="size-4 pointer-events-none" />}
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        side="right"
                        align="start"
                        sideOffset={8}
                        className="min-w-56 rounded-md mb-4 shadow-xl"
                    >
                        <DropdownMenuLabel className='font-semibold'>{item.title}</DropdownMenuLabel>

                        {item.subItems?.map((group, gIdx) => (
                            <React.Fragment key={gIdx}>
                                {group.label && (
                                    <>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuLabel className='px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground'>
                                            {group.label}
                                        </DropdownMenuLabel>
                                    </>
                                )}

                                {group.items.map((subItem) => (
                                    <DropdownMenuItem
                                        key={subItem.title}
                                        asChild
                                        className={cn(
                                            "cursor-pointer",
                                            isActive(subItem.url, subItem.exact) &&
                                            "font-medium text-primary bg-sidebar-accent"
                                        )}
                                    >
                                        <Link href={subItem.url || "#"}>
                                            {subItem.title}
                                        </Link>
                                    </DropdownMenuItem>
                                ))}
                            </React.Fragment>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        )
    }

    // -----------------------------------
    // EXPANDED MODE → NORMAL COLLAPSIBLE
    // -----------------------------------
    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                tooltip={item.title}
                isActive={isOpen}
                onClick={() => setOpenMenu(isOpen ? null : item.title)}
                className="justify-between group/collapsible hover:text-primary!"
            >
                <div className="flex items-center gap-2">
                    {item.icon && <item.icon className="size-4" />}
                    <span>{item.title}</span>
                </div>

                <ChevronRight
                    className={cn(
                        "ml-auto size-4 transition-transform duration-200",
                        isOpen && "rotate-90"
                    )}
                />
            </SidebarMenuButton>

            {isOpen && (
                <SidebarMenuSub>
                    {item.subItems?.map((group, gIdx) => (
                        <div key={gIdx} className="mb-2 last:mb-0">
                            {group.label && (
                                <div className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                    {group.label}
                                </div>
                            )}
                            {group.items.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                    <SidebarMenuSubButton
                                        asChild
                                        isActive={isActive(subItem.url, subItem.exact)}
                                        className={cn(
                                            'hover:text-primary!',
                                            isActive(subItem.url, subItem.exact) && "font-medium text-primary!"
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
    )
}