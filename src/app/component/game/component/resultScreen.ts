export class ResultScreen {
  private tagResult: HTMLElement;

  constructor() {
    this.tagResult = document.createElement('div');
    this.tagResult.className = 'result-screen';
  }

  getResultTag(): HTMLElement {
    return this.tagResult;
  }
}
