import { addDragDrop } from '../utils/dragDrop';
import { checkLevel } from '../utils/checkLevel';

export class ResultSentence {
  private tagResult: HTMLElement;
  public levelNumber: number;
  public roundNumber: number;
  public sentenceNumber: number;
  public sentence: string;

  getResultTag(): HTMLElement {
    return this.tagResult;
  }

  constructor(
    levelNumber: number,
    roundNumber: number,
    sentenceNumber: number,
  ) {
    this.tagResult = document.createElement('div');
    this.tagResult.className = 'result-sentence';
    this.levelNumber = levelNumber;
    this.roundNumber = roundNumber;
    this.sentenceNumber = sentenceNumber;
    const sources = checkLevel(this.levelNumber);
    this.sentence =
      sources.rounds[this.roundNumber].words[this.sentenceNumber].textExample;

    addDragDrop(
      this.tagResult,
      this.levelNumber,
      this.roundNumber,
      this.sentenceNumber,
      this.sentence,
    );
  }
}
