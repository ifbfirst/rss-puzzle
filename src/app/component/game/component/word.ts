import { PUZZLE_HEIGHT, PUZZLE_WIDTH, ROW_HEIGHT } from '../../../constants';
import { getRound } from '../../../data/collections';
import { pathToData } from '../../../data/path';
import { layoutWords } from '../../../game/logic';
import { gameStore } from '../../../state/store';
import { WordLayout } from '../../../types/models';
import { getGameSession } from '../sessionRef';

export class Word {
  private tagResult: HTMLElement;

  constructor(layout: WordLayout, sentenceIndex: number, imageSrc: string) {
    this.tagResult = document.createElement('div');
    this.tagResult.textContent = layout.word;
    this.tagResult.draggable = true;
    this.tagResult.style.width = `${layout.width}px`;
    this.tagResult.style.background = `url(${imageSrc}) no-repeat`;
    this.tagResult.style.backgroundPosition = `${-layout.left}px -${sentenceIndex * ROW_HEIGHT}px`;
    this.applyImageHint();
    this.tagResult.addEventListener('click', () => this.onClick());
  }

  getResultTag(): HTMLElement {
    return this.tagResult;
  }

  private applyImageHint(): void {
    const imageOn = gameStore.getState().hints.image;
    if (imageOn) {
      this.tagResult.style.color = '#fff';
      this.tagResult.style.textShadow = '0px 0px 3px rgb(9, 9, 9)';
      this.tagResult.style.backgroundSize = `${PUZZLE_WIDTH}px ${PUZZLE_HEIGHT}px`;
      return;
    }
    this.tagResult.style.color = 'black';
    this.tagResult.style.textShadow = 'none';
    this.tagResult.style.backgroundSize = '0px 0px';
  }

  private onClick(): void {
    const session = getGameSession();
    const { sentence } = gameStore.getState().progress;
    const resultSentence = document.querySelectorAll('.result-sentence')[
      sentence
    ] as HTMLElement;
    if (this.tagResult.classList.contains('clicked')) {
      document.querySelector('.sentence')?.appendChild(this.tagResult);
      this.tagResult.classList.remove('clicked');
    } else {
      resultSentence.appendChild(this.tagResult);
      this.tagResult.classList.add('clicked');
    }
    session.afterWordMove();
  }
}

export function createWords(
  sentence: string,
  level: number,
  round: number,
  sentenceIndex: number,
): Word[] {
  const imageSrc = `${pathToData}images/${getRound(level, round).levelData.imageSrc}`;
  return layoutWords(sentence).map(
    (layout) => new Word(layout, sentenceIndex, imageSrc),
  );
}
