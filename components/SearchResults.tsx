import React from 'react';

interface SearchResultsProps {
    results: any[];
    onItemClick: (item: any) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onItemClick }) => {

    console.log('Resultados completos:', results);
    // results.forEach((result, index) => {
    //     console.log(`Resultado #${index + 1}:`, result.album.images[0]);
    // });

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {results.map((result) => (
                <div
                    key={result.id}
                    onClick={() => onItemClick(result)}
                    className="border p-4 rounded cursor-pointer hover:shadow-lg"
                >
                    <img
                        src={result.album.images[0].url || '/placeholder.jpg'}
                        alt={result.name}
                        className="w-full h-48 object-cover mb-2"
                    />
                    <h3 className="text-lg font-bold">{result.name}</h3>
                    <p className="text-sm text-gray-500">{result.artists?.[0]?.name || result.type}</p>
                </div>
            ))}
        </div>
    );
};

export default SearchResults;
