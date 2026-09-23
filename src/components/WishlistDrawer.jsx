import React from 'react';

/**
 * ============================================================================
 * WISHLIST DRAWER COMPONENT (WishlistDrawer.jsx)
 * ============================================================================
 * Allows students/users to view and manage their bookmarked/favorited books.
 * Demonstrates:
 * - Slide-over drawer modal pattern with backdrop blur
 * - State synchronization: moving items between Wishlist and Cart
 * - Semantic lists and accessible interactive buttons
 * ============================================================================
 */
export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistItems = [],
  onRemoveFromWishlist,
  onMoveToCart,
  onClearWishlist,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[120] bg-slate-950/60 backdrop-blur-sm flex justify-end transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="wishlist-drawer-title"
    >
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="px-6 py-4 bg-gradient-to-r from-rose-700 via-pink-700 to-rose-800 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl" aria-hidden="true">❤️</span>
            <div>
              <h2 id="wishlist-drawer-title" className="text-lg font-bold tracking-tight">
                My Saved Wishlist
              </h2>
              <p className="text-xs text-rose-100">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'book saved' : 'books saved'}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-lg transition-colors cursor-pointer"
            onClick={onClose}
            aria-label="Close wishlist drawer"
          >
            &times;
          </button>
        </header>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {wishlistItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
              <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center text-4xl mb-4 shadow-inner">
                🤍
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">Your wishlist is empty</h3>
              <p className="text-xs text-slate-500 max-w-xs mb-6">
                Click the heart icon on any book in the catalog to save it for later review or semester reading.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
              >
                Browse Books
              </button>
            </div>
          ) : (
            <ul className="space-y-3" aria-label="Wishlist items">
              {wishlistItems.map((book) => (
                <li
                  key={book.id || book._id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-rose-200 hover:shadow-md transition-all flex items-start gap-3"
                >
                  {/* Book thumbnail / icon */}
                  <div className="w-14 h-16 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-2xl shrink-0 shadow-sm overflow-hidden">
                    {book.coverUrl ? (
                      <img
                        src={book.coverUrl}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      book.coverIcon || '📖'
                    )}
                  </div>

                  {/* Book information */}
                  <div className="flex-1 min-w-0">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-100 text-rose-700 mb-1">
                      {book.category}
                    </span>
                    <h4
                      className="text-sm font-bold text-slate-900 truncate"
                      dir={book.isRtl ? 'rtl' : 'ltr'}
                      title={book.title}
                    >
                      {book.title}
                    </h4>
                    <p className="text-xs text-slate-500 truncate" dir={book.isRtl ? 'rtl' : 'ltr'}>
                      {book.author}
                    </p>
                    <div className="text-xs font-bold text-indigo-700 mt-1">
                      {book.price}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-2.5">
                      <button
                        type="button"
                        onClick={() => onMoveToCart(book)}
                        className="px-2.5 py-1 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                        title="Add to shopping cart"
                      >
                        <span>🛒</span> Move to Cart
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemoveFromWishlist(book.id || book._id)}
                        className="px-2 py-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 text-xs transition-colors cursor-pointer"
                        title="Remove from wishlist"
                      >
                        ✕ Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer Actions */}
        {wishlistItems.length > 0 && (
          <footer className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            <button
              type="button"
              onClick={onClearWishlist}
              className="text-xs text-slate-500 hover:text-rose-600 font-medium transition-colors cursor-pointer"
            >
              Clear All Wishlist
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Continue Browsing
            </button>
          </footer>
        )}
      </div>
    </div>
  );
}
