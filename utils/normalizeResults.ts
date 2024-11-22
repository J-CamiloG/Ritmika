import { SearchResult, NormalizedResult } from '../types/SearchResultsTypes';

export const normalizeResult = (result: SearchResult | null | undefined): NormalizedResult => {
    if (!result) {
        return {
            id: 'no-id',
            name: 'Sin nombre',
            imageUrl: '/placeholder.jpg',
            subtitle: 'Desconocido',
            type: 'unknown',
        };
    }

    if ('album' in result) { 
        return {
            id: result.id,
            name: result.name,
            imageUrl: result.album.images?.[0]?.url || '/placeholder.jpg',
            subtitle: result.artists?.[0]?.name || 'Artista desconocido',
            type: 'song',
        };
    } else if ('images' in result) { 
        return {
            id: result.id,
            name: result.name,
            imageUrl: result.images?.[0]?.url || '/placeholder.jpg',
            subtitle: 'Artista',
            type: 'artist',
        };
    }

    return {
        id: result.id || 'no-id',
        name: result.name || 'Sin nombre',
        imageUrl: '/placeholder.jpg',
        subtitle: 'Desconocido',
        type: 'unknown',
    };
};
