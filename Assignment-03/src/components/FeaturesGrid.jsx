import React from 'react';

/**
 * ============================================================================
 * FEATURES GRID COMPONENT (Pure Tailwind CSS)
 * ============================================================================
 * Highlights key bookstore features using responsive Tailwind Grid utilities.
 * ============================================================================
 */
export default function FeaturesGrid() {
  const features = [
    {
      icon: '🎧',
      title: 'Studio Audiobooks',
      desc: 'Professional voice narrators, Dolby audio quality, chapter navigation, and offline listening support.',
      gradient: 'from-purple-500/10 to-indigo-500/10 border-purple-200',
    },
    {
      icon: '🔤',
      title: 'Unicode & Nastaliq',
      desc: 'Clean UTF-8 encoding supporting Urdu Nastaliq, Arabic, and regional languages with full searchability.',
      gradient: 'from-teal-500/10 to-emerald-500/10 border-teal-200',
    },
    {
      icon: '⚡',
      title: 'Instant Web Access',
      desc: 'Read directly on your browser or download DRM-free copies for your favorite e-reader device.',
      gradient: 'from-amber-500/10 to-orange-500/10 border-amber-200',
    },
    {
      icon: '💻',
      title: 'Tech & Programming',
      desc: 'Up-to-date curricula for web technologies, computer science, and modern programming languages.',
      gradient: 'from-blue-500/10 to-cyan-500/10 border-blue-200',
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-8" aria-label="Store Features">
      {features.map((item, index) => (
        <div
          key={index}
          className={`bg-white border rounded-2xl p-6 text-center shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col justify-between ${item.gradient}`}
        >
          <div>
            <div className="text-4xl mb-3 select-none">{item.icon}</div>
            <h3 className="text-base font-bold mb-2 text-slate-900">{item.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
