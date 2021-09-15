import {maxIndex} from 'd3-array';

import {getTextWidth} from 'utilities/get-text-width';

export function getLongestLabelDetails(labels: string[], fontSize: number) {
  const longestLabelIndex = maxIndex(labels, (label) => label.length);

  const longestLabel = labels[longestLabelIndex];

  return {
    label: longestLabel,
    length: getTextWidth({text: longestLabel, fontSize}),
  };
}
