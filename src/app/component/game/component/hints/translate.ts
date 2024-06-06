export class Translate {
  private tagResult: HTMLElement;
  getResultTag(): HTMLElement {
    return this.tagResult;
  }

  constructor(translate: string) {
    this.tagResult = document.createElement('div');
    this.tagResult.className = 'translate';
    this.tagResult.textContent = translate;
    if (localStorage.getItem('translate-hint') === 'off') {
      this.tagResult.style.opacity = '0';
    }
  }
}
