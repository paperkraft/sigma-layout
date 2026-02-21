'use client';

import { useCallback, useEffect, useState } from "react";

export function useFullscreen() {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggle = useCallback((element?: HTMLElement | null) => {
        if (typeof document === "undefined") return;

        const target = element ?? document.documentElement;

        if (!document.fullscreenElement) {
            target.requestFullscreen().catch((err) => {
                console.error("Failed to enter fullscreen:", err);
            });
        } else {
            document.exitFullscreen().catch((err) => {
                console.error("Failed to exit fullscreen:", err);
            });
        }
    }, []);

    useEffect(() => {
        const handleChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener("fullscreenchange", handleChange);
        return () =>
            document.removeEventListener("fullscreenchange", handleChange);
    }, []);

    return { isFullscreen, toggle };
}
