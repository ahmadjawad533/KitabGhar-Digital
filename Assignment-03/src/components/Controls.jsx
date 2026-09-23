import React from 'react';
import { CATEGORIES } from '../data/booksData';

/**
 * ============================================================================
 * CONTROLS COMPONENT (Search & Category Filtering - Tailwind CSS)
 * ============================================================================
 * For Students:
 * - Demonstrates "Controlled Components" in React:
 *   The input value is driven by React state (`searchQuery`) via `value` and `onChange`.
 * - Category filter buttons toggle which category is currently selected.
 * - Styled purely using modern Tailwind CSS utilities (no custom CSS).
 * ============================================================================
 */
export default function Controls({
  searchQuery,
  onSearchChange,
  onClearSearch,
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <section
      className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm mb-8 space-y-4"
      aria-label="Book Filter and Search Controls"
    >
      {/* Real-time Search Box */}
      <div className="relative flex items-center w-full">
        <span
          className="absolute left-4 text-slate-400 text-lg pointer-events-none select-none"
          aria-hidden="true"
        >
          🔍
        </span>
        <input
          type="text"
          className="w-full pl-11 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent transition-all shadow-inner"
          placeholder="Search by title, author, category, or language (e.g., 'Audio', 'Unicode', 'غالب', 'Python')..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          autoComplete="off"
        />
        {searchQuery && (
          <button
            type="button"
            className="absolute right-3.5 w-6 h-6 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center text-sm transition-colors cursor-pointer"
            onClick={onClearSearch}
            title="Clear search filter"
            aria-label="Clear search"
          >
            &times;
          </button>
        )}
      </div>

      {/* Category Filter Pills */}
      <div
        className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100"
        role="group"
        aria-label="Filter books by category"
      >
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1 select-none">
          Categories:
        </span>
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              type="button"
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/25 ring-2 ring-indigo-400/40'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 hover:border-slate-300'
              }`}
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
