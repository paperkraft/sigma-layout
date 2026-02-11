import { ArrowRight } from "lucide-react";

export const SectionHeader = ({ title, action }: any) => (
    <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {action && (
            <button className="text-sm text-primary hover:text-primary/80 font-medium flex items-center transition-colors">
                {action} <ArrowRight className="ml-1 h-4 w-4" />
            </button>
        )}
    </div>
);