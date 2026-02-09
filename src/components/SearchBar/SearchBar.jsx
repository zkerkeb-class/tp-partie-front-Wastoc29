import React, { useState, useCallback } from 'react';
import { debounce } from '../../utils/helpers';
import './SearchBar.css';

const SearchBar = ({ onSearch, placeholder = "Rechercher un Pokémon...", delay = 300 }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Debounce la recherche
  const debouncedSearch = useCallback(
    debounce((value) => {
      onSearch(value);
    }, delay),
    [onSearch, delay]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-bar-container">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleChange}
        />
        {searchTerm && (
          <button
            type="button"
            className="clear-btn"
            onClick={handleClear}
            aria-label="Effacer la recherche"
          >
            ✕
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
