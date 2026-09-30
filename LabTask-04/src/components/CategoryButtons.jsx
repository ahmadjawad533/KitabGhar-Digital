import React from 'react';
import { Filter, Star, CheckCircle, List } from 'lucide-react';

export default function CategoryButtons({
  categories,
  selectedCategory,
  onSelectCategory,
  totalBooksCount,
  filteredCount,
  showOnlyFeatured,
  onToggleFeatured,
  showOnlyAvailable,
  onToggleAvailable
}) {
  return (
    <div className="bg-slate-800/80 backdrop-blur border border-slate-700/60 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-700/50">
        <div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white tracking-wide">Category Filter</h2>
            <span className="bg-amber-500/20 text-amber-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-amber-500/30">
              filter() Array Method
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Click any button below to execute <code className="bg-slate-950 text-amber-300 px-1.5 py-0.5 rounded font-mono text-xs">books.filter()</code> on the dataset
          </p>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-2 bg-slate-900/90 px-4 py-2 rounded-xl border border-slate-700/70 self-start sm:self-auto">
          <List className="w-4 h-4 text-sky-400" />
          <span className="text-xs text-slate-300">
            Showing <strong className="text-amber-400 font-bold text-sm">{filteredCount}</strong> of <span className="text-slate-400">{totalBooksCount}</span> books
          </span>
        </div>
      </div>

      {/* Category Buttons Mapping using map() */}
      <div className="flex flex-wrap gap-2.5">
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelectCategory(category)}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 flex items-center gap-2 border shadow-sm ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold border-amber-400 shadow-amber-500/20 scale-[1.02]'
                  : 'bg-slate-900/70 text-slate-300 border-slate-700/80 hover:bg-slate-700/60 hover:text-white hover:border-slate-600'
              }`}
            >
              <span>{category}</span>
              {isActive && (
                <span className="bg-slate-950/20 text-slate-950 text-xs px-2 py-0.5 rounded-full font-extrabold">
                  Active
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Optional Filter Controls (Featured & Availability) */}
      <div className="pt-3 border-t border-slate-700/40 flex flex-wrap items-center gap-4 text-xs">
        <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-amber-300 transition-colors">
          <input
            type="checkbox"
            checked={showOnlyFeatured}
            onChange={(e) => onToggleFeatured(e.target.checked)}
            className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-400 accent-amber-500 cursor-pointer"
          />
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>Featured Books Only (<code className="text-amber-300 font-mono">featured === true</code>)</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-emerald-300 transition-colors">
          <input
            type="checkbox"
            checked={showOnlyAvailable}
            onChange={(e) => onToggleAvailable(e.target.checked)}
            className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-400 accent-emerald-500 cursor-pointer"
          />
          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>Available Books Only (<code className="text-emerald-300 font-mono">available === true</code>)</span>
        </label>
      </div>
    </div>
  );
}
