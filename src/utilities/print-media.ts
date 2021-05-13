export type ChangeEventListener = (event: MediaQueryListEvent) => void;

export function addPrintMediaChangeEventListener(
  callback: ChangeEventListener,
): void {
  if (window.matchMedia) {
    const match = window.matchMedia('print');
    if (match) {
      match.addEventListener('change', callback);
    }
  }
}

export function removePrintMediaChangeEventListener(
  callback: ChangeEventListener,
): void {
  if (window.matchMedia) {
    const match = window.matchMedia('print');
    if (match) {
      match.removeEventListener('change', callback);
    }
  }
}
