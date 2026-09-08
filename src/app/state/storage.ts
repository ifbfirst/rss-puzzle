import { parseStoredInt } from '../game/logic';
import { HintFlags, Player } from '../types/models';

const KEYS = {
  name: 'name',
  surname: 'surname',
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
  loadPlayer(): Player | null {
    const name = localStorage.getItem(KEYS.name);
    const surname = localStorage.getItem(KEYS.surname);
    if (!name) {
      return null;
    }
    return { name, surname: surname ?? '' };
  },

  savePlayer(player: Player): void {
    localStorage.setItem(KEYS.name, player.name);
    localStorage.setItem(KEYS.surname, player.surname);
  },

  clearPlayer(): void {
    localStorage.removeItem(KEYS.name);
    localStorage.removeItem(KEYS.surname);
  },

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

  clearProgress(): void {
    localStorage.removeItem(KEYS.level);
    localStorage.removeItem(KEYS.round);
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

  clearHints(): void {
    localStorage.removeItem(KEYS.audio);
    localStorage.removeItem(KEYS.image);
    localStorage.removeItem(KEYS.translate);
  },
};
