import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange, disabled }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="pagination-wrapper" aria-label="Books navigation">
      <button
        type="button"
        className="pagination-btn arrow-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || disabled}
      >
        &larr; Prev
      </button>

      <div className="pagination-numbers">
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            className={`pagination-btn number-btn ${p === currentPage ? 'active' : ''}`}
            onClick={() => onPageChange(p)}
            disabled={disabled}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="pagination-btn arrow-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || disabled}
      >
        Next &rarr;
      </button>
    </nav>
  );
}
