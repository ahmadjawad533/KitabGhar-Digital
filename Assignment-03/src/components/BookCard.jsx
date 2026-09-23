import React, { useState } from 'react';

/**
 * ============================================================================
 * BOOK CARD COMPONENT (Pure Tailwind CSS)
 * ============================================================================
 * For Students:
 * - Semantic <article> element representing a single book item.
 * - Dynamic theme gradients matching book categories.
 * - Image covers with fallback Urdu script or icon placeholders.
 * - Responsive flex/grid design with pure Tailwind CSS.
 * ============================================================================
 */
export default function BookCard({
  book,
  onPreview,
  onAddToCart,
  isWishlisted = false,
  onToggleWishlist,
  onOpenReviews,
  onPlayAudio,
}) {
  const [isJustAdded, setIsJustAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(book);
    setIsJustAdded(true);
    setTimeout(() => {
      setIsJustAdded(false);
    }, 1500);
  };

  const isAudioBook = book.category === 'Audio Books' || book.isAudio;
  const isUnicodeBook = book.category === 'Unicode Books';

  // Dynamic Tailwind gradient themes
  const themeGradients = {
    'cover-audio': 'bg-gradient-to-br from-purple-800 via-indigo-900 to-slate-950',
    'cover-unicode': 'bg-gradient-to-br from-teal-800 via-emerald-900 to-slate-950',
    'cover-web': 'bg-gradient-to-br from-amber-600 via-orange-700 to-stone-900',
    'cover-prog': 'bg-gradient-to-br from-blue-700 via-indigo-900 to-slate-950',
    'cover-science': 'bg-gradient-to-br from-emerald-700 via-teal-900 to-slate-950',
  };

  const coverGradient = themeGradients[book.coverTheme] || themeGradients['cover-prog'];

  // Button styling modifiers
  let btnAddStyle = 'bg-indigo-600 hover:bg-indigo-700 text-white';
  if (isAudioBook) btnAddStyle = 'bg-purple-600 hover:bg-purple-700 text-white';
  if (isUnicodeBook) btnAddStyle = 'bg-teal-600 hover:bg-teal-700 text-white';
  if (isJustAdded) btnAddStyle = 'bg-emerald-600 text-white';

  const hasImage = book.coverUrl && !imageError;

  return (
    <article
      className="group relative flex flex-col justify-between bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-300 overflow-hidden"
      data-category={book.category}
    >
      {/* Book Cover Surface */}
      <div className={`relative h-56 p-4 flex flex-col justify-between text-white overflow-hidden ${coverGradient}`}>
        {hasImage && (
          <img
            src={book.coverUrl}
            alt={book.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        )}

        {/* Top Header Row on Cover */}
        <div className="relative z-10 flex items-center justify-between gap-1.5 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20">
              {book.category}
            </span>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
              {book.formatPill}
            </span>
          </div>

          {/* Heart Wishlist Toggle Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onToggleWishlist) onToggleWishlist(book);
            }}
            className="w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center text-xs transition-all cursor-pointer backdrop-blur-md border border-white/20 hover:scale-110 active:scale-95"
            title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            {isWishlisted ? '❤️' : '🤍'}
          </button>
        </div>

        {/* Center Placeholder (Urdu Script or Large Icon) */}
        {!hasImage && (
          <div className="relative z-10 flex items-center justify-center my-auto">
            {book.coverScriptPreview ? (
              <div className="text-2xl font-serif text-center px-4 font-bold text-white/95 drop-shadow-md">
                {book.coverScriptPreview}
              </div>
            ) : (
              <div className="text-5xl text-center drop-shadow-md select-none">
                {book.coverIcon || '📖'}
              </div>
            )}
          </div>
        )}

        {/* Bottom Badges on Cover */}
        <div className="relative z-10 flex items-center justify-between gap-1.5">
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
            {book.pillTag}
          </span>
          <button
            type="button"
            onClick={() => onOpenReviews && onOpenReviews(book)}
            className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-amber-300 border border-amber-300/30 transition-colors cursor-pointer"
            title="Read student reviews"
          >
            {book.rating || '★ 4.8'}
          </button>
        </div>
      </div>

      {/* Book Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3
            className="text-base font-bold text-slate-900 leading-snug line-clamp-2"
            dir={book.isRtl ? 'rtl' : 'ltr'}
            title={book.title}
          >
            {book.title}
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-1 truncate" dir={book.isRtl ? 'rtl' : 'ltr'}>
            {book.author}
          </p>
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mt-2" dir={book.isRtl ? 'rtl' : 'ltr'}>
            {book.description}
          </p>

          {/* Meta Chips */}
          <div className="flex flex-wrap gap-1.5 pt-3">
            {book.metaChips?.map((chip, idx) => {
              let chipStyle = 'bg-slate-100 text-slate-600 border-slate-200';
              if (isAudioBook) chipStyle = 'bg-purple-50 text-purple-700 border-purple-200';
              if (isUnicodeBook) chipStyle = 'bg-teal-50 text-teal-700 border-teal-200';

              return (
                <span
                  key={idx}
                  className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${chipStyle}`}
                >
                  {chip}
                </span>
              );
            })}
          </div>
        </div>

        {/* Card Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="text-base font-black text-indigo-700">
            {book.price}
            {book.priceSubtitle && (
              <small className="block text-[10px] text-slate-400 font-normal">
                {book.priceSubtitle}
              </small>
            )}
          </div>

          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            {/* Quick Listen Button for Audiobooks */}
            {isAudioBook && onPlayAudio && (
              <button
                type="button"
                className="px-2.5 py-1.5 rounded-lg border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold transition-all cursor-pointer"
                onClick={() => onPlayAudio(book)}
                title="Play audiobook in bottom bar"
              >
                🎧 Listen
              </button>
            )}

            {/* PDF Direct Link Button */}
            {book.pdfUrl && (
              <a
                href={book.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all"
                title="Read PDF in new tab"
              >
                📄 PDF
              </a>
            )}

            <button
              type="button"
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 text-xs font-semibold transition-all cursor-pointer"
              onClick={() => onPreview(book)}
            >
              Preview
            </button>

            <button
              type="button"
              className={`px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-all duration-200 cursor-pointer active:scale-95 ${btnAddStyle}`}
              onClick={handleAddToCart}
            >
              {isJustAdded ? '✓ Added' : '🛒 Add'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
