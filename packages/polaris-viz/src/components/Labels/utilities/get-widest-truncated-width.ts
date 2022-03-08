import type {PreparedLabels} from '../types';

export function getWidestTruncatedWidth(labels: PreparedLabels[]) {
  if (labels == null || labels.length === 0) {
    return 0;
  }

  return labels.reduce((prev, {truncatedWidth}) => {
    if (truncatedWidth > prev) {
      return truncatedWidth;
    }

    return prev;
  }, 0);
}
