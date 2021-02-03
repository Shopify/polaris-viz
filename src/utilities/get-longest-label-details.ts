import {getTextWidth} from '../utilities/get-text-width';

export function getLongestLabelDetails(labels: string[], fontSize: number) {
  return labels
    .map((label) => {
      return {
        label,
        length: getTextWidth({text: label, fontSize}),
      };
    })
    .reduce(
      (prev, current) => (prev.length > current.length ? prev : current),
      {label: '', length: 0},
    );
}
