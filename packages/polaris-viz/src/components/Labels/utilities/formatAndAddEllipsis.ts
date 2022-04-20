import {ELLIPSIS} from '../../../constants';

export function formatAndAddEllipsis(label: string) {
  let newLabel = label.trimEnd();

  // remove space or dash at end of string before adding an ellipsis
  if (newLabel.endsWith('-')) {
    newLabel = newLabel.substring(0, newLabel.length - 1);
  }

  return `${newLabel}${ELLIPSIS}`;
}
