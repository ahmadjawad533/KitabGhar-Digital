import React from 'react';
import { X, FileText, Download, CheckCircle, Info } from 'lucide-react';

export default function PDFReader({ book, onClose }) {
  if (!book) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 md:p-6 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-5xl h-[90vh] shadow-2xl flex flex-col overflow-hidden">
        {/* PDF Reader Top Navigation Bar */}
        <div className="bg-slate-800/90 px-6 py-4 border-b border-slate-700/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-red-400" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs bg-red-500/20 text-red-300 font-semibold px-2 py-0.5 rounded border border-red-500/30">
                  PDF Reader Component
                </span>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">{book.pdfUrl}</span>
              </div>
              <h2 className="text-lg font-bold text-white truncate">{book.title}</h2>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Download PDF button */}
            <a
              href={book.pdfUrl}
              download={`${book.title.replace(/\s+/g, '-').toLowerCase()}.pdf`}
              className="hidden sm:inline-flex items-center gap-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
            >
              <Download className="w-4 h-4 text-amber-400" /> Download PDF
            </a>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Viewer Content Frame */}
        <div className="flex-1 bg-slate-950 relative overflow-hidden flex flex-col">
          {/* Information Pill Banner */}
          <div className="bg-slate-900/90 px-6 py-2.5 border-b border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-400" />
              Dynamic URL loaded: <code className="text-amber-300 font-mono">{book.pdfUrl}</code> (Author: {book.author})
            </span>
            <span className="text-slate-500 text-[11px] hidden md:inline">Lab Task 4 — Task D</span>
          </div>

          {/* PDF Viewer Iframe / Object Component */}
          <div className="flex-1 w-full h-full relative">
            <iframe
              src={`${book.pdfUrl}#toolbar=1`}
              title={`PDF Reader - ${book.title}`}
              className="w-full h-full border-0 bg-slate-900"
            />
          </div>
        </div>

        {/* PDF Reader Footer */}
        <div className="bg-slate-900 px-6 py-3 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>PDF viewer active with property <code className="text-amber-300 font-mono">book.pdfUrl</code></span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-amber-400 hover:underline font-semibold"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
