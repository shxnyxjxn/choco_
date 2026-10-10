import React, { useState, useEffect } from 'react';
import { TargetWord } from '../types';
import { sfx, narrator } from '../utils/audio';
import { RotateCcw, Home, Volume2, Sparkles, Check, Heart } from 'lucide-react';

interface ResultScreenProps {
  score: number;
  totalClues: number;
  targetWords: TargetWord[];
  onReadAgain: () => void;
  onFinishHome: () => void;
  speechRate: number;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  score,
  totalClues,
  targetWords,
  onReadAgain,
  onFinishHome,
  speechRate
}) => {
  const [selectedEmoji, setSelectedEmoji] = useState<'happy' | 'curious' | 'surprised'>('happy');
  const [selectedTrait, setSelectedTrait] = useState<string>('smart');
  const [showWordReview, setShowWordReview] = useState<boolean>(false);

  // Play victory fanfare on mount
  useEffect(() => {
    sfx.playFanfare();
  }, []);

  const traits = ['smart', 'brave', 'cute', 'kind'];

  const emojis = [
    { id: 'happy', icon: '😄', label: 'Happy (재미있어요)' },
    { id: 'curious', icon: '🤔', label: 'Curious (궁금해요)' },
    { id: 'surprised', icon: '😮', label: 'Surprised (놀라워요)' },
  ] as const;

  const builtSentence = `I like Choco because he is ${selectedTrait}.`;

  const handleSpeakSentence = () => {
    sfx.playTap();
    narrator.speakText(builtSentence, speechRate);
  };

  const handleSpeakWord = (word: string, example: string) => {
    sfx.playTap();
    narrator.speakText(`${word}. ${example}`, speechRate);
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-b from-amber-100/70 via-orange-50/50 to-amber-100/80 text-slate-800 flex flex-col items-center">
      <div className="w-full max-w-xl bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl border-4 border-amber-300 flex flex-col items-center text-center relative overflow-hidden">
        {/* Confetti decorations */}
        <div className="absolute top-2 left-6 text-2xl animate-bounce">🎉</div>
        <div className="absolute top-2 right-6 text-2xl animate-bounce">⭐</div>

        {/* Top Header Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 border border-amber-300 rounded-full text-xs font-bold text-amber-900 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Case Closed • Mystery Solved!</span>
        </div>

        {/* Master Detective Choco Badge Visual */}
        <div className="relative my-2 flex flex-col items-center">
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 border-4 border-amber-600 p-2 shadow-xl flex items-center justify-center animate-glow">
            <div className="w-full h-full rounded-full bg-amber-50 border-2 border-dashed border-amber-500 flex flex-col items-center justify-center">
              <span className="text-4xl md:text-5xl">🐾</span>
              <span className="text-[10px] md:text-xs font-extrabold text-amber-900 uppercase font-display tracking-wider mt-1">
                StoryPaw!
              </span>
            </div>
          </div>
          {/* Ribbon */}
          <div className="mt-[-12px] px-4 py-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-red-600 text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-md border border-red-700">
            Master Detective Choco Badge
          </div>
        </div>

        {/* Detective Title & Clue Score */}
        <h1 className="mt-4 text-3xl font-extrabold font-display text-slate-900">
          Super Detective! 🎖️
        </h1>
        <p className="text-base text-slate-600 font-medium mb-4">
          You helped Choco find the golden bone!
        </p>

        {/* Accurate Score Box */}
        <div className="w-full bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-4 mb-6 shadow-xs flex items-center justify-around">
          <div>
            <div className="text-xs uppercase font-bold text-amber-800 tracking-wider">
              Detective Score
            </div>
            <div className="text-3xl font-extrabold font-display text-amber-950">
              {score} / {totalClues}
            </div>
            <div className="text-xs text-amber-700 font-medium">
              clues solved on 1st try
            </div>
          </div>
          <div className="h-10 w-px bg-amber-200" />
          <div>
            <div className="text-xs uppercase font-bold text-amber-800 tracking-wider">
              Clue Vocabulary
            </div>
            <div className="text-3xl font-extrabold font-display text-emerald-700">
              10 / 10
            </div>
            <div className="text-xs text-emerald-800 font-medium">
              words learned
            </div>
          </div>
        </div>

        {/* Reader Response Section */}
        <div className="w-full bg-slate-50 border-2 border-slate-200 rounded-3xl p-5 mb-6 text-left">
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-4 h-4 text-rose-500" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 font-display">
              Reader Response (나의 독서 소감)
            </h3>
          </div>

          {/* 1. Emoji Reaction Selector */}
          <div className="mb-4">
            <label className="text-xs font-semibold text-slate-600 block mb-2">
              1. How did you feel about this detective story?
            </label>
            <div className="grid grid-cols-3 gap-2">
              {emojis.map((emoji) => {
                const isSelected = selectedEmoji === emoji.id;
                return (
                  <button
                    key={emoji.id}
                    onClick={() => {
                      sfx.playTap();
                      setSelectedEmoji(emoji.id);
                    }}
                    className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-1 transition-all ${
                      isSelected
                        ? 'bg-amber-100 border-amber-400 text-amber-950 font-bold shadow-xs scale-102 ring-2 ring-amber-200'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-2xl">{emoji.icon}</span>
                    <span className="text-[11px] font-semibold">{emoji.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Sentence Builder with Word Chips */}
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-2">
              2. Complete the sentence about Detective Choco:
            </label>

            {/* Clickable Word Chips */}
            <div className="flex flex-wrap gap-2 mb-3">
              {traits.map((trait) => {
                const isSelected = selectedTrait === trait;
                return (
                  <button
                    key={trait}
                    onClick={() => {
                      sfx.playTap();
                      setSelectedTrait(trait);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl font-bold text-sm transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-amber-500 text-white shadow-xs scale-105'
                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-amber-50'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    <span>[{trait}]</span>
                  </button>
                );
              })}
            </div>

            {/* Sentence Preview Card with Audio Read-Aloud */}
            <div className="p-3.5 bg-white border-2 border-amber-200 rounded-2xl flex items-center justify-between gap-3">
              <p className="text-base font-bold font-display text-amber-950">
                "{builtSentence}"
              </p>
              <button
                onClick={handleSpeakSentence}
                className="p-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-xs transition-transform active:scale-95 shrink-0"
                title="Listen to your created sentence"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Target Words Review Toggle */}
        <div className="w-full mb-6">
          <button
            onClick={() => {
              sfx.playTap();
              setShowWordReview(!showWordReview);
            }}
            className="w-full py-2.5 px-4 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 rounded-2xl text-xs font-bold transition-colors flex items-center justify-between"
          >
            <span>📖 Review All 10 Target Clue Words ({showWordReview ? 'Hide' : 'Show'})</span>
            <span className="text-sm font-semibold">{showWordReview ? '▲' : '▼'}</span>
          </button>

          {showWordReview && (
            <div className="mt-3 grid grid-cols-2 gap-2 text-left animate-in fade-in duration-200 max-h-60 overflow-y-auto p-1">
              {targetWords.map((tw, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-2"
                >
                  <div className="truncate">
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                      <span>{tw.emoji}</span>
                      <span className="truncate">{tw.word}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">{tw.korean}</div>
                  </div>
                  <button
                    onClick={() => handleSpeakWord(tw.word, tw.example)}
                    className="p-1.5 text-amber-700 bg-amber-100 hover:bg-amber-200 rounded-lg shrink-0"
                    title={`Listen to ${tw.word}`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons: Read Again & Finish */}
        <div className="grid grid-cols-2 gap-3 w-full">
          <button
            onClick={() => {
              sfx.playTap();
              onReadAgain();
            }}
            className="py-3.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold font-display text-base rounded-2xl border-2 border-slate-300 transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Read Again 🔄</span>
          </button>
          <button
            onClick={() => {
              sfx.playTap();
              onFinishHome();
            }}
            className="py-3.5 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold font-display text-base rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <Home className="w-4 h-4" />
            <span>Finish 🏠</span>
          </button>
        </div>
      </div>
    </div>
  );
};
