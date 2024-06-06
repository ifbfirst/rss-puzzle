export class Button {
  private tagResult: HTMLElement;
  getResultTag(): HTMLElement {
    return this.tagResult;
  }

  constructor(text: string, className: string) {
    this.tagResult = document.createElement('button');
    this.tagResult.textContent = text;
    this.tagResult.className = className;
  }
}
