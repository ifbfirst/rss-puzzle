export class Button {
  private tagResult: HTMLButtonElement;

  constructor(text: string, className: string) {
    this.tagResult = document.createElement('button');
    this.tagResult.type = 'button';
    this.tagResult.textContent = text;
    this.tagResult.className = `btn ${className}`;
  }

  getResultTag(): HTMLButtonElement {
    return this.tagResult;
  }
}
