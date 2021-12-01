import {useMemo} from 'react';

import {
  FONT_SIZE,
  FONT_SIZE_PADDING,
  HORIZONTAL_BAR_LABEL_OFFSET,
} from '../constants';
import {getTextWidth} from '../utilities';
import type {DataSeries, LabelFormatter} from '../types';

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
  const allNumbers = useMemo(() => {
    return data.reduce<number[]>((prev, cur) => {
      const numbers = cur.data
        .map(({value}) => value)
        .filter(Boolean) as number[];
      return prev.concat(...numbers);
    }, []);
  }, [data]);

  const lowestNegative = useMemo(() => Math.min(...allNumbers), [allNumbers]);
  const highestPositive = useMemo(() => Math.max(...allNumbers), [allNumbers]);

  const longestLabel = useMemo(() => {
    if (!isSimple || isStacked) {
      return {positive: 0, negative: 0};
    }

    const fontSize = FONT_SIZE + FONT_SIZE_PADDING;

    const negativeTextSize =
      lowestNegative >= 0
        ? 0
        : getTextWidth({
            text: `${labelFormatter(lowestNegative)}`,
            fontSize,
          }) + HORIZONTAL_BAR_LABEL_OFFSET;

    const positiveTextSize =
      highestPositive < 0
        ? 0
        : getTextWidth({
            text: `${labelFormatter(highestPositive)}`,
            fontSize,
          }) + HORIZONTAL_BAR_LABEL_OFFSET;

    return {
      negative: negativeTextSize,
      positive: positiveTextSize,
    };
  }, [labelFormatter, isSimple, isStacked, highestPositive, lowestNegative]);

  const areAllNegative = useMemo(() => {
    return !allNumbers.some((num) => num >= 0);
  }, [allNumbers]);

  return {
    allNumbers,
    areAllNegative,
    highestPositive,
    longestLabel,
    lowestNegative,
  };
}
