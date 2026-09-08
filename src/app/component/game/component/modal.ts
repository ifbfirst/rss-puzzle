export class Modal {
  private tagResult: HTMLElement;

  constructor() {
    this.tagResult = document.createElement('div');
    this.tagResult.className = 'modal-bg';
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-label', 'Statistics');
    this.tagResult.appendChild(modal);
  }

  getResultTag(): HTMLElement {
    return this.tagResult;
  }
}
