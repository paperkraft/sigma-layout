import {
  CircleSmall, Clock, Copy, ExternalLink, GitBranchMinus, Loader2, Map,
  MousePointerClick, Trash2, Users, X
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';

import CustomToolTip from '@/components/shared/CustomToolTip';
import { toast } from 'sonner';

interface PanelProps {
  loadingThumbnail?: boolean;
  activeProject: any;
  features?: any;
  handleClose: () => void;
}

export const RightPanel = ({
  activeProject,
  handleClose,
}: PanelProps) => {
  const router = useRouter();

  const handleOpenProject = useCallback(({ type, id }: { type: string, id: string }) => {
    router.replace(`/projects/${type}/${id}`);
  }, []);

  const handleDelete = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    toast.info('Delete action trigger')
  }, []);

  return (
    <aside className="hidden w-70 h-[calc(100vh-60px)] bg-background border-x border-slate-200 lg:flex flex-col shrink-0 z-10">
      {/* CONDITIONAL RENDER: PLACEHOLDER VS DETAILS */}
      {!activeProject ? (
        // --- OPTION 1: PLACEHOLDER STATE ---
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
            <MousePointerClick size={40} className="text-slate-300" />
          </div>
          <h3 className="text-lg font-semibold text-slate-700 mb-2">
            No Project Selected
          </h3>
          <p className="text-sm text-slate-500 max-w-50 leading-relaxed">
            Select a project from the list to view its details, statistics,
            and simulation results.
          </p>
        </div>
      ) : (
        // --- OPTION 2: PROJECT DETAILS STATE ---
        <>
          {/* Header */}
          <div className="h-12 border-b border-slate-200 flex items-center px-4 shrink-0">
            <div className="flex items-center gap-1">
              <ActionBtn
                icon={ExternalLink}
                tooltip="Open"
                onClick={() => handleOpenProject({ type: activeProject.type, id: activeProject.id })}
              />
              <ActionBtn icon={Copy} tooltip="Copy" />
              <ActionBtn
                icon={Trash2}
                tooltip="Delete"
                onClick={(e: any) => handleDelete(e, activeProject.id)}
              />
            </div>
            <ActionBtn
              icon={X}
              tooltip="Close"
              className="ml-auto"
              onClick={handleClose}
            />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 px-5 animate-in fade-in duration-300 space-y-3">
            <h6 className="text-[11px] font-semibold mb-2 uppercase tracking-wider">
              Network Preview
            </h6>

            {/* Thumbnail */}
            <div className="relative w-full h-48 bg-slate-100 animate-pulse rounded-md flex items-center justify-center border border-slate-200">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
                <span className="text-xs text-slate-400">
                  Loading preview…
                </span>
              </div>
            </div>

            {/* Details */}
            <h2 className="text-base font-medium text-slate-800 mb-2">
              {activeProject.name}
            </h2>

            <div className="flex items-center gap-3 text-xs text-slate-400 mb-6">
              <span className="flex items-center gap-1">
                <Clock size={12} />{" "}
                {new Date(activeProject.lastModified).toLocaleDateString()}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span className="flex items-center gap-1">
                <Users size={12} /> Me
              </span>
            </div>

            {/* Description */}
            <h6 className="text-[11px] font-semibold uppercase mb-2 border-b border-slate-200 pb-2">
              Project description
            </h6>

            <div className="text-[12px] text-slate-600 leading-relaxed mb-8">
              {activeProject.description}
            </div>

            {/* Stats */}
            <h6 className="text-[11px] font-semibold uppercase mb-2 border-b border-slate-200 pb-2">
              Statistics
            </h6>
            <div className="grid grid-cols-2 gap-4">
              <StatBox
                label="Nodes"
                value={activeProject.nodeCount}
                icon={CircleSmall}
              />
              <StatBox
                label="Links"
                value={activeProject.linkCount}
                icon={GitBranchMinus}
              />
            </div>
          </div>
        </>
      )}
    </aside>
  );
};

function ActionBtn({
  icon: Icon,
  color = "text-slate-400 hover:text-slate-700 hover:bg-slate-50",
  className,
  onClick,
  tooltip,
}: any) {
  return (
    <CustomToolTip tooltip={tooltip}>
      <button
        className={`p-2 rounded transition-colors ${color} ${className}`}
        onClick={onClick}
      >
        <Icon size={18} />
      </button>
    </CustomToolTip>
  );
}

function StatBox({ label, value, icon: Icon }: any) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1.5">
        <Icon size={12} /> {label}
      </span>
      <span className="font-semibold text-slate-700">{value}</span>
    </div>
  );
}
