import './gamePage.css';
import { BaseComponent } from '../../interfaces/baseComponent';
import { Hints } from './component/hints/hints';
import { Select } from './component/select';
import { Buttons } from './component/buttons';
import { Modal } from './component/modal';
import { gameStore } from '../../state/store';
import { loadCollection } from '../../data/collections';
import { GameSession } from './gameSession';
import { setGameSession, getGameSession } from './sessionRef';

export class GamePage extends BaseComponent {
  private tagResult: HTMLElement;

  constructor(commonPage: BaseComponent | null) {
    super(commonPage);
    this.tagResult = this.createTag('div');
    this.tagResult.className = 'wrapper game-panel';
    const loading = document.createElement('p');
    loading.className = 'loading';
    loading.textContent = 'Loading...';
    this.tagResult.appendChild(loading);
    void this.init(loading);
  }

  getResultTag(): HTMLElement {
    return this.tagResult;
  }

  private async init(loading: HTMLElement): Promise<void> {
    const { level, round } = gameStore.getState().progress;
    await loadCollection(level);
    loading.remove();

    const settingsWrapper = document.createElement('div');
    settingsWrapper.className = 'settings-wrapper';
    this.tagResult.appendChild(settingsWrapper);

    const select = new Select(level, round + 1, {
      onLevel: (nextLevel) => {
        void getGameSession().changeLevel(nextLevel);
      },
      onRound: (nextRound) => getGameSession().changeRound(nextRound),
    });
    settingsWrapper.appendChild(select.getResultTag());
    settingsWrapper.appendChild(new Hints().getResultTag());

    const scaler = document.createElement('div');
    scaler.className = 'puzzle-scaler';
    this.tagResult.appendChild(scaler);
    this.tagResult.appendChild(new Buttons('btn-wrapper').getResultTag());
    this.tagResult.appendChild(new Modal().getResultTag());

    const session = new GameSession(this.tagResult, scaler);
    setGameSession(session);
    session.start();
  }
}
