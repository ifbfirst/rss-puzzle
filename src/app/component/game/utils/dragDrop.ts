import { checkResult } from './checkResult';

export function addDragDrop(
  sentenceTag: HTMLElement,
  levelNumber: number,
  roundNumber: number,
  sentenceNumber: number,
  sentence: string,
): void {
  sentenceTag.addEventListener('dragstart', (e: Event) => {
    const target = <HTMLElement>e.target;
    target?.classList.add('selected');
  });

  sentenceTag.addEventListener('dragend', (e: Event) => {
    const target = <HTMLElement>e.target;
    target?.classList.remove('selected');
  });

  sentenceTag.addEventListener('dragover', (e: MouseEvent) => {
    e.preventDefault();
    const activeElement = sentenceTag.querySelector('.selected');
    const currentElement = <HTMLElement>e.target;
    const isMoveable =
      activeElement !== currentElement &&
      currentElement?.hasAttribute('draggable');
    if (!isMoveable) {
      return;
    }
    const getNextElement = (
      cursorPosition: number,
      currentElement: HTMLElement,
    ) => {
      const currentElementCoord = currentElement.getBoundingClientRect();
      const currentElementCenter =
        currentElementCoord.y + currentElementCoord.height / 2;
      const nextElement =
        cursorPosition < currentElementCenter
          ? currentElement
          : currentElement.nextElementSibling;

      return nextElement;
    };
    const nextElement = getNextElement(e.clientY, currentElement);
    if (
      (nextElement && activeElement === nextElement.previousElementSibling) ||
      activeElement === nextElement
    ) {
      return;
    }
    if (activeElement) sentenceTag.insertBefore(activeElement, nextElement);
    checkResult(
      levelNumber,
      roundNumber,
      sentenceNumber,
      sentenceTag,
      sentence,
    );
  });
}
