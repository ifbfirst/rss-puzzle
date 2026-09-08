import { describe, expect, it } from 'vitest';
import {
  classifyWords,
  isCorrectSentence,
  isLastSentenceInRound,
  layoutWords,
  nextProgress,
  parseStoredInt,
  shuffle,
} from './logic';

describe('parseStoredInt', () => {
  it('returns fallback for null and empty values', () => {
    expect(parseStoredInt(null, 3)).toBe(3);
    expect(parseStoredInt('', 3)).toBe(3);
  });

  it('parses numeric strings and rejects NaN', () => {
    expect(parseStoredInt('12', 0)).toBe(12);
    expect(parseStoredInt('abc', 4)).toBe(4);
  });
});

describe('layoutWords', () => {
  it('splits a sentence into proportional puzzle widths', () => {
    const layout = layoutWords('I am', 100);
    expect(layout).toEqual([
      { word: 'I', width: 100 / 3, left: 0 },
      { word: 'am', width: 200 / 3, left: 100 / 3 },
    ]);
  });

  it('does not divide by zero on an empty sentence', () => {
    const layout = layoutWords('', 100);
    expect(layout).toHaveLength(1);
    expect(Number.isFinite(layout[0].width)).toBe(true);
  });
});

describe('isCorrectSentence', () => {
  it('requires the same words in the same order', () => {
    expect(isCorrectSentence(['I', 'am'], ['I', 'am'])).toBe(true);
    expect(isCorrectSentence(['am', 'I'], ['I', 'am'])).toBe(false);
    expect(isCorrectSentence(['I'], ['I', 'am'])).toBe(false);
  });
});

describe('classifyWords', () => {
  it('marks each position as true or false', () => {
    expect(classifyWords(['I', 'go'], ['I', 'am'])).toEqual([
      'true-word',
      'false-word',
    ]);
  });
});

describe('shuffle', () => {
  it('returns a new array with the same items', () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffle(input);
    expect(result).not.toBe(input);
    expect([...result].sort()).toEqual(input);
  });
});

describe('nextProgress', () => {
  it('advances to the next sentence in the round', () => {
    expect(nextProgress({ level: 1, round: 0, sentence: 2 }, 10)).toEqual({
      level: 1,
      round: 0,
      sentence: 3,
    });
  });

  it('advances to the next round after the last sentence', () => {
    expect(nextProgress({ level: 1, round: 0, sentence: 9 }, 3)).toEqual({
      level: 1,
      round: 1,
      sentence: 0,
    });
  });

  it('advances to the next level after the last round', () => {
    expect(nextProgress({ level: 2, round: 4, sentence: 9 }, 5)).toEqual({
      level: 3,
      round: 0,
      sentence: 0,
    });
  });

  it('wraps from level 6 back to level 1', () => {
    expect(nextProgress({ level: 6, round: 0, sentence: 9 }, 1)).toEqual({
      level: 1,
      round: 0,
      sentence: 0,
    });
  });
});

describe('isLastSentenceInRound', () => {
  it('is true only for sentence 9', () => {
    expect(isLastSentenceInRound(9)).toBe(true);
    expect(isLastSentenceInRound(8)).toBe(false);
  });
});
