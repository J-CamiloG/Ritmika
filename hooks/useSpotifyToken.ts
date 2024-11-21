import { useEffect, useState } from 'react';

export function useSpotifyToken() {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const hash = window.location.hash.substring(1).split('&').reduce((acc: any, item) => {
            const parts = item.split('=');
            acc[parts[0]] = decodeURIComponent(parts[1]);
            return acc;
        }, {});

        if (hash.access_token) {
            setToken(hash.access_token);
        }
    }, []);

    return token;
}
