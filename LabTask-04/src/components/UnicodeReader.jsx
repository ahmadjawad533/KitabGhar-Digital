import React from 'react';
import { X, BookOpen, ChevronLeft, ChevronRight, Languages, Sparkles, Copy, Check } from 'lucide-react';

export default function UnicodeReader({ book, unicodeBooksList, onNavigateBook, onClose }) {
  const [copied, setCopied] = React.useState(false);

  if (!book) return null;

  const isUrdu = book.language === 'Urdu';

  // Find index of current book in list for Prev/Next navigation
  const currentIndex = unicodeBooksList.findIndex((b) => b.id === book.id);
  const prevBook = currentIndex > 0 ? unicodeBooksList[currentIndex - 1] : null;
  const nextBook = currentIndex < unicodeBooksList.length - 1 ? unicodeBooksList[currentIndex + 1] : null;

  const handleCopyText = () => {
    if (book.unicodeContent) {
      navigator.clipboard.writeText(book.unicodeContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 md:p-6 animate-fadeIn">
      <div className="bg-slate-900 border border-purple-500/30 rounded-3xl w-full max-w-4xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <div className="bg-slate-800/95 px-6 py-4 border-b border-slate-700/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-purple-500/20 text-purple-300 font-semibold px-2.5 py-0.5 rounded-full border border-purple-500/30">
                  Unicode Text Reader
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Languages className="w-3.5 h-3.5 text-purple-400" /> {book.language} RTL Text
                </span>
              </div>
              <h2 className="text-lg font-bold text-white tracking-wide">Task E: Unicode & Urdu Reader</h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Book Title & Author Section Above Unicode Content */}
        <div className="bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 p-6 border-b border-slate-800 text-center space-y-2">
          <span className="inline-block bg-purple-500/10 text-purple-300 text-xs px-3 py-1 rounded-full border border-purple-500/20 font-mono">
            Book ID: #{book.id} • Category: {book.category}
          </span>
          <h1 className={`text-2xl sm:text-3xl font-extrabold text-white tracking-wide ${isUrdu ? 'font-urdu leading-relaxed text-amber-300' : ''}`}>
            {book.title}
          </h1>
          <p className={`text-sm text-slate-300 ${isUrdu ? 'font-urdu text-base' : ''}`}>
            مصنف / Author: <strong className="text-purple-300 font-semibold">{book.author}</strong> ({book.year})
          </p>
        </div>

        {/* Unicode Reader Main Content Box */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto bg-slate-950/90 space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
            <span className="flex items-center gap-1.5 text-purple-300 font-medium">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Direct UTF-8 Unicode String Render (RTL layout)
            </span>
            <button
              type="button"
              onClick={handleCopyText}
              className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-purple-300" />}
              <span>{copied ? 'Copied!' : 'Copy Unicode Text'}</span>
            </button>
          </div>

          {/* Actual Rendered Unicode Text with RTL support */}
          <div
            dir={isUrdu ? 'rtl' : 'ltr'}
            className={`p-8 rounded-2xl bg-slate-900/90 border border-purple-500/20 shadow-inner whitespace-pre-wrap leading-relaxed ${
              isUrdu
                ? 'font-urdu text-xl sm:text-2xl text-amber-100 text-right tracking-wide space-y-4'
                : 'font-sans text-base text-slate-200 text-left'
            }`}
          >
            {book.unicodeContent || 'No Unicode content available for this book record.'}
          </div>
        </div>

        {/* Navigation & Reader Footer */}
        <div className="bg-slate-900 px-6 py-4 border-t border-slate-800 flex items-center justify-between gap-4">
          {/* Previous Book Navigation */}
          <button
            type="button"
            disabled={!prevBook}
            onClick={() => prevBook && onNavigateBook(prevBook)}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Previous Book:</span>
            <span className="truncate max-w-[120px] text-amber-300">{prevBook ? prevBook.title : 'None'}</span>
          </button>

          {/* Counter indicator */}
          <span className="text-xs font-mono text-slate-400">
            {currentIndex + 1} of {unicodeBooksList.length} Unicode Books
          </span>

          {/* Next Book Navigation */}
          <button
            type="button"
            disabled={!nextBook}
            onClick={() => nextBook && onNavigateBook(nextBook)}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-700 transition-colors"
          >
            <span className="hidden sm:inline">Next Book:</span>
            <span className="truncate max-w-[120px] text-amber-300">{nextBook ? nextBook.title : 'None'}</span>
            <ChevronRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
