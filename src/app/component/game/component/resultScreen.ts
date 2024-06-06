export class ResultScreen {
  private tagResult: HTMLElement;

  getResultTag(): HTMLElement {
    return this.tagResult;
  }

  constructor() {
    this.tagResult = document.createElement('div');
    this.tagResult.className = 'result-screen';
  }
}
