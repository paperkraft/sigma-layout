"use client";

import { useRouter } from 'next/navigation';
import React from 'react';
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
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
  const { setTheme, theme } = useTheme();
  const route = useRouter();
  const handleBack = () => route.replace("/projects");
  const handleDashboard = () => route.replace("/dashboard");

  return (
    <header className="h-14 w-full bg-background border-b border-border flex items-center justify-between px-3 shrink-0 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="size-8 bg-primary rounded flex items-center justify-center text-primary-foreground font-bold text-lg">
            S
          </div>

          {!isWorkbench && (
            <span className="font-bold text-base text-foreground leading-tight">
              Sigma ToolBox
            </span>
          )}

          {isWorkbench && (
            <div className="flex flex-col">
              <span className="text-xs font-bold text-foreground leading-tight truncate max-w-48">
                {projectName}
              </span>
              <span className="text-[10px] text-muted-foreground font-medium truncate max-w-48">
                {description}
              </span>
            </div>
          )}
        </div>

        {isWorkbench && (
          <>
            <div className="h-4 w-px bg-border mx-2" />
            <nav className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
              <span
                className="hover:text-foreground cursor-pointer transition-colors"
                onClick={() => handleDashboard()}
              >
                Dashboard
              </span>
              <span
                className="hover:text-foreground cursor-pointer transition-colors"
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
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
        <div className="h-4 w-px bg-border" />
        <UserAction />
      </div>
    </header>
  );
};