import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, FileText, FolderOpen, Loader2, MoreVertical } from "lucide-react";

export default function ProjectCard({ project }: any) {
   const statusColor = {
      running: "text-blue-600 bg-blue-50 border-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
      success: "text-green-600 bg-green-50 border-green-100 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
      failed: "text-red-600 bg-red-50 border-red-100 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
      draft: "text-slate-500 bg-slate-100 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
   };

   const StatusIcon = {
      running: Loader2,
      success: CheckCircle2,
      failed: AlertCircle,
      draft: FileText
   }[project.status as keyof typeof statusColor];

   return (
      <div className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer flex flex-col">
         {/* Thumbnail Area */}
         <div className="h-32 bg-muted relative overflow-hidden">
            {project.thumbnail ? (
               <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${project.thumbnail})` }}
               />
            ) : (
               <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/40">
                  <FolderOpen size={32} />
               </div>
            )}

            {/* Overlay Status Badge */}
            <div className="absolute top-3 right-3">
               <span className={cn(
                  "text-[10px] font-bold px-2 py-1 rounded-full border flex items-center gap-1.5 uppercase tracking-wide backdrop-blur-md shadow-sm",
                  statusColor[project.status as keyof typeof statusColor]
               )}>
                  <StatusIcon size={10} className={cn(project.status === 'running' && "animate-spin")} />
                  {project.status}
               </span>
            </div>
         </div>

         {/* Content Area */}
         <div className="p-4 flex flex-col flex-1">
            <div className="flex justify-between items-start mb-2">
               <div>
                  <h4 className="text-sm font-bold text-card-foreground group-hover:text-primary transition-colors line-clamp-1">
                     {project.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">{project.type}</p>
               </div>
               <button className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted">
                  <MoreVertical size={16} />
               </button>
            </div>

            {/* Progress Bar if running */}
            {project.status === 'running' && (
               <div className="mt-2 mb-3">
                  <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                     <span>Simulating...</span>
                     <span>{project.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                     <div className="h-full bg-primary rounded-full" style={{ width: `${project.progress}%` }} />
                  </div>
               </div>
            )}

            <div className="mt-auto pt-3 border-t border-border flex items-center justify-between text-[10px] text-muted-foreground">
               <span>Edited {project.lastEdited}</span>
               <span className="group-hover:translate-x-1 transition-transform text-foreground font-medium">Open</span>
            </div>
         </div>
      </div>
   )
}