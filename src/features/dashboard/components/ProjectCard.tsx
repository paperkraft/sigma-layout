import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, FileText, FolderOpen, Loader2, MoreVertical } from "lucide-react";

export default function ProjectCard({ project }: any) {
   const statusColor = {
      running: "text-blue-600 bg-blue-50 border-blue-100",
      success: "text-green-600 bg-green-50 border-green-100",
      failed: "text-red-600 bg-red-50 border-red-100",
      draft: "text-slate-500 bg-slate-100 border-slate-200",
   };

   const StatusIcon = {
      running: Loader2,
      success: CheckCircle2,
      failed: AlertCircle,
      draft: FileText
   }[project.status as keyof typeof statusColor];

   return (
      <div className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex flex-col">
         {/* Thumbnail Area */}
         <div className="h-32 bg-slate-100 relative overflow-hidden">
            {project.thumbnail ? (
               <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${project.thumbnail})` }} 
               />
            ) : (
               <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                  <FolderOpen size={32} />
               </div>
            )}
            
            {/* Overlay Status Badge */}
            <div className="absolute top-3 right-3">
               <span className={cn(
                  "text-[10px] font-bold px-2 py-1 rounded-full border flex items-center gap-1.5 uppercase tracking-wide backdrop-blur-sm",
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
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                     {project.name}
                  </h4>
                  <p className="text-xs text-slate-500">{project.type}</p>
               </div>
               <button className="text-slate-400 hover:text-slate-700">
                  <MoreVertical size={16} />
               </button>
            </div>

            {/* Progress Bar if running */}
            {project.status === 'running' && (
               <div className="mt-2 mb-3">
                  <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                     <span>Simulating...</span>
                     <span>{project.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                     <div className="h-full bg-blue-500 rounded-full" style={{ width: `${project.progress}%` }} />
                  </div>
               </div>
            )}

            <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
               <span>Edited {project.lastEdited}</span>
               <span className="group-hover:translate-x-1 transition-transform">Open</span>
            </div>
         </div>
      </div>
   )
}