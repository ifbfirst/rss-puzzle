import './gamePage.css';
import { BaseComponent } from '../../interfaces/baseComponent';
import { Sentence } from './component/sentence';
import { ResultScreen } from './component/resultScreen';
import { Hints } from './component/hints/hints';
import { AudioIcon } from './component/hints/audio';
import { Translate } from './component/hints/translate';
import { Select } from './component/select';
import { checkLevel } from './utils/checkLevel';
import { ResultSentence } from './component/resultSentence';
import { Buttons } from './component/buttons';
import { Modal } from './component/modal';

export class GamePage extends BaseComponent {
  private tagResult: HTMLFormElement;

  constructor(commonPage: BaseComponent | null) {
    super(commonPage);
    this.tagResult = this.createTag('div');
    this.tagResult.className = 'wrapper';
    const settingsWrapper = document.createElement('div');
    this.tagResult.appendChild(settingsWrapper);
    settingsWrapper.className = 'settings-wrapper';
    let currentLevel = 1;
    let currentRound = 0;
    if (localStorage.getItem('level') !== null)
      currentLevel = Number(localStorage.getItem('level'));
    if (localStorage.getItem('round') !== null)
      currentRound = Number(localStorage.getItem('round'));

    const select = new Select(currentLevel, currentRound + 1);
    settingsWrapper.appendChild(select?.getResultTag());
    const hints = new Hints(currentRound, 0);
    settingsWrapper.appendChild(hints?.getResultTag());
    const sources = checkLevel(currentLevel);
    if (sources) {
      const translate = new Translate(
        `${sources.rounds[currentRound].words[0].textExampleTranslate}`,
      );
      settingsWrapper?.after(translate.getResultTag());
      const audio = new AudioIcon(
        `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/${sources.rounds[currentRound].words[0].audioExample}`,
      );
      settingsWrapper?.after(audio.getResultTag());
    }

    const resultScreen = new ResultScreen();
    this.tagResult.appendChild(resultScreen.getResultTag());
    const resultSentence = new ResultSentence(currentLevel, currentRound, 0);
    resultScreen.getResultTag().appendChild(resultSentence.getResultTag());
    const sentence = new Sentence(currentLevel, currentRound, 0);
    this.tagResult.appendChild(sentence.getResultTag());
    const buttons = new Buttons('btn-wrapper');
    this.tagResult.appendChild(buttons?.getResultTag());
    const modal = new Modal();
    this.tagResult.appendChild(modal?.getResultTag());
  }

  getResultTag(): HTMLElement {
    return this.tagResult;
  }
}
