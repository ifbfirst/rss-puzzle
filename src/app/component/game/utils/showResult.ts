import { continueGame } from './continue';
import { Word } from '../component/word';
import { showHints } from './showHints';
import { showResultImage } from './showResultImage';

export function showResult(
  levelNumber: number,
  roundNumber: number,
  sentenceNumber: number,
  resultSentence: HTMLElement,
  sentence: string,
  roundImage: string,
): void {
  const btnComplete = <HTMLElement>document.querySelector('.btn-complete');
  const btnContinue = document.querySelector('.btn-continue');
  const sentenceTag = document.querySelector('.sentence');

  const wordArray = sentence.split(' ');
  btnComplete.onclick = function (): void {
    while (resultSentence?.firstChild) {
      resultSentence.removeChild(resultSentence.firstChild);
    }
    while (sentenceTag?.firstChild) {
      sentenceTag.removeChild(sentenceTag.firstChild);
    }
    let countLettersSumPrev = 0;
    for (let i = 0; i < wordArray.length; i = i + 1) {
      const countLetters: number =
        (606 / sentence.replace(/\s+/g, '').length) * wordArray[i].length;
      countLettersSumPrev = countLettersSumPrev + countLetters;
      const newWord = new Word(
        `${wordArray[i]}`,
        sentence,
        levelNumber,
        roundNumber,
        sentenceNumber,
        countLettersSumPrev,
        roundImage,
      );
      const tagWord = resultSentence?.appendChild(newWord.getResultTag());
      resultSentence.classList.add('showed');
      if (tagWord)
        tagWord.style.minWidth = `${(606 / countLetters) * wordArray[i].length}px`;
    }

    btnComplete.classList.add('hidden');
    btnContinue?.classList.remove('hidden');
    showHints(sentenceNumber);
    continueGame(levelNumber, roundNumber, sentenceNumber);
    if (sentenceNumber === 9) {
      localStorage.setItem('round', `${roundNumber + 1}`);
      localStorage.setItem('level', `${levelNumber}`);
      const audio = <HTMLElement>document.querySelector('.audio');
      const translate = <HTMLElement>document.querySelector('.translate');
      audio.style.opacity = '0';
      translate.style.opacity = '0';
      showResultImage(levelNumber, roundNumber, sentenceNumber);
    }
  };
}
