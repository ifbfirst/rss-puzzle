import { Button } from './button';

export class Buttons {
  private tagResult: HTMLElement;
  getResultTag(): HTMLElement {
    return this.tagResult;
  }

  constructor(className: string) {
    this.tagResult = document.createElement('div');
    this.tagResult.className = className;
    const buttonContinue = new Button('continue', 'btn-continue hidden');
    this.tagResult.appendChild(buttonContinue?.getResultTag());
    const buttonAutoComplete = new Button(
      "i dont't know",
      'btn-complete btn-disabled',
    );
    this.tagResult.appendChild(buttonAutoComplete?.getResultTag());
    const buttonCheck = new Button('check', 'btn-check btn-disabled');
    this.tagResult.appendChild(buttonCheck.getResultTag());
    const buttonStatistic = new Button('statistic', 'btn-statistic hidden');
    this.tagResult.appendChild(buttonStatistic?.getResultTag());
  }
}
