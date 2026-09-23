import React from 'react';

/**
 * ============================================================================
 * SITE FOOTER COMPONENT
 * ============================================================================
 * For Students:
 * - Simple, static footer with quick category links.
 * ============================================================================
 */
export default function SiteFooter({ onSelectCategory }) {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <p>
          <strong>KitabGhar Digital Bookstore</strong> • Web Technologies FA26
        </p>
        <div className="footer-links">
          <button
            type="button"
            className="footer-link-btn"
            onClick={() => {
              onSelectCategory('All');
              window.scrollTo({ top: 400, behavior: 'smooth' });
            }}
          >
            All Books
          </button>
          <button
            type="button"
            className="footer-link-btn"
            onClick={() => {
              onSelectCategory('Audio Books');
              window.scrollTo({ top: 400, behavior: 'smooth' });
            }}
          >
            Audio Books
          </button>
          <button
            type="button"
            className="footer-link-btn"
            onClick={() => {
              onSelectCategory('Unicode Books');
              window.scrollTo({ top: 400, behavior: 'smooth' });
            }}
          >
            Unicode Books
          </button>
          <button
            type="button"
            className="footer-link-btn"
            onClick={() => {
              onSelectCategory('Web Development');
              window.scrollTo({ top: 400, behavior: 'smooth' });
            }}
          >
            Web Development
          </button>
        </div>
        <p className="footer-credit">
          Designed with React, semantic CSS3 &amp; interactive state management for students.
        </p>
      </div>
    </footer>
  );
}
