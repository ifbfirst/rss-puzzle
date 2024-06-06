import { checkLevel } from '../utils/checkLevel';
import { newLevel, newRound } from '../utils/newSelection';

export class Select {
  private tagResult: HTMLElement;
  public level: number;
  public round: number;

  getResultTag(): HTMLElement {
    return this.tagResult;
  }

  constructor(level: number, round: number) {
    this.tagResult = document.createElement('div');
    this.tagResult.className = 'select-wrapper';
    this.level = level;
    this.round = round;
    this.createSelectLevel();
    this.createSelectRound(level);
  }

  private createSelectLevel() {
    const selectLevel = <HTMLSelectElement>document.createElement('select');
    selectLevel.className = 'levels';

    this.tagResult.appendChild(selectLevel);
    for (let i = 1; i < 7; i = i + 1) {
      const level = document.createElement('option');
      level.value = `${i}`;
      level.textContent = `Level ${i}`;
      selectLevel.appendChild(level);
    }
    if (localStorage.getItem('level') !== null) {
      selectLevel.value = `${Number(localStorage.getItem('level'))}`;
    } else {
      selectLevel.value = `1`;
    }
    selectLevel.addEventListener('change', () => {
      this.createSelectRound(Number(selectLevel.value));
      newLevel(Number(selectLevel.value));
    });
  }

  public createSelectRound(level: number) {
    document.querySelector('.round')?.remove();
    const selectRound = document.createElement('select');
    selectRound.className = 'round';
    const sources = checkLevel(level);
    this.tagResult.appendChild(selectRound);
    if (sources) {
      for (let i = 1; i < sources.rounds.length + 1; i = i + 1) {
        const round = document.createElement('option');
        round.value = `${i}`;
        round.textContent = `Round ${i}`;
        selectRound.appendChild(round);
      }
      if (localStorage.getItem('round') !== null) {
        selectRound.value = `${Number(localStorage.getItem('round')) + 1}`;
      } else {
        selectRound.value = `1`;
      }
    }
    selectRound.addEventListener('change', () => {
      newRound(Number(selectRound.value));
    });
  }
}
