import { checkLevel } from './checkLevel';
import { ResultScreen } from '../component/resultScreen';
import { Select } from '../component/select';
import { Sentence } from '../component/sentence';

export function continueGame(
  levelNumber: number,
  roundNumber: number,
  sentenceNumber: number,
) {
  const btnWrapper = document.querySelector('.btn-wrapper');
  const btnContinue = <HTMLElement>document.querySelector('.btn-continue');
  const btnCheck = document.querySelector('.btn-check');
  const btnComplete = document.querySelector('.btn-complete');
  const btnStatistic = document.querySelector('.btn-statistic');
  const wrapper = document.querySelector('.wrapper');
  const selectWrapper = document.querySelector('.select-wrapper');
  const settingsWrapper = document.querySelector('.settings-wrapper');
  const levelSelect = <HTMLSelectElement>document.querySelector('.levels');
  const roundSelect = <HTMLSelectElement>document.querySelector('.round');
  btnCheck?.before(btnContinue);

  btnContinue.onclick = function () {
    const modalBg = <HTMLElement>document.querySelector('.modal-bg');
    const modal = <HTMLElement>document.querySelector('.modal');
    if (modalBg && modalBg) {
      modalBg.style.display = 'none';
      modal.style.display = 'none';
    }
    btnComplete?.classList.remove('hidden');
    btnCheck?.classList.remove('hidden');
    btnCheck?.classList.add('btn-disabled');
    btnStatistic?.classList.add('hidden');
    const sources = checkLevel(levelNumber);

    const wordFromResultSentence =
      document.querySelectorAll('.result-sentence')[sentenceNumber].childNodes;
    [].forEach.call(wordFromResultSentence, function (element: HTMLElement) {
      element.classList.remove('true-word');
      element.classList.remove('false-word');
    });

    if (sentenceNumber === 9) {
      roundNumber = roundNumber + 1;
      sentenceNumber = -1;

      roundSelect.value = `${Number(localStorage.getItem('round')) + 1}`;
      document.querySelector('.result-screen')?.remove();
      const resultScreen = new ResultScreen();
      wrapper?.insertBefore(resultScreen.getResultTag(), btnWrapper);
    }
    if (sources) {
      if (roundNumber === sources.rounds.length) {
        if (levelNumber === 6) {
          levelNumber = 1;
          roundNumber = 0;
          localStorage.removeItem('level');
        } else {
          levelNumber = levelNumber + 1;
          roundNumber = 0;
          levelSelect.value = `${Number(localStorage.getItem('level')) + 1}`;
        }
        selectWrapper?.remove();
        localStorage.removeItem('round');
        const select = new Select(levelNumber, roundNumber);
        settingsWrapper?.prepend(select?.getResultTag());
        document.querySelector('.result-screen')?.remove();
        const resultScreen = new ResultScreen();
        wrapper?.insertBefore(resultScreen.getResultTag(), btnWrapper);
      }
    }

    document.querySelector('.sentence')?.remove();
    btnContinue?.classList.add('hidden');
    btnComplete?.classList.add('btn-disabled');
    const sentence = new Sentence(levelNumber, roundNumber, sentenceNumber + 1);

    document
      .querySelectorAll('.clicked')
      .forEach((element) => element.classList.remove('clicked'));

    wrapper?.insertBefore(sentence.getResultTag(), btnWrapper);
  };
}
