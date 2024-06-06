import { ResultScreen } from '../component/resultScreen';
import { Sentence } from '../component/sentence';

export function newLevel(level: number) {
  const roundSelect = <HTMLSelectElement>document.querySelector('.round');
  roundSelect.value = `1`;
  const wrapper = document.querySelector('.wrapper');
  const btnWrapper = document.querySelector('.btn-wrapper');
  document.querySelector('.result-screen')?.remove();
  const resultScreen = new ResultScreen();
  wrapper?.insertBefore(resultScreen.getResultTag(), btnWrapper);
  document.querySelector('.sentence')?.remove();
  const sentence = new Sentence(level, 0, 0);
  wrapper?.insertBefore(sentence.getResultTag(), btnWrapper);
}

export function newRound(round: number) {
  const levelSelect = <HTMLSelectElement>document.querySelector('.levels');
  const level = Number(levelSelect?.value);
  const wrapper = document.querySelector('.wrapper');
  const btnWrapper = document.querySelector('.btn-wrapper');
  document.querySelector('.result-screen')?.remove();
  const resultScreen = new ResultScreen();
  wrapper?.insertBefore(resultScreen.getResultTag(), btnWrapper);
  document.querySelector('.sentence')?.remove();
  const sentence = new Sentence(level, round - 1, 0);
  wrapper?.insertBefore(sentence.getResultTag(), btnWrapper);
}
