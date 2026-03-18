import { ReactNode } from 'react'

interface IAuthHeader {
    children?: ReactNode;
    title: string;
    description: string;
}

export function AuthHeader({ children, title, description }: IAuthHeader) {
    return (
        <div className="mb-8">
            {children}
            <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
            <p className="text-slate-500 text-sm mt-1 max-w-md">{description}</p>
        </div>
    )
}