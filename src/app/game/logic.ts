import {
  MAX_LEVEL,
  MIN_LEVEL,
  PUZZLE_WIDTH,
  SENTENCES_PER_ROUND,
} from '../constants';
import { GameProgress, WordLayout } from '../types/models';

export function parseStoredInt(value: string | null, fallback: number): number {
  if (value === null || value === '') {
    return fallback;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function layoutWords(
  sentence: string,
  puzzleWidth = PUZZLE_WIDTH,
): WordLayout[] {
  const words = sentence.split(' ');
  const letters = sentence.replace(/\s+/g, '').length || 1;
  let left = 0;
  return words.map((word) => {
    const width = (puzzleWidth / letters) * word.length;
    const layout = { word, width, left };
    left += width;
    return layout;
  });
}

export function isCorrectSentence(
  actual: string[],
  expected: string[],
): boolean {
  if (actual.length !== expected.length) {
    return false;
  }
  return actual.every((word, index) => word === expected[index]);
}

export function classifyWords(
  actual: string[],
  expected: string[],
): Array<'true-word' | 'false-word'> {
  return actual.map((word, index) =>
    word === expected[index] ? 'true-word' : 'false-word',
  );
}

export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function nextProgress(
  progress: GameProgress,
  roundsInLevel: number,
  maxLevel = MAX_LEVEL,
): GameProgress {
  if (progress.sentence < SENTENCES_PER_ROUND - 1) {
    return { ...progress, sentence: progress.sentence + 1 };
  }
  if (progress.round + 1 < roundsInLevel) {
    return { level: progress.level, round: progress.round + 1, sentence: 0 };
  }
  if (progress.level < maxLevel) {
    return { level: progress.level + 1, round: 0, sentence: 0 };
  }
  return { level: MIN_LEVEL, round: 0, sentence: 0 };
}

export function isLastSentenceInRound(sentence: number): boolean {
  return sentence === SENTENCES_PER_ROUND - 1;
}
