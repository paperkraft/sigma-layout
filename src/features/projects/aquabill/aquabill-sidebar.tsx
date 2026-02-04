"use client";

import { useParams } from 'next/navigation';
import { useMemo } from 'react';

import { NavSidebar } from '@/components/layout/nav-sidebar';
import { aquabillMenuGroups } from '@/config/aquabill_sidebar';

export function AquabillSidebar({ ...props }: Omit<React.ComponentProps<typeof NavSidebar>, "groups">) {
    // 1. Get the dynamic projectId from the URL
    const params = useParams();
    const projectId = params.projectId as string;

    // 2. Transform the static menu config to include the projectId
    const navGroups = useMemo(() => {
        // Base URL for this project
        const baseUrl = `/projects/aquabill/${projectId}`;

        // Recursive function to update URLs in items and nested sub-items
        const transformItems = (items: any[]): any[] => {
            return items.map(item => ({
                ...item,
                // If URL exists, prepend base URL. Remove leading slash from item.url to avoid double slashes.
                url: item.url ? `${baseUrl}/${item.url.replace(/^\//, '')}` : undefined,

                // Recursively handle sub-menus (which are groups of items)
                subItems: item.subItems ? item.subItems.map((group: any) => ({
                    ...group,
                    items: transformItems(group.items)
                })) : undefined
            }));
        };

        // Map over the top-level groups
        return aquabillMenuGroups.map(group => ({
            ...group,
            items: transformItems(group.items)
        }));

    }, [projectId]);

    // 3. Pass the transformed groups to your generic sidebar
    return (
        <NavSidebar
            {...props}
            groups={navGroups}
        />
    );
}