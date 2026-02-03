"use client";

import { useRouter } from 'next/navigation';
import React from 'react';

import { UserAction } from './app-user-action';

interface HeaderProps {
  isWorkbench: boolean;
  projectName?: string;
  description?: string;
}

export const Header = ({
  isWorkbench,
  projectName,
  description,
}: HeaderProps) => {

  const route = useRouter();
  const handleBack = () => route.replace("/projects");
  const handleDashboard = () => route.replace("/dashboard");

  return (
    <header className="h-14 w-full bg-background border-b border-slate-200 flex items-center justify-between px-3 shrink-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="size-8 bg-primary rounded flex items-center justify-center text-white font-bold text-lg">
            S
          </div>

          {!isWorkbench && (
            <span className="font-bold text-base text-slate-900 leading-tight">
              Sigma ToolBox
            </span>
          )}

          {isWorkbench && (
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-900 leading-tight truncate max-w-48">
                {projectName}
              </span>
              <span className="text-[10px] text-slate-400 font-medium truncate max-w-48">
                {description}
              </span>
            </div>
          )}
        </div>

        {isWorkbench && (
          <>
            <div className="h-4 w-px bg-slate-200 mx-2" />
            <nav className="flex items-center gap-4 text-xs font-medium text-slate-500">
              <span
                className="hover:text-slate-800 cursor-pointer transition-colors"
                onClick={() => handleDashboard()}
              >
                Dashboard
              </span>
              <span
                className="hover:text-slate-800 cursor-pointer transition-colors"
                onClick={() => handleBack()}
              >
                Projects
              </span>
              <span className="text-primary border-b-2 border-primary pb-3.5 mt-3.5 cursor-pointer">
                Workbench
              </span>
            </nav>
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="h-4 w-px bg-slate-200" />
        <UserAction />
      </div>
    </header>
  );
};
