'use client';

import { useState } from 'react';
import { useSpotifyToken } from '@/hooks/useSpotifyToken';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import Advertisement from '@/components/Advertisement';
import LoginScreen from '@/components/LoginScreen';
import SearchForm from '@/components/SearchForm';
import SearchResults from '@/components/SearchResults';
import SelectedItemDetails from '@/components/SelectedItemDetails';
import Pagination from '@/components/Pagination';
import { search, getDetails } from '@/services/spotifyApi';
import { SearchResult, TrackDetails, ArtistDetails } from '@/types';  


export default function App() {
    const token = useSpotifyToken();
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);  // Aquí definimos el tipo SearchResult
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchType, setSearchType] = useState<string>('track');
    const [selectedItem, setSelectedItem] = useState<TrackDetails | ArtistDetails | null>(null);  // Aquí definimos TrackDetails o ArtistDetails
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 20;

    const handleSearch = async (query: string, type: string) => {
        if (token) {
            const results = await search(token, query, type);
            setSearchResults(results);
            setCurrentPage(1);
        }
    };

    const handleItemClick = async (item: SearchResult) => {  // El tipo item es SearchResult
        if (token) {
            const details = await getDetails(token, searchType, item.id);
            setSelectedItem(details);
        }
    };

    if (!token) {
        return <LoginScreen />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
            <div className="flex">
                <Sidebar />
                <div className="ml-64 flex-grow p-8">
                    <TopBar />
                    <Advertisement />
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
                </div>
            </div>
        </div>
    );
}