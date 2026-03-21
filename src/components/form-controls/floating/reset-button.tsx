import { cn } from "@/lib/utils"
import { X } from "lucide-react"

export const ResetButton = ({ reset, className }: { className?: string, reset: () => void }) => {
    return (
        <button
            type="button"
            onClick={reset}
            aria-label="Reset field"
            className={cn("size-8 absolute right-1 top-1/2 -translate-y-1/2 flex justify-center items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer rounder-md", className)}
        >
            <X size={16} />
        </button>
    )
}