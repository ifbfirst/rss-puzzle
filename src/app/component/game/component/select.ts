import { getCollection } from '../../../data/collections';

export class Select {
  private tagResult: HTMLElement;
  private onLevel: (level: number) => void;
  private onRound: (round: number) => void;

  constructor(
    level: number,
    round: number,
    handlers: {
      onLevel: (level: number) => void;
      onRound: (round: number) => void;
    },
  ) {
    this.tagResult = document.createElement('div');
    this.tagResult.className = 'select-wrapper';
    this.onLevel = handlers.onLevel;
    this.onRound = handlers.onRound;
    this.createSelectLevel(level);
    this.createSelectRound(level, round);
  }

  getResultTag(): HTMLElement {
    return this.tagResult;
  }

  private createSelectLevel(currentLevel: number): void {
    const selectLevel = document.createElement('select');
    selectLevel.className = 'levels';
    selectLevel.setAttribute('aria-label', 'Level');
    this.tagResult.appendChild(selectLevel);
    for (let i = 1; i < 7; i += 1) {
      const option = document.createElement('option');
      option.value = `${i}`;
      option.textContent = `Level ${i}`;
      selectLevel.appendChild(option);
    }
    selectLevel.value = `${currentLevel}`;
    selectLevel.addEventListener('change', () => {
      const level = Number(selectLevel.value);
      this.createSelectRound(level, 1);
      this.onLevel(level);
    });
  }

  public createSelectRound(level: number, round: number): void {
    this.tagResult.querySelector('.round')?.remove();
    const selectRound = document.createElement('select');
    selectRound.className = 'round';
    selectRound.setAttribute('aria-label', 'Round');
    this.tagResult.appendChild(selectRound);
    const sources = getCollection(level);
    for (let i = 1; i < sources.rounds.length + 1; i += 1) {
      const option = document.createElement('option');
      option.value = `${i}`;
      option.textContent = `Round ${i}`;
      selectRound.appendChild(option);
    }
    selectRound.value = `${round}`;
    selectRound.addEventListener('change', () => {
      this.onRound(Number(selectRound.value) - 1);
    });
  }
}
