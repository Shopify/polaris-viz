import {useMemo} from 'react';

import {HORIZONTAL_LABEL_MIN_WIDTH} from '../constants';

const MIDDLE_LABEL_EVEN_THRESHOLD = 10;

export interface Props {
  useMinimalLabels: boolean;
  dataLength: number;
  dropLabelsForWidth?: boolean;
}

export function useReducedLabelIndexes({
  useMinimalLabels,
  dataLength,
  dropLabelsForWidth = false,
}: Props) {
  const visibleIndexesForWideCharts = useMemo(() => {
    if (useMinimalLabels || !dropLabelsForWidth) {
      return [];
    }

    return Array(dataLength)
      .fill(null)
      .map((_, index) => index)
      .filter((_, index) => index % HORIZONTAL_LABEL_MIN_WIDTH === 0);
  }, [dropLabelsForWidth, dataLength, useMinimalLabels]);

  if (visibleIndexesForWideCharts.length > 0) {
    return visibleIndexesForWideCharts;
  }

  if (!useMinimalLabels || dataLength < 2) {
    return [];
  }

  const oddNumberOfBars = dataLength % 2 !== 0;

  const middleLabelIndex =
    oddNumberOfBars || dataLength > MIDDLE_LABEL_EVEN_THRESHOLD
      ? [Math.floor(dataLength / 2)]
      : [];

  return [0, ...middleLabelIndex, dataLength - 1];
}
