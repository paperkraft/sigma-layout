"use client";

import { HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail
} from '@/components/ui/sidebar';
import { sidebarMenuGroups } from '@/config/sidebar_menu';
import { cn } from '@/lib/utils';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path || pathname.startsWith(path);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent className="bg-background dark:bg-popover">
        {sidebarMenuGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((menu) => (
                  <SidebarMenuItem key={menu.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(menu?.url)}
                      tooltip={menu.title}
                    >
                      <Link
                        href={menu?.url}
                        className={cn(
                          "transition-colors duration-200 flex items-center gap-2",
                          isActive(menu?.url)
                            ? "text-primary! font-semibold"
                            : "text-sidebar-foreground/80 hover:text-primary!"
                        )}
                      >
                        <menu.icon />
                        {menu.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="bg-background dark:bg-popover md:mb-14">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Help & Support"
              className="text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <HelpCircle />
              Help & Support
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
