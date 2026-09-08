import './startScreen.css';
import { BaseComponent } from '../../interfaces/baseComponent';
import { GamePage } from '../game/gamePage';
import { gameStore } from '../../state/store';
import { replaceMain } from '../../helpers/dom';

export class StartScreenComponent extends BaseComponent {
  private tagResult: HTMLElement;

  constructor(commonPage: BaseComponent | null) {
    super(commonPage);
    const player = gameStore.getState().player;
    this.tagResult = this.createTag('div');
    this.tagResult.className = 'start-panel';

    const heading = this.createTag('h2');
    heading.textContent = `Hello, ${player?.name ?? ''} ${player?.surname ?? ''}!`;
    this.tagResult.appendChild(heading);

    const description = this.createTag('p');
    description.className = 'start-copy';
    description.textContent =
      'This game will help you learn English. Your task is to make sentences from given words. As you complete rounds and levels, discover wonderful works of art hidden behind correctly guessed sentences in the rounds.';
    this.tagResult.appendChild(description);

    const button = this.createTag<HTMLButtonElement>('button');
    button.type = 'button';
    button.className = 'btn';
    button.textContent = 'start';
    button.addEventListener('click', () => {
      replaceMain(commonPage, new GamePage(commonPage));
    });
    this.tagResult.appendChild(button);
  }

  getResultTag(): HTMLElement {
    return this.tagResult;
  }
}
