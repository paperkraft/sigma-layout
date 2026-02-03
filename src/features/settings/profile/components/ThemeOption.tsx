import { cn } from "@/lib/utils";

export function ThemeOption({ mode, icon, label, active }: any) {
    return (
        <button className={cn(
            "flex flex-col items-center justify-center gap-2 p-3 rounded-lg border transition-all",
            active
                ? "bg-white border-blue-500 ring-1 ring-blue-500 text-blue-700"
                : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
        )}>
            {icon}
            <span className="text-xs font-medium">{label}</span>
        </button>
    )
}