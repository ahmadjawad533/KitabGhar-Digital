import React, { useState } from 'react';

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

  // Determine button theme modifier based on category
  let btnCategoryClass = '';
  if (isAudioBook) btnCategoryClass = 'btn-audio-listen';
  if (book.category === 'Unicode Books') btnCategoryClass = 'btn-unicode-read';

  const hasImage = book.coverUrl && !imageError;

  return (
    <article className="book-card relative" data-category={book.category}>
      <div className={`card-cover ${book.coverTheme || 'cover-prog'} ${hasImage ? 'has-image-cover' : ''}`}>
        {hasImage && (
          <img
            src={book.coverUrl}
            alt={book.title}
            className="card-cover-image"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        )}

        {/* Top Badges & Wishlist Button */}
        <div className="cover-badge-row">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="category-tag">{book.category}</span>
            <span className="format-pill">{book.formatPill}</span>
          </div>

          {/* Heart Wishlist Toggle Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onToggleWishlist) onToggleWishlist(book);
            }}
            className="w-7 h-7 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white flex items-center justify-center text-xs transition-all cursor-pointer backdrop-blur-sm shadow hover:scale-110"
            title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            {isWishlisted ? '❤️' : '🤍'}
          </button>
        </div>

        {!hasImage && (
          <div className="cover-center-content">
            {book.coverScriptPreview ? (
              <div className="cover-script-preview">{book.coverScriptPreview}</div>
            ) : (
              <div className="cover-icon-large">{book.coverIcon || '📖'}</div>
            )}
          </div>
        )}

        <div className="cover-badge-row">
          <span className="format-pill">{book.pillTag}</span>
          <button
            type="button"
            onClick={() => onOpenReviews && onOpenReviews(book)}
            className="format-pill hover:bg-amber-100 hover:text-amber-900 transition-colors cursor-pointer"
            title="Read student reviews"
          >
            {book.rating || '★ 4.8'}
          </button>
        </div>
      </div>

      <div className="card-body">
        <div>
          <h3
            className="book-title"
            dir={book.isRtl ? 'rtl' : 'ltr'}
            title={book.title}
          >
            {book.title}
          </h3>
          <p className="book-author" dir={book.isRtl ? 'rtl' : 'ltr'}>
            {book.author}
          </p>
          <p className="book-description" dir={book.isRtl ? 'rtl' : 'ltr'}>
            {book.description}
          </p>

          <div className="meta-chips">
            {book.metaChips?.map((chip, idx) => {
              let chipClass = 'meta-chip';
              if (isAudioBook) chipClass += ' meta-chip-audio';
              if (book.category === 'Unicode Books') chipClass += ' meta-chip-unicode';
              return (
                <span key={idx} className={chipClass}>
                  {chip}
                </span>
              );
            })}
          </div>
        </div>

        <div className="card-footer">
          <div className="book-price">
            {book.price}
            {book.priceSubtitle && <small>{book.priceSubtitle}</small>}
          </div>

          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {/* Quick Listen Button for Audiobooks */}
            {isAudioBook && onPlayAudio && (
              <button
                type="button"
                className="btn-preview"
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
                className="btn-preview"
                title="Read PDF in new tab"
              >
                📄 PDF
              </a>
            )}

            <button
              type="button"
              className="btn-preview"
              onClick={() => onPreview(book)}
            >
              Preview
            </button>

            <button
              type="button"
              className={`btn-add ${btnCategoryClass} ${isJustAdded ? 'added' : ''}`}
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
