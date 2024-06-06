import './header.css';
import { BaseComponent } from '../../interfaces/baseComponent';
import { LoginForm } from '../loginForm/loginForm';

export class Header extends BaseComponent {
  getResultTag(): HTMLElement {
    return this.tagHeader;
  }
  private tagHeader: HTMLElement;
  private tagH1: HTMLElement;
  private tagDivLogout: HTMLElement;

  constructor(commonPage: BaseComponent | null) {
    super(commonPage);
    this.tagHeader = this.createTag('header');
    this.tagDivLogout = this.createTag('div');
    this.tagDivLogout.className = 'logout';
    this.tagDivLogout.textContent = 'Logout';
    this.tagHeader.appendChild(this.tagDivLogout);
    const parentComponent = this.parentComponent;

    this.tagDivLogout.onclick = function () {
      const tagMain = parentComponent?.getResultTag();
      localStorage.removeItem('name');
      localStorage.removeItem('surname');
      localStorage.removeItem('img-hint');
      localStorage.removeItem('audio-hint');
      localStorage.removeItem('translate-hint');
      localStorage.removeItem('level');
      localStorage.removeItem('round');

      {
        while (tagMain?.firstChild) {
          tagMain.removeChild(tagMain.firstChild);
        }
      }
      const startScreen = new LoginForm(parentComponent);
      tagMain?.appendChild(startScreen.getResultTag());
    };

    this.tagH1 = this.createTag('h1');
    this.tagHeader.appendChild(this.tagH1);
    this.tagH1.textContent = 'Puzzle';
  }
}
