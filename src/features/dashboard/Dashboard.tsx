"use client";

import { ArrowRight, Clock, Cpu, FileText, HardDrive, Plus, Zap } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import ProjectCard from './components/ProjectCard';
import QuotaItem from './components/QuotaItem';

// --- MOCK DATA ---
const RECENT_PROJECTS = [
   {
      id: "p1",
      name: "Kolhapur Corporation",
      type: "Water billing",
      lastEdited: "2 hours ago",
      status: "success", // running, success, failed, draft
      thumbnail: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=2670&auto=format&fit=crop",
      // thumbnail: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2670&auto=format&fit=crop",
      // thumbnail: "https://images.unsplash.com/photo-1762427907123-c7ab022a5de7?q=80&w=2670&auto=format&fit=crop",
   },
   {
      id: "p4",
      name: "Urban Water Distribution Network",
      type: "Drinking Water",
      lastEdited: "1 week ago",
      status: "draft",
      thumbnail: "https://images.unsplash.com/photo-1476973422084-e0fa66ff9456?q=80&w=2670&auto=format&fit=crop",
      // thumbnail: "https://images.unsplash.com/photo-1610696338308-dd48c9da0c72?q=80&w=2670&auto=format&fit=crop",
      // thumbnail: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?q=80&w=2670&auto=format&fit=crop",
   },
];

const TEMPLATES = [
   { id: "t1", name: "Pipe Flow", icon: Zap, desc: "Incompressible internal flow." },
   { id: "t2", name: "Heat Transfer", icon: FileText, desc: "Conjugate heat transfer." },
   { id: "t3", name: "Aerodynamics", icon: Zap, desc: "External compressible flow." },
];

const ACTIVITY_FEED = [
   { id: 1, text: "Simulation 'Run 4' completed successfully.", time: "10m ago", type: "success" },
   { id: 2, text: "Project 'Valve Test' was shared with you.", time: "2h ago", type: "info" },
   { id: 3, text: "Core hour limit reached (80%).", time: "5h ago", type: "warning" },
];

export default function Dashboard() {
   return (
      <div className="space-y-8 p-6 md:p-8">

         {/* 1. HEADER & ACTIONS */}
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
               <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
               <p className="text-slate-500 text-sm mt-1">Welcome back, Vishal</p>
            </div>
            <Button>
               <Plus size={16} className="mr-2" /> New Project
            </Button>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* 2. LEFT COLUMN: PROJECTS (Main Workspace) */}
            <div className="lg:col-span-2 space-y-8">

               {/* Quick Starters */}
               <div className='hidden'>
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-4 flex items-center gap-2">
                     <Zap size={14} /> Quick Start
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                     {TEMPLATES.map((t) => (
                        <button key={t.id} className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all text-left group">
                           <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                              <t.icon size={16} />
                           </div>
                           <div className="font-semibold text-sm text-slate-900">{t.name}</div>
                           <div className="text-xs text-slate-500 mt-1">{t.desc}</div>
                        </button>
                     ))}
                  </div>
               </div>

               {/* Recent Projects */}
               <div>
                  <div className="flex items-center justify-between mb-4">
                     <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-2">
                        <Clock size={14} /> Recent Projects
                     </h3>
                     <Link href="/projects" className="text-xs font-medium text-blue-600 hover:underline flex items-center">
                        View All <ArrowRight size={12} className="ml-1" />
                     </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {RECENT_PROJECTS.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                     ))}

                     {/* Create New Card Placeholder */}
                     <button className="flex flex-col items-center justify-center gap-3 bg-slate-100/50 border-2 border-dashed border-slate-300 rounded-xl min-h-50 hover:bg-slate-100 hover:border-slate-400 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-400">
                           <Plus size={20} />
                        </div>
                        <span className="text-sm font-medium text-slate-500">Create New Project</span>
                     </button>
                  </div>
               </div>
            </div>

            {/* 3. RIGHT COLUMN: TELEMETRY & FEED */}
            <div className="space-y-6">

               {/* Usage Widget */}
               <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                     <h3 className="text-sm font-bold text-slate-900">Usage Quota</h3>
                     <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">PRO PLAN</span>
                  </div>

                  <div className="space-y-5">
                     <QuotaItem
                        icon={<Cpu size={14} />}
                        label="Core Hours"
                        used={450}
                        total={1000}
                        color="bg-blue-600"
                     />
                     <QuotaItem
                        icon={<HardDrive size={14} />}
                        label="Cloud Storage (GB)"
                        used={82}
                        total={100}
                        color="bg-purple-600"
                        warning
                     />
                  </div>
                  <div className="mt-5 pt-4 border-t border-slate-100">
                     <Link href="/subscription" className="text-xs font-medium text-slate-500 hover:text-blue-600 flex items-center justify-center">
                        Manage Subscription
                     </Link>
                  </div>
               </div>

               {/* Activity Feed */}
               <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 mb-4">Latest Activity</h3>
                  <div className="space-y-4">
                     {ACTIVITY_FEED.map((item) => (
                        <div key={item.id} className="flex gap-3 items-start">
                           <div className={cn(
                              "w-2 h-2 rounded-full mt-1.5 shrink-0",
                              item.type === 'success' ? "bg-green-500" :
                                 item.type === 'warning' ? "bg-amber-500" : "bg-blue-500"
                           )} />
                           <div>
                              <p className="text-xs text-slate-700 leading-snug">{item.text}</p>
                              <p className="text-[10px] text-slate-400 mt-1">{item.time}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}