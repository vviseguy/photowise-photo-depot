import React, { useRef, useEffect } from 'react';
import './SearchBar.css';
import { useSearch } from '../context/SearchContext';

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const { query, setQuery, isSearching, setSearching, incrementHistory } = useSearch();


  const containerRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch?.(query);
  };

  const handleClear = () => {
    setQuery('');
  };

  // Close the search bar if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (!query) setSearching(false);
        
        incrementHistory() // assume clicks outside the search bar deliminate searches
      }

    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [query]);

  return (
    <div ref={containerRef} className="search-container">

      {isSearching ? (
        <div className="search-input-wrapper">
          <input
            className="search-input"
            type="text"
            value={query}
            onChange={handleChange}
            autoFocus
            placeholder="Search..."
          />
          {query && (
            <button className="search-clear-button" onClick={handleClear}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          )}
          <button className="search-icon-button" onClick={handleSearch}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      ) :
        <button className="search-icon-button" onClick={() => setSearching(true)}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      }
    </div>
  );
};

export default SearchBar;
