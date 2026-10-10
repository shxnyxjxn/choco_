import React, { useState, useEffect, useMemo, useRef } from 'react';
import { StoryPage, TargetWord } from '../types';
import { SceneIllustration } from './SceneIllustrations';
import { narrator, sfx } from '../utils/audio';
import { Volume2, VolumeX, ArrowLeft, ArrowRight, Lock, Unlock, HelpCircle } from 'lucide-react';

interface StoryScreenProps {
  page: StoryPage;
  totalPages: number;
  speechRate: number;
  onToggleSpeechRate: () => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  onOpenGlossary: (word: TargetWord) => void;
  isAudioPlayedForPage: boolean;
  onMarkAudioPlayed: (pageNumber: number) => void;
}

export const StoryScreen: React.FC<StoryScreenProps> = ({
  page,
  totalPages,
  speechRate,
  onToggleSpeechRate,
  onPrevPage,
  onNextPage,
  onOpenGlossary,
  isAudioPlayedForPage,
  onMarkAudioPlayed
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [highlightedWordIndex, setHighlightedWordIndex] = useState<number>(-1);
  const cancelPlaybackRef = useRef<(() => void) | null>(null);

  // Flatten words with global index for boundary synchronization
  const wordsData = useMemo(() => {
    let globalIndex = 0;
    const fullText = page.sentences.join(' ');

    const sentenceList = page.sentences.map((sentence) => {
      const sentenceWords = sentence.split(' ').map((rawWord) => {
        const clean = rawWord.toLowerCase().replace(/[^a-z]/g, '');
        const isTarget = clean === page.targetWord.word.toLowerCase();
        const wordObj = {
          raw: rawWord,
          clean,
          isTarget,
          index: globalIndex
        };
        globalIndex++;
        return wordObj;
      });
      return sentenceWords;
    });

    const flatWordList = sentenceList.flat().map((w) => w.raw);

    return {
      sentenceList,
      flatWordList,
      fullText
    };
  }, [page]);

  // Clean up any ongoing audio when changing pages
  useEffect(() => {
    setIsPlaying(false);
    setHighlightedWordIndex(-1);
    if (cancelPlaybackRef.current) {
      cancelPlaybackRef.current();
      cancelPlaybackRef.current = null;
    }
    narrator.stop();

    return () => {
      if (cancelPlaybackRef.current) {
        cancelPlaybackRef.current();
      }
      narrator.stop();
    };
  }, [page.pageNumber]);

  const handleTogglePlayAudio = () => {
    sfx.playTap();

    if (isPlaying) {
      if (cancelPlaybackRef.current) {
        cancelPlaybackRef.current();
        cancelPlaybackRef.current = null;
      }
      narrator.stop();
      setIsPlaying(false);
      setHighlightedWordIndex(-1);
      return;
    }

    setIsPlaying(true);
    setHighlightedWordIndex(0);

    const cleanup = narrator.narratePage(
      wordsData.fullText,
      wordsData.flatWordList,
      speechRate,
      (wordIdx) => {
        setHighlightedWordIndex(wordIdx);
      },
      () => {
        setIsPlaying(false);
        setHighlightedWordIndex(-1);
        if (!isAudioPlayedForPage) {
          sfx.playUnlockChime();
          onMarkAudioPlayed(page.pageNumber);
        }
      }
    );

    cancelPlaybackRef.current = cleanup;
  };

  const handleNextClick = () => {
    if (!isAudioPlayedForPage) return;
    sfx.playTap();
    onNextPage();
  };

  const handlePrevClick = () => {
    sfx.playTap();
    onPrevPage();
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-amber-50/50 to-orange-50/40 text-slate-800">
      {/* Top Header Navigation Bar */}
      <header className="w-full max-w-4xl mx-auto px-4 py-2.5 flex items-center justify-between border-b border-amber-200/60 bg-white/80 backdrop-blur-xs sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <span className="text-xl">🐾</span>
          <span className="text-xs md:text-sm font-extrabold uppercase tracking-wider text-amber-800 font-display">
            Page {page.pageNumber} / {totalPages}
          </span>
          <div className="hidden sm:flex items-center gap-1 ml-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx + 1 === page.pageNumber
                    ? 'w-6 bg-amber-500'
                    : idx + 1 < page.pageNumber
                    ? 'w-2 bg-amber-300'
                    : 'w-2 bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Speed Toggle & Audio Status */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sfx.playTap();
              onToggleSpeechRate();
            }}
            className="flex items-center gap-1 px-3 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-full text-xs font-bold transition-colors"
            title="Toggle Narration Speed"
          >
            <span>{speechRate === 0.7 ? '🐢 Slow (0.7x)' : '🐰 Normal (1.0x)'}</span>
          </button>
        </div>
      </header>

      {/* Main Content Area - Split 50% Top Visual / 50% Bottom Text & Controls */}
      <main className="w-full max-w-2xl mx-auto flex-1 flex flex-col px-4 py-2 md:py-4">
        {/* Top Half (50%): Scene Illustration Card */}
        <div className="w-full h-56 sm:h-72 md:h-80 rounded-3xl overflow-hidden border-4 border-amber-200 shadow-md bg-white relative shrink-0">
          <SceneIllustration pageNumber={page.pageNumber} />

          {/* Target Word Quick Pill on top right of scene */}
          <button
            onClick={() => {
              sfx.playTap();
              onOpenGlossary(page.targetWord);
            }}
            className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm border-2 border-amber-400 rounded-full shadow-md text-xs font-bold text-amber-900 hover:bg-amber-50 active:scale-95 transition-all"
            title="Click to view target word definition"
          >
            <span className="text-sm">{page.targetWord.emoji}</span>
            <span className="underline underline-offset-2">{page.targetWord.word}</span>
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
          </button>
        </div>

        {/* Bottom Half (50%): Story Text Container & Narration Controls */}
        <div className="mt-4 flex-1 flex flex-col justify-between bg-white rounded-3xl p-5 md:p-6 border-3 border-amber-200 shadow-sm">
          {/* Text Area */}
          <div className="flex-1 flex flex-col justify-center py-2">
            {wordsData.sentenceList.map((sentenceWords, sIdx) => (
              <p
                key={sIdx}
                className="text-2xl sm:text-3xl font-display font-medium text-slate-900 leading-relaxed md:leading-loose mb-3 last:mb-0"
              >
                {sentenceWords.map((wordItem) => {
                  const isCurrentSpoken = highlightedWordIndex === wordItem.index;

                  if (wordItem.isTarget) {
                    return (
                      <button
                        key={wordItem.index}
                        onClick={() => {
                          sfx.playTap();
                          onOpenGlossary(page.targetWord);
                        }}
                        className={`inline-block mx-1 px-2 py-0.5 rounded-xl font-bold transition-all duration-150 underline decoration-amber-500 decoration-3 underline-offset-4 cursor-pointer text-left ${
                          isCurrentSpoken
                            ? 'bg-amber-300 text-amber-950 scale-105 ring-4 ring-amber-400/40 shadow-xs'
                            : 'bg-amber-100 hover:bg-amber-200 text-amber-900 shadow-2xs'
                        }`}
                        title="Click to learn this word"
                      >
                        {wordItem.raw}
                      </button>
                    );
                  }

                  return (
                    <span
                      key={wordItem.index}
                      className={`inline-block mx-1 px-1 py-0.5 rounded-lg transition-colors duration-150 ${
                        isCurrentSpoken
                          ? 'bg-amber-200 text-slate-950 font-bold'
                          : 'text-slate-800'
                      }`}
                    >
                      {wordItem.raw}
                    </span>
                  );
                })}
              </p>
            ))}

            {/* Target Word Guidance Hint */}
            <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-800/80 font-medium">
              <span className="text-sm">{page.targetWord.emoji}</span>
              <span>
                Tip: Tap the highlighted word{' '}
                <strong className="underline font-bold text-amber-900">"{page.targetWord.word}"</strong>{' '}
                to hear its meaning!
              </span>
            </div>
          </div>

          {/* Audio Action Row */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              onClick={handleTogglePlayAudio}
              className={`flex-1 py-3 px-4 rounded-2xl font-bold font-display text-base transition-all duration-200 flex items-center justify-center gap-2 shadow-xs active:scale-98 ${
                isPlaying
                  ? 'bg-amber-500 hover:bg-amber-600 text-white animate-pulse'
                  : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
              }`}
            >
              {isPlaying ? (
                <>
                  <VolumeX className="w-5 h-5" />
                  <span>Pause Reading</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-5 h-5 text-amber-700" />
                  <span>🔊 Read to Me</span>
                </>
              )}
            </button>

            {/* Audio Completed Status Badge */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600">
              {isAudioPlayedForPage ? (
                <>
                  <Unlock className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Listened ✅</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-amber-600" />
                  <span className="text-amber-700">Listen first 🎧</span>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Sticky Navigation Bar */}
      <footer className="w-full max-w-2xl mx-auto p-4 flex items-center justify-between gap-4">
        {/* Prev Button */}
        <button
          onClick={handlePrevClick}
          disabled={page.pageNumber === 1}
          className={`px-5 py-3.5 rounded-2xl font-bold font-display text-base flex items-center gap-2 transition-all active:scale-98 ${
            page.pageNumber === 1
              ? 'bg-slate-100 text-slate-300 cursor-not-allowed border border-slate-200'
              : 'bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-300 shadow-xs'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Prev</span>
        </button>

        {/* Audio locked hint if Next is locked */}
        {!isAudioPlayedForPage && (
          <span className="text-xs font-semibold text-amber-800 text-center flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
            <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Listen to audio to unlock Next!</span>
          </span>
        )}

        {/* Next Button (Locked until audio has been played) */}
        <button
          onClick={handleNextClick}
          disabled={!isAudioPlayedForPage}
          className={`px-6 py-3.5 rounded-2xl font-bold font-display text-base flex items-center gap-2 transition-all duration-200 active:scale-98 ${
            isAudioPlayedForPage
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md hover:shadow-lg cursor-pointer ring-4 ring-amber-100'
              : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-75'
          }`}
          title={
            isAudioPlayedForPage
              ? 'Go to Checkpoint Question'
              : 'Listen to the audio narration first to continue'
          }
        >
          <span>Next</span>
          {isAudioPlayedForPage ? (
            <ArrowRight className="w-4 h-4" />
          ) : (
            <Lock className="w-4 h-4 text-slate-400" />
          )}
        </button>
      </footer>
    </div>
  );
};
