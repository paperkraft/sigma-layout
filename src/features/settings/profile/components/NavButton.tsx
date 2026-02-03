import { cn } from "@/lib/utils";

export function NavButton({ active, onClick, icon, label }: any) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                active
                    ? "bg-white text-blue-600 shadow-sm ring-1 ring-slate-200"
                    : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900"
            )}
        >
            <span className={cn("opacity-70", active && "opacity-100")}>{icon}</span>
            {label}
        </button>
    )
}