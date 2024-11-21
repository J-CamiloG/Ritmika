'use client'
import { useState, useEffect } from 'react';

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID ?? 'client';
const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI ?? 'redirect';


async function getAccessToken(code: string): Promise<string> {
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
async function search(token: string, query: string, type: string) {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=${type}&limit=30`, {
        method: 'GET',
        headers: {
        'Authorization': `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return data[`${type}s`].items;
}
async function getDetails(token: string, type: string, id: string) {
    const response = await fetch(`https://api.spotify.com/v1/${type}s/${id}`, {
        method: 'GET',
        headers: {
        'Authorization': `Bearer ${token}`,
        },
    });
    return await response.json();
}
export default function Home() {
    const [token, setToken] = useState<string | null>(null);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchType, setSearchType] = useState<string>('track');
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 20;
    useEffect(() => {
        const hash = window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial: any, item) => {
            if (item) {
            var parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
            }
            return initial;
        }, {});
        if (hash.access_token) {
        setToken(hash.access_token);
        }
    }, []);
    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (token && searchQuery) {
        const results = await search(token, searchQuery, searchType);
        setSearchResults(results);
        setCurrentPage(1);
        }
    };
    const handleItemClick = async (item: any) => {
        if (token) {
        const details = await getDetails(token, searchType, item.id);
        setSelectedItem(details);
        }
    };
    const handleLogin = () => {
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user-read-private%20user-read-email&response_type=token&show_dialog=true`;
    };
    const paginatedResults = searchResults.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    return (
        <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Spotify Search</h1>
        {!token ? (
            <button 
            onClick={handleLogin}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
            Login with Spotify
            </button>
        ) : (
            <>
            <form onSubmit={handleSearch} className="mb-4">
                <div className="flex gap-2">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for a song, artist, or album"
                    className="flex-grow p-2 border rounded"
                />
                <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="track">Track</option>
                    <option value="artist">Artist</option>
                    <option value="album">Album</option>
                </select>
                <button 
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    Search
                </button>
                </div>
            </form>
            {selectedItem ? (
                <div className="bg-white shadow-md rounded-lg p-6 mb-4">
                <h2 className="text-2xl font-bold mb-2">{selectedItem.name}</h2>
                <p className="text-gray-600 mb-4">{searchType.charAt(0).toUpperCase() + searchType.slice(1)} Details</p>
                <img src={selectedItem.images?.[0]?.url} alt={selectedItem.name} className="w-64 h-64 object-cover mb-4" />
                {searchType === 'track' && (
                    <audio controls src={selectedItem.preview_url} className="mb-4">
                    Your browser does not support the audio element.
                    </audio>
                )}
                <p>Type: {selectedItem.type}</p>
                {selectedItem.artists && <p>Artist(s): {selectedItem.artists.map((a: any) => a.name).join(', ')}</p>}
                {selectedItem.album && <p>Album: {selectedItem.album.name}</p>}
                {selectedItem.genres && <p>Genres: {selectedItem.genres.join(', ')}</p>}
                <button 
                    onClick={() => setSelectedItem(null)}
                    className="mt-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                    Back to results
                </button>
                </div>
            ) : (
                <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    {paginatedResults.map((item: any) => (
                    <div 
                        key={item.id} 
                        className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"
                        onClick={() => handleItemClick(item)}
                    >
                        <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                        <p className="text-gray-600 mb-2">{item.type}</p>
                        <img 
                        src={item.images?.[0]?.url || item.album?.images?.[0]?.url} 
                        alt={item.name} 
                        className="w-full h-48 object-cover rounded"
                        />
                    </div>
                    ))}
                </div>
                {searchResults.length > itemsPerPage && (
                    <div className="flex justify-center gap-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(searchResults.length / itemsPerPage)))}
                        disabled={currentPage === Math.ceil(searchResults.length / itemsPerPage)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r disabled:opacity-50"
                    >
                        Next
                    </button>
                    </div>
                )}
                </>
            )}
            </>
        )}
        </div>
    );
}