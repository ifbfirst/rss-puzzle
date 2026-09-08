import {
  loadCollection,
  getCollection,
  getRound,
  getWordExample,
} from '../../data/collections';
import { gameStore } from '../../state/store';
import { storage } from '../../state/storage';
import {
  classifyWords,
  isCorrectSentence,
  isLastSentenceInRound,
  nextProgress,
} from '../../game/logic';
import { PUZZLE_HEIGHT, PUZZLE_WIDTH } from '../../constants';
import { HintName } from '../../types/models';
import { AudioIcon } from './component/hints/audio';
import { Translate } from './component/hints/translate';
import { ResultScreen } from './component/resultScreen';
import { ResultSentence } from './component/resultSentence';
import { Select } from './component/select';
import { Sentence } from './component/sentence';
import { getGameSession } from './sessionRef';

export class GameSession {
  private root: HTMLElement;
  private scaler: HTMLElement;

  constructor(root: HTMLElement, scaler: HTMLElement) {
    this.root = root;
    this.scaler = scaler;
    window.addEventListener('resize', () => this.scalePuzzle());
  }

  start(): void {
    this.bindButtons();
    this.startRound();
  }

  private progress() {
    return gameStore.getState().progress;
  }

  private resultScreen(): HTMLElement | null {
    return this.scaler.querySelector('.result-screen');
  }

  private sentenceEl(): HTMLElement | null {
    return this.root.querySelector('.sentence');
  }

  private currentResultRow(): HTMLElement {
    const { sentence } = this.progress();
    return this.root.querySelectorAll('.result-sentence')[
      sentence
    ] as HTMLElement;
  }

  private btn(selector: string): HTMLElement {
    return this.root.querySelector(selector) as HTMLElement;
  }

  private bindButtons(): void {
    this.btn('.btn-check').addEventListener('click', () => this.check());
    this.btn('.btn-complete').addEventListener('click', () => this.complete());
    this.btn('.btn-continue').addEventListener('click', () => {
      void this.continue();
    });
    this.btn('.btn-statistic').addEventListener('click', () => this.showStat());
  }

  private startRound(): void {
    gameStore.resetRoundOutcomes();
    this.sentenceEl()?.remove();
    this.scaler.replaceChildren();
    this.scaler.appendChild(new ResultScreen().getResultTag());
    this.appendResultRow();
    this.renderSentence();
    this.resetActionButtons();
    this.scalePuzzle();
  }

  private appendResultRow(): void {
    const row = new ResultSentence();
    this.resultScreen()?.appendChild(row.getResultTag());
  }

  private renderSentence(): void {
    this.sentenceEl()?.remove();
    const { level, round, sentence } = this.progress();
    const source = new Sentence(level, round, sentence);
    this.root.insertBefore(source.getResultTag(), this.btn('.btn-wrapper'));
    this.renderClues();
    this.scalePuzzle();
  }

  renderClues(): void {
    const { level, round, sentence } = this.progress();
    const word = getWordExample(level, round, sentence);
    const settings = this.root.querySelector('.settings-wrapper');
    this.root.querySelector('.translate')?.remove();
    this.root.querySelector('.audio')?.remove();
    this.root.querySelector('.clues')?.remove();
    const translate = new Translate(word.textExampleTranslate);
    const audio = new AudioIcon(word.audioExample);
    settings?.after(translate.getResultTag());
    settings?.after(audio.getResultTag());
  }

  afterWordMove(): void {
    const row = this.currentResultRow();
    if (!row) {
      return;
    }
    const expected = this.currentText().split(' ');
    const actual = this.wordsFrom(row);
    this.btn('.btn-complete').classList.remove('btn-disabled');
    this.btn('.btn-check').classList.add('btn-disabled');
    if (actual.length !== expected.length) {
      return;
    }
    this.btn('.btn-check').classList.remove('btn-disabled');
    if (isCorrectSentence(actual, expected)) {
      this.markSolved('guessed');
    }
  }

  private currentText(): string {
    const { level, round, sentence } = this.progress();
    return getWordExample(level, round, sentence).textExample;
  }

  private wordsFrom(row: HTMLElement): string[] {
    return [...row.querySelectorAll('.clicked')].map(
      (element) => element.textContent ?? '',
    );
  }

  private check(): void {
    const row = this.currentResultRow();
    const expected = this.currentText().split(' ');
    const actual = this.wordsFrom(row);
    const marks = classifyWords(actual, expected);
    row.querySelectorAll('.clicked').forEach((element, index) => {
      element.classList.remove('true-word', 'false-word');
      element.classList.add(marks[index]);
    });
  }

  private complete(): void {
    const row = this.currentResultRow();
    const source = this.sentenceEl();
    row.replaceChildren();
    source?.replaceChildren();
    const { level, round, sentence } = this.progress();
    const filled = new Sentence(level, round, sentence, { shuffle: false });
    [...filled.getResultTag().children].forEach((node) => {
      const word = node as HTMLElement;
      word.classList.add('clicked');
      row.appendChild(word);
    });
    this.markSolved('showed');
  }

  private markSolved(outcome: 'guessed' | 'showed'): void {
    const row = this.currentResultRow();
    const { sentence, level, round } = this.progress();
    gameStore.setOutcome(sentence, outcome);
    row.classList.add(outcome);
    this.btn('.btn-complete').classList.add('hidden');
    this.btn('.btn-check').classList.add('hidden');
    this.btn('.btn-continue').classList.remove('hidden');
    this.revealHintsOnRow(row);
    if (isLastSentenceInRound(sentence)) {
      const collection = getCollection(level);
      const next = nextProgress(
        { level, round, sentence },
        collection.rounds.length,
      );
      storage.saveProgress(next.level, next.round);
      this.hideClues();
      this.revealPainting();
      this.btn('.btn-statistic').classList.remove('hidden');
    }
  }

  private revealHintsOnRow(row: HTMLElement): void {
    const translate = this.root.querySelector(
      '.translate',
    ) as HTMLElement | null;
    const audio = this.root.querySelector('.audio') as HTMLElement | null;
    if (translate) {
      translate.style.opacity = '1';
    }
    if (audio) {
      audio.style.opacity = '1';
      audio.style.pointerEvents = 'auto';
    }
    row.querySelectorAll('div').forEach((element) => {
      const word = element as HTMLElement;
      word.style.backgroundSize = `${PUZZLE_WIDTH}px ${PUZZLE_HEIGHT}px`;
      word.style.color = '#fff';
      word.style.textShadow = '0px 0px 2px rgb(9, 9, 9)';
    });
  }

  private hideClues(): void {
    const audio = this.root.querySelector('.audio') as HTMLElement | null;
    const translate = this.root.querySelector(
      '.translate',
    ) as HTMLElement | null;
    if (audio) {
      audio.style.opacity = '0';
    }
    if (translate) {
      translate.style.opacity = '0';
    }
  }

  private revealPainting(): void {
    this.root.querySelectorAll('.result-sentence').forEach((sentence) => {
      sentence.querySelectorAll('div').forEach((word) => {
        const element = word as HTMLElement;
        element.style.borderColor = 'transparent';
        element.style.boxShadow = 'none';
        element.style.fontSize = '0px';
        element.style.transition = '1.2s ease';
      });
    });
    const { level, round } = this.progress();
    const roundData = getRound(level, round);
    const caption = this.sentenceEl();
    if (caption) {
      caption.replaceChildren();
      const info = document.createElement('p');
      info.textContent = `"${roundData.levelData.name}", ${roundData.levelData.author} (${roundData.levelData.year})`;
      caption.appendChild(info);
    }
  }

  private async continue(): Promise<void> {
    const continueBtn = this.btn('.btn-continue');
    this.btn('.btn-check').before(continueBtn);
    this.closeModal();
    const { level, round, sentence } = this.progress();
    const collection = getCollection(level);
    const next = nextProgress(
      { level, round, sentence },
      collection.rounds.length,
    );
    const roundChanged = next.round !== round || next.level !== level;
    gameStore.setProgress(next);
    if (roundChanged) {
      await loadCollection(next.level);
      this.updateSelect(next.level, next.round);
      this.startRound();
      return;
    }
    this.appendResultRow();
    this.renderSentence();
    this.resetActionButtons();
    this.scalePuzzle();
  }

  private resetActionButtons(): void {
    this.btn('.btn-continue').classList.add('hidden');
    this.btn('.btn-statistic').classList.add('hidden');
    this.btn('.btn-complete').classList.remove('hidden');
    this.btn('.btn-complete').classList.add('btn-disabled');
    this.btn('.btn-check').classList.remove('hidden');
    this.btn('.btn-check').classList.add('btn-disabled');
  }

  private updateSelect(level: number, round: number): void {
    const settings = this.root.querySelector('.settings-wrapper');
    this.root.querySelector('.select-wrapper')?.remove();
    const select = new Select(level, round + 1, {
      onLevel: (nextLevel) => {
        void getGameSession().changeLevel(nextLevel);
      },
      onRound: (nextRound) => getGameSession().changeRound(nextRound),
    });
    settings?.prepend(select.getResultTag());
  }

  async changeLevel(level: number): Promise<void> {
    await loadCollection(level);
    gameStore.setProgress({ level, round: 0, sentence: 0 });
    this.updateSelect(level, 0);
    this.startRound();
  }

  changeRound(round: number): void {
    const { level } = this.progress();
    gameStore.setProgress({ level, round, sentence: 0 });
    this.startRound();
  }

  toggleHint(name: HintName): boolean {
    const enabled = gameStore.toggleHint(name);
    this.applyHint(name, enabled);
    return enabled;
  }

  private applyHint(name: HintName, enabled: boolean): void {
    if (name === 'translate') {
      const text = this.root.querySelector('.translate') as HTMLElement | null;
      if (text) {
        text.style.opacity = enabled ? '1' : '0';
      }
    }
    if (name === 'audio') {
      const audio = this.root.querySelector('.audio') as HTMLElement | null;
      if (audio) {
        audio.style.opacity = enabled ? '1' : '0';
        audio.style.pointerEvents = enabled ? 'auto' : 'none';
      }
    }
    if (name === 'image') {
      this.sentenceEl()
        ?.querySelectorAll('div')
        .forEach((element) => {
          const word = element as HTMLElement;
          if (enabled) {
            word.style.backgroundSize = `${PUZZLE_WIDTH}px ${PUZZLE_HEIGHT}px`;
            word.style.color = '#fff';
            word.style.textShadow = '0px 0px 3px rgb(9, 9, 9)';
          } else {
            word.style.backgroundSize = '0px 0px';
            word.style.color = '#3f3f3f';
            word.style.textShadow = 'none';
          }
        });
    }
  }

  private showStat(): void {
    const modalBg = this.root.querySelector('.modal-bg') as HTMLElement;
    const modal = this.root.querySelector('.modal') as HTMLElement;
    modal.replaceChildren();
    modal.style.display = 'block';
    modalBg.style.display = 'block';
    const title = document.createElement('h4');
    title.textContent = 'Statistics';
    modal.appendChild(title);
    this.root.querySelectorAll('.result-sentence').forEach((sentence) => {
      const text = [...sentence.querySelectorAll('div')]
        .map((word) => word.textContent ?? '')
        .join(' ')
        .trim();
      if (!text) {
        return;
      }
      const line = document.createElement('div');
      if (sentence.classList.contains('guessed')) {
        line.className = 'guessedStat';
      } else if (sentence.classList.contains('showed')) {
        line.className = 'showedStat';
      } else {
        return;
      }
      line.textContent = text;
      modal.appendChild(line);
    });
    modal.appendChild(this.btn('.btn-continue'));
  }

  private closeModal(): void {
    const modalBg = this.root.querySelector('.modal-bg') as HTMLElement | null;
    const modal = this.root.querySelector('.modal') as HTMLElement | null;
    if (modalBg) {
      modalBg.style.display = 'none';
    }
    if (modal) {
      modal.style.display = 'none';
    }
  }

  private scalePuzzle(): void {
    const board = this.resultScreen();
    if (!board) {
      return;
    }
    const fit = (): void => {
      this.scaler.style.width = '';
      this.scaler.style.height = '';
      const widthScale = Math.min(
        1,
        (this.scaler.clientWidth || PUZZLE_WIDTH) / PUZZLE_WIDTH,
      );
      const sentenceH = this.sentenceEl()?.offsetHeight ?? 52;
      const buttonsH = this.btn('.btn-wrapper')?.offsetHeight ?? 42;
      const below = sentenceH + buttonsH + 28;
      const availableH =
        window.innerHeight - this.scaler.getBoundingClientRect().top - below;
      let scale = Math.min(
        1,
        widthScale,
        Math.max(0.42, availableH / PUZZLE_HEIGHT),
      );
      board.style.transform = `scale(${scale})`;
      this.scaler.style.width = `${PUZZLE_WIDTH * scale}px`;
      this.scaler.style.height = `${PUZZLE_HEIGHT * scale}px`;
      const overflow =
        document.documentElement.scrollHeight - window.innerHeight;
      if (overflow > 0) {
        scale = Math.max(0.42, scale - (overflow + 8) / PUZZLE_HEIGHT);
        board.style.transform = `scale(${scale})`;
        this.scaler.style.width = `${PUZZLE_WIDTH * scale}px`;
        this.scaler.style.height = `${PUZZLE_HEIGHT * scale}px`;
      }
    };
    fit();
    requestAnimationFrame(fit);
  }
}
