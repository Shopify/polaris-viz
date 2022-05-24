import {useMemo} from 'react';
import {clamp, Dimensions} from '@shopify/polaris-viz-core';

import {
  HORIZONTAL_GROUP_LABEL_HEIGHT,
  HORIZONTAL_SPACE_BETWEEN_CHART_AND_AXIS,
  HORIZONTAL_SPACE_BETWEEN_SETS,
  HORIZONTAL_SPACE_BETWEEN_SINGLE,
} from '../constants';

const MIN_BAR_HEIGHT = 6;

export interface Props {
  chartDimensions: Dimensions;
  isSimple: boolean;
  isStacked: boolean;
  labelHeight: number;
  seriesLength: number;
  singleBarCount: number;
}

// Returns all the data needed to size and position the
// horizontal bar groups and individual bars
export function useHorizontalBarSizes({
  chartDimensions,
  isSimple,
  isStacked,
  labelHeight,
  seriesLength,
  singleBarCount,
}: Props) {
  return useMemo(() => {
    const spaceBetweenXAxis = isSimple
      ? 0
      : HORIZONTAL_SPACE_BETWEEN_CHART_AND_AXIS;
    // Push the container taller to line up last bar
    const simpleHeight = chartDimensions.height + HORIZONTAL_SPACE_BETWEEN_SETS;

    const containerHeight = isSimple ? simpleHeight : chartDimensions.height;
    const xAxisHeight = isSimple ? 0 : labelHeight + spaceBetweenXAxis;
    const chartHeight = containerHeight - xAxisHeight;

    const groupHeight = chartHeight / seriesLength;

    const groupBarsAreaHeight =
      groupHeight -
      HORIZONTAL_GROUP_LABEL_HEIGHT -
      (singleBarCount - 1) * HORIZONTAL_SPACE_BETWEEN_SINGLE -
      HORIZONTAL_SPACE_BETWEEN_SETS;

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

    return {
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
    labelHeight,
  ]);
}
