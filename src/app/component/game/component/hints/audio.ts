import { pathToData } from '../../../../data/path';
import { gameStore } from '../../../../state/store';

export class AudioIcon {
  private tagResult: HTMLButtonElement;

  constructor(audioExample: string) {
    this.tagResult = document.createElement('button');
    this.tagResult.type = 'button';
    this.tagResult.className = 'audio';
    this.tagResult.setAttribute('aria-label', 'Play sentence audio');
    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-volume-high';
    this.tagResult.appendChild(icon);
    if (!gameStore.getState().hints.audio) {
      this.tagResult.style.opacity = '0';
      this.tagResult.style.pointerEvents = 'none';
    }
    const src = `${pathToData}${audioExample}`;
    this.tagResult.addEventListener('click', () => this.play(src));
  }

  getResultTag(): HTMLElement {
    return this.tagResult;
  }

  private play(src: string): void {
    this.tagResult.style.pointerEvents = 'none';
    const audioObject = new Audio(src);
    audioObject.volume = 0.5;
    this.tagResult.classList.add('audio-animation');
    audioObject.addEventListener('ended', () => {
      this.tagResult.style.pointerEvents = 'auto';
      this.tagResult.classList.remove('audio-animation');
    });
    void audioObject.play();
  }
}
