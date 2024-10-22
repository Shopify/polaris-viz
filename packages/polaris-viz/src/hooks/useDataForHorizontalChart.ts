import {useMemo} from 'react';
import type {DataSeries, LabelFormatter} from '@shopify/polaris-viz-core';
import {useChartContext, estimateStringWidth} from '@shopify/polaris-viz-core';

import {HORIZONTAL_BAR_LABEL_OFFSET} from '../constants';

export interface Props {
  data: DataSeries[];
  isSimple: boolean;
  isStacked: boolean;
  labelFormatter: LabelFormatter;
}

export function useDataForHorizontalChart({
  data,
  isSimple,
  isStacked,
  labelFormatter,
}: Props) {
  const {characterWidths} = useChartContext();

  const allNumbers = useMemo(() => {
    return data.reduce<number[]>((prev, cur) => {
      const numbers = cur.data
        .map(({value}) => value)
        .filter((value) => value !== null) as number[];
      return prev.concat(...numbers);
    }, []);
  }, [data]);

  const lowestNegative = useMemo(
    () => Math.min(0, ...allNumbers),
    [allNumbers],
  );
  const highestPositive = useMemo(
    () => Math.max(0, ...allNumbers),
    [allNumbers],
  );

  if (!Number.isFinite(lowestNegative) || !Number.isFinite(highestPositive)) {
    throw new Error('Data must be finite');
  }

  const longestLabel = useMemo(() => {
    if (!isSimple && !isStacked) {
      return {positive: 0, negative: 0};
    }

    const negativeTextSize =
      lowestNegative === 0
        ? 0
        : estimateStringWidth(
            `${labelFormatter(lowestNegative)}`,
            characterWidths,
          ) + HORIZONTAL_BAR_LABEL_OFFSET;

    const positiveTextSize =
      highestPositive === 0
        ? 0
        : estimateStringWidth(
            `${labelFormatter(highestPositive)}`,
            characterWidths,
          ) + HORIZONTAL_BAR_LABEL_OFFSET;

    return {
      negative: negativeTextSize,
      positive: positiveTextSize,
    };
  }, [
    labelFormatter,
    isSimple,
    isStacked,
    highestPositive,
    lowestNegative,
    characterWidths,
  ]);

  const areAllZero = useMemo(() => {
    return !allNumbers.some((num) => num !== null && num !== 0);
  }, [allNumbers]);

  const areAllNegative = useMemo(() => {
    if (areAllZero) {
      return false;
    }

    return !allNumbers.some((num) => num !== null && num > 0);
  }, [areAllZero, allNumbers]);

  return {
    allNumbers,
    areAllNegative,
    longestLabel,
  };
}
