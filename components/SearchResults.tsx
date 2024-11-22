import React from 'react';
import { Music, User, Disc } from 'lucide-react';
import { SearchResultsProps } from '@/types';
import { normalizeResult } from '@/utils/normalizeResults';

const SearchResults: React.FC<SearchResultsProps> = ({ results, onItemClick }) => {
    if (!results || results.length === 0) {
        return <div>No se encontraron resultados.</div>;
    }

    const normalizedResults = results.map(normalizeResult);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
            {normalizedResults.map((result) => (
                <div
                    key={result.id}
                    onClick={() => onItemClick(result)}

                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
                >
                    <div className="relative">
                        <img
                            src={result.imageUrl}
                            alt={result.name}
                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            {result.type === 'song' && <Music className="text-white w-12 h-12" />}
                            {result.type === 'artist' && <User className="text-white w-12 h-12" />}
                            {result.type === 'unknown' && <Disc className="text-white w-12 h-12" />}
                        </div>
                    </div>
                    <div className="p-4">
                        <h3 className="text-lg font-bold text-gray-800 truncate">{result.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{result.subtitle}</p>
                        <div className="mt-4 flex items-center text-xs text-gray-500">
                            {result.type === 'song' && (
                                <>
                                    <Music className="w-4 h-4 mr-1" />
                                    <span>Canción</span>
                                </>
                            )}
                            {result.type === 'artist' && (
                                <>
                                    <User className="w-4 h-4 mr-1" />
                                    <span>Artista</span>
                                </>
                            )}
                            {result.type === 'unknown' && (
                                <>
                                    <Disc className="w-4 h-4 mr-1" />
                                    <span>Desconocido</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SearchResults;
