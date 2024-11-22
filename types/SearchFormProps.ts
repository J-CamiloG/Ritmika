export interface SearchFormProps {
    searchQuery: string;
    searchType: string;
    setSearchQuery: (query: string) => void;
    setSearchType: (type: string) => void;
    onSearch: (query: string, type: string) => void;
}