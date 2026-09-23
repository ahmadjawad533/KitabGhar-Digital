import React from 'react';

/**
 * ============================================================================
 * SEARCH BAR COMPONENT (Tailwind CSS)
 * ============================================================================
 */
export default function SearchBar({ searchQuery, onSearchChange, onClear, resultCount, totalCount }) {
  return (
    <div className="w-full space-y-2">
      <div className="relative flex items-center w-full">
        <span className="absolute left-4 text-slate-400 pointer-events-none select-none">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </span>
        <input
          type="text"
          className="w-full pl-11 pr-10 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
          placeholder="Search books by title, author, or keyword (اردو / English)..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button
            type="button"
            className="absolute right-3.5 w-6 h-6 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center text-sm transition-colors cursor-pointer"
            onClick={onClear}
            title="Clear search"
            aria-label="Clear search"
          >
            &times;
          </button>
        )}
      </div>

      <div className="text-xs text-slate-500 px-1">
        {searchQuery.trim() ? (
          <span>
            Found <strong className="text-indigo-600">{resultCount}</strong> {resultCount === 1 ? 'book' : 'books'} matching "{searchQuery}"
          </span>
        ) : (
          <span>
            Showing <strong className="text-slate-800">{resultCount}</strong> of <strong className="text-slate-800">{totalCount}</strong> books on this page
          </span>
        )}
      </div>
    </div>
  );
}
