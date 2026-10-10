import React from 'react';
import { sfx, narrator } from '../utils/audio';
import { Sparkles, Volume2, BookOpen, Compass, Award } from 'lucide-react';

interface CoverScreenProps {
  onStartStory: () => void;
  speechRate: number;
  onToggleSpeechRate: () => void;
}

export const CoverScreen: React.FC<CoverScreenProps> = ({
  onStartStory,
  speechRate,
  onToggleSpeechRate
}) => {
  const handlePreviewAudio = () => {
    sfx.playTap();
    narrator.speakText("Welcome, Detective! Let's solve Choco's Secret Clue!", speechRate);
  };

  const handleStart = () => {
    sfx.playSuccessChime();
    narrator.stop();
    onStartStory();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 md:p-8 bg-gradient-to-b from-amber-100/60 via-orange-50/50 to-amber-100/70 text-slate-800">
      {/* Top Header / Branding */}
      <header className="w-full max-w-xl flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🐾</span>
          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-widest text-amber-800 font-display">
              StoryPaw! Reader
            </h2>
            <p className="text-xs text-amber-900/70 font-medium">Grade 3–4 EFL • CEFR Pre-A1/A1</p>
          </div>
        </div>

        {/* Speed toggle */}
        <button
          onClick={onToggleSpeechRate}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 border border-amber-300 rounded-full text-xs font-bold text-amber-900 shadow-xs hover:bg-amber-100 transition-colors"
          title="Toggle narration speed"
        >
          <span>{speechRate === 0.7 ? '🐢 Slow (0.7x)' : '🐰 Normal (1.0x)'}</span>
        </button>
      </header>

      {/* Main Cover Card */}
      <main className="w-full max-w-xl my-4 bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl border-4 border-amber-300 flex flex-col items-center text-center relative overflow-hidden">
        {/* Decorative corner ribbons */}
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-orange-400/20 rounded-full blur-xl pointer-events-none" />

        {/* Story Series Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 border border-amber-300 rounded-full text-xs font-bold text-amber-900 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Interactive Detective Mystery</span>
        </div>

        {/* Cover Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold font-display text-slate-900 tracking-tight leading-tight mb-2">
          Choco's Secret Clue
        </h1>
        <p className="text-base md:text-lg text-slate-600 font-medium mb-6">
          The Mystery of the Missing Golden Bone 🦴
        </p>

        {/* Detective Puppy Hero SVG Illustration */}
        <div className="w-64 h-52 md:w-72 md:h-56 relative rounded-2xl bg-gradient-to-b from-sky-100 to-emerald-100 border-2 border-amber-200 overflow-hidden shadow-inner flex items-center justify-center mb-6">
          <svg viewBox="0 0 280 220" className="w-full h-full">
            {/* Soft backdrop */}
            <circle cx="230" cy="40" r="28" fill="#FEF08A" opacity="0.8" />
            <path d="M 0 160 Q 140 140 280 160 L 280 220 L 0 220 Z" fill="#86EFAC" />

            {/* Detective Choco */}
            <g transform="translate(60, 45)">
              {/* Tail - Fixed root at body, only tip wags */}
              <ellipse cx="23" cy="80" rx="6" ry="8" fill="#A16207" stroke="#78350F" strokeWidth="2" />
              <path
                fill="#A16207"
                stroke="#78350F"
                strokeWidth="2.5"
                strokeLinejoin="round"
              >
                <animate
                  attributeName="d"
                  dur="0.55s"
                  repeatCount="indefinite"
                  values="
                    M 22 82 Q 2 68 5 48 Q 13 44 18 64 Q 20 74 22 82 Z;
                    M 22 82 Q -5 72 -3 52 Q 7 46 16 64 Q 20 74 22 82 Z;
                    M 22 82 Q 2 68 5 48 Q 13 44 18 64 Q 20 74 22 82 Z;
                    M 22 82 Q 9 64 12 40 Q 20 40 20 62 Q 20 74 22 82 Z;
                    M 22 82 Q 2 68 5 48 Q 13 44 18 64 Q 20 74 22 82 Z
                  "
                  keyTimes="0; 0.25; 0.5; 0.75; 1"
                />
              </path>
              {/* Body */}
              <ellipse cx="60" cy="90" rx="36" ry="26" fill="#D97706" stroke="#78350F" strokeWidth="2.5" />
              <ellipse cx="60" cy="93" rx="22" ry="16" fill="#FDE68A" />
              {/* Paws */}
              <rect x="36" y="105" width="12" height="20" rx="6" fill="#B45309" stroke="#78350F" strokeWidth="2" />
              <rect x="72" y="105" width="12" height="20" rx="6" fill="#B45309" stroke="#78350F" strokeWidth="2" />
              {/* Collar */}
              <path d="M 45 70 Q 60 82 75 70" stroke="#EF4444" strokeWidth="5" strokeLinecap="round" />
              <circle cx="60" cy="78" r="4" fill="#FBBF24" />

              {/* Head */}
              <ellipse cx="36" cy="42" rx="12" ry="22" transform="rotate(-20 36 42)" fill="#92400E" stroke="#78350F" strokeWidth="2.5" />
              <ellipse cx="84" cy="42" rx="12" ry="22" transform="rotate(20 84 42)" fill="#92400E" stroke="#78350F" strokeWidth="2.5" />
              <circle cx="60" cy="46" r="28" fill="#F59E0B" stroke="#78350F" strokeWidth="2.5" />
              <ellipse cx="60" cy="56" rx="16" ry="12" fill="#FEF3C7" stroke="#78350F" strokeWidth="1.5" />
              <ellipse cx="60" cy="52" rx="6" ry="4" fill="#1E293B" />
              <circle cx="50" cy="40" r="5" fill="#1E293B" />
              <circle cx="49" cy="38" r="1.5" fill="#FFFFFF" />
              <circle cx="70" cy="40" r="5" fill="#1E293B" />
              <circle cx="69" cy="38" r="1.5" fill="#FFFFFF" />
              <circle cx="42" cy="52" r="4" fill="#FCA5A5" opacity="0.6" />
              <circle cx="78" cy="52" r="4" fill="#FCA5A5" opacity="0.6" />
              {/* Detective Hat */}
              <path d="M 34 26 C 34 8, 86 8, 86 26 Z" fill="#78350F" stroke="#451A03" strokeWidth="2" />
              <ellipse cx="60" cy="27" rx="32" ry="7" fill="#92400E" stroke="#451A03" strokeWidth="2" />
              <rect x="44" y="22" width="32" height="5" fill="#F59E0B" rx="1" />
            </g>

            {/* Magnifying Glass Sparkle */}
            <g transform="translate(170, 95) rotate(-15)">
              <circle cx="20" cy="20" r="18" fill="rgba(255,255,255,0.4)" stroke="#475569" strokeWidth="3" />
              <rect x="34" y="20" width="22" height="6" rx="3" fill="#92400E" stroke="#475569" strokeWidth="1.5" />
              <circle cx="20" cy="20" r="6" fill="#F59E0B" opacity="0.8" />
            </g>

            {/* Golden Bone at bottom */}
            <g transform="translate(145, 175) rotate(-10)">
              <path
                d="M 6 6 C 2 0, -2 6, 4 10 C -2 14, 2 20, 6 14 L 32 14 C 36 20, 40 14, 34 10 C 40 6, 36 0, 32 6 Z"
                fill="#FACC15"
                stroke="#B45309"
                strokeWidth="2"
              />
            </g>
          </svg>
        </div>

        {/* Mission Briefing Card */}
        <div className="w-full bg-amber-50/80 border border-amber-200/90 rounded-2xl p-4 mb-6 text-left">
          <div className="flex items-center gap-2 mb-2 font-display text-amber-950 font-bold text-sm">
            <Compass className="w-4 h-4 text-amber-700" />
            <span>Detective Briefing (탐정 미션)</span>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
            Detective Choco's shiny golden bone is missing! Travel through 10 pages in the garden, listen to the English narration, tap underlined words to learn vocabulary, and solve checkpoints to find the bone!
          </p>
        </div>

        {/* Detective Tool Features */}
        <div className="grid grid-cols-3 gap-2 w-full mb-6">
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center">
            <Volume2 className="w-5 h-5 text-amber-600 mb-1" />
            <span className="text-[11px] font-bold text-slate-800">Read to Me</span>
            <span className="text-[10px] text-slate-500">Sync Audio</span>
          </div>
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center">
            <BookOpen className="w-5 h-5 text-emerald-600 mb-1" />
            <span className="text-[11px] font-bold text-slate-800">Target Words</span>
            <span className="text-[10px] text-slate-500">Korean & Audio</span>
          </div>
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center">
            <Award className="w-5 h-5 text-purple-600 mb-1" />
            <span className="text-[11px] font-bold text-slate-800">Detective Badge</span>
            <span className="text-[10px] text-slate-500">10 Checkpoints</span>
          </div>
        </div>

        {/* Primary CTA Button */}
        <button
          onClick={handleStart}
          className="w-full py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-display text-xl font-bold rounded-2xl shadow-lg shadow-orange-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-98 flex items-center justify-center gap-3"
        >
          <span>Start Detective Story 🔍</span>
        </button>

        {/* Audio Test Button */}
        <button
          onClick={handlePreviewAudio}
          className="mt-3 text-xs font-semibold text-amber-800 hover:text-amber-950 underline underline-offset-4 flex items-center gap-1.5"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>Test Voice Audio (소리 확인)</span>
        </button>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-amber-900/60 pb-2">
        StoryPaw! Primary EFL Series • Designed for Young Learners (Ages 9–10)
      </footer>
    </div>
  );
};
