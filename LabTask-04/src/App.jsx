import React, { useState } from 'react';
import { books, categories } from './data/booksData';
import CategoryButtons from './components/CategoryButtons';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import PDFReader from './components/PDFReader';
import UnicodeReader from './components/UnicodeReader';
import AudioPlayerModal from './components/AudioPlayerModal';
import { BookOpen, Code2, Sparkles, Layers, Search } from 'lucide-react';

export default function App() {
  // State management for category filter & viewers
  const [selectedCategory, setSelectedCategory] = useState('All Books');
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [pdfReaderBook, setPdfReaderBook] = useState(null);
  const [unicodeReaderBook, setUnicodeReaderBook] = useState(null);
  const [audioReaderBook, setAudioReaderBook] = useState(null);

  // Optional challenge toggles
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(false);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

  // Task B: filter() Books by selected category and optional flags
  let filteredBooks = selectedCategory === 'All Books'
    ? books
    : books.filter((book) => book.category === selectedCategory);

  if (showOnlyFeatured) {
    filteredBooks = filteredBooks.filter((book) => book.featured === true);
  }

  if (showOnlyAvailable) {
    filteredBooks = filteredBooks.filter((book) => book.available === true);
  }

  // Task C: find() locate exactly ONE book by id
  const selectedBook = selectedBookId !== null
    ? books.find((book) => book.id === selectedBookId)
    : null;

  // Filter list of Unicode books for reader prev/next navigation
  const unicodeBooksList = books.filter((b) => b.format === 'Unicode');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Top Header Banner */}
      <header className="bg-slate-900/90 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-black text-xl">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-amber-500/20 text-amber-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  SP25-BSE-B • Lab Task 4
                </span>
                <span className="text-xs text-slate-400 font-mono">ReactJS Array Methods</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
                BookStore App — <span className="text-amber-400">map()</span>, <span className="text-sky-400">filter()</span> & <span className="text-purple-400">find()</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs bg-slate-950/80 p-3 rounded-2xl border border-slate-800 self-start md:self-auto">
            <div className="text-right">
              <p className="font-bold text-slate-200">Ahmad Jawad Bandesha</p>
              <p className="text-slate-400">Student ID: SP25-BSE-B</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
              AJ
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Educational Array Methods Explanation Card */}
        <section className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-amber-950/30 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                <Code2 className="w-4 h-4" /> Section 4: Array Methods Demonstrated
              </div>
              <h2 className="text-2xl font-bold text-white">JavaScript Array Operations in ReactJS</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                This project demonstrates the three core array methods required in Lab Task 4 for dynamic component rendering, category filtering, and single object lookup.
              </p>
            </div>

            {/* Quick Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto">
              <div className="bg-slate-950/80 p-4 rounded-2xl border border-amber-500/30">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-1">
                  <Layers className="w-4 h-4" /> map()
                </div>
                <p className="text-[11px] text-slate-300">Renders <code className="text-amber-300">BookCard</code> components dynamically from array.</p>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-2xl border border-sky-500/30">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-xs mb-1">
                  <Sparkles className="w-4 h-4" /> filter()
                </div>
                <p className="text-[11px] text-slate-300">Filters books array by category on button click.</p>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-2xl border border-purple-500/30">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-xs mb-1">
                  <Search className="w-4 h-4" /> find()
                </div>
                <p className="text-[11px] text-slate-300">Locates exactly 1 book object by <code className="text-purple-300">id</code> for modal view.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Task B: Category Filter Buttons */}
        <section>
          <CategoryButtons
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            totalBooksCount={books.length}
            filteredCount={filteredBooks.length}
            showOnlyFeatured={showOnlyFeatured}
            onToggleFeatured={setShowOnlyFeatured}
            showOnlyAvailable={showOnlyAvailable}
            onToggleAvailable={setShowOnlyAvailable}
          />
        </section>

        {/* Task A: Rendered Books using map() */}
        <section className="space-y-4">
          <BookList
            books={filteredBooks}
            onViewDetails={(id) => setSelectedBookId(id)}
            onOpenPDF={(book) => setPdfReaderBook(book)}
            onOpenUnicode={(book) => setUnicodeReaderBook(book)}
            onOpenAudio={(book) => setAudioReaderBook(book)}
          />
        </section>

      </main>

      {/* Task C: Book Details Modal using find() */}
      {selectedBookId !== null && (
        <BookDetails
          selectedBookId={selectedBookId}
          book={selectedBook}
          onClose={() => setSelectedBookId(null)}
          onOpenPDF={(book) => setPdfReaderBook(book)}
          onOpenUnicode={(book) => setUnicodeReaderBook(book)}
          onOpenAudio={(book) => setAudioReaderBook(book)}
        />
      )}

      {/* Task D: PDF Reader View */}
      {pdfReaderBook && (
        <PDFReader
          book={pdfReaderBook}
          onClose={() => setPdfReaderBook(null)}
        />
      )}

      {/* Task E: Unicode Reader View (RTL Urdu support) */}
      {unicodeReaderBook && (
        <UnicodeReader
          book={unicodeReaderBook}
          unicodeBooksList={unicodeBooksList}
          onNavigateBook={(nextBook) => setUnicodeReaderBook(nextBook)}
          onClose={() => setUnicodeReaderBook(null)}
        />
      )}

      {/* Optional Audio Player View */}
      {audioReaderBook && (
        <AudioPlayerModal
          book={audioReaderBook}
          onClose={() => setAudioReaderBook(null)}
        />
      )}

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <p className="font-semibold text-slate-300">BookStore App — SP25-BSE-B Lab Task 4</p>
            <p className="text-slate-500">ReactJS Component-Based Design • Tailwind CSS</p>
          </div>
          <div className="text-right text-slate-500">
            <p>Demonstrating <code className="text-amber-400">map()</code>, <code className="text-sky-400">filter()</code>, <code className="text-purple-400">find()</code></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
