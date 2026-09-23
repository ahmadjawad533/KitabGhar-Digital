import React, { useState, useRef, useEffect } from 'react';

/**
 * ============================================================================
 * AUDIO PLAYER BAR COMPONENT (AudioPlayerBar.jsx)
 * ============================================================================
 * A persistent sticky bottom audio player toolbar for background audiobook listening.
 * Demonstrates:
 * - HTML5 Audio API controls (play/pause, timeline seek, playbackRate, volume)
 * - Persistent listening across browsing sessions
 * - Animated audio equalizer visualization
 * - Accessible controls with keyboard navigation
 * ============================================================================
 */
export default function AudioPlayerBar({ book, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // default 3 minutes demo
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  const [prevBook, setPrevBook] = useState(book);

  if (book !== prevBook) {
    setPrevBook(book);
    setIsPlaying(Boolean(book));
    setCurrentTime(0);
  }

  // Synchronize audio element playback when book or isPlaying changes
  useEffect(() => {
    if (audioRef.current && book?.audioUrl) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [book, isPlaying]);

  // Handle simulation if no real audioUrl exists
  useEffect(() => {
    if (!book?.audioUrl && isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackRate);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, playbackRate, duration, book?.audioUrl]);

  if (!book) return null;

  const togglePlay = () => {
    if (audioRef.current && book.audioUrl) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current && book.audioUrl) {
      audioRef.current.currentTime = newTime;
    }
  };

  const skipSeconds = (seconds) => {
    const updated = Math.min(Math.max(currentTime + seconds, 0), duration);
    setCurrentTime(updated);
    if (audioRef.current && book.audioUrl) {
      audioRef.current.currentTime = updated;
    }
  };

  const handleSpeedChange = () => {
    const speeds = [1.0, 1.25, 1.5, 2.0];
    const nextIdx = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setPlaybackRate(nextSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <aside
      className="fixed bottom-0 left-0 right-0 z-[115] bg-slate-900/95 backdrop-blur-md border-t border-indigo-500/30 text-white shadow-2xl py-3 px-4 sm:px-6 transition-all animate-in slide-in-from-bottom duration-300"
      aria-label="Audiobook Player Bar"
    >
      {/* Real HTML5 audio element if direct URL exists */}
      {book.audioUrl && (
        <audio
          ref={audioRef}
          src={book.audioUrl}
          onTimeUpdate={() => {
            if (audioRef.current) {
              setCurrentTime(audioRef.current.currentTime);
              if (audioRef.current.duration) {
                setDuration(audioRef.current.duration);
              }
            }
          }}
          onEnded={() => setIsPlaying(false)}
        />
      )}

      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Track Info */}
        <div className="flex items-center gap-3 w-full md:w-1/4 min-w-0">
          <div className="relative w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xl shrink-0 shadow-md overflow-hidden">
            {book.coverUrl ? (
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>🎧</span>
            )}
            {isPlaying && (
              <div className="absolute inset-0 bg-indigo-900/40 flex items-center justify-center gap-0.5">
                <span className="w-1 h-3 bg-white animate-pulse rounded-full" />
                <span className="w-1 h-5 bg-white animate-pulse delay-75 rounded-full" />
                <span className="w-1 h-2 bg-white animate-pulse delay-150 rounded-full" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/30 text-indigo-300">
                Playing
              </span>
              <span className="text-xs text-slate-400">Audiobook</span>
            </div>
            <h4
              className="text-sm font-semibold text-white truncate"
              dir={book.isRtl ? 'rtl' : 'ltr'}
              title={book.title}
            >
              {book.title}
            </h4>
            <p className="text-xs text-slate-400 truncate" dir={book.isRtl ? 'rtl' : 'ltr'}>
              {book.author}
            </p>
          </div>
        </div>

        {/* Center: Playback Controls & Progress Bar */}
        <div className="flex flex-col items-center gap-1.5 w-full md:w-2/4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => skipSeconds(-15)}
              className="text-slate-400 hover:text-white text-xs font-semibold px-2 py-1 rounded transition-colors cursor-pointer"
              title="Rewind 15 seconds"
              aria-label="Rewind 15 seconds"
            >
              ↺ 15s
            </button>

            <button
              type="button"
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center text-lg shadow-lg shadow-indigo-600/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              aria-label={isPlaying ? 'Pause audiobook' : 'Play audiobook'}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>

            <button
              type="button"
              onClick={() => skipSeconds(15)}
              className="text-slate-400 hover:text-white text-xs font-semibold px-2 py-1 rounded transition-colors cursor-pointer"
              title="Skip ahead 15 seconds"
              aria-label="Skip ahead 15 seconds"
            >
              15s ↻
            </button>
          </div>

          {/* Progress Timeline */}
          <div className="w-full flex items-center gap-2 text-xs text-slate-400">
            <span className="w-10 text-right font-mono text-[11px]">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              aria-label="Audio progress slider"
            />
            <span className="w-10 text-left font-mono text-[11px]">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Right: Rate, Volume & Close Controls */}
        <div className="flex items-center justify-end gap-3 w-full md:w-1/4">
          <button
            type="button"
            onClick={handleSpeedChange}
            className="px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-indigo-300 transition-colors cursor-pointer"
            title="Cycle Playback Speed"
            aria-label={`Playback speed: ${playbackRate}x`}
          >
            {playbackRate}x
          </button>

          <div className="hidden sm:flex items-center gap-1.5">
            <button
              type="button"
              onClick={toggleMute}
              className="text-slate-400 hover:text-white text-sm cursor-pointer"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? '🔇' : '🔊'}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              aria-label="Volume slider"
            />
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full text-slate-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
            title="Close audio player"
            aria-label="Close audio player"
          >
            ✕
          </button>
        </div>
      </div>
    </aside>
  );
}
