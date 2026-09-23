import React from 'react';

/**
 * ============================================================================
 * ANALYTICS VIEW COMPONENT
 * ============================================================================
 * Shows real-time statistics computed from the books dataset, built entirely
 * with Tailwind CSS cards, badges, and progress meters.
 * ============================================================================
 */
export default function AnalyticsView({ books = [], cart = [], apiStatus }) {
  const totalBooks = books.length;
  const audioBooksCount = books.filter((b) => b.isAudio || b.category === 'Audio Books').length;
  const unicodeBooksCount = books.filter((b) => b.category === 'Unicode Books').length;
  const pdfBooksCount = books.filter((b) => b.pdfUrl).length;

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const stats = [
    { label: 'Total Catalog Books', value: totalBooks, icon: '📚', color: 'from-blue-600 to-indigo-600' },
    { label: 'Studio Audiobooks', value: audioBooksCount, icon: '🎧', color: 'from-purple-600 to-indigo-600' },
    { label: 'Unicode & Nastaliq Books', value: unicodeBooksCount, icon: '🔤', color: 'from-teal-600 to-emerald-600' },
    { label: 'Instant PDF Books', value: pdfBooksCount, icon: '📄', color: 'from-amber-600 to-orange-600' },
    { label: 'Items in Active Cart', value: cartCount, icon: '🛒', color: 'from-rose-600 to-pink-600' },
  ];

  return (
    <div className="py-8">
      {/* View Header */}
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 mb-2">
          📊 Real-time Store Analytics
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Library &amp; Inventory Statistics
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Dynamic metrics calculated directly from the active catalog state. Connection status:{' '}
          <span className={`font-semibold ${apiStatus === 'live' ? 'text-emerald-600' : 'text-amber-600'}`}>
            {apiStatus === 'live' ? 'Live API (http://159.65.157.115)' : 'Local Fallback'}
          </span>
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((s, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center text-xl mb-4 shadow-md`}>
              {s.icon}
            </div>
            <div className="text-3xl font-black text-slate-900 mb-1">{s.value}</div>
            <div className="text-sm font-medium text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Catalog Distribution Meters */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-8">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Catalog Distribution Breakdown</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Audiobooks</span>
              <span>{totalBooks ? Math.round((audioBooksCount / totalBooks) * 100) : 0}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-purple-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${totalBooks ? (audioBooksCount / totalBooks) * 100 : 0}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Unicode Editions</span>
              <span>{totalBooks ? Math.round((unicodeBooksCount / totalBooks) * 100) : 0}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-teal-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${totalBooks ? (unicodeBooksCount / totalBooks) * 100 : 0}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Downloadable PDFs</span>
              <span>{totalBooks ? Math.round((pdfBooksCount / totalBooks) * 100) : 0}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-amber-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${totalBooks ? (pdfBooksCount / totalBooks) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
