import { getGameSession } from '../sessionRef';

export function addDragDrop(container: HTMLElement): void {
  container.addEventListener('dragstart', (event: DragEvent) => {
    const target = event.target as HTMLElement | null;
    target?.classList.add('selected');
  });

  container.addEventListener('dragend', (event: DragEvent) => {
    const target = event.target as HTMLElement | null;
    target?.classList.remove('selected');
    getGameSession().afterWordMove();
  });

  container.addEventListener('dragover', (event: DragEvent) => {
    event.preventDefault();
    const activeElement = container.querySelector('.selected');
    const currentElement = event.target as HTMLElement | null;
    const isMoveable =
      activeElement !== currentElement &&
      Boolean(currentElement?.hasAttribute('draggable'));
    if (!isMoveable || !currentElement || !activeElement) {
      return;
    }
    const nextElement = getNextElement(event.clientX, currentElement);
    if (
      activeElement === nextElement ||
      (nextElement && activeElement === nextElement.previousElementSibling)
    ) {
      return;
    }
    container.insertBefore(activeElement, nextElement);
    getGameSession().afterWordMove();
  });
}

function getNextElement(
  cursorPosition: number,
  currentElement: HTMLElement,
): Element | null {
  const box = currentElement.getBoundingClientRect();
  const center = box.x + box.width / 2;
  if (cursorPosition < center) {
    return currentElement;
  }
  return currentElement.nextElementSibling;
}
