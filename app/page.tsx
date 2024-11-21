'use client';
import { useState } from 'react';
import { useSpotifyToken } from '../hooks/useSpotifyToken';
import AuthButton from '@/components/AuthButton';
import SearchForm from '@/components/SearchForm';
import SearchResults from '@/components/SearchResults';
import SelectedItemDetails from '@/components/SelectedItemDetails';
import Pagination from '@/components/Pagination';
import { search, getDetails } from '../services/spotifyApi';

export default function Home() {
    const token = useSpotifyToken();
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchType, setSearchType] = useState<string>('track');
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 20;

    const handleSearch = async (query: string, type: string) => {
        if (token) {
            const results = await search(token, query, type);
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

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Spotify Search</h1>
            {!token ? (
                <AuthButton clientId={process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!} redirectUri={process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI!} />
            ) : (
                <>
                    <SearchForm
                        searchQuery={searchQuery}
                        searchType={searchType}
                        onSearch={handleSearch}
                        setSearchQuery={setSearchQuery}
                        setSearchType={setSearchType}
                    />
                    {selectedItem ? (
                        <SelectedItemDetails
                            item={selectedItem}
                            type={searchType}
                            onBack={() => setSelectedItem(null)}
                        />
                    ) : (
                        <>
                            <SearchResults
                                results={searchResults.slice(
                                    (currentPage - 1) * itemsPerPage,
                                    currentPage * itemsPerPage
                                )}
                                onItemClick={handleItemClick}
                            />
                            <Pagination
                                currentPage={currentPage}
                                totalItems={searchResults.length}
                                itemsPerPage={itemsPerPage}
                                onPageChange={setCurrentPage}
                            />
                        </>
                    )}
                </>
            )}
        </div>
    );
}
