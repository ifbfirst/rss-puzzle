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
    if (localStorage.getItem(`${className}`) === 'off') {
      this.tagResult.classList.add('hint-disabled');
    }
    if (className === 'translate-hint') {
      this.tagResult.onclick = this.useTranslateHint.bind(this);
    }
    if (className === 'img-hint') {
      this.tagResult.onclick = this.useImageHint.bind(this);
    }
    if (className === 'audio-hint') {
      this.tagResult.onclick = this.useAudioHint.bind(this);
    }
  }

  useTranslateHint(): void {
    const text = <HTMLElement>document.querySelector('.translate');
    this.tagResult.classList.toggle('hint-disabled');
    if (!this.tagResult.classList.contains('hint-disabled')) {
      text.style.opacity = '1';
      localStorage.setItem('translate-hint', 'on');
    } else {
      text.style.opacity = '0';
      localStorage.setItem('translate-hint', 'off');
    }
  }

  useImageHint(): void {
    this.tagResult.classList.toggle('hint-disabled');
    const sentence = document.querySelector('.sentence');
    const wordsFromSentence = sentence?.querySelectorAll('div');
    if (!this.tagResult.classList.contains('hint-disabled')) {
      wordsFromSentence?.forEach((element) => {
        element.style.backgroundSize = '606px 400px';
        element.style.color = '#fff';
        element.style.textShadow = '0px 0px 3px rgb(9, 9, 9)';
      });
      localStorage.setItem('img-hint', 'on');
    } else {
      wordsFromSentence?.forEach((element) => {
        element.style.backgroundSize = '0px 0px';
        element.style.color = '#3f3f3f';
        element.style.textShadow = 'none';
      });
      localStorage.setItem('img-hint', 'off');
    }
  }
  useAudioHint(): void {
    this.tagResult.classList.toggle('hint-disabled');
    const audio = <HTMLElement>document.querySelector('.audio');
    if (!this.tagResult.classList.contains('hint-disabled')) {
      if (audio) audio.style.opacity = '1';
      audio.style.pointerEvents = 'auto';
      localStorage.setItem('audio-hint', 'on');
    } else {
      if (audio) audio.style.opacity = '0';
      audio.style.pointerEvents = 'none';
      localStorage.setItem('audio-hint', 'off');
    }
  }
}
