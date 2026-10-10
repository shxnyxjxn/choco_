import React, { useState, useEffect } from 'react';
import { CheckpointQuestion } from '../types';
import { sfx } from '../utils/audio';
import { CheckCircle2, AlertCircle, Sparkles, ArrowRight, Lightbulb } from 'lucide-react';

interface CheckpointModalProps {
  question: CheckpointQuestion;
  pageNumber: number;
  onCorrectComplete: (firstTryCorrect: boolean) => void;
}

export const CheckpointModal: React.FC<CheckpointModalProps> = ({
  question,
  pageNumber,
  onCorrectComplete
}) => {
  const [shuffledChoices, setShuffledChoices] = useState<string[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [attempts, setAttempts] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Shuffle answer choices on mount so correct choice is never fixed
  useEffect(() => {
    const choicesCopy = [...question.choices];
    for (let i = choicesCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [choicesCopy[i], choicesCopy[j]] = [choicesCopy[j], choicesCopy[i]];
    }
    setShuffledChoices(choicesCopy);
    setSelectedChoice(null);
    setStatus('idle');
    setAttempts(0);
    setShowHint(false);
  }, [question]);

  const handleSelect = (choice: string) => {
    if (status === 'correct') return; // already solved

    setSelectedChoice(choice);
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (choice === question.correctAnswer) {
      sfx.playSuccessChime();
      setStatus('correct');
    } else {
      sfx.playGentleNudge();
      setStatus('incorrect');
      setShowHint(true);
    }
  };

  const handleAdvance = () => {
    sfx.playTap();
    onCorrectComplete(attempts === 1);
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Yes/No':
        return { label: 'Yes or No?', bg: 'bg-blue-100 text-blue-800 border-blue-200' };
      case 'Fill-in-the-blank':
        return { label: 'Fill in the blank ✏️', bg: 'bg-purple-100 text-purple-800 border-purple-200' };
      default:
        return { label: 'What do you see? 👀', bg: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
    }
  };

  const badgeInfo = getTypeBadge(question.type);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border-4 transition-all duration-300 ${
          status === 'correct'
            ? 'border-emerald-400 bg-emerald-50/30'
            : status === 'incorrect'
            ? 'border-amber-300 bg-amber-50/20'
            : 'border-amber-200'
        }`}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔍</span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Detective Checkpoint • Clue #{pageNumber}
            </span>
          </div>
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-full border ${badgeInfo.bg}`}
          >
            {badgeInfo.label}
          </span>
        </div>

        {/* Question Prompt */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold font-display text-slate-900 leading-snug">
            {question.question}
          </h2>
        </div>

        {/* Answer Choices */}
        <div className="space-y-3 mb-6">
          {shuffledChoices.map((choice, idx) => {
            const isSelected = selectedChoice === choice;
            const isCorrectChoice = choice === question.correctAnswer;

            let buttonStyle =
              'bg-slate-50 border-2 border-slate-200 hover:border-amber-300 hover:bg-amber-50/50 text-slate-800';

            if (status === 'correct' && isCorrectChoice) {
              buttonStyle =
                'bg-emerald-500 border-2 border-emerald-600 text-white shadow-md scale-[1.02] ring-4 ring-emerald-100';
            } else if (status === 'incorrect' && isSelected) {
              buttonStyle =
                'bg-rose-50 border-2 border-rose-300 text-rose-800';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(choice)}
                disabled={status === 'correct'}
                className={`w-full text-left px-5 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 flex items-center justify-between shadow-xs active:scale-98 ${buttonStyle}`}
              >
                <span>{choice}</span>
                {status === 'correct' && isCorrectChoice && (
                  <CheckCircle2 className="w-6 h-6 text-white shrink-0" />
                )}
                {status === 'incorrect' && isSelected && (
                  <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback Section */}
        {status === 'correct' && (
          <div className="p-4 bg-emerald-100/80 border-2 border-emerald-300 rounded-2xl text-emerald-950 mb-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-emerald-600 animate-spin" />
              <span className="font-bold font-display text-lg">
                Nice job! 🌟 Great detective work!
              </span>
            </div>
            <p className="text-sm text-emerald-800">
              {attempts === 1
                ? 'Solved on the first try! +1 Detective Star ⭐'
                : 'Good detective thinking! You got it right!'}
            </p>
          </div>
        )}

        {status === 'incorrect' && (
          <div className="p-4 bg-amber-100/80 border border-amber-300 rounded-2xl text-amber-950 mb-5 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 mb-1.5 text-amber-900 font-bold">
              <Lightbulb className="w-5 h-5 text-amber-600" />
              <span>Try again with this friendly hint!</span>
            </div>
            <p className="text-sm font-medium text-amber-800">
              💡 {question.hint}
            </p>
          </div>
        )}

        {/* Continue Button when Correct */}
        {status === 'correct' ? (
          <button
            onClick={handleAdvance}
            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-lg font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98 animate-pulse"
          >
            <span>{pageNumber < 10 ? 'Next Clue Page' : 'See Mystery Result!'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <div className="text-center text-xs text-slate-400 font-medium py-1">
            {showHint ? 'Tap another answer to try again!' : 'Tap the best answer to solve the clue'}
          </div>
        )}
      </div>
    </div>
  );
};
