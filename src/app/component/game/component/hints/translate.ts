import { gameStore } from '../../../../state/store';

export class Translate {
  private tagResult: HTMLElement;

  constructor(translate: string) {
    this.tagResult = document.createElement('div');
    this.tagResult.className = 'translate';
    this.tagResult.textContent = translate;
    if (!gameStore.getState().hints.translate) {
      this.tagResult.style.opacity = '0';
    }
  }

  getResultTag(): HTMLElement {
    return this.tagResult;
  }
}
