import { Hint } from './hint';

export class Hints {
  private tagResult: HTMLElement;

  constructor() {
    this.tagResult = document.createElement('div');
    this.tagResult.className = 'hints';
    const audioHint = new Hint('audio-hint', 'fa-solid fa-music', 'audio clue');
    const imgHint = new Hint(
      'img-hint',
      'fa-solid fa-image',
      'background clue',
    );
    const translateHint = new Hint(
      'translate-hint',
      'fa-solid fa-globe',
      'translate clue',
    );
    this.tagResult.append(
      audioHint.getResultTag(),
      imgHint.getResultTag(),
      translateHint.getResultTag(),
    );
  }

  getResultTag(): HTMLElement {
    return this.tagResult;
  }
}
