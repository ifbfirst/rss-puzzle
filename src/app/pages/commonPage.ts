import { BaseComponent } from '../interfaces/baseComponent';
import { CommonComponent } from '../interfaces/commonComponent';
import { Header } from '../component/header/header';

export class CommonPage extends BaseComponent {
  private tagMain: HTMLElement = this.createTag('main');

  getResultTag(): HTMLElement {
    return this.tagMain;
  }

  public setPage(header: Header, component: CommonComponent) {
    document.body.appendChild(header.getResultTag());
    document.body.appendChild(this.tagMain);

    this.tagMain.appendChild(component.getResultTag());
  }
}
