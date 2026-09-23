import React from 'react';

/**
 * ============================================================================
 * PAGINATION COMPONENT (Pure Tailwind CSS)
 * ============================================================================
 */
export default function Pagination({ currentPage, totalPages, onPageChange, disabled }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-2 my-8" aria-label="Books navigation">
      <button
        type="button"
        className="px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || disabled}
      >
        &larr; Prev
      </button>

      <div className="flex items-center gap-1.5">
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              p === currentPage
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-2 ring-indigo-400/50'
                : 'border border-slate-200 bg-white hover:bg-slate-100 text-slate-700'
            }`}
            onClick={() => onPageChange(p)}
            disabled={disabled}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || disabled}
      >
        Next &rarr;
      </button>
    </nav>
  );
}
