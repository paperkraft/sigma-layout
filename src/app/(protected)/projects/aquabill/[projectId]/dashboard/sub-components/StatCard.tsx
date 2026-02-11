import { TrendingDown, TrendingUp } from "lucide-react";

export const StatCard = ({ title, value, trend, trendValue, icon: Icon, trendUp }: any) => (
    <div className="p-6 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <div className="p-2 bg-secondary rounded-lg">
                <Icon className="size-5 text-foreground" />
            </div>
        </div>
        <div className="flex flex-wrap items-baseline space-x-2">
            <h2 className="text-3xl font-bold text-foreground">{value}</h2>
            <span className={`flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${trendUp
                ? 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400'
                : 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400'
                }`}>
                {trendUp ? <TrendingUp className="size-3 mr-1" /> : <TrendingDown className="size-3 mr-1" />}
                {trendValue}
            </span>
        </div>
        <p className="text-xs text-muted-foreground mt-2">{trend}</p>
    </div>
);