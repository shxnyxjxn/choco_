import React from 'react';
import { TargetWord } from '../types';
import { narrator, sfx } from '../utils/audio';
import { Volume2, X } from 'lucide-react';

interface GlossaryModalProps {
  targetWord: TargetWord | null;
  onClose: () => void;
  speechRate: number;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({
  targetWord,
  onClose,
  speechRate
}) => {
  if (!targetWord) return null;

  const handlePlayWord = () => {
    sfx.playTap();
    narrator.speakText(targetWord.word, speechRate);
  };

  const handlePlayExample = () => {
    sfx.playTap();
    narrator.speakText(targetWord.example, speechRate);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border-2 border-amber-200 text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            sfx.playTap();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
          aria-label="Close word glossary"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Word Card Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-3xl shadow-xs">
            {targetWord.emoji}
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-amber-700">
              Target Clue Word
            </div>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold font-display text-slate-900">
                {targetWord.word}
              </h3>
              <button
                onClick={handlePlayWord}
                className="p-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-xs hover:scale-105 active:scale-95 transition-transform"
                title="Hear word pronunciation"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Korean Meaning */}
        <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/80 mb-4">
          <span className="text-xs font-semibold text-amber-800 uppercase tracking-wide block mb-0.5">
            뜻 (Meaning)
          </span>
          <p className="text-lg font-bold text-amber-950 font-display">
            {targetWord.korean}
          </p>
        </div>

        {/* Example Sentence with Audio */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Example Sentence
            </span>
            <button
              onClick={handlePlayExample}
              className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded-xl transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Listen</span>
            </button>
          </div>
          <p className="text-base font-medium text-slate-800 leading-snug">
            "{targetWord.example}"
          </p>
        </div>

        {/* Got it Button */}
        <button
          onClick={() => {
            sfx.playTap();
            onClose();
          }}
          className="mt-5 w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-base font-bold rounded-2xl shadow-md transition-all active:scale-98"
        >
          Got it! 👍
        </button>
      </div>
    </div>
  );
};
