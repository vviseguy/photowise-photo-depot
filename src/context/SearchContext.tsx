import React, { useEffect, createContext, useContext, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export interface SearchContextType {
  query: string;
  isSearching: boolean;
  setQuery: (query: string) => void;
  setSearching: (value: boolean) => void;
  incrementHistory: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentQuery = searchParams.get('q') ?? '';
  const [isSearching, setSearching] = useState(false);
  const [replaceHistory, setReplaceHistory] = useState(false);

  const incrementHistory = useCallback(() => {
    // Next query change will push a new entry
    setReplaceHistory(false);
  }, []);

  const setQuery = useCallback(
    (newQuery: string) => {
      if (newQuery) {
        // Add or update the `q` parameter
        setSearchParams({ q: newQuery }, { replace: replaceHistory });
      } else {
        // Remove the `q` parameter when the query is empty
        setSearchParams({}, { replace: replaceHistory });
      }
      // Revert to replacing history for subsequent changes
      if (!replaceHistory) setReplaceHistory(true);
    },
    [replaceHistory, setSearchParams]
  );

  useEffect(()=>{
    setReplaceHistory(false);
  },[isSearching])

  return (
    <SearchContext.Provider
      value={{
        query: currentQuery,
        isSearching,
        setQuery,
        setSearching,
        incrementHistory,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
