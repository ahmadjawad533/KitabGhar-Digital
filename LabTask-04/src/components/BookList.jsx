import React from 'react';
import BookCard from './BookCard';
import { BookX, Code } from 'lucide-react';

export default function BookList({ books, onViewDetails, onOpenPDF, onOpenUnicode, onOpenAudio }) {
  if (books.length === 0) {
    return (
      <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-12 text-center my-8 shadow-inner">
        <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700 text-slate-500">
          <BookX className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-200 mb-2">No Books Found in this Category</h3>
        <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
          The current <code className="text-amber-300 font-mono text-xs">books.filter()</code> query returned an empty array (0 matching records). Try selecting "All Books" or toggling additional filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Code Hint Banner for Task A */}
      <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-amber-400" />
          <span>
            Task A: Rendering <strong className="text-amber-300">{books.length}</strong> items dynamically via <code className="bg-slate-950 text-amber-300 px-1.5 py-0.5 rounded font-mono">books.map(book =&gt; &lt;BookCard key={"{book.id}"} ... /&gt;)</code>
          </span>
        </div>
        <span className="hidden sm:inline text-[11px] text-slate-500">React key=book.id enforced</span>
      </div>

      {/* Grid of Book Cards rendered with map() */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onViewDetails={onViewDetails}
            onOpenPDF={onOpenPDF}
            onOpenUnicode={onOpenUnicode}
            onOpenAudio={onOpenAudio}
          />
        ))}
      </div>
    </div>
  );
}
