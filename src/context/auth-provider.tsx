'use client';

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

import { auth_api } from '@/config';
import { useMount } from '@/hooks/use-mount';
import { useApi } from '@/hooks/use-api';
import { IUser } from '@/interface/session';

interface IAuthContext {
    user: IUser | null;
    loading: boolean;
    setUser: Dispatch<SetStateAction<IUser | null>>;
}

const AuthContext = createContext<IAuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<IUser | null>(null);
    const isMounted = useMount();
    const { post } = useApi();

    useEffect(() => {
        async function checkSession() {
            const { data: result, error } = await post(`${auth_api}/Session`);

            if (error || !result || !result.isSuccess) {
                setUser(null);
            } else {
                setUser(result.result as IUser);
            }
            setLoading(false);
        }
        checkSession();
    }, [post]);

    if (!isMounted) return null;

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): IAuthContext {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}