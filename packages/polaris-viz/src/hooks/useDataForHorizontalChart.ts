import {useContext, useMemo} from 'react';
import type {DataSeries, LabelFormatter} from '@shopify/polaris-viz-core';
import {estimateStringWidth, ChartContext} from '@shopify/polaris-viz-core';

import {HORIZONTAL_BAR_LABEL_OFFSET} from '../constants';

interface Props {
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
  const {characterWidths} = useContext(ChartContext);

  const allNumbers = useMemo(() => {
    return data.reduce<number[]>((prev, cur) => {
      const numbers = cur.data
        .map(({value}) => value)
        .filter((value) => value !== null) as number[];
      return prev.concat(...numbers);
    }, []);
  }, [data]);

  const lowestNegative = useMemo(() => Math.min(...allNumbers), [allNumbers]);
  const highestPositive = useMemo(() => Math.max(...allNumbers), [allNumbers]);

  const longestLabel = useMemo(() => {
    if (!isSimple || isStacked) {
      return {positive: 0, negative: 0};
    }

    const negativeTextSize =
      lowestNegative >= 0
        ? 0
        : estimateStringWidth(
            `${labelFormatter(lowestNegative)}`,
            characterWidths,
          ) + HORIZONTAL_BAR_LABEL_OFFSET;

    const positiveTextSize =
      highestPositive < 0
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

  const areAllNegative = useMemo(() => {
    return !allNumbers.some((num) => {
      return num >= 0;
    });
  }, [allNumbers]);

  return {
    allNumbers,
    areAllNegative,
    highestPositive,
    longestLabel,
    lowestNegative,
  };
}
