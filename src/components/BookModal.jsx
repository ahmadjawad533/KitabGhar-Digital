import React, { useState, useEffect } from 'react';
// import { fetchBookDetails } from '../services/bookService';

/**
 * ============================================================================
 * BOOK MODAL COMPONENT (Live API & Curated Preview)
 * ============================================================================
 * For Students:
 * - Shows deep React concepts:
 *   1. `useEffect` to fetch single book details from `GET /api/books/:id`
 *   2. HTML5 `<audio>` integration: Streams real MP3 files from the live server.
 *   3. PDF Document linking: Direct link to read or download official PDFs.
 *   4. Chapter List rendering via `.map()` for Unicode literature.
 *   5. Keyboard accessibility: Closes on 'Escape'.
 * ============================================================================
 */
export default function BookModal({ book, onClose, onAddToCart }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const extraDetails = null;
  const loadingDetails = false;
  // API state (restore instead of the constants above to re-enable details):
  // const [extraDetails, setExtraDetails] = useState(null);
  // const [loadingDetails, setLoadingDetails] = useState(false);

  // Close modal when pressing Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // API details are temporarily disabled; previews use the local book object.
  // // Fetch extra details if book has an API _id and is not already loaded
  // useEffect(() => {
  //   if (!book || !book._id) return;
  //   let isMounted = true;
  //   setLoadingDetails(true);
  //
  //   fetchBookDetails(book._id)
  //     .then((data) => {
  //       if (isMounted) setExtraDetails(data);
  //     })
  //     .catch((err) => {
  //       console.warn('Could not fetch single book details:', err);
  //     })
  //     .finally(() => {
  //       if (isMounted) setLoadingDetails(false);
  //     });
  //
  //   return () => {
  //     isMounted = false;
  //   };
  // }, [book]);

  if (!book) return null;

  const isAudioBook = book.category === 'Audio Books' || book.isAudio;
  const isUnicodeBook = book.category === 'Unicode Books' || book.bookType === 'UNICODE';
  const chapters = extraDetails?.chapters || book.chapters || [];

  const handleAddToCartAndClose = () => {
    onAddToCart(book);
    onClose();
  };

  return (
    <div
      className="modal-backdrop active"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close 'X' Button */}
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close dialog"
        >
          &times;
        </button>

        {/* Category & Format Badges */}
        <div className="modal-badge-row">
          <span className="category-tag">{book.category}</span>
          <span className="format-pill" style={{ color: 'var(--text-main)', background: 'var(--primary-light)' }}>
            {book.formatPill}
          </span>
          {book.rating && (
            <span className="format-pill" style={{ color: '#b45309', background: '#fef3c7' }}>
              {book.rating}
            </span>
          )}
        </div>

        {/* Book Title & Author */}
        <h3
          className="modal-title"
          id="modal-title"
          dir={book.isRtl ? 'rtl' : 'ltr'}
        >
          {book.title}
        </h3>

        <p
          className="modal-author"
          dir={book.isRtl ? 'rtl' : 'ltr'}
        >
          {book.author}
        </p>

        {/* Real HTML5 Audio Player for API Audiobooks, or Simulated Player for Curated Books */}
        {isAudioBook && (
          <div className="audio-player-sim">
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-audio)', textTransform: 'uppercase' }}>
              🎧 Audiobook Player
            </div>

            {book.audioUrl ? (
              <div style={{ marginTop: '8px' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  Streaming live from: <code>{book.audioUrl.split('/').pop()}</code>
                </p>
                <audio
                  controls
                  src={book.audioUrl}
                  style={{ width: '100%', outline: 'none' }}
                  preload="metadata"
                >
                  Your browser does not support the audio element.
                </audio>
              </div>
            ) : (
              <div className="audio-player-controls">
                <button
                  type="button"
                  className="btn-play-pause"
                  onClick={() => setIsPlaying(!isPlaying)}
                  title={isPlaying ? 'Pause Audio Preview' : 'Play Audio Preview'}
                >
                  <span>{isPlaying ? '⏸' : '▶'}</span>
                </button>
                <div className="audio-progress-bar">
                  <div
                    className="audio-progress-fill"
                    style={{ width: isPlaying ? '65%' : '35%', transition: 'width 1s ease' }}
                  ></div>
                </div>
                <span className="audio-time">
                  {book.audioTrack?.sampleTime || '02:14 / 08:45'}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Text Excerpt & Chapters Box */}
        <div
          className="modal-preview-box"
          dir={book.isRtl ? 'rtl' : 'ltr'}
        >
          {isAudioBook && (
            <div>
              <strong>🎧 Narration Info:</strong>
              <p style={{ marginTop: '6px' }}>
                {book.previewExcerpt}
              </p>
            </div>
          )}

          {isUnicodeBook && (
            <div>
              <strong>🔤 Unicode Nastaliq Text Preview:</strong>
              <pre
                style={{
                  marginTop: '8px',
                  fontSize: '1.15rem',
                  lineHeight: '1.8',
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'var(--font-urdu)'
                }}
              >
                {book.previewExcerpt}
              </pre>
            </div>
          )}

          {!isAudioBook && !isUnicodeBook && (
            <div>
              <strong>📖 Description:</strong>
              <p style={{ marginTop: '6px' }}>
                {book.description || book.previewExcerpt}
              </p>
            </div>
          )}

          {/* Chapters List if available from API */}
          {chapters.length > 0 && (
            <div style={{ marginTop: '16px', borderTop: '1px dashed var(--border)', paddingTop: '12px' }}>
              <strong style={{ fontSize: '0.9rem', color: 'var(--secondary)' }}>
                📑 Chapters in this Book ({chapters.length}):
              </strong>
              <ul style={{ marginTop: '8px', paddingLeft: book.isRtl ? 0 : '20px', paddingRight: book.isRtl ? '20px' : 0, listStyle: 'disc', fontSize: '0.9rem' }}>
                {chapters.map((ch, idx) => (
                  <li key={idx} style={{ marginBottom: '4px' }}>
                    {typeof ch === 'string' ? ch : ch.title || `Chapter ${idx + 1}`}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {loadingDetails && (
            <small style={{ color: 'var(--text-muted)', display: 'block', marginTop: '8px' }}>
              ⏳ Loading live book details from server...
            </small>
          )}
        </div>

        {/* Modal Actions */}
        <div className="modal-actions">
          {book.pdfUrl && (
            <a
              href={book.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-preview"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#b91c1c', borderColor: '#fca5a5' }}
            >
              📥 Open Full PDF
            </a>
          )}

          <button type="button" className="btn-preview" onClick={onClose}>
            Close
          </button>

          <button
            type="button"
            className="btn-add"
            onClick={handleAddToCartAndClose}
          >
            🛒 Add to Cart ({book.price})
          </button>
        </div>
      </div>
    </div>
  );
}
