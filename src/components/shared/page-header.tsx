import { ReactNode } from 'react'

interface PageHeaderProps {
    children?: ReactNode;
    title: string;
    description: string;
}

export function PageHeader({ children, title, description }: PageHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold text-foreground tracking-tight">{title}</h1>
                <p className="text-muted-foreground text-sm mt-1">{description}</p>
            </div>
            {children}
        </div>
    )
}