export function checkWrongWords(
  btnCheck: HTMLElement,
  resultArray: NodeListOf<Element>,
  wordArrayFromSentence: string[],
): void {
  btnCheck.onclick = function (): void {
    resultArray.forEach((element, index) => {
      wordArrayFromSentence.forEach((element2, index2) => {
        if (element.textContent === element2 && index === index2) {
          element.classList.add('true-word');
        }
      });
      if (!element.classList.contains('true-word')) {
        element.classList.add('false-word');
      }
    });
  };
}
