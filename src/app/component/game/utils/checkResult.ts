import { showHints } from './showHints';
import { checkWrongWords } from './checkWrongWords';
import { showResultImage } from './showResultImage';
import { continueGame } from './continue';

export function checkResult(
  levelNumber: number,
  roundNumber: number,
  sentenceNumber: number,
  resultSentence: HTMLElement,
  sentence: string,
): void {
  const resultArray = resultSentence.querySelectorAll('.clicked');
  const btnCheck = <HTMLElement>document.querySelector('.btn-check');
  const btnComplete = document.querySelector('.btn-complete');
  const btnContinue = document.querySelector('.btn-continue');

  //check sentences length

  const wordArrayFromSentence = sentence.split(' ');
  if (resultArray.length === wordArrayFromSentence.length) {
    btnCheck?.classList.remove('btn-disabled');
    const sentenceResult: string[] = [];
    resultArray.forEach(function (element) {
      sentenceResult.push(element.textContent!);
    });
    checkWrongWords(btnCheck, resultArray, wordArrayFromSentence);

    //check accuracy
    if (
      JSON.stringify(sentenceResult) === JSON.stringify(wordArrayFromSentence)
    ) {
      resultSentence.classList.add('guessed');
      btnComplete?.classList.add('hidden');
      btnContinue?.classList.remove('hidden');

      checkWrongWords(btnCheck, resultArray, wordArrayFromSentence);
      continueGame(levelNumber, roundNumber, sentenceNumber);
      showHints(sentenceNumber);
      if (sentenceNumber === 9) {
        localStorage.setItem('round', `${roundNumber + 1}`);
        localStorage.setItem('level', `${levelNumber}`);
        const audio = <HTMLElement>document.querySelector('.audio');
        const translate = <HTMLElement>document.querySelector('.translate');
        audio.style.opacity = '0';
        translate.style.opacity = '0';
        showResultImage(levelNumber, roundNumber, sentenceNumber);
      }
    }
  }
}
