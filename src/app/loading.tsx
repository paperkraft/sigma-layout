"use client";

import { cn } from "@/lib/utils";
import Logo from "@/components/layout/app-logo";

export default function Loading() {
  return (
    <div className={cn("flex justify-center items-center w-full h-[calc(100svh-100px)]")}>
      <div className="flex flex-col items-center gap-4 animate-pulse">
        <Logo />
      </div>
    </div>
  )
}