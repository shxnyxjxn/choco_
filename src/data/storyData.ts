import { StoryPage } from '../types';

export const STORY_PAGES: StoryPage[] = [
  {
    pageNumber: 1,
    sentences: [
      "Detective Choco is in the garden.",
      "He sees a little clue."
    ],
    targetWord: {
      word: "clue",
      korean: "힌트 / 단서",
      example: "Look at this clue.",
      emoji: "🔍"
    },
    question: {
      id: 1,
      type: "What do you see?",
      question: "Where is Detective Choco?",
      correctAnswer: "In the garden",
      choices: ["In the garden", "At school", "In the bedroom"],
      hint: "Look at sentence 1: 'Detective Choco is in the garden.'"
    },
    themeColor: "emerald",
    bgGradient: "from-emerald-50 via-teal-50 to-amber-50"
  },
  {
    pageNumber: 2,
    sentences: [
      "Where is the golden bone?",
      "He sniffs the green grass."
    ],
    targetWord: {
      word: "sniffs",
      korean: "킁킁 냄새를 맡다",
      example: "The dog sniffs the flower.",
      emoji: "👃"
    },
    question: {
      id: 2,
      type: "What do you see?",
      question: "What does Choco sniff?",
      correctAnswer: "The green grass",
      choices: ["The green grass", "A warm soup", "A big red truck"],
      hint: "Look at sentence 2: 'He sniffs the green grass.'"
    },
    themeColor: "green",
    bgGradient: "from-green-50 via-lime-50 to-amber-50"
  },
  {
    pageNumber: 3,
    sentences: [
      "A little yellow bird sits in the tall tree."
    ],
    targetWord: {
      word: "tall",
      korean: "키가 큰 / 높은",
      example: "The giraffe is tall.",
      emoji: "🌲"
    },
    question: {
      id: 3,
      type: "Yes/No",
      question: "Is the tree tall?",
      correctAnswer: "Yes, it is tall!",
      choices: ["Yes, it is tall!", "No, it is short!"],
      hint: "Check the words in the tree: '...in the tall tree.'"
    },
    themeColor: "sky",
    bgGradient: "from-sky-50 via-amber-50 to-emerald-50"
  },
  {
    pageNumber: 4,
    sentences: [
      "Did you see my bone, bird?",
      "The bird chirps happily."
    ],
    targetWord: {
      word: "chirps",
      korean: "짹짹 울다",
      example: "The baby bird chirps.",
      emoji: "🐦"
    },
    question: {
      id: 4,
      type: "Fill-in-the-blank",
      question: "The bird chirps _______.",
      correctAnswer: "happily",
      choices: ["happily", "angrily", "sleepily"],
      hint: "Look at sentence 2: 'The bird chirps happily.'"
    },
    themeColor: "amber",
    bgGradient: "from-amber-50 via-yellow-50 to-orange-50"
  },
  {
    pageNumber: 5,
    sentences: [
      "Look under the wooden bench!",
      "There is another footprint."
    ],
    targetWord: {
      word: "footprint",
      korean: "발자국",
      example: "A big footprint is in the mud.",
      emoji: "🐾"
    },
    question: {
      id: 5,
      type: "What do you see?",
      question: "What is under the wooden bench?",
      correctAnswer: "Another footprint",
      choices: ["Another footprint", "A lost baseball", "A storybook"],
      hint: "Look at sentence 2: 'There is another footprint.'"
    },
    themeColor: "amber",
    bgGradient: "from-stone-50 via-amber-50 to-orange-50"
  },
  {
    pageNumber: 6,
    sentences: [
      "Choco walks slowly to the red garden shed."
    ],
    targetWord: {
      word: "shed",
      korean: "헛간 / 창고",
      example: "Tools are in the shed.",
      emoji: "🏚️"
    },
    question: {
      id: 6,
      type: "Fill-in-the-blank",
      question: "Choco walks to the _______ garden shed.",
      correctAnswer: "red",
      choices: ["red", "blue", "purple"],
      hint: "Check the color of the shed: '...to the red garden shed.'"
    },
    themeColor: "rose",
    bgGradient: "from-rose-50 via-orange-50 to-amber-50"
  },
  {
    pageNumber: 7,
    sentences: [
      "A cute gray rabbit hops out with a basket."
    ],
    targetWord: {
      word: "hops",
      korean: "깡충깡충 뛰다",
      example: "The rabbit hops fast.",
      emoji: "🐇"
    },
    question: {
      id: 7,
      type: "What do you see?",
      question: "Who hops out with a basket?",
      correctAnswer: "A cute gray rabbit",
      choices: ["A cute gray rabbit", "A big brown bear", "A tiny kitten"],
      hint: "Sentence 1 says: 'A cute gray rabbit hops out with a basket.'"
    },
    themeColor: "purple",
    bgGradient: "from-purple-50 via-pink-50 to-amber-50"
  },
  {
    pageNumber: 8,
    sentences: [
      "Is that my bone in the basket?",
      "The rabbit nods."
    ],
    targetWord: {
      word: "nods",
      korean: "고개를 끄덕이다",
      example: "She nods and smiles.",
      emoji: "🙆"
    },
    question: {
      id: 8,
      type: "Yes/No",
      question: "Does the rabbit nod?",
      correctAnswer: "Yes, the rabbit nods.",
      choices: ["Yes, the rabbit nods.", "No, the rabbit shakes its head."],
      hint: "Look at sentence 2: 'The rabbit nods.'"
    },
    themeColor: "teal",
    bgGradient: "from-teal-50 via-cyan-50 to-emerald-50"
  },
  {
    pageNumber: 9,
    sentences: [
      "We can share and play together!",
      "Choco wags his tail."
    ],
    targetWord: {
      word: "wags",
      korean: "꼬리를 흔들다",
      example: "The puppy wags its tail.",
      emoji: "🐕"
    },
    question: {
      id: 9,
      type: "Fill-in-the-blank",
      question: "Choco wags his _______.",
      correctAnswer: "tail",
      choices: ["tail", "ears", "paws"],
      hint: "Sentence 2 says: 'Choco wags his tail.'"
    },
    themeColor: "amber",
    bgGradient: "from-amber-50 via-orange-50 to-yellow-50"
  },
  {
    pageNumber: 10,
    sentences: [
      "They are best friends now.",
      "Mystery solved!"
    ],
    targetWord: {
      word: "solved",
      korean: "해결된 / 풀린",
      example: "The puzzle is solved!",
      emoji: "⭐"
    },
    question: {
      id: 10,
      type: "Yes/No",
      question: "Are Choco and the rabbit best friends now?",
      correctAnswer: "Yes, best friends!",
      choices: ["Yes, best friends!", "No, they are angry."],
      hint: "Sentence 1 says: 'They are best friends now.'"
    },
    themeColor: "yellow",
    bgGradient: "from-amber-100 via-yellow-50 to-orange-100"
  }
];

export const SENTENCE_BUILDER_CHIPS = ["smart", "brave", "cute", "kind"];
