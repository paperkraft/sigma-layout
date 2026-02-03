import { cn } from "@/lib/utils";

export default function QuotaItem({ icon, label, used, total, color, warning }: any) {
   const percent = Math.min((used/total) * 100, 100);
   return (
      <div>
         <div className="flex justify-between text-xs mb-1.5">
            <div className="flex items-center gap-2 text-slate-600">
               {icon} <span>{label}</span>
            </div>
            <div className="font-mono text-slate-900">
               {used}/{total}
            </div>
         </div>
         <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className={cn("h-full rounded-full", color)} style={{ width: `${percent}%` }} />
         </div>
         {warning && <p className="text-[10px] text-amber-600 mt-1 font-medium">Space running low</p>}
      </div>
   )
}