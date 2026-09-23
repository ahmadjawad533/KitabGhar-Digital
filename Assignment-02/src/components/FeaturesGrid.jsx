import React from 'react';

/**
 * ============================================================================
 * FEATURES GRID COMPONENT
 * ============================================================================
 * For Students:
 * - A clean presentational component rendering store highlights.
 * - Showcases responsive CSS Grid layout (`grid-template-columns: repeat(auto-fit, ...)`).
 * ============================================================================
 */
export default function FeaturesGrid() {
  const features = [
    {
      icon: '🎧',
      title: 'Studio Audiobooks',
      desc: 'Professional voice narrators, Dolby audio quality, chapter navigation, and offline listening support.'
    },
    {
      icon: '🔤',
      title: 'Unicode & Nastaliq',
      desc: 'Clean UTF-8 encoding supporting Urdu Nastaliq, Arabic, and regional languages with full searchability.'
    },
    {
      icon: '⚡',
      title: 'Instant Web Access',
      desc: 'Read directly on your browser or download DRM-free copies for your favorite e-reader device.'
    },
    {
      icon: '💻',
      title: 'Tech & Programming',
      desc: 'Up-to-date curricula for web technologies, computer science, and modern programming languages.'
    }
  ];

  return (
    <section className="features-grid" aria-label="Store Features">
      {features.map((item, index) => (
        <div key={index} className="feature-card">
          <div className="feature-icon">{item.icon}</div>
          <h3 className="feature-title">{item.title}</h3>
          <p className="feature-desc">{item.desc}</p>
        </div>
      ))}
    </section>
  );
}
