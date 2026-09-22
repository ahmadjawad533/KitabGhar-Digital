import React from 'react';

/**
 * ============================================================================
 * HERO BANNER COMPONENT
 * ============================================================================
 * For Students:
 * - Introduces the website with an engaging visual header.
 * - Clicking the interactive category pills fires `onSelectCategory()`,
 *   demonstrating how UI clicks can filter data in React.
 * ============================================================================
 */
export default function HeroBanner({ onSelectCategory }) {
  return (
    <section className="hero-banner">
      <div className="hero-content">
        <span className="hero-badge">✨ Explore 2026 Digital Library</span>
        <h2 className="hero-title">Immersive Audiobooks &amp; Rich Unicode Literature</h2>
        <p className="hero-subtitle">
          Listen to studio-narrated audiobooks, read pristine UTF-8 multilingual unicode editions,
          and master tech development all in one place.
        </p>

        {/* Category Feature Highlights */}
        <div className="category-pills">
          <button
            type="button"
            className="pill-item"
            onClick={() => onSelectCategory('Audio Books')}
          >
            🎧 Studio-Quality Audiobooks
          </button>
          <button
            type="button"
            className="pill-item"
            onClick={() => onSelectCategory('Unicode Books')}
          >
            🔤 Searchable Unicode (Urdu, Arabic, UTF-8)
          </button>
          <button
            type="button"
            className="pill-item"
            onClick={() => onSelectCategory('Web Development')}
          >
            💻 Web &amp; Software Engineering
          </button>
          <button
            type="button"
            className="pill-item"
            onClick={() => onSelectCategory('Programming')}
          >
            ⚙️ Programming &amp; Logic
          </button>
        </div>
      </div>
    </section>
  );
}
