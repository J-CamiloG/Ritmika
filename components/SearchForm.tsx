import React from 'react';

interface SearchFormProps {
    searchQuery: string;
    searchType: string;
    setSearchQuery: (query: string) => void;
    setSearchType: (type: string) => void;
    onSearch: (query: string, type: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
    searchQuery,
    searchType,
    setSearchQuery,
    setSearchType,
    onSearch,
}) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            onSearch(searchQuery, searchType);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center space-x-4 mb-4">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a track, artist, or album..."
                className="flex-1 border p-2 rounded"
            />
            <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="border p-2 rounded"
            >
                <option value="track">Track</option>
                <option value="artist">Artist</option>
                <option value="album">Album</option>
            </select>
            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
                Search
            </button>
        </form>
    );
};

export default SearchForm;
