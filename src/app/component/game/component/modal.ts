export class Modal {
  private tagResult: HTMLElement;

  getResultTag(): HTMLElement {
    return this.tagResult;
  }

  constructor() {
    this.tagResult = document.createElement('div');
    this.tagResult.className = 'modal-bg';
    const modal = document.createElement('div');
    modal.className = 'modal';
    this.tagResult.appendChild(modal);
  }
}
