import React from 'react';
import { CATEGORIES } from '../data/booksData';

/**
 * ============================================================================
 * CONTROLS COMPONENT (Search & Category Filtering)
 * ============================================================================
 * For Students:
 * - Demonstrates "Controlled Components" in React:
 *   The input value is driven by React state (`searchQuery`) via `value` and `onChange`.
 * - Category filter buttons toggle which category is currently selected.
 * - Shows dynamic styling: the button matching `selectedCategory` receives the `.active` class.
 * ============================================================================
 */

export default function Controls({
  searchQuery,
  onSearchChange,
  onClearSearch,
  selectedCategory,
  onSelectCategory
}) {
  return (
    <section className="controls-panel" aria-label="Book Filter and Search Controls">
      {/* Real-time Search Box */}
      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search by title, author, category, or language (e.g., 'Audio', 'Unicode', 'غالب', 'Python')..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          autoComplete="off"
        />
        {searchQuery && (
          <button
            type="button"
            className="clear-search-btn"
            onClick={onClearSearch}
            title="Clear search filter"
            aria-label="Clear search"
          >
            &times;
          </button>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="category-filter-group" role="group" aria-label="Filter books by category">
        <span className="filter-label">Categories:</span>
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              type="button"
              className={`filter-btn ${isActive ? 'active' : ''}`}
              data-category={cat.value}
              onClick={() => onSelectCategory(cat.value)}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
