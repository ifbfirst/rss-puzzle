import { parseStoredInt } from '../game/logic';
import { HintFlags } from '../types/models';

const KEYS = {
  level: 'level',
  round: 'round',
  audio: 'audio-hint',
  image: 'img-hint',
  translate: 'translate-hint',
} as const;

function hintFromStorage(value: string | null, fallback = true): boolean {
  if (value === 'off') {
    return false;
  }
  if (value === 'on') {
    return true;
  }
  return fallback;
}

export const storage = {
  loadProgress(): { level: number; round: number } {
    return {
      level: parseStoredInt(localStorage.getItem(KEYS.level), 1),
      round: parseStoredInt(localStorage.getItem(KEYS.round), 0),
    };
  },

  saveProgress(level: number, round: number): void {
    localStorage.setItem(KEYS.level, String(level));
    localStorage.setItem(KEYS.round, String(round));
  },

  loadHints(): HintFlags {
    return {
      audio: hintFromStorage(localStorage.getItem(KEYS.audio)),
      image: hintFromStorage(localStorage.getItem(KEYS.image)),
      translate: hintFromStorage(localStorage.getItem(KEYS.translate)),
    };
  },

  saveHints(hints: HintFlags): void {
    localStorage.setItem(KEYS.audio, hints.audio ? 'on' : 'off');
    localStorage.setItem(KEYS.image, hints.image ? 'on' : 'off');
    localStorage.setItem(KEYS.translate, hints.translate ? 'on' : 'off');
  },
};
