import { useState, useEffect } from "react";

type RateLimitOptions = {
    limit: number; // Maximum requests allowed
    window: number; // Time window in milliseconds
};

// This is a basic rate limiter for FE use that relies on localStorage
export function useRateLimiter({ limit, window }: RateLimitOptions) {
    const [ip, setIp] = useState<string | null>(null);
    const [isRateLimited, setIsRateLimited] = useState(false);

    useEffect(() => {
        // Fetch the user's IP address
        const fetchIp = async () => {
            try {
                const response = await fetch("https://api64.ipify.org?format=json");
                const data = await response.json();
                setIp(data.ip);
            } catch (error) {
                console.error("Failed to fetch IP", error);
            }
        };
        fetchIp();
    }, []);

    const updateRequestLog = () => {
        if (!ip) return;

        const now = Date.now();
        const storageKey = `rate-limit-${ip}`;
        const storedData = localStorage.getItem(storageKey);
        let requestLog = storedData ? JSON.parse(storedData) : [];
        // Remove outdated requests
        requestLog = requestLog.filter((timestamp: number) => now - timestamp < window);

        if (requestLog.length >= limit) {
            setIsRateLimited(true);
        } else {
            setIsRateLimited(false);
        }

        localStorage.setItem(storageKey, JSON.stringify(requestLog));
    }

    const attemptRequest = () => {
        updateRequestLog();
        if (isRateLimited || !ip) return false;

        const now = Date.now();
        const storageKey = `rate-limit-${ip}`;
        const storedData = localStorage.getItem(storageKey);
        let requestLog = storedData ? JSON.parse(storedData) : [];
        requestLog.push(now);

        localStorage.setItem(storageKey, JSON.stringify(requestLog));

        if (requestLog.length >= limit) {
            setIsRateLimited(true);
        }

        return true;
    };

    return { isRateLimited, attemptRequest };
}
