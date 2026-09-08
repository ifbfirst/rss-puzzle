import './header.css';
import { BaseComponent } from '../../interfaces/baseComponent';
import { LoginForm } from '../loginForm/loginForm';
import { gameStore } from '../../state/store';
import { replaceMain } from '../../helpers/dom';

export class Header extends BaseComponent {
  private tagHeader: HTMLElement;

  constructor(commonPage: BaseComponent | null) {
    super(commonPage);
    this.tagHeader = this.createTag('header');

    const title = this.createTag('h1');
    title.textContent = 'Puzzle';
    this.tagHeader.appendChild(title);

    const logout = this.createTag<HTMLButtonElement>('button');
    logout.type = 'button';
    logout.className = 'logout';
    logout.textContent = 'Logout';
    this.tagHeader.appendChild(logout);

    const syncLogout = (): void => {
      logout.hidden = !gameStore.isLoggedIn();
    };
    syncLogout();
    gameStore.subscribe(syncLogout);

    logout.addEventListener('click', () => {
      gameStore.logout();
      replaceMain(this.parentComponent, new LoginForm(this.parentComponent));
    });
  }

  getResultTag(): HTMLElement {
    return this.tagHeader;
  }
}
