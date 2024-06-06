export function showHints(sentenceNumber: number): void {
  const translateText = <HTMLElement>document.querySelector('.translate');
  const audioTag = <HTMLElement>document.querySelector('.audio');
  const wordsFromSentence =
    document.querySelectorAll('.result-sentence')[sentenceNumber]?.childNodes;
  translateText.style.opacity = '1';
  audioTag.style.opacity = '1';
  audioTag.style.pointerEvents = 'auto';

  [].forEach.call(wordsFromSentence, function (element: HTMLElement) {
    element.style.backgroundSize = '606px 400px';
    element.style.color = '#fff';
    element.style.textShadow = '0px 0px 2px rgb(9, 9, 9)';
  });
}
