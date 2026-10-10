/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback } from 'react';
import { ScreenState, TargetWord } from './types';
import { STORY_PAGES } from './data/storyData';
import { CoverScreen } from './components/CoverScreen';
import { StoryScreen } from './components/StoryScreen';
import { CheckpointModal } from './components/CheckpointModal';
import { GlossaryModal } from './components/GlossaryModal';
import { ResultScreen } from './components/ResultScreen';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('cover');
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [activeGlossaryWord, setActiveGlossaryWord] = useState<TargetWord | null>(null);
  const [audioPlayedPages, setAudioPlayedPages] = useState<Set<number>>(new Set());
  const [score, setScore] = useState<number>(0);

  const currentPage = STORY_PAGES[currentPageIndex];

  // Toggle narration speed between Slow (0.7) and Normal (1.0)
  const handleToggleSpeechRate = useCallback(() => {
    setSpeechRate((prev) => (prev === 1.0 ? 0.7 : 1.0));
  }, []);

  // Mark audio played for page to unlock Next button
  const handleMarkAudioPlayed = useCallback((pageNumber: number) => {
    setAudioPlayedPages((prev) => {
      const next = new Set(prev);
      next.add(pageNumber);
      return next;
    });
  }, []);

  // Navigation handlers
  const handleStartStory = () => {
    setCurrentPageIndex(0);
    setScore(0);
    setAudioPlayedPages(new Set());
    setScreen('story');
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
    }
  };

  const handleNextPageFromStory = () => {
    // Open checkpoint question for the current page
    setScreen('checkpoint');
  };

  const handleCheckpointComplete = (firstTryCorrect: boolean) => {
    if (firstTryCorrect) {
      setScore((prev) => prev + 1);
    }

    // Advance to next story page or result
    if (currentPageIndex < STORY_PAGES.length - 1) {
      setCurrentPageIndex((prev) => prev + 1);
      setScreen('story');
    } else {
      setScreen('result');
    }
  };

  const handleReadAgain = () => {
    setCurrentPageIndex(0);
    setScore(0);
    setAudioPlayedPages(new Set());
    setScreen('story');
  };

  const handleFinishHome = () => {
    setCurrentPageIndex(0);
    setScore(0);
    setAudioPlayedPages(new Set());
    setScreen('cover');
  };

  const targetWordsList = STORY_PAGES.map((p) => p.targetWord);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-amber-200">
      {screen === 'cover' && (
        <CoverScreen
          onStartStory={handleStartStory}
          speechRate={speechRate}
          onToggleSpeechRate={handleToggleSpeechRate}
        />
      )}

      {screen === 'story' && currentPage && (
        <StoryScreen
          page={currentPage}
          totalPages={STORY_PAGES.length}
          speechRate={speechRate}
          onToggleSpeechRate={handleToggleSpeechRate}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPageFromStory}
          onOpenGlossary={(word) => setActiveGlossaryWord(word)}
          isAudioPlayedForPage={audioPlayedPages.has(currentPage.pageNumber)}
          onMarkAudioPlayed={handleMarkAudioPlayed}
        />
      )}

      {screen === 'checkpoint' && currentPage && (
        <>
          {/* Background story page retained for visual context */}
          <StoryScreen
            page={currentPage}
            totalPages={STORY_PAGES.length}
            speechRate={speechRate}
            onToggleSpeechRate={handleToggleSpeechRate}
            onPrevPage={() => {}}
            onNextPage={() => {}}
            onOpenGlossary={() => {}}
            isAudioPlayedForPage={true}
            onMarkAudioPlayed={() => {}}
          />
          {/* Checkpoint Question Overlay Modal */}
          <CheckpointModal
            question={currentPage.question}
            pageNumber={currentPage.pageNumber}
            onCorrectComplete={handleCheckpointComplete}
          />
        </>
      )}

      {screen === 'result' && (
        <ResultScreen
          score={score}
          totalClues={STORY_PAGES.length}
          targetWords={targetWordsList}
          onReadAgain={handleReadAgain}
          onFinishHome={handleFinishHome}
          speechRate={speechRate}
        />
      )}

      {/* Target Word Glossary Popover Modal */}
      {activeGlossaryWord && (
        <GlossaryModal
          targetWord={activeGlossaryWord}
          onClose={() => setActiveGlossaryWord(null)}
          speechRate={speechRate}
        />
      )}
    </div>
  );
}
