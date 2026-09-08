import './loginForm.css';
import { BaseComponent } from '../../interfaces/baseComponent';
import { StartScreenComponent } from '../startScreen/startScreen';
import { gameStore } from '../../state/store';
import { replaceMain } from '../../helpers/dom';

export class LoginForm extends BaseComponent {
  private tagResult: HTMLFormElement;

  constructor(commonPage: BaseComponent | null) {
    super(commonPage);
    this.tagResult = this.createTag<HTMLFormElement>('form');
    this.tagResult.name = 'loginForm';
    this.tagResult.className = 'login-card';
    this.createInputName();
    this.createInputSurname();
    this.createSubmit();
  }

  getResultTag(): HTMLElement {
    return this.tagResult;
  }

  private createInputName(): void {
    const inputName = this.createTag<HTMLInputElement>('input');
    inputName.name = 'name';
    inputName.placeholder = 'Name';
    inputName.autocomplete = 'given-name';
    inputName.required = true;
    inputName.pattern = '^[A-Z][\\-a-zA-z]{2,15}';
    inputName.title =
      'The name must contain a capital first letter, can contain a hyphen (-) and have at least 3 characters';
    this.bindValidity(
      inputName,
      'Enter Correct Name. The name must contain a capital first letter, can contain a hyphen (-) and have at least 3 characters',
    );
    this.tagResult.append(inputName);
  }

  private createInputSurname(): void {
    const inputSurname = this.createTag<HTMLInputElement>('input');
    inputSurname.name = 'surname';
    inputSurname.placeholder = 'Surname';
    inputSurname.autocomplete = 'family-name';
    inputSurname.required = true;
    inputSurname.pattern = '^[A-Z][\\-a-zA-z]{3,15}';
    inputSurname.title =
      'The surname must contain a capital first letter, can contain a hyphen (-) and have at least 4 characters';
    this.bindValidity(
      inputSurname,
      'Enter Correct Surname. The surname must contain a capital first letter, can contain a hyphen (-) and have at least 4 characters',
    );
    this.tagResult.append(inputSurname);
  }

  private bindValidity(input: HTMLInputElement, message: string): void {
    input.addEventListener('invalid', () => {
      input.setCustomValidity(message);
    });
    input.addEventListener('input', () => {
      input.setCustomValidity('');
    });
  }

  private createSubmit(): void {
    const submit = this.createTag<HTMLInputElement>('input');
    submit.className = 'btn submit-form';
    submit.value = 'enter';
    submit.type = 'submit';
    this.tagResult.append(submit);
    this.tagResult.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(this.tagResult);
      const name = String(formData.get('name') ?? '');
      const surname = String(formData.get('surname') ?? '');
      gameStore.login({ name, surname });
      replaceMain(
        this.parentComponent,
        new StartScreenComponent(this.parentComponent),
      );
    });
  }
}
