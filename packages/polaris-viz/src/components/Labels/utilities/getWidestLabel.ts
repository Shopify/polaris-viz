import type {PreparedLabels} from '../types';

export function getWidestLabel(labels: PreparedLabels[]) {
  let longestIndex = -1;
  let longestWidth = 0;

  labels.forEach(({truncatedWidth}, index) => {
    if (truncatedWidth > longestWidth) {
      longestIndex = index;
      longestWidth = truncatedWidth;
    }
  });

  return labels[longestIndex];
}
