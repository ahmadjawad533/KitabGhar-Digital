import React from 'react';
import { Star, FileText, BookOpen, Volume2, Eye, Lock, Sparkles } from 'lucide-react';

export default function BookCard({ book, onViewDetails, onOpenPDF, onOpenUnicode, onOpenAudio }) {
  const isUrdu = book.language === 'Urdu';

  // Format badge rendering helper
  const getFormatBadge = () => {
    switch (book.format) {
      case 'PDF':
        return (
          <span className="inline-flex items-center gap-1 bg-red-500/20 text-red-300 text-xs font-semibold px-2.5 py-1 rounded-md border border-red-500/30">
            <FileText className="w-3.5 h-3.5" /> PDF
          </span>
        );
      case 'Unicode':
        return (
          <span className="inline-flex items-center gap-1 bg-purple-500/20 text-purple-300 text-xs font-semibold px-2.5 py-1 rounded-md border border-purple-500/30">
            <BookOpen className="w-3.5 h-3.5" /> Unicode
          </span>
        );
      case 'Audio':
        return (
          <span className="inline-flex items-center gap-1 bg-cyan-500/20 text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-md border border-cyan-500/30">
            <Volume2 className="w-3.5 h-3.5" /> Audio
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <article className="bg-slate-800/90 border border-slate-700/80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-slate-600 transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Top Header Card Cover / Gradient Banner */}
        <div className="relative h-44 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950/40 p-4 flex items-center justify-center border-b border-slate-700/60 overflow-hidden">
          {/* Dynamic Background Pattern */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          {/* Featured Badge */}
          {book.featured && (
            <div className="absolute top-3 left-3 z-10">
              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-extrabold px-2.5 py-1 rounded-full shadow-lg shadow-amber-500/30">
                <Sparkles className="w-3.5 h-3.5 fill-slate-950" /> Featured
              </span>
            </div>
          )}

          {/* Format Badge */}
          <div className="absolute top-3 right-3 z-10">
            {getFormatBadge()}
          </div>

          {/* Book Icon Visual Placeholder */}
          <div className="text-center p-3 z-0 group-hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-20 mx-auto bg-slate-950/80 border border-amber-500/40 rounded-lg shadow-md flex items-center justify-center p-2 mb-1">
              {book.format === 'PDF' && <FileText className="w-8 h-8 text-red-400" />}
              {book.format === 'Unicode' && <BookOpen className="w-8 h-8 text-purple-400" />}
              {book.format === 'Audio' && <Volume2 className="w-8 h-8 text-cyan-400" />}
            </div>
            <span className="text-[11px] font-mono text-slate-400">ID: #{book.id}</span>
          </div>
        </div>

        {/* Card Body Details */}
        <div className="p-5 space-y-3">
          {/* Category & Language */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="bg-slate-900 text-amber-300/90 font-medium px-2.5 py-0.5 rounded-full border border-slate-700">
              {book.category}
            </span>
            <span className="text-slate-400">{book.language} • {book.year}</span>
          </div>

          {/* Book Title */}
          <h3 className={`text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1 ${isUrdu ? 'font-urdu leading-relaxed' : ''}`}>
            {book.title}
          </h3>

          {/* Author */}
          <p className={`text-sm text-slate-300 line-clamp-1 ${isUrdu ? 'font-urdu' : ''}`}>
            By <span className="font-semibold text-slate-200">{book.author}</span>
          </p>

          {/* Description snippet */}
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {book.description}
          </p>

          {/* Ratings & Metadata */}
          <div className="flex items-center justify-between pt-2 text-xs border-t border-slate-700/40">
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{book.rating}</span>
            </div>
            <div className="text-slate-400">
              {book.pages ? `${book.pages} pages` : book.duration ? book.duration : 'N/A'}
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-5 pt-0 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          {/* Task C: View Details Button using find() */}
          <button
            type="button"
            onClick={() => onViewDetails(book.id)}
            className="w-full bg-slate-900 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2.5 px-3 rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>Details (find)</span>
          </button>

          {/* Task D & E: Read / Open buttons depending on format */}
          {book.format === 'PDF' && (
            <button
              type="button"
              disabled={!book.available}
              onClick={() => onOpenPDF(book)}
              className={`w-full text-xs font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                book.available
                  ? 'bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/20'
                  : 'bg-slate-900 text-slate-500 border border-slate-800 cursor-not-allowed'
              }`}
            >
              {book.available ? (
                <>
                  <FileText className="w-3.5 h-3.5" /> Read PDF
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-slate-500" /> Unavailable
                </>
              )}
            </button>
          )}

          {book.format === 'Unicode' && (
            <button
              type="button"
              disabled={!book.available}
              onClick={() => onOpenUnicode(book)}
              className={`w-full text-xs font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                book.available
                  ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/20'
                  : 'bg-slate-900 text-slate-500 border border-slate-800 cursor-not-allowed'
              }`}
            >
              {book.available ? (
                <>
                  <BookOpen className="w-3.5 h-3.5" /> Read Book
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-slate-500" /> Unavailable
                </>
              )}
            </button>
          )}

          {book.format === 'Audio' && (
            <button
              type="button"
              disabled={!book.available}
              onClick={() => onOpenAudio(book)}
              className={`w-full text-xs font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                book.available
                  ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-600/20'
                  : 'bg-slate-900 text-slate-500 border border-slate-800 cursor-not-allowed'
              }`}
            >
              {book.available ? (
                <>
                  <Volume2 className="w-3.5 h-3.5" /> Listen Audio
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-slate-500" /> Unavailable
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
