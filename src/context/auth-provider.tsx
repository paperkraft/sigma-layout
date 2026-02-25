'use client';

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

import { base_url } from '@/config';
import { useMount } from '@/hooks/use-mount';
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

    useEffect(() => {
        async function checkSession() {
            try {
                // Call your external API to get user details
                const res = await fetch(`${base_url}/api/User/Session`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (res.ok) {
                    const result = await res.json();
                    if (result.isSuccess) {
                        console.log('Session', result.result);
                        setUser(result.result as IUser);
                    }
                } else {
                    setUser(null);
                }
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        checkSession();
    }, []);

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