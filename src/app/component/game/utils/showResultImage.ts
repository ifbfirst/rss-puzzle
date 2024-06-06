import { checkLevel } from './checkLevel';
import { continueGame } from './continue';
import { showStat } from './showStat';

export function showResultImage(
  levelNumber: number,
  roundNumber: number,
  sentenceNumber: number,
): void {
  const resultSentences = document.querySelectorAll('.result-sentence');
  const btnCheck = document.querySelector('.btn-check');
  const btnStatistic = document.querySelector('.btn-statistic');
  const sources = checkLevel(levelNumber);

  [].forEach.call(resultSentences, function (sentence: HTMLElement) {
    const words = sentence.childNodes;

    [].forEach.call(words, function (word: HTMLElement) {
      word.style.borderColor = 'transparent';
      word.style.boxShadow = 'none';
      word.style.fontSize = '0px';
      word.style.transition = '3s';
    });
  });
  const roundInfo = document.querySelector('.sentence');

  const roundInfoDiv = document.createElement('p');
  roundInfo?.appendChild(roundInfoDiv);
  if (roundInfoDiv && sources)
    roundInfoDiv.textContent = `"${sources.rounds[roundNumber].levelData.name}",   ${sources.rounds[roundNumber].levelData.author}   (${sources.rounds[roundNumber].levelData.year})`;
  document.querySelector('.btn-continue')?.classList.remove('hidden');
  showStat();
  continueGame(levelNumber, roundNumber, sentenceNumber);
  btnCheck?.classList.add('hidden');
  btnStatistic?.classList.remove('hidden');
}
