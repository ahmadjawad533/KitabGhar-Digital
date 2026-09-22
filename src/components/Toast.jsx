import React from 'react';

/**
 * ============================================================================
 * TOAST NOTIFICATION COMPONENT
 * ============================================================================
 * For Students:
 * - Provides non-intrusive feedback when actions occur (e.g., adding to cart).
 * - Toggles the `.hidden` CSS class based on whether `message` is present.
 * ============================================================================
 */
export default function Toast({ message }) {
  return (
    <div
      className={`toast ${message ? '' : 'hidden'}`}
      role="alert"
      aria-live="polite"
    >
      <span>🔔</span>
      <span>{message}</span>
    </div>
  );
}
