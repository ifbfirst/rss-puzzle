import './loginForm.css';
import { BaseComponent } from '../../interfaces/baseComponent';
import { StartScreenComponent } from '../startScreen/startScreen';

export class LoginForm extends BaseComponent {
  private tagResult: HTMLFormElement;

  getResultTag(): HTMLElement {
    return this.tagResult;
  }

  constructor(commonPage: BaseComponent | null) {
    super(commonPage);
    const wrapper = document.querySelector('.wrapper');
    this.tagResult = this.createTag<HTMLFormElement>('form');
    this.tagResult.name = 'loginForm';
    this.createInputName();
    this.createInputSurname();
    this.createSubmit();
    if (wrapper) wrapper.appendChild(this.tagResult);
  }

  private createInputName(): void {
    const inputName = this.createTag<HTMLInputElement>('input');
    inputName.name = 'name';
    inputName.placeholder = 'name';
    inputName.required = true;
    inputName.pattern = '^[A-Z][\\-a-zA-z]{2,15}';
    inputName.title =
      'The name must contain a capital first letter, can contain a hyphen (-) and have at least 3 characters';
    inputName.setAttribute(
      'oninvalid',
      "this.setCustomValidity('Enter Correct Name. The name must contain a capital first letter, can contain a hyphen (-) and have at least 3 characters')",
    );

    inputName.setAttribute('oninput', "this.setCustomValidity('')");
    this.tagResult.append(inputName);
  }

  private createInputSurname(): void {
    const inputSurname = this.createTag<HTMLInputElement>('input');
    inputSurname.name = 'surname';
    inputSurname.placeholder = 'surname';
    inputSurname.title =
      'The surname must contain a capital first letter, can contain a hyphen (-) and have at least 4 characters';
    inputSurname.required = true;
    inputSurname.pattern = '^[A-Z][\\-a-zA-z]{3,15}';
    inputSurname.setAttribute(
      'oninvalid',
      "this.setCustomValidity('Enter Correct Surname. The surname must contain a capital first letter, can contain a hyphen (-) and have at least 4 characters')",
    );
    inputSurname.setAttribute('oninput', "this.setCustomValidity('')");
    this.tagResult.append(inputSurname);
  }

  private createSubmit(): void {
    const form = this.tagResult;
    const submit = <HTMLInputElement>this.createTag('input');
    submit.className = 'submit-form';
    submit.value = 'enter';
    submit.type = 'submit';
    this.tagResult.append(submit);
    submit.textContent = 'enter';
    const commonPage = this.parentComponent;
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const formData = new FormData(form);
      const name = <string>formData.get('name');
      const surname = <string>formData.get('surname');

      localStorage.setItem('name', name);
      localStorage.setItem('surname', surname);
      const mainTag = commonPage?.getResultTag();
      if (mainTag) {
        while (mainTag.firstChild) {
          mainTag.removeChild(mainTag.firstChild);
        }
      }
      const startScreen = new StartScreenComponent(commonPage);
      mainTag?.appendChild(startScreen.getResultTag());
    });
  }
}
