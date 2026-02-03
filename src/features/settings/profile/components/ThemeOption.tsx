'use client';

import { cn } from "@/lib/utils";

export function ThemeOption({ icon, label, active, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex flex-col items-center justify-center gap-2 p-3 rounded-lg border transition-all",
                active
                    ? "bg-card border-primary ring-1 ring-primary text-primary"
                    : "bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
            )}>
            {icon}
            <span className="text-xs font-medium">{label}</span>
        </button>
    )
}