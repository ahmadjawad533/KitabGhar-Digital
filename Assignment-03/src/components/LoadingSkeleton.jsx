import React from 'react';

/**
 * ============================================================================
 * LOADING SKELETON COMPONENT (Pure Tailwind CSS)
 * ============================================================================
 */
export default function LoadingSkeleton({ count = 8 }) {
  const items = Array.from({ length: count }, (_, i) => i);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
      {items.map((item) => (
        <div
          key={item}
          className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between"
        >
          <div className="h-56 bg-slate-200 w-full" />
          <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 rounded w-1/3" />
              <div className="h-5 bg-slate-200 rounded w-4/5" />
              <div className="h-3 bg-slate-200 rounded w-2/3" />
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
              <div className="h-6 bg-slate-200 rounded w-1/4" />
              <div className="h-8 bg-slate-200 rounded w-1/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
