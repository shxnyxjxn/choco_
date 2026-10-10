export interface TargetWord {
  word: string;
  korean: string;
  example: string;
  emoji: string;
}

export interface CheckpointQuestion {
  id: number;
  type: 'Yes/No' | 'Fill-in-the-blank' | 'What do you see?';
  question: string;
  correctAnswer: string;
  choices: string[];
  hint: string;
}

export interface StoryPage {
  pageNumber: number;
  sentences: string[];
  targetWord: TargetWord;
  question: CheckpointQuestion;
  themeColor: string;
  bgGradient: string;
}

export type ScreenState = 'cover' | 'story' | 'checkpoint' | 'result';
