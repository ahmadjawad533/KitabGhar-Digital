import React from 'react';
import { X, Volume2, Disc } from 'lucide-react';

export default function AudioPlayerModal({ book, onClose }) {
  const [isPlaying, setIsPlaying] = React.useState(false);

  if (!book) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-cyan-500/30 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden relative p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-white text-lg">Audiobook Player</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="text-center space-y-4">
          <div className="w-24 h-24 bg-gradient-to-tr from-cyan-950 to-slate-900 rounded-full mx-auto border-2 border-cyan-500/40 flex items-center justify-center shadow-lg shadow-cyan-500/10">
            <Disc className={`w-12 h-12 text-cyan-400 ${isPlaying ? 'animate-spin' : ''}`} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">{book.title}</h2>
            <p className="text-sm text-slate-400 mt-1">Narrator / Author: {book.author}</p>
            <span className="inline-block bg-cyan-500/10 text-cyan-300 text-xs px-3 py-1 rounded-full border border-cyan-500/20 font-mono mt-2">
              Duration: {book.duration || '01:30:00'}
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
            <audio
              controls
              className="w-full accent-cyan-500"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src={book.audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <p className="text-xs text-slate-500">Audio path: <code className="text-cyan-300 font-mono">{book.audioUrl}</code></p>
          </div>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold px-6 py-2.5 rounded-xl border border-slate-700 transition-colors"
          >
            Close Audio Player
          </button>
        </div>
      </div>
    </div>
  );
}
