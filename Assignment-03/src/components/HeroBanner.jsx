import React from 'react';

/**
 * ============================================================================
 * HERO BANNER COMPONENT (Pure Tailwind CSS)
 * ============================================================================
 * An eye-catching hero banner built with modern Tailwind gradients,
 * typography, and interactive category filter pills.
 * ============================================================================
 */
export default function HeroBanner({ onSelectCategory }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-indigo-900 text-white py-14 px-6 text-center rounded-3xl mb-8 shadow-xl">
      {/* Decorative background blurs */}
      <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto space-y-4">
        <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/15 backdrop-blur-md text-indigo-200 border border-white/20">
          ✨ Explore 2026 Digital Library
        </span>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
          Immersive Audiobooks &amp; Rich Unicode Literature
        </h2>

        <p className="text-sm sm:text-base text-indigo-200/90 max-w-xl mx-auto leading-relaxed">
          Listen to studio-narrated audiobooks, read pristine UTF-8 multilingual unicode editions,
          and master tech development all in one place.
        </p>

        {/* Category Quick Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-4">
          {[
            { label: '🎧 Studio-Quality Audiobooks', cat: 'Audio Books' },
            { label: '🔤 Searchable Unicode (Urdu, UTF-8)', cat: 'Unicode Books' },
            { label: '💻 Web & Software Engineering', cat: 'Web Development' },
            { label: '⚙️ Programming & Logic', cat: 'Programming' },
          ].map((pill, idx) => (
            <button
              key={idx}
              type="button"
              className="px-4 py-2 rounded-full text-xs font-medium bg-white/10 hover:bg-white/25 border border-white/20 text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-xs"
              onClick={() => onSelectCategory(pill.cat)}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
