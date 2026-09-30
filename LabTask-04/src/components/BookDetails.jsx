import React from 'react';
import { X, Search, Star, BookOpen, FileText, Volume2, CheckCircle2, XCircle, Info } from 'lucide-react';

export default function BookDetails({ selectedBookId, book, onClose, onOpenPDF, onOpenUnicode, onOpenAudio }) {
  if (selectedBookId === null) return null;

  const isUrdu = book?.language === 'Urdu';

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden relative">
        {/* Header Bar */}
        <div className="bg-slate-800/90 px-6 py-4 border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white">Book Details Modal</h2>
            <span className="bg-amber-500/20 text-amber-300 text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full border border-amber-500/30">
              books.find(b =&gt; b.id === {selectedBookId})
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-6">
          {/* Handling undefined case */}
          {!book ? (
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 text-center space-y-3">
              <XCircle className="w-12 h-12 text-red-400 mx-auto" />
              <h3 className="text-lg font-bold text-red-300">Book Not Found (undefined)</h3>
              <p className="text-xs text-slate-300">
                <code className="text-amber-300 font-mono">books.find()</code> executed but returned <code className="text-red-400 font-mono font-bold">undefined</code> because no book with <code className="text-amber-300 font-mono">id === {selectedBookId}</code> exists in the array.
              </p>
            </div>
          ) : (
            <>
              {/* Top Meta Header */}
              <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded font-bold border border-amber-400/20">
                      ID: #{book.id}
                    </span>
                    <span className="text-xs text-slate-400">{book.category}</span>
                    <span className="text-xs bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                      {book.format}
                    </span>
                  </div>
                  <h3 className={`text-2xl font-bold text-white ${isUrdu ? 'font-urdu leading-relaxed' : ''}`}>
                    {book.title}
                  </h3>
                  <p className={`text-sm text-slate-300 ${isUrdu ? 'font-urdu' : ''}`}>
                    By <span className="font-semibold text-amber-300">{book.author}</span>
                  </p>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1.5 bg-amber-500/20 text-amber-300 px-3 py-1.5 rounded-xl border border-amber-500/30 font-bold text-sm">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{book.rating} / 5.0</span>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                    book.available ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'
                  }`}>
                    {book.available ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    {book.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              </div>

              {/* Grid Metadata */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-center">
                  <span className="text-slate-400 block mb-1">Published Year</span>
                  <span className="text-slate-200 font-bold">{book.year}</span>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-center">
                  <span className="text-slate-400 block mb-1">Language</span>
                  <span className="text-slate-200 font-bold">{book.language}</span>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-center">
                  <span className="text-slate-400 block mb-1">Pages / Length</span>
                  <span className="text-slate-200 font-bold">{book.pages ? `${book.pages} pages` : book.duration || 'N/A'}</span>
                </div>
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-center">
                  <span className="text-slate-400 block mb-1">Featured Item</span>
                  <span className="text-amber-400 font-bold">{book.featured ? 'Yes ★' : 'No'}</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Book Overview</h4>
                <p className="text-sm text-slate-300 bg-slate-950/50 p-4 rounded-xl border border-slate-800 leading-relaxed">
                  {book.description}
                </p>
              </div>

              {/* Learning Note: find() vs filter() */}
              <div className="bg-sky-500/10 border border-sky-500/30 p-4 rounded-2xl text-xs text-sky-200 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-sky-300 text-sm">
                  <Info className="w-4 h-4 text-sky-400" />
                  <span>Lab Task 4 Insight: find() vs filter()</span>
                </div>
                <p className="leading-relaxed">
                  <strong className="text-amber-300">filter()</strong> returns an <em>Array</em> of matching items (e.g. 5 category items).<br/>
                  <strong className="text-sky-300">find()</strong> returns <em>One Single Object</em> directly (or <code className="text-red-300">undefined</code>) matching the exact predicate <code className="bg-slate-950 text-amber-300 px-1 py-0.5 rounded font-mono">id === {book.id}</code>.
                </p>
              </div>

              {/* Direct Reader Actions inside Modal */}
              <div className="pt-2 flex flex-wrap gap-3">
                {book.format === 'PDF' && (
                  <button
                    type="button"
                    disabled={!book.available}
                    onClick={() => {
                      onClose();
                      onOpenPDF(book);
                    }}
                    className="flex-1 bg-red-600 hover:bg-red-500 text-white font-semibold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    <FileText className="w-4 h-4" /> Open PDF Reader ({book.pdfUrl})
                  </button>
                )}

                {book.format === 'Unicode' && (
                  <button
                    type="button"
                    disabled={!book.available}
                    onClick={() => {
                      onClose();
                      onOpenUnicode(book);
                    }}
                    className="flex-1 bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    <BookOpen className="w-4 h-4" /> Open Unicode Reader (RTL Urdu)
                  </button>
                )}

                {book.format === 'Audio' && (
                  <button
                    type="button"
                    disabled={!book.available}
                    onClick={() => {
                      onClose();
                      onOpenAudio(book);
                    }}
                    className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    <Volume2 className="w-4 h-4" /> Play Audio Lecture
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
