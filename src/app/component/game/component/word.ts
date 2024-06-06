import { checkResult } from '../utils/checkResult';
import { showResult } from '../utils/showResult';

export class Word {
  private tagResult: HTMLElement;
  public sentence: string;
  public roundNumber: number;
  public sentenceNumber: number;
  public roundImage: string;
  public width: number;
  public wordWidthSum: number;
  getResultTag(): HTMLElement {
    return this.tagResult;
  }

  constructor(
    word: string,
    sentence: string,
    levelNumber: number,
    roundNumber: number,
    sentenceNumber: number,
    wordWidthSum: number,
    roundImage: string,
  ) {
    this.tagResult = document.createElement('div');
    this.tagResult.textContent = word;
    this.sentence = sentence;
    this.roundNumber = roundNumber;
    this.sentenceNumber = sentenceNumber;
    this.width = (606 / sentence.replace(/\s+/g, '').length) * word.length;
    this.tagResult.style.width = `${this.width}px`;
    this.roundImage = roundImage;
    this.tagResult.style.background = `url(${this.roundImage}) no-repeat`;

    if (
      localStorage.getItem('img-hint') === 'on' ||
      (localStorage.getItem('img-hint') === 'off' &&
        !document
          .querySelector('.img-hint')
          ?.classList.contains('hint-disabled')) ||
      localStorage.getItem('img-hint') === null
    ) {
      this.tagResult.style.color = '#fff';
      this.tagResult.style.textShadow = '0px 0px 3px rgb(9, 9, 9)';
      this.tagResult.style.backgroundSize = '606px 400px';
    }
    if (localStorage.getItem('img-hint') === 'off') {
      this.tagResult.style.color = 'black';
      this.tagResult.style.textShadow = 'none';
      this.tagResult.style.backgroundSize = '0px 0px';
    }
    this.wordWidthSum = wordWidthSum;
    this.tagResult.draggable = true;
    this.tagResult.style.backgroundPosition = `${-this.wordWidthSum + this.width}px -${sentenceNumber * 40}px`;
    this.onClickWord(
      levelNumber,
      roundNumber,
      sentenceNumber,
      sentence,
      roundImage,
    );
  }

  private onClickWord(
    levelNumber: number,
    roundNumber: number,
    sentenceNumber: number,
    sentence: string,
    roundImage: string,
  ): void {
    this.tagResult.onclick = function (e: Event) {
      const wordTag = <HTMLElement>e.target;
      const resultSentence = <HTMLElement>(
        document.querySelectorAll('.result-sentence')[sentenceNumber]
      );
      document.querySelector('.btn-complete')?.classList.remove('btn-disabled');
      if (wordTag.classList.contains('clicked')) {
        const newWordTag = document
          .querySelector('.sentence')
          ?.appendChild(wordTag);
        newWordTag?.classList.remove('clicked');
      } else {
        const newWordTag = resultSentence.appendChild(wordTag);
        newWordTag.classList.add('clicked');
      }
      document.querySelector('.btn-check')?.classList.add('btn-disabled');

      showResult(
        levelNumber,
        roundNumber,
        sentenceNumber,
        resultSentence,
        sentence,
        roundImage,
      );
      checkResult(
        levelNumber,
        roundNumber,
        sentenceNumber,
        resultSentence,
        sentence,
      );
    };
  }
}
