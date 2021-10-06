import {useMemo} from 'react';

import {clamp} from '../../../utilities';
import type {Dimensions} from '../../../types';
import {LABEL_HEIGHT, MIN_BAR_HEIGHT, SPACE_BETWEEN_SETS} from '../constants';

interface Props {
  chartDimensions: Dimensions;
  isSimple: boolean;
  isStacked: boolean;
  singleBarCount: number;
  seriesLength: number;
  ticksCount: number;
}

// Returns all the data needed to size and position the
// HorizontalBarChart groups and individual bars
export function useBarSizes({
  chartDimensions,
  isSimple,
  isStacked,
  singleBarCount,
  seriesLength,
  ticksCount,
}: Props) {
  return useMemo(() => {
    const bottomPadding = isSimple ? 0 : LABEL_HEIGHT;
    const bandwidth = chartDimensions.width / ticksCount;
    // Push the container taller to line up last bar
    const simpleHeight = chartDimensions.height + SPACE_BETWEEN_SETS;

    const containerHeight = isSimple ? simpleHeight : chartDimensions.height;

    const groupHeight = (containerHeight - bottomPadding) / seriesLength;

    const groupBarsAreaHeight = groupHeight - LABEL_HEIGHT - SPACE_BETWEEN_SETS;

    const barHeight = clamp({
      amount: groupBarsAreaHeight / (isStacked ? 1 : singleBarCount),
      min: MIN_BAR_HEIGHT,
      max: Infinity,
    });

    if (groupBarsAreaHeight < 0) {
      // eslint-disable-next-line no-console
      console.error(
        'The height available for drawing the chart is too small and this will cause overlaps between labels and bars. Maybe you should increase the chart height or use fewer data series?',
      );
    }

    const chartHeight = groupHeight * seriesLength + bottomPadding;

    return {
      bandwidth,
      barHeight,
      chartHeight,
      groupBarsAreaHeight,
      groupHeight,
    };
  }, [
    chartDimensions,
    isSimple,
    isStacked,
    seriesLength,
    singleBarCount,
    ticksCount,
  ]);
}
