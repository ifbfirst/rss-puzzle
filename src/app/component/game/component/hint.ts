export class Hint {
  private tagResult: HTMLElement;
  roundNumber: number;
  sentenceNumber: number;

  getResultTag(): HTMLElement {
    return this.tagResult;
  }

  constructor(className: string, roundNumber: number, sentenceNumber: number) {
    this.roundNumber = roundNumber;
    this.sentenceNumber = sentenceNumber;
    this.tagResult = document.createElement('div');
    this.tagResult.className = className;
    if (className === 'translate-hint hint-disabled') {
      this.tagResult.onclick = this.useTranslateHint.bind(this);
    }

    if (className === 'img-hint hint-disabled') {
      this.tagResult.onclick = this.useImageHint.bind(this);
    }
    if (className === 'audio-hint hint-disabled') {
      this.tagResult.onclick = this.useAudioHint.bind(this);
    }
  }

  useTranslateHint() {
    const text = <HTMLElement>document.querySelector('.translate-text');
    this.tagResult.classList.toggle('hint-disabled');
    if (!this.tagResult.classList.contains('hint-disabled')) {
      text.style.opacity = '1';
    } else {
      text.style.opacity = '0';
    }
  }

  useImageHint() {
    const wordsFromSentence = document.querySelector('.sentence')?.childNodes;
    const wordsFromResultSentence =
      document.querySelector('.result-sentence')?.childNodes;
    this.tagResult.classList.toggle('hint-disabled');
    if (this.tagResult.classList.contains('hint-disabled')) {
      [].forEach.call(wordsFromSentence, function (element: HTMLElement) {
        element.style.backgroundSize = '0px 0px';
        element.style.color = '#3f3f3f';
      });
      if (wordsFromResultSentence) {
        [].forEach.call(
          wordsFromResultSentence,
          function (element: HTMLElement) {
            element.style.backgroundSize = '606px 400px';
            element.style.color = '#fff';
          },
        );
      }
    } else {
      [].forEach.call(wordsFromSentence, function (element: HTMLElement) {
        element.style.backgroundSize = '606px 400px';
        element.style.color = '#fff';
      });
      if (wordsFromResultSentence) {
        [].forEach.call(
          wordsFromResultSentence,
          function (element: HTMLElement) {
            element.style.backgroundSize = '606px 400px';
            element.style.color = '#fff';
          },
        );
      }
    }
  }
  useAudioHint() {
    this.tagResult.classList.toggle('hint-disabled');

    const audio = <HTMLElement>document.querySelector('.audio');
    if (!this.tagResult.classList.contains('hint-disabled')) {
      if (audio) audio.style.opacity = '1';
      audio.style.pointerEvents = 'auto';
    } else {
      if (audio) audio.style.opacity = '0';
      audio.style.pointerEvents = 'none';
    }
  }
}
