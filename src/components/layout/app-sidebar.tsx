"use client";

import { sidebarMenuGroups } from '@/config/sidebar_menu';

import { NavSidebar } from './nav-sidebar';

export function AppSidebar({ ...props }: Omit<React.ComponentProps<typeof NavSidebar>, "groups">) {
  return (
    <NavSidebar
      groups={sidebarMenuGroups}
      {...props}
    />
  );
}
