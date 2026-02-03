import { ReactNode } from "react";

interface PageProps {
    title: string;
    description: string;
    children?: ReactNode;
}

export const Placeholder = ({ title, description, children }: PageProps) => {
    return (
        <div className="space-y-8 p-6 md:p-8">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
                    <p className="text-slate-500 text-sm mt-1">{description}</p>
                </div>
            </div>

            {/* CONTENT AREA */}
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                {children}
            </div>
        </div>
    )
}