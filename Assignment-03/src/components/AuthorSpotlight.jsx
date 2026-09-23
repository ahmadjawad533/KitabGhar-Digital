import React from 'react';

/**
 * ============================================================================
 * AUTHOR SPOTLIGHT COMPONENT (AuthorSpotlight.jsx)
 * ============================================================================
 * Showcases featured classical literature and computer science authors.
 * Demonstrates:
 * - Reusable responsive card grid using Tailwind CSS
 * - Cross-component interaction: clicking an author filters the main catalog
 * - Semantic article cards with accessible action buttons
 * ============================================================================
 */
export default function AuthorSpotlight({ onSelectAuthor }) {
  const featuredAuthors = [
    {
      id: 'iqbal',
      name: 'Allama Muhammad Iqbal',
      role: 'Philosopher Poet & Scholar',
      genre: 'Urdu & Persian Literature',
      avatarIcon: '📜',
      bio: 'Renowned philosopher, poet, and politician whose poetry inspired generations across South Asia.',
      notableWork: 'Bang-e-Dra, Bal-e-Jibril',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      searchTerm: 'Iqbal',
    },
    {
      id: 'ghalib',
      name: 'Mirza Asadullah Khan Ghalib',
      role: 'Classical Master of Ghazal',
      genre: 'Urdu Classical Poetry',
      avatarIcon: '✒️',
      bio: 'The preeminent poet of the Mughal era whose intricate metaphors and letters defined modern Urdu prose.',
      notableWork: 'Diwan-e-Ghalib',
      badgeColor: 'bg-amber-100 text-amber-800',
      searchTerm: 'Ghalib',
    },
    {
      id: 'uncle-bob',
      name: 'Robert C. Martin',
      role: 'Software Craftsman & Author',
      genre: 'Programming Architecture',
      avatarIcon: '💻',
      bio: 'Co-author of the Agile Manifesto and champion of Clean Code principles taught across university curricula.',
      notableWork: 'Clean Code, Clean Architecture',
      badgeColor: 'bg-blue-100 text-blue-800',
      searchTerm: 'Clean Code',
    },
    {
      id: 'kyle',
      name: 'Kyle Simpson',
      role: 'JavaScript Architect & Educator',
      genre: 'Web Engineering',
      avatarIcon: '⚙️',
      bio: 'Deep-dive JavaScript specialist committed to making language mechanics accessible through open teaching.',
      notableWork: "You Don't Know JS Yet",
      badgeColor: 'bg-purple-100 text-purple-800',
      searchTerm: 'JavaScript',
    },
  ];

  return (
    <section className="py-8" aria-labelledby="author-spotlight-title">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-2 border-b border-slate-200 gap-2">
        <div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700 mb-2">
            🌟 Featured Voices
          </span>
          <h2 id="author-spotlight-title" className="text-2xl font-black text-slate-900 tracking-tight">
            Author Spotlight
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Discover seminal works from world-class authors in literature and computing.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {featuredAuthors.map((author) => (
          <article
            key={author.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-2xl shadow-inner shrink-0">
                  {author.avatarIcon}
                </div>
                <div className="min-w-0">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${author.badgeColor} mb-0.5`}>
                    {author.genre}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug truncate">
                    {author.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 truncate">{author.role}</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-3">
                {author.bio}
              </p>

              <div className="text-[11px] text-slate-500 bg-slate-50 rounded-lg p-2 mb-4 border border-slate-100">
                <span className="font-semibold text-slate-700">Notable:</span> {author.notableWork}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectAuthor(author.searchTerm)}
              className="w-full py-2 px-3 rounded-lg bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>🔍</span> Explore Works
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
