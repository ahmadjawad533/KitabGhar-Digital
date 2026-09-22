import React from 'react';

/**
 * ============================================================================
 * ABOUT STORE VIEW COMPONENT
 * ============================================================================
 * Shows bookstore mission and development info with Tailwind layout.
 * ============================================================================
 */
export default function AboutStoreView() {
  return (
    <div className="py-8 max-w-4xl mx-auto">
      {/* Hero Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 text-white text-3xl shadow-lg shadow-indigo-600/30 mb-4">
          📚
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
          About KitabGhar Digital
        </h2>
        <p className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
          A modern digital bookstore built for Computer Science &amp; Web Technologies students at COMSATS University.
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="text-2xl mb-3">🎯</div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Educational Purpose</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            KitabGhar demonstrates modern frontend architecture: React 19 component trees, state lifting, REST API consumption with graceful degradation, and Tailwind CSS utility styling.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="text-2xl mb-3">🌐</div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Dual Data Layer</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Books stream in real-time from our production API backend (<code className="bg-slate-100 px-1 py-0.5 rounded text-xs">http://159.65.157.115</code>) with an automatic offline fallback to local sample data.
          </p>
        </div>
      </div>

      {/* Technology Stack Badges */}
      <div className="bg-slate-900 rounded-2xl p-6 text-white text-center shadow-lg">
        <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-4">
          Technology Stack
        </h4>
        <div className="flex flex-wrap justify-center gap-3">
          {['React 19', 'Vite 8', 'Tailwind CSS v4', 'REST API', 'JavaScript ESNext', 'UTF-8 Unicode'].map((tech, i) => (
            <span
              key={i}
              className="bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
