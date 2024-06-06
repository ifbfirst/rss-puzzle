export class UseHints {
  static useHint() {
    const translateText = document.createElement('div');
    translateText.textContent = 'ghgfghfjgjgh';
    document.querySelector('.wrapper')?.appendChild(translateText);
  }
}
