import { addDragDrop } from '../utils/dragDrop';
import { AudioIcon } from './hints/audio';
import { ResultSentence } from './resultSentence';
import { Translate } from './hints/translate';
import { Word } from './word';
import { checkLevel } from '../utils/checkLevel';
import { pathToData } from '../../../data/path';

export class Sentence {
  private tagResult: HTMLElement;
  public levelNumber: number;
  public roundNumber: number;
  public sentenceNumber: number;
  public roundImage: string;
  public translate: string;
  public audioSrc: string;

  getResultTag(): HTMLElement {
    return this.tagResult;
  }

  constructor(
    levelNumber: number,
    roundNumber: number,
    sentenceNumber: number,
  ) {
    this.tagResult = document.createElement('div');
    this.tagResult.className = 'sentence';
    this.levelNumber = levelNumber;
    this.roundNumber = roundNumber;
    this.sentenceNumber = sentenceNumber;
    const sources = checkLevel(this.levelNumber);
    this.roundImage = `${pathToData}images/${sources.rounds[this.roundNumber].levelData.imageSrc}`;
    this.audioSrc = `${pathToData}${sources.rounds[roundNumber].words[sentenceNumber].audioExample}`;
    this.translate = `${sources.rounds[roundNumber].words[sentenceNumber].textExampleTranslate}`;
    this.updateSentence(
      sources.rounds[this.roundNumber].words[this.sentenceNumber].textExample,
    );
  }

  public updateSentence(sentence: string): void {
    const wordArray = sentence.split(' ');
    const audioTag = document.querySelector('.audio');
    const settingsWrapper = document.querySelector('.settings-wrapper');

    //new translate
    const translateTag = document.querySelector('.translate');
    const translate = new Translate(this.translate);
    if (translateTag) translateTag.remove();
    settingsWrapper?.after(translate.getResultTag());
    //nea audio
    const audio = new AudioIcon(this.audioSrc);
    if (audioTag) audioTag.remove();
    settingsWrapper?.after(audio.getResultTag());

    //new words
    let wordWidthSum = 0;
    for (let i = 0; i < wordArray.length; i = i + 1) {
      const countLetters: number =
        (606 / sentence.replace(/\s+/g, '').length) * wordArray[i].length;
      wordWidthSum = wordWidthSum + countLetters;
      const newWord = new Word(
        `${wordArray[i]}`,
        sentence,
        this.levelNumber,
        this.roundNumber,
        this.sentenceNumber,
        wordWidthSum,
        this.roundImage,
      );
      this.tagResult.appendChild(newWord.getResultTag());
    }

    [...this.tagResult.children]
      .sort(() => Math.random() - 0.5)
      .forEach((word) => this.tagResult.append(word));
    //new resultSentense
    const resultSentence = new ResultSentence(
      this.levelNumber,
      this.roundNumber,
      this.sentenceNumber,
    );
    document
      .querySelector('.result-screen')
      ?.appendChild(resultSentence.getResultTag());
    //add drag-drop
    addDragDrop(
      this.tagResult,
      this.levelNumber,
      this.roundNumber,
      this.sentenceNumber,
      sentence,
    );
  }
}
