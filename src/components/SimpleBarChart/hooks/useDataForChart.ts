import {useMemo} from 'react';

import {FONT_SIZE} from '../../../constants';
import type {DataSeries} from '../../../types';
import {getTextWidth} from '../../../utilities';
import {BAR_LABEL_OFFSET, FONT_SIZE_PADDING} from '../constants';
import type {LabelFormatter} from '../types';

interface Props {
  isSimple: boolean;
  isStacked: boolean;
  labelFormatter: LabelFormatter;
  series: DataSeries[];
}

export function useDataForChart({
  labelFormatter,
  series,
  isSimple,
  isStacked,
}: Props) {
  const allNumbers = useMemo(() => {
    return series.reduce<number[]>((prev, cur) => {
      const numbers = cur.data.map(({value}) => value);
      return prev.concat(...numbers);
    }, []);
  }, [series]);

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
          }) + BAR_LABEL_OFFSET;

    const positiveTextSize =
      highestPositive < 0
        ? 0
        : getTextWidth({
            text: `${labelFormatter(highestPositive)}`,
            fontSize,
          }) + BAR_LABEL_OFFSET;

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
