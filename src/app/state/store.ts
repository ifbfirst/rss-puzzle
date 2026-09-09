import { SENTENCES_PER_ROUND } from '../constants';
import { GameProgress, GameState, HintName } from '../types/models';
import { storage } from './storage';

function emptyOutcomes() {
  return Array.from({ length: SENTENCES_PER_ROUND }, () => 'pending' as const);
}

function createInitialState(): GameState {
  const savedProgress = storage.loadProgress();
  return {
    progress: {
      level: savedProgress.level,
      round: savedProgress.round,
      sentence: 0,
    },
    hints: storage.loadHints(),
    outcomes: emptyOutcomes(),
  };
}

type Listener = (state: GameState) => void;

class GameStore {
  private state: GameState = createInitialState();
  private listeners = new Set<Listener>();

  getState(): GameState {
    return this.state;
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private emit(): void {
    this.listeners.forEach((listener) => listener(this.state));
  }

  private patch(partial: Partial<GameState>): void {
    this.state = { ...this.state, ...partial };
    this.emit();
  }

  setProgress(progress: GameProgress, persist = true): void {
    this.patch({ progress });
    if (persist) {
      storage.saveProgress(progress.level, progress.round);
    }
  }

  resetRoundOutcomes(): void {
    this.patch({ outcomes: emptyOutcomes() });
  }

  setOutcome(index: number, outcome: 'guessed' | 'showed'): void {
    const outcomes = [...this.state.outcomes];
    outcomes[index] = outcome;
    this.patch({ outcomes });
  }

  toggleHint(name: HintName): boolean {
    const hints = { ...this.state.hints, [name]: !this.state.hints[name] };
    storage.saveHints(hints);
    this.patch({ hints });
    return hints[name];
  }
}

export const gameStore = new GameStore();
