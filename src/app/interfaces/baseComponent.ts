import { CommonComponent } from './commonComponent';

export abstract class BaseComponent implements CommonComponent {
  protected parentComponent: BaseComponent | null;

  abstract getResultTag(): HTMLElement;

  createTag<T extends HTMLElement>(tagName: string): T {
    return document.createElement(tagName) as T;
  }

  constructor(parentComponent: BaseComponent | null) {
    this.parentComponent = parentComponent;
  }
}
