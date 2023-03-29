import {useMemo} from 'react';

export interface Props {
  dataLength: number;
  skipEveryNthLabel?: number;
}

export function useReducedLabelIndexes({
  dataLength,
  skipEveryNthLabel = -1,
}: Props) {
  const visibleIndexesForWideCharts = useMemo(() => {
    if (dataLength === 0 || skipEveryNthLabel === 1) {
      return [];
    }

    return Array(dataLength)
      .fill(null)
      .map((_, index) => index)
      .filter((_, index) => (index - 1) % skipEveryNthLabel === 0);
  }, [dataLength, skipEveryNthLabel]);

  return visibleIndexesForWideCharts;
}
