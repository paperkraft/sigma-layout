import { useState, useCallback } from 'react';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export function useApi() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const request = useCallback(async (url: string, method: HttpMethod, payload?: any) => {
        setIsLoading(true);
        setError(null);

        try {
            const options: RequestInit = {
                method,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            };

            if (payload !== undefined && payload !== null && method !== 'GET') {
                options.body = JSON.stringify(payload);
            }

            const res = await fetch(url, options);
            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || result.resMsg || "Request failed");
            }

            return { data: result, error: null };
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
            setError(errorMessage);
            return { data: null, error: errorMessage };
        } finally {
            setIsLoading(false);
        }
    }, []);

    const get = useCallback((url: string) => request(url, 'GET'), [request]);
    const post = useCallback((url: string, payload?: any) => request(url, 'POST', payload), [request]);
    const put = useCallback((url: string, payload?: any) => request(url, 'PUT', payload), [request]);
    const del = useCallback((url: string, payload?: any) => request(url, 'DELETE', payload), [request]);
    const patch = useCallback((url: string, payload?: any) => request(url, 'PATCH', payload), [request]);

    return {
        isLoading,
        error,
        request,
        get,
        post,
        put,
        delete: del,
        patch
    };
}
