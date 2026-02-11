import { cn } from "@/lib/utils";

export function NavButton({ active, onClick, icon, label }: any) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                active
                    ? "bg-card text-primary shadow-sm ring-1 ring-border"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            )}
        >
            <span className={cn("opacity-70", active && "opacity-100")}>{icon}</span>
            {label}
        </button>
    )
}