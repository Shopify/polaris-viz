import {useMemo} from 'react';

import type {Dimensions} from '../../../types';
import {
  LABEL_HEIGHT,
  SIZES,
  SPACE_BETWEEN_SETS,
  SPACE_BETWEEN_SINGLE,
} from '../constants';
import type {Size} from '../types';

interface Props {
  chartDimensions: Dimensions;
  isSimple: boolean;
  isStacked: boolean;
  singleBarCount: number;
  size: Size;
  seriesLength: number;
  ticksCount: number;
}

interface Return {
  bandwidth: number;
  groupHeight: number;
  barHeight: number;
  chartHeight: number;
}

// Returns all the data needed to size and position the
// HorizontalBarChart groups and individual bars
export function useBarSizes({
  chartDimensions,
  isSimple,
  isStacked,
  singleBarCount,
  size,
  seriesLength,
  ticksCount,
}: Props): Return {
  return useMemo(() => {
    const barHeight: number = SIZES[size];

    const bottomPadding = isSimple ? 0 : LABEL_HEIGHT;
    const bandwidth = chartDimensions.width / ticksCount;

    const totalBarsHeight = isStacked ? barHeight : barHeight * singleBarCount;

    const totalSpaceBetweenBars = SPACE_BETWEEN_SINGLE * singleBarCount - 1;

    const groupHeight =
      LABEL_HEIGHT +
      totalBarsHeight +
      totalSpaceBetweenBars +
      SPACE_BETWEEN_SETS;

    const chartHeight = groupHeight * seriesLength + bottomPadding;
    const simpleChartHeight =
      groupHeight * seriesLength + bottomPadding - SPACE_BETWEEN_SETS;

    return {
      barHeight,
      groupHeight,
      chartHeight: isSimple ? simpleChartHeight : chartHeight,
      bandwidth,
    };
  }, [
    chartDimensions,
    isSimple,
    isStacked,
    seriesLength,
    singleBarCount,
    size,
    ticksCount,
  ]);
}
