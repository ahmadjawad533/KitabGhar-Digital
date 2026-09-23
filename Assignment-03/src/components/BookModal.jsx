import React, { useState, useEffect } from 'react';
import { fetchBookDetails } from '../services/bookService';

/**
 * ============================================================================
 * BOOK PREVIEW MODAL COMPONENT (Pure Tailwind CSS)
 * ============================================================================
 * For Students:
 * - Demonstrates React Modal Architecture with pure Tailwind utilities.
 * - Dynamic single-item API fetching (`fetchBookDetails`) inside `useEffect`.
 * - HTML5 Audio player support for streaming audio tracks.
 * ============================================================================
 */
export default function BookModal({ book, onClose, onAddToCart }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [extraDetails, setExtraDetails] = useState(null);
  const [prevBook, setPrevBook] = useState(book);

  if (book !== prevBook) {
    setPrevBook(book);
    setExtraDetails(null);
    setIsPlaying(false);
  }

  // Fetch full details if available from live API
  useEffect(() => {
    if (!book) return;

    let isMounted = true;
    const fetchFullData = async () => {
      const bookId = book._id || book.id;
      if (bookId) {
        try {
          const data = await fetchBookDetails(bookId);
          if (isMounted && data) {
            setExtraDetails(data);
          }
        } catch {
          // Graceful fallback to initial book data
        }
      }
    };

    fetchFullData();

    return () => {
      isMounted = false;
    };
  }, [book]);

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
      className="fixed inset-0 z-[120] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close 'X' Button */}
        <button
          type="button"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center text-xl transition-all cursor-pointer"
          onClick={onClose}
          aria-label="Close dialog"
        >
          &times;
        </button>

        {/* Category & Format Badges */}
        <div className="flex items-center gap-2 flex-wrap pr-10">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700">
            {book.category}
          </span>
          <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
            {book.formatPill}
          </span>
          {book.rating && (
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
              {book.rating}
            </span>
          )}
        </div>

        {/* Book Title & Author */}
        <div>
          <h2
            id="modal-title"
            className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight"
            dir={book.isRtl ? 'rtl' : 'ltr'}
          >
            {book.title}
          </h2>
          <p
            className="text-sm font-semibold text-indigo-600 mt-1"
            dir={book.isRtl ? 'rtl' : 'ltr'}
          >
            By {book.author}
          </p>
        </div>

        {/* Audio Player Section */}
        {isAudioBook && (
          <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-200/80 space-y-3">
            <div className="text-xs font-bold text-purple-800 uppercase tracking-wider flex items-center gap-1.5">
              <span>🎧</span> Studio Audiobook Preview
            </div>

            {book.audioUrl ? (
              <div className="space-y-2">
                <p className="text-xs text-purple-700">
                  Streaming audio track: <code className="bg-white/80 px-1 py-0.5 rounded text-[11px] font-mono">{book.audioUrl.split('/').pop()}</code>
                </p>
                <audio
                  controls
                  src={book.audioUrl}
                  className="w-full h-10 outline-none rounded-lg"
                  preload="metadata"
                >
                  Your browser does not support the audio element.
                </audio>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center text-sm shadow-md transition-all cursor-pointer"
                  title={isPlaying ? 'Pause Audio Preview' : 'Play Audio Preview'}
                >
                  <span>{isPlaying ? '⏸' : '▶'}</span>
                </button>
                <div className="flex-1 bg-purple-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all duration-700"
                    style={{ width: isPlaying ? '65%' : '35%' }}
                  />
                </div>
                <span className="text-xs font-mono text-purple-800 font-medium">
                  {book.audioTrack?.sampleTime || '02:14 / 08:45'}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Text Excerpt & Description */}
        <div
          className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-sm text-slate-700 leading-relaxed"
          dir={book.isRtl ? 'rtl' : 'ltr'}
        >
          {isAudioBook && (
            <div className="text-xs font-semibold text-slate-500 mb-1">
              🎙️ Narration &amp; Audio Summary:
            </div>
          )}
          {isUnicodeBook && (
            <div className="text-xs font-semibold text-teal-700 mb-1 font-sans">
              🔤 Authentic Nastaliq / UTF-8 Unicode Text Sample:
            </div>
          )}
          <p className={isUnicodeBook ? 'text-lg leading-loose font-serif' : 'text-sm'}>
            {book.previewExcerpt || book.description}
          </p>
        </div>

        {/* Metadata Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Language</span>
            <strong className="text-xs text-slate-800">{book.language || 'Urdu / English'}</strong>
          </div>
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Format</span>
            <strong className="text-xs text-slate-800">{book.format || 'Digital / Audio'}</strong>
          </div>
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Pages / Length</span>
            <strong className="text-xs text-slate-800">{book.pages || book.duration || 'Complete Edition'}</strong>
          </div>
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Access</span>
            <strong className="text-xs text-emerald-600 font-bold">DRM-Free / Open</strong>
          </div>
        </div>

        {/* Chapters Section if available */}
        {chapters.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Chapters &amp; Table of Contents ({chapters.length})
            </h4>
            <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1">
              {chapters.map((ch, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs text-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold">
                      {idx + 1}
                    </span>
                    <span className="font-medium" dir={book.isRtl ? 'rtl' : 'ltr'}>
                      {ch.title || ch}
                    </span>
                  </div>
                  {ch.pages && <span className="text-slate-400 text-[11px]">{ch.pages}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <div>
            <span className="block text-[10px] text-slate-400 uppercase font-bold">Store Price</span>
            <span className="text-2xl font-black text-indigo-700">{book.price}</span>
          </div>

          <div className="flex items-center gap-2">
            {book.pdfUrl && (
              <a
                href={book.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>📄</span> Open PDF
              </a>
            )}
            <button
              type="button"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
              onClick={handleAddToCartAndClose}
            >
              🛒 Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
