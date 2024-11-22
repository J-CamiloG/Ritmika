export interface Image {
    url: string;
}

export interface Artist {
    id: string;
    name: string;
    images?: Image[];
}

export interface Album {
    images?: Image[];
}

export interface Song {
    id: string;
    name: string;
    album: Album;
    artists: Artist[];
}

export interface ArtistResult {
    id: string;
    name: string;
    images: Image[];
}

export type SearchResult = Song | ArtistResult;

export interface SearchResultsProps {
    results: SearchResult[];
    onItemClick: (item: SearchResult) => void;
}

export interface NormalizedResult {
    id: string;
    name: string;
    imageUrl: string;
    subtitle: string;
    type: 'song' | 'artist' | 'unknown';
}
