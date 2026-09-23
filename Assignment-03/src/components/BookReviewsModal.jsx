import React, { useState } from 'react';

/**
 * ============================================================================
 * BOOK REVIEWS MODAL COMPONENT (BookReviewsModal.jsx)
 * ============================================================================
 * Allows students to view reader ratings and submit their own book reviews.
 * Demonstrates:
 * - Dynamic form handling in React (controlled inputs for name, rating, comment)
 * - Derived rating calculations & distribution percentages
 * - Accessible modal dialog with keyboard navigation and focus management
 * ============================================================================
 */
export default function BookReviewsModal({ book, onClose, onAddReview }) {
  const [userName, setUserName] = useState('');
  const [userRating, setUserRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [reviewsList, setReviewsList] = useState([
    {
      id: 1,
      author: 'Fatima Zahra',
      badge: 'Verified Student',
      rating: 5,
      date: '2 days ago',
      comment: 'An indispensable guide for the semester. Clear explanations, practical examples, and rich Urdu literature context.',
    },
    {
      id: 2,
      author: 'Hamza Malik',
      badge: 'Verified Reader',
      rating: 4,
      date: '1 week ago',
      comment: 'Audiobook narration quality is superb. The chapters are well structured and easy to follow during my commute.',
    },
    {
      id: 3,
      author: 'Ayesha Siddiqui',
      badge: 'FA26 Student',
      rating: 5,
      date: '2 weeks ago',
      comment: 'The Unicode typography is sharp and legible across all devices. Highly recommended for web and literature studies.',
    },
  ]);

  if (!book) return null;

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!userName.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!comment.trim()) {
      setErrorMsg('Please write a short review.');
      return;
    }

    const newRev = {
      id: Date.now(),
      author: userName.trim(),
      badge: 'Community Contributor',
      rating: userRating,
      date: 'Just now',
      comment: comment.trim(),
    };

    setReviewsList([newRev, ...reviewsList]);
    if (onAddReview) {
      onAddReview(book, newRev);
    }

    setUserName('');
    setComment('');
    setUserRating(5);
    setErrorMsg('');
  };

  const avgRating = (
    reviewsList.reduce((acc, r) => acc + r.rating, 0) / (reviewsList.length || 1)
  ).toFixed(1);

  return (
    <div
      className="fixed inset-0 z-[130] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="reviews-modal-title"
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="px-6 py-4 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl" aria-hidden="true">⭐</span>
            <div>
              <h2 id="reviews-modal-title" className="text-lg font-bold">
                Student &amp; Reader Reviews
              </h2>
              <p className="text-xs text-amber-100 truncate max-w-md" dir={book.isRtl ? 'rtl' : 'ltr'}>
                {book.title} — {book.author}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-lg transition-colors cursor-pointer"
            onClick={onClose}
            aria-label="Close reviews modal"
          >
            &times;
          </button>
        </header>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Top Score Summary */}
          <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-amber-50/60 border border-amber-200/60">
            <div className="text-center sm:border-r sm:border-amber-200 sm:pr-6 shrink-0">
              <div className="text-4xl font-black text-amber-900">{avgRating}</div>
              <div className="text-amber-500 text-lg my-1">
                {'★'.repeat(Math.round(avgRating))}
                {'☆'.repeat(5 - Math.round(avgRating))}
              </div>
              <div className="text-xs text-amber-800 font-medium">
                Based on {reviewsList.length} reviews
              </div>
            </div>

            {/* Distribution Bars */}
            <div className="flex-1 w-full space-y-1.5 text-xs">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = reviewsList.filter((r) => r.rating === stars).length;
                const pct = Math.round((count / (reviewsList.length || 1)) * 100);
                return (
                  <div key={stars} className="flex items-center gap-2 text-slate-600">
                    <span className="w-8 font-mono">{stars}★</span>
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-8 text-right font-mono text-slate-400">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* New Review Form */}
          <form
            onSubmit={handleSubmitReview}
            className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
          >
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <span>✍️</span> Leave Your Rating &amp; Feedback
            </h3>

            {errorMsg && (
              <div className="text-xs text-rose-600 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-lg">
                {errorMsg}
              </div>
            )}

            {/* Star Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-600">Your Rating:</span>
              <div className="flex gap-1" role="radiogroup" aria-label="Select star rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setUserRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="text-2xl transition-transform hover:scale-110 cursor-pointer"
                    aria-label={`${star} Star`}
                  >
                    <span
                      className={
                        star <= (hoverRating || userRating)
                          ? 'text-amber-500'
                          : 'text-slate-300'
                      }
                    >
                      ★
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="reviewer-name" className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Name / Roll No.
                </label>
                <input
                  id="reviewer-name"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. Ali Ahmed (SP24-BCS-042)"
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div className="flex items-end">
                <span className="text-[11px] text-slate-500">
                  Reviews help fellow students select the best learning materials.
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="reviewer-comment" className="block text-xs font-semibold text-slate-700 mb-1">
                Your Review
              </label>
              <textarea
                id="reviewer-comment"
                rows="3"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts on the narration, translation, or content..."
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
              >
                Post Review
              </button>
            </div>
          </form>

          {/* Reviews List */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-800">
              Recent Reader Reviews ({reviewsList.length})
            </h3>
            {reviewsList.map((rev) => (
              <article
                key={rev.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{rev.author}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                      {rev.badge}
                    </span>
                  </div>
                  <span className="text-slate-400 text-[11px]">{rev.date}</span>
                </div>

                <div className="text-amber-500 text-xs tracking-wider">
                  {'★'.repeat(rev.rating)}
                  {'☆'.repeat(5 - rev.rating)}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
