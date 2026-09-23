import React from 'react';

/**
 * ============================================================================
 * NAVIGATION BANNER (SAMPLE HEADER / SUB-HEADER COMPONENT)
 * ============================================================================
 * TEACHING GUIDE FOR STUDENTS:
 * 1. Demonstrates "Conditional Rendering" in React based on State:
 *    Clicking each button changes `activeTab` in App.jsx and mounts a 
 *    different component into view!
 * 
 * 2. Demonstrates Modern Tailwind Styling:
 *    - Glassmorphic backdrop blur: `bg-slate-900/90 backdrop-blur-md`
 *    - Active vs Inactive Button States with transitions and badges
 *    - Horizontal responsive scrolling for mobile: `overflow-x-auto no-scrollbar`
 * ============================================================================
 */
export default function NavigationBanner({ activeTab, onSelectTab, bookCount, _cartCount }) {
  const navItems = [
    {
      id: 'catalog',
      label: '📚 Book Catalog',
      badge: bookCount > 0 ? `${bookCount}` : null,
      desc: 'Browse & Filter Books',
    },
    {
      id: 'features',
      label: '✨ Features & Highlights',
      desc: 'Audiobooks & Tech',
    },
    {
      id: 'guide',
      label: '🎓 Student Guide',
      badge: 'React 19',
      desc: 'Code Architecture',
    },
    {
      id: 'analytics',
      label: '📊 Library Stats',
      desc: 'API & Store Analytics',
    },
    {
      id: 'about',
      label: 'ℹ️ About KitabGhar',
      desc: 'Store & Project Mission',
    },
  ];

  return (
    <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-indigo-900/50 shadow-md">
      <div className="max-w-[1200px] mx-auto px-6 py-3">
        {/* Banner Header Title / Sub-header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5 pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
              ⚡
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
              Interactive Component Navigator
            </span>
            <span className="text-xs text-slate-400 hidden md:inline">
              — Switch views dynamically using React State
            </span>
          </div>

          <div className="text-xs text-slate-400">
            Active Component: <span className="font-mono text-emerald-400 font-semibold">&lt;{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}View /&gt;</span>
          </div>
        </div>

        {/* 5 Navigation Buttons Bar */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-2 ring-indigo-400/50 scale-[1.02]'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-white text-indigo-700'
                        : 'bg-indigo-500/30 text-indigo-300 border border-indigo-500/40'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
