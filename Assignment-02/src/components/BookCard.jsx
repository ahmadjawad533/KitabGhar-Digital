import React, { useState } from 'react';

export default function BookCard({ book, onPreview, onAddToCart }) {
  const [isJustAdded, setIsJustAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(book);
    setIsJustAdded(true);
    setTimeout(() => {
      setIsJustAdded(false);
    }, 1500);
  };

  // Determine button theme modifier based on category
  let btnCategoryClass = '';
  if (book.category === 'Audio Books' || book.isAudio) btnCategoryClass = 'btn-audio-listen';
  if (book.category === 'Unicode Books') btnCategoryClass = 'btn-unicode-read';

  const hasImage = book.coverUrl && !imageError;

  return (
   
    <article className="book-card" data-category={book.category}>
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

        <div className="cover-badge-row">
          <span className="category-tag">{book.category}</span>
          <span className="format-pill">{book.formatPill}</span>
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
          <span className="format-pill">{book.rating || '★ 4.8'}</span>
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
              if (book.category === 'Audio Books' || book.isAudio) chipClass += ' meta-chip-audio';
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

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
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
