import './header.css';
import { BaseComponent } from '../../interfaces/baseComponent';

export class Header extends BaseComponent {
  private tagHeader: HTMLElement;

  constructor(commonPage: BaseComponent | null) {
    super(commonPage);
    this.tagHeader = this.createTag('header');

    const title = this.createTag('h1');
    title.textContent = 'Puzzle';
    this.tagHeader.appendChild(title);
  }

  getResultTag(): HTMLElement {
    return this.tagHeader;
  }
}
