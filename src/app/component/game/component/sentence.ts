import { getWordExample } from '../../../data/collections';
import { shuffle } from '../../../game/logic';
import { addDragDrop } from '../utils/dragDrop';
import { createWords } from './word';

export class Sentence {
  private tagResult: HTMLElement;

  constructor(
    level: number,
    round: number,
    sentenceNumber: number,
    options: { shuffle?: boolean } = {},
  ) {
    this.tagResult = document.createElement('div');
    this.tagResult.className = 'sentence';
    const text = getWordExample(level, round, sentenceNumber).textExample;
    const words = createWords(text, level, round, sentenceNumber);
    const ordered = options.shuffle === false ? words : shuffle(words);
    ordered.forEach((word) => this.tagResult.appendChild(word.getResultTag()));
    addDragDrop(this.tagResult);
  }

  getResultTag(): HTMLElement {
    return this.tagResult;
  }
}
