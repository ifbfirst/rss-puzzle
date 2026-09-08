import { CommonComponent } from '../interfaces/commonComponent';
import { BaseComponent } from '../interfaces/baseComponent';

export function replaceMain(
  parent: BaseComponent | null,
  next: CommonComponent,
): void {
  const main = parent?.getResultTag();
  if (!main) {
    return;
  }
  main.replaceChildren(next.getResultTag());
}
