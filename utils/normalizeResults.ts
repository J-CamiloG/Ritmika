import { SearchResult, NormalizedResult } from '@/types';

export const normalizeResult = (result: SearchResult): NormalizedResult => {
    if ('album' in result && result.album) { 
        return {
            id: result.id,
            name: result.name,
            imageUrl: result.album.images?.[0]?.url || '/placeholder.jpg',
            subtitle: result.artists.map((artist) => artist.name).join(', '),
            type: 'song',
            images: result.album.images || [],
        };
    } else if ('images' in result && result.images) { 
        return {
            id: result.id,
            name: result.name,
            imageUrl: result.images[0]?.url || '/placeholder.jpg',
            subtitle: 'Artista',
            type: 'artist',
            images: result.images || [],
        };
    }

    return {
        id: 'unknown',
        name: 'Sin nombre',
        imageUrl: '/placeholder.jpg',
        subtitle: 'Desconocido',
        type: 'unknown',
        images: []
    };
};
