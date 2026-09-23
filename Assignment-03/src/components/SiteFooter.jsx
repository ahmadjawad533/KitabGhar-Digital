import React from 'react';

/**
 * ============================================================================
 * SITE FOOTER COMPONENT (Pure Tailwind CSS)
 * ============================================================================
 * Responsive footer styled purely with Tailwind CSS.
 * ============================================================================
 */
export default function SiteFooter({ onSelectCategory }) {
  return (
    <footer className="mt-auto bg-slate-900 text-slate-400 py-10 border-t border-slate-800">
      <div className="max-w-[1200px] mx-auto px-6 text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-white font-extrabold text-lg">
          <span>📚</span>
          <span>KitabGhar Digital Bookstore</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Web Technologies FA26
          </span>
        </div>

        {/* Quick Category Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-300">
          {[
            { label: 'All Books', cat: 'All' },
            { label: 'Audio Books', cat: 'Audio Books' },
            { label: 'Unicode Literature', cat: 'Unicode Books' },
            { label: 'Web Development', cat: 'Web Development' },
            { label: 'Programming', cat: 'Programming' },
            { label: 'Science & Logic', cat: 'Science' },
          ].map((link, idx) => (
            <button
              key={idx}
              type="button"
              className="hover:text-white transition-colors cursor-pointer"
              onClick={() => {
                onSelectCategory(link.cat);
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
            >
              {link.label}
            </button>
          ))}
        </div>

        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          Crafted with React 19, Semantic HTML5, and 100% Tailwind CSS v4 architecture for computer science students.
        </p>

        <div className="text-[11px] text-slate-600 pt-2 border-t border-slate-800/80">
          &copy; {new Date().getFullYear()} KitabGhar Digital. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
