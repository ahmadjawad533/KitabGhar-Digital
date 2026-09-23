import React from 'react';

/**
 * ============================================================================
 * TOAST NOTIFICATION COMPONENT (Pure Tailwind CSS)
 * ============================================================================
 * Floating notification alert styled with Tailwind utilities and animation.
 * ============================================================================
 */
export default function Toast({ message }) {
  if (!message) return null;

  return (
    <aside
      className="fixed bottom-6 right-6 z-[150] bg-slate-900/95 backdrop-blur-md text-white px-5 py-3.5 rounded-2xl shadow-2xl border-l-4 border-indigo-500 text-xs sm:text-sm font-semibold flex items-center gap-2.5 transition-all duration-300 pointer-events-none"
      role="alert"
      aria-live="polite"
    >
      <span className="text-base select-none" aria-hidden="true">🔔</span>
      <span>{message}</span>
    </aside>
  );
}
