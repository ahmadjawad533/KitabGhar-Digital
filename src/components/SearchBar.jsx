import React from 'react';

export default function SearchBar({ searchQuery, onSearchChange, onClear, resultCount, totalCount }) {
  return (
    <div className="search-section">
      <div className="search-box-wrapper">
        <span className="search-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </span>
        <input
          type="text"
          className="search-input"
          placeholder="Search books by title, author, or keyword (اردو / English)..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button
            type="button"
            className="clear-search-btn"
            onClick={onClear}
            title="Clear search"
          >
            &times;
          </button>
        )}
      </div>

      <div className="search-feedback">
        {searchQuery.trim() ? (
          <span className="search-match-text">
            Found <strong>{resultCount}</strong> {resultCount === 1 ? 'book' : 'books'} matching "{searchQuery}"
          </span>
        ) : (
          <span className="search-hint">
            Showing <strong>{resultCount}</strong> of <strong>{totalCount}</strong> books on this page
          </span>
        )}
      </div>
    </div>
  );
}
