import { Button } from './button';

export class Buttons {
  private tagResult: HTMLElement;

  constructor(className: string) {
    this.tagResult = document.createElement('div');
    this.tagResult.className = className;
    const buttonContinue = new Button('continue', 'btn-continue hidden');
    const buttonAutoComplete = new Button(
      "I don't know",
      'btn-complete btn-disabled',
    );
    const buttonCheck = new Button('check', 'btn-check btn-disabled');
    const buttonStatistic = new Button('statistic', 'btn-statistic hidden');
    this.tagResult.append(
      buttonContinue.getResultTag(),
      buttonAutoComplete.getResultTag(),
      buttonCheck.getResultTag(),
      buttonStatistic.getResultTag(),
    );
  }

  getResultTag(): HTMLElement {
    return this.tagResult;
  }
}
