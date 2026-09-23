import React, { useState } from 'react';

/**
 * ============================================================================
 * NEWSLETTER BANNER COMPONENT (NewsletterBanner.jsx)
 * ============================================================================
 * Promotional subscription banner for student digests and new book announcements.
 * Demonstrates:
 * - Form validation with regex in React
 * - Dynamic feedback state changes
 * - Modern Tailwind CSS gradients and glassmorphism
 * ============================================================================
 */
export default function NewsletterBanner({ onSubscribe }) {
  const [email, setEmail] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All Categories');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const topics = ['All Categories', 'Audiobooks', 'Urdu Unicode', 'Web Engineering', 'Programming'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setErrorMsg('');
    setIsSubscribed(true);
    if (onSubscribe) {
      onSubscribe(cleanEmail, selectedTopic);
    }
  };

  return (
    <section className="my-10 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white p-8 md:p-10 shadow-xl relative overflow-hidden">
      {/* Decorative background glow circles */}
      <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-indigo-300 border border-white/15 mb-3">
          <span>📬</span> Weekly Semester E-Book Digest
        </span>

        <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-2">
          Never Miss a New Edition or Audio Release
        </h3>

        <p className="text-xs md:text-sm text-slate-300 mb-6 max-w-lg mx-auto leading-relaxed">
          Subscribe to get curated reading lists, university lecture companion texts, and instant notifications when new Urdu literature or engineering audiobooks arrive.
        </p>

        {isSubscribed ? (
          <div className="bg-emerald-500/20 border border-emerald-400/40 rounded-2xl p-6 text-emerald-200 animate-in fade-in zoom-in-95 duration-300">
            <div className="text-3xl mb-2">🎉</div>
            <h4 className="text-base font-bold text-white mb-1">
              You're Subscribed to KitabGhar!
            </h4>
            <p className="text-xs text-emerald-200">
              We have sent a confirmation email to <strong>{email}</strong> for <em>{selectedTopic}</em> updates.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Topic Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs text-slate-400 mr-1">Preferred digest:</span>
              {topics.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setSelectedTopic(topic)}
                  className={`text-[11px] px-3 py-1 rounded-full transition-all cursor-pointer ${
                    selectedTopic === topic
                      ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30 ring-1 ring-white/30'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>

            {/* Email Input & Submit Button */}
            <div className="flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto">
              <div className="w-full relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Enter your student email..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400 backdrop-blur-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-bold shrink-0 shadow-lg shadow-indigo-500/30 transition-all cursor-pointer"
              >
                Subscribe Free
              </button>
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-300 font-medium">{errorMsg}</p>
            )}

            <p className="text-[11px] text-slate-400">
              No spam guaranteed. Unsubscribe at any time with one click.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
