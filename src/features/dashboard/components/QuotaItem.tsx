import { cn } from "@/lib/utils";

export default function QuotaItem({ icon, label, used, total, color, warning }: any) {
   const percent = Math.min((used / total) * 100, 100);
   return (
      <div>
         <div className="flex justify-between text-xs mb-1.5">
            <div className="flex items-center gap-2 text-muted-foreground">
               {icon} <span>{label}</span>
            </div>
            <div className="font-mono text-foreground font-medium">
               {used}/{total}
            </div>
         </div>
         <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div className={cn("h-full rounded-full", color)} style={{ width: `${percent}%` }} />
         </div>
         {warning && <p className="text-[10px] text-amber-600 dark:text-amber-500 mt-1 font-medium">Space running low</p>}
      </div>
   )
}