import { ReactNode } from "react";

interface BadgeProps {
    children: ReactNode;
    variant: 'success' | 'info' | 'default' | 'secondary' | 'warning';
    className?: string;
}

export const Badge = ({ children, variant, className }: BadgeProps) => {
    const styles: Record<string, string> = {
        default: "bg-secondary text-muted-foreground border-border",
        secondary: "bg-violet-50 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 border-violet-100 dark:border-violet-800",
        success: "bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800",
        warning: "bg-orange-50 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 border-orange-100 dark:border-orange-800",
        info: "bg-blue-50 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-800",
    };

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wide ${styles[variant] || styles.default} ${className || ''}`}>
            {children}
        </span>
    );
};