import './startScreen.css';
import { BaseComponent } from '../../interfaces/baseComponent';
import { GamePage } from '../game/gamePage';

export class StartScreenComponent extends BaseComponent {
  private h2: HTMLFormElement;
  private h3: HTMLElement;
  private button: HTMLElement;
  private tagResult: HTMLFormElement;

  constructor(commonPage: BaseComponent | null) {
    super(commonPage);

    const name: string | null = localStorage.getItem('name');
    const surname: string | null = localStorage.getItem('surname');
    this.h2 = this.createTag('h2');
    this.h2.textContent = `Hello, ${name} ${surname}!`;
    this.tagResult = this.createTag('div');
    this.tagResult.appendChild(this.h2);
    this.h3 = this.createTag('h3');
    this.h3.textContent =
      'This game will help you learn English. Your task is to make sentences from given words. As you complete rounds and levels, discover wonderful works of art hidden behind correctly guessed sentences in the rounds.';
    this.button = this.createTag('button');
    this.tagResult.appendChild(this.h3);
    this.button.textContent = 'start';
    this.button.addEventListener('click', function () {
      const mainTag = commonPage?.getResultTag();
      if (mainTag) {
        while (mainTag.firstChild) {
          mainTag.removeChild(mainTag.firstChild);
        }
      }
      const startScreen = new GamePage(commonPage);
      mainTag?.appendChild(startScreen.getResultTag());
    });

    this.tagResult.appendChild(this.button);
  }

  getResultTag(): HTMLElement {
    return this.tagResult;
  }
}
