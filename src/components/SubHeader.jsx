import React from 'react';

/**
 * ============================================================================
 * SUB-HEADER NAVIGATION BAR (SubHeader.jsx)
 * ============================================================================
 * TEACHING GUIDE FOR STUDENTS:
 * ----------------------------------------------------------------------------
 * 1. COMPONENT SEPARATION OF CONCERNS:
 *    Like Header.jsx, this is an independent, reusable navigation component.
 *    It receives `activeTab` and `onSelectTab` as props from App.jsx,
 *    demonstrating "Lifting State Up".
 *
 * 2. TAILWIND CSS ARCHITECTURE COVERED IN THIS COMPONENT:
 *    - Glassmorphic / Backdrop Filter: `backdrop-blur-md bg-slate-900/95`
 *    - Modern Card/Pill Buttons with active state conditional styling
 *    - Subtle gradient accents & border tokens: `border-slate-800`
 *    - Responsive flex wrapping with scroll fallback: `overflow-x-auto`
 *    - Micro-interactions: `transition-all duration-200 hover:-translate-y-0.5 active:scale-95`
 * ============================================================================
 */
export default function SubHeader({ activeTab, onSelectTab, bookCount, cartCount }) {
  // Navigation tabs configuration
  const navigationTabs = [
    {
      id: 'catalog',
      icon: '📚',
      title: 'Book Catalog',
      subtitle: 'Browse collection',
      badge: bookCount > 0 ? `${bookCount}` : null,
      accentColor: 'indigo',
    },
    {
      id: 'features',
      icon: '✨',
      title: 'Store Features',
      subtitle: 'Audio & Unicode',
      badge: null,
      accentColor: 'purple',
    },
    {
      id: 'guide',
      icon: '🎓',
      title: 'Student Guide',
      subtitle: 'React & Tailwind',
      badge: 'React 19',
      accentColor: 'emerald',
    },
    {
      id: 'analytics',
      icon: '📊',
      title: 'Store Analytics',
      subtitle: 'Real-time metrics',
      badge: null,
      accentColor: 'teal',
    },
    {
      id: 'about',
      icon: 'ℹ️',
      title: 'About KitabGhar',
      subtitle: 'Course project',
      badge: null,
      accentColor: 'amber',
    },
  ];

  return (
    /* ------------------------------------------------------------------------
       STEP 1: SUB-HEADER WRAPPER
       - sticky top-[72px]: sticks right under the main header!
       - z-40: layered just below the main header (z-[100])
       - bg-slate-900/95 backdrop-blur-md: modern frosted dark glass
       - border-b border-slate-800: clean separation line
    ------------------------------------------------------------------------ */
    <nav 
      className="sticky top-[72px] z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-md transition-colors"
      aria-label="Component Views Navigation"
    >
      <div className="max-w-[1200px] mx-auto px-6 py-2.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left: Buttons Group */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
            {navigationTabs.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                /* -----------------------------------------------------------
                   STEP 2: INDIVIDUAL NAVIGATION BUTTON
                   - Demonstrates dynamic conditional classes with Tailwind
                   - Active state: bright background, glow ring, white text
                   - Inactive state: subtle translucent background with hover lift
                ----------------------------------------------------------- */
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onSelectTab(tab.id)}
                  className={`group relative flex items-center gap-3 px-3.5 py-2 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 ring-2 ring-indigo-400/50'
                      : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 hover:border-slate-600 hover:-translate-y-0.5'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {/* Icon Box */}
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-lg text-base transition-transform duration-200 group-hover:scale-110 ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-700/60 text-slate-200'
                    }`}
                  >
                    {tab.icon}
                  </span>

                  {/* Text Details */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold leading-tight tracking-tight">
                        {tab.title}
                      </span>

                      {/* Optional Badge */}
                      {tab.badge && (
                        <span
                          className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full ${
                            isActive
                              ? 'bg-white text-indigo-700'
                              : 'bg-indigo-500/25 text-indigo-300 border border-indigo-500/40'
                          }`}
                        >
                          {tab.badge}
                        </span>
                      )}
                    </div>

                    <span
                      className={`text-[10px] hidden sm:block ${
                        isActive ? 'text-indigo-100' : 'text-slate-400'
                      }`}
                    >
                      {tab.subtitle}
                    </span>
                  </div>

                  {/* Active Indicator Underline Dot */}
                  {isActive && (
                    <span className="absolute bottom-1 right-2 w-1.5 h-1.5 rounded-full bg-indigo-300 animate-pulse"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Live View Status Badge (Great for classroom demonstration) */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block"></span>
            <span>Mounted:</span>
            <span className="font-mono text-emerald-400 font-semibold">
              &lt;{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}View /&gt;
            </span>
            {cartCount > 0 && (
              <span className="ml-1 text-[11px] text-indigo-300 bg-indigo-950 px-1.5 py-0.5 rounded border border-indigo-800">
                Cart: {cartCount}
              </span>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
