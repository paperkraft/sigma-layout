import {
  CircleSmall, Clock, Copy, ExternalLink, GitBranchMinus, Loader2,
  MousePointerClick, Trash2, Users, X
} from 'lucide-react';
import React, { memo, useCallback, useMemo } from 'react';
import Link from 'next/link';

import CustomToolTip from '@/components/shared/custom-tooltip';
import { toast } from 'sonner';
import { ProjectMetadata } from '@/config/project_dummy';

export interface PanelProps {
  loadingThumbnail?: boolean;
  activeProject?: ProjectMetadata | null;
  features?: any[];
  getProjectUrl: (params: { type: string, id: string }) => string;
  handleClose: () => void;
}

export const RightPanel = memo(function RightPanel({
  activeProject,
  getProjectUrl,
  handleClose,
}: PanelProps) {

  const formattedDate = useMemo(() => {
    return activeProject?.lastModified
      ? new Date(activeProject.lastModified).toLocaleDateString()
      : '';
  }, [activeProject?.lastModified]);

  const handleDelete = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeProject?.id) {
      toast.info('Delete action trigger');
    }
  }, [activeProject?.id]);

  if (!activeProject) {
    return (
      <aside className="hidden w-80 h-[calc(100vh-60px)] bg-card border-l border-border lg:flex flex-col shrink-0 z-10 transition-colors">
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mb-6">
            <MousePointerClick size={40} className="text-muted-foreground/50" />
          </div>
          <h6 className="text-lg font-semibold text-foreground mb-2">
            No Project Selected
          </h6>
          <p className="text-sm text-muted-foreground max-w-50 leading-relaxed">
            Select a project from the list to view its details, statistics,
            and simulation results.
          </p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="hidden w-80 h-[calc(100vh-60px)] bg-card border-l border-border lg:flex flex-col shrink-0 z-10 transition-colors">
      <div className="h-12 border-b border-border flex items-center px-4 shrink-0 justify-between bg-card">
        <div className="flex items-center gap-1">
          <ActionLink
            icon={ExternalLink}
            tooltip="Open"
            href={getProjectUrl({ type: activeProject.type, id: activeProject.id })}
          />
          <ActionBtn icon={Copy} tooltip="Copy" />
          <ActionBtn
            icon={Trash2}
            tooltip="Delete"
            onClick={handleDelete}
          />
        </div>
        <ActionBtn
          icon={X}
          tooltip="Close"
          onClick={handleClose}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-5 animate-in fade-in duration-300 space-y-5">
        {activeProject.type === 'waterlab' && (
          <div>
            <h6 className="text-[11px] font-semibold mb-2 uppercase tracking-wider text-muted-foreground">
              Network Preview
            </h6>
            <div className="relative w-full h-48 bg-muted animate-pulse rounded-md flex items-center justify-center border border-border">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Loading preview…
                </span>
              </div>
            </div>
          </div>
        )}

        <div>
          <h2 className="text-lg font-semibold text-foreground mb-1">
            {activeProject.name}
          </h2>

          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Clock size={12} />{" "}
              {formattedDate}
            </span>
            <span className="w-1 h-1 rounded-full bg-border"></span>
            <span className="flex items-center gap-1">
              <Users size={12} /> Me
            </span>
          </div>
        </div>

        <div>
          <h6 className="text-[11px] font-semibold uppercase mb-2 border-b border-border pb-2 text-muted-foreground">
            Project description
          </h6>
          <div className="text-sm text-foreground/80 leading-relaxed">
            {activeProject.description || "No description provided."}
          </div>
        </div>

        {activeProject.type === 'waterlab' && (
          <div>
            <h6 className="text-[11px] font-semibold uppercase mb-3 border-b border-border pb-2 text-muted-foreground">
              Statistics
            </h6>
            <div className="grid grid-cols-2 gap-4">
              <StatBox
                label="Nodes"
                value={activeProject.nodeCount ?? 0}
                icon={CircleSmall}
              />
              <StatBox
                label="Links"
                value={activeProject.linkCount ?? 0}
                icon={GitBranchMinus}
              />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}, (prevProps, nextProps) => {
  return prevProps.activeProject?.id === nextProps.activeProject?.id;
});

interface ActionBtnProps {
  icon: React.ElementType;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  tooltip: string;
}

const ActionBtn = memo(function ActionBtn({
  icon: Icon,
  className = "",
  onClick,
  tooltip,
}: ActionBtnProps) {
  return (
    <CustomToolTip tooltip={tooltip}>
      <button
        type="button"
        className={`p-2 rounded transition-colors text-muted-foreground hover:text-foreground hover:bg-muted ${className}`}
        onClick={onClick}
      >
        <Icon size={18} />
      </button>
    </CustomToolTip>
  );
});

interface StatBoxProps {
  label: string;
  value: number | string;
  icon: React.ElementType;
}

const StatBox = memo(function StatBox({ label, value, icon: Icon }: StatBoxProps) {
  return (
    <div className="flex flex-col gap-1 p-3 bg-muted/30 rounded-lg border border-border">
      <span className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1.5">
        <Icon size={14} /> {label}
      </span>
      <span className="font-mono text-xl font-medium text-foreground">{value}</span>
    </div>
  );
});

interface ActionLinkProps {
  icon: React.ElementType;
  className?: string;
  href: string;
  tooltip: string;
}

const ActionLink = memo(function ActionLink({
  icon: Icon,
  className = "",
  href,
  tooltip,
}: ActionLinkProps) {
  return (
    <CustomToolTip tooltip={tooltip}>
      <Link
        href={href}
        className={`p-2 rounded transition-colors text-muted-foreground hover:text-foreground hover:bg-muted block ${className}`}
      >
        <Icon size={18} />
      </Link>
    </CustomToolTip>
  );
});