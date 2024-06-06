export class AudioIcon {
  private tagResult: HTMLElement;
  getResultTag(): HTMLElement {
    return this.tagResult;
  }

  constructor(audioSrc: string) {
    this.tagResult = document.createElement('div');
    this.tagResult.className = 'audio';
    this.tagResult.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    const audioTag = this.tagResult;
    this.tagResult.classList.toggle('hint-disabled');
    if (localStorage.getItem('audio-hint') === 'off') {
      this.tagResult.style.opacity = '0';
      audioTag.style.pointerEvents = 'auto';
    }
    this.tagResult.onclick = function () {
      audioTag.style.pointerEvents = 'none';
      const audioObject = new Audio();
      audioObject.autoplay = true;
      audioObject.volume = 0.5;
      audioObject.src = audioSrc;
      audioTag.classList.add('audio-animation');

      audioObject.addEventListener('ended', () => {
        audioTag.style.pointerEvents = 'auto';
        audioTag.classList.remove('audio-animation');
      });
    };
  }
}
