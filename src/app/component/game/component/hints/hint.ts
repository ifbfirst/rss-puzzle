import { gameStore } from '../../../../state/store';
import { HintName } from '../../../../types/models';
import { getGameSession } from '../../sessionRef';

const HINT_BY_CLASS: Record<string, HintName> = {
  'audio-hint': 'audio',
  'img-hint': 'image',
  'translate-hint': 'translate',
};

export class Hint {
  private tagResult: HTMLButtonElement;
  private hintName: HintName;

  constructor(className: string, iconClass: string, title: string) {
    const hintName = HINT_BY_CLASS[className];
    if (!hintName) {
      throw new Error(`Unknown hint: ${className}`);
    }
    this.hintName = hintName;
    this.tagResult = document.createElement('button');
    this.tagResult.type = 'button';
    this.tagResult.className = className;
    this.tagResult.title = title;
    this.tagResult.setAttribute('aria-label', title);
    const icon = document.createElement('i');
    icon.className = iconClass;
    this.tagResult.appendChild(icon);
    if (!gameStore.getState().hints[this.hintName]) {
      this.tagResult.classList.add('hint-disabled');
    }
    this.tagResult.addEventListener('click', () => this.toggle());
  }

  getResultTag(): HTMLElement {
    return this.tagResult;
  }

  private toggle(): void {
    const enabled = getGameSession().toggleHint(this.hintName);
    this.tagResult.classList.toggle('hint-disabled', !enabled);
  }
}
