"use client";

import { ChevronRight, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

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
    const [openMenus, setOpenMenus] = React.useState<Record<string, boolean>>({})

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
                                        <SidebarItem
                                            key={menu.title}
                                            item={menu}
                                            openMenus={openMenus}
                                            setOpenMenus={setOpenMenus}
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

interface SidebarItemProps {
    item: NavMenuItem;
    openMenus: Record<string, boolean>
    setOpenMenus: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
    parentPath?: string
}

function isItemActive(item: NavMenuItem, pathname: string): boolean {
    if (item.url && pathname === item.url) return true
    if (!item.subItems) return false

    return item.subItems.some(group =>
        group.items.some(sub => isItemActive(sub, pathname))
    )
}

function SidebarItem({
    item,
    openMenus,
    setOpenMenus,
    parentPath = "",
}: SidebarItemProps) {
    const pathname = usePathname()
    const { state, isMobile } = useSidebar()
    const isCollapsed = state === "collapsed"

    const fullPath = parentPath + "/" + item.title

    const hasActiveChild = React.useMemo(
        () => isItemActive(item, pathname),
        [item, pathname]
    )

    const isOpen = openMenus[fullPath] ?? false

    // Auto-open when route becomes active
    React.useEffect(() => {
        if (hasActiveChild) {
            setOpenMenus(prev => {
                if (prev[fullPath]) return prev
                return { ...prev, [fullPath]: true }
            })
        }
    }, [hasActiveChild, fullPath, setOpenMenus])

    // Accordion toggle (close siblings)
    const toggleOpen = () => {
        setOpenMenus(prev => {
            const next = { ...prev }

            Object.keys(next).forEach(key => {
                if (
                    key.startsWith(parentPath + "/") &&
                    key.split("/").length === fullPath.split("/").length &&
                    key !== fullPath
                ) {
                    next[key] = false
                }
            })

            next[fullPath] = !prev[fullPath]
            return next
        })
    }

    // =====================================================
    // COLLAPSED MODE (Dropdown)
    // =====================================================
    if (isCollapsed && !isMobile && item.subItems) {
        return (
            <SidebarMenuItem>
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            tooltip={item.title}
                            isActive={hasActiveChild}
                            className="group justify-center"
                        >
                            {item.icon && <item.icon className="size-4" />}
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        side="right"
                        align="start"
                        sideOffset={8}
                        className="min-w-56 rounded-md shadow-xl"
                    >
                        <DropdownMenuLabel className="font-semibold">
                            {item.title}
                        </DropdownMenuLabel>

                        {item.subItems.map((group, gIdx) => (
                            <React.Fragment key={gIdx}>
                                {group.label && (
                                    <>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuLabel className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                            {group.label}
                                        </DropdownMenuLabel>
                                    </>
                                )}

                                {group.items.map(sub => (
                                    <DropdownMenuItem
                                        key={sub.title}
                                        asChild
                                        className={
                                            isItemActive(sub, pathname)
                                                ? "font-medium text-primary! bg-sidebar-accent"
                                                : ""
                                        }
                                    >
                                        <Link href={sub.url || "#"}>
                                            {sub.title}
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

    // =====================================================
    // EXPANDED MODE (Recursive Accordion)
    // =====================================================
    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                tooltip={item.title}
                isActive={isOpen || hasActiveChild}
                onClick={item.subItems ? toggleOpen : undefined}
                asChild={!item.subItems}
            >
                {item.url && !item.subItems ? (
                    <Link
                        href={item.url}
                        onClick={() => setOpenMenus({})}
                        className={
                            isItemActive(item, pathname)
                                ? "flex items-center gap-2 text-primary! font-medium"
                                : "flex items-center gap-2"
                        }
                    >
                        {item.icon && <item.icon className="size-4" />}
                        <span>{item.title}</span>
                    </Link>
                ) : (
                    <>
                        <div className="flex items-center gap-2">
                            {item.icon && (
                                <item.icon className="size-4" />
                            )}
                            <span>{item.title}</span>
                        </div>

                        <ChevronRight
                            className={cn(
                                "ml-auto size-4 transition-transform duration-200",
                                isOpen && "rotate-90"
                            )}
                        />
                    </>
                )}
            </SidebarMenuButton>

            {isOpen && item.subItems && (
                <SidebarMenuSub>
                    {item.subItems.map((group, gIdx) => (
                        <div key={gIdx} className="mb-2 last:mb-0">
                            {group.label && (
                                <div className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                    {group.label}
                                </div>
                            )}

                            {group.items.map(sub => (
                                <SidebarItem
                                    key={sub.title}
                                    item={sub}
                                    openMenus={openMenus}
                                    setOpenMenus={setOpenMenus}
                                    parentPath={fullPath}
                                />
                            ))}
                        </div>
                    ))}
                </SidebarMenuSub>
            )}
        </SidebarMenuItem>
    )
}