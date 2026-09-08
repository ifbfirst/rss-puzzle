import { addDragDrop } from '../utils/dragDrop';

export class ResultSentence {
  private tagResult: HTMLElement;

  constructor() {
    this.tagResult = document.createElement('div');
    this.tagResult.className = 'result-sentence';
    addDragDrop(this.tagResult);
  }

  getResultTag(): HTMLElement {
    return this.tagResult;
  }
}
