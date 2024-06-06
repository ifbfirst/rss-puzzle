export function showStat() {
  const btnStatistic = <HTMLButtonElement>(
    document.querySelector('.btn-statistic')
  );
  btnStatistic.onclick = function () {
    const modalBg = <HTMLElement>document.querySelector('.modal-bg');
    const modal = <HTMLElement>document.querySelector('.modal');
    modal.innerHTML = '';

    modal.style.display = 'block';
    modalBg.style.display = 'block';
    const nameModal = document.createElement('h4');
    modal.appendChild(nameModal);
    nameModal.textContent = 'Statistics';
    const resultSentences = document.querySelectorAll('.result-sentence');

    resultSentences.forEach((sentence) => {
      if (sentence.classList.contains('guessed')) {
        const words = sentence.childNodes;
        let sentenceBuild = '';
        [].forEach.call(words, function (word: HTMLElement) {
          sentenceBuild = `${sentenceBuild} ${word.textContent}`;
        });

        const guessedSentence = document.createElement('div');
        guessedSentence.className = 'guessedStat';
        guessedSentence.textContent = sentenceBuild;
        modal.appendChild(guessedSentence);
      }
      if (sentence.classList.contains('showed')) {
        const words = sentence.childNodes;
        let sentenceBuild = '';
        [].forEach.call(words, function (word: HTMLElement) {
          sentenceBuild = `${sentenceBuild} ${word.textContent}`;
        });

        const showedSentence = document.createElement('div');
        showedSentence.className = 'showedStat';
        showedSentence.textContent = sentenceBuild;
        modal.appendChild(showedSentence);
      }
    });

    const btnContinue = <HTMLButtonElement>(
      document.querySelector('.btn-continue')
    );
    modal.appendChild(btnContinue);
  };
}
