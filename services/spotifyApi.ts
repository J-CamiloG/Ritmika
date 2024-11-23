const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID ?? 'client';
const redirectUri = 'http://localhost:3000';

export async function getAccessToken(code: string): Promise<string> {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUri,
            client_id: clientId,
        }),
    });
    const data = await response.json();
    return data.access_token;
}



export async function search(token: string, query: string, type: string) {
    const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=${type}&limit=30`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const data = await response.json();
    return data[`${type}s`].items;
}

export async function getDetails(token: string, type: string, id: string) {
    const response = await fetch(`https://api.spotify.com/v1/${type}s/${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return await response.json();
}
