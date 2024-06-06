import { Hint } from './hint';

export class Hints {
  private tagResult: HTMLElement;
  roundNumber: number;
  sentenceNumber: number;

  getResultTag(): HTMLElement {
    return this.tagResult;
  }

  constructor(roundNumber: number, sentenceNumber: number) {
    this.roundNumber = roundNumber;
    this.sentenceNumber = sentenceNumber;
    this.tagResult = document.createElement('div');
    this.tagResult.className = 'hints';
    const audioHint = new Hint(
      'audio-hint hint-disabled',
      this.roundNumber,
      this.sentenceNumber,
    );
    this.tagResult.appendChild(audioHint.getResultTag());
    audioHint.getResultTag().innerHTML = '<i class="fa-solid fa-music"></i>';

    const imgHint = new Hint(
      'img-hint hint-disabled',
      this.roundNumber,
      this.sentenceNumber,
    );
    this.tagResult.appendChild(imgHint.getResultTag());
    imgHint.getResultTag().innerHTML = '<i class="fa-solid fa-image"></i>';

    const translateHint = new Hint(
      'translate-hint hint-disabled',
      this.roundNumber,
      this.sentenceNumber,
    );
    this.tagResult.appendChild(translateHint.getResultTag());
    translateHint.getResultTag().innerHTML =
      '<i class="fa-solid fa-globe"></i>';
  }
}
