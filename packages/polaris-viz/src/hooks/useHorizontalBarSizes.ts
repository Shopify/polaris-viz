import {useMemo} from 'react';
import type {Dimensions} from '@shopify/polaris-viz-core';

import {clamp, getTextHeight} from '../utilities';
import {
  FONT_SIZE,
  HORIZONTAL_GROUP_LABEL_HEIGHT,
  HORIZONTAL_SPACE_BETWEEN_CHART_AND_AXIS,
  HORIZONTAL_SPACE_BETWEEN_SETS,
  HORIZONTAL_SPACE_BETWEEN_SINGLE,
  LINE_HEIGHT,
  MAX_X_AXIS_LINES,
} from '../constants';
import type {LabelFormatter} from '../types';

const MIN_BAR_HEIGHT = 6;

interface Props {
  chartDimensions: Dimensions;
  isSimple: boolean;
  isStacked: boolean;
  labelFormatter: LabelFormatter;
  seriesLength: number;
  singleBarCount: number;
  ticks: number[];
}

// Returns all the data needed to size and position the
// horizontal bar groups and individual bars
export function useHorizontalBarSizes({
  chartDimensions,
  isSimple,
  isStacked,
  labelFormatter,
  seriesLength,
  singleBarCount,
  ticks,
}: Props) {
  const bandwidth = chartDimensions.width / ticks.length;

  const tallestXAxisLabel = useMemo(() => {
    const maxHeight = LINE_HEIGHT * MAX_X_AXIS_LINES;

    const longestLabel = ticks.reduce((prev, cur) => {
      const label = `${labelFormatter(cur)}`;

      if (label.length > prev.length) {
        return label;
      }

      return prev;
    }, '');

    const height = getTextHeight({
      text: longestLabel,
      fontSize: FONT_SIZE,
      containerWidth: bandwidth / 2,
    });

    return clamp({amount: height, min: 0, max: maxHeight});
  }, [ticks, labelFormatter, bandwidth]);

  return useMemo(() => {
    const spaceBetweenXAxis = isSimple
      ? 0
      : HORIZONTAL_SPACE_BETWEEN_CHART_AND_AXIS;
    // Push the container taller to line up last bar
    const simpleHeight = chartDimensions.height + HORIZONTAL_SPACE_BETWEEN_SETS;

    const containerHeight = isSimple ? simpleHeight : chartDimensions.height;
    const xAxisHeight = isSimple ? 0 : tallestXAxisLabel + spaceBetweenXAxis;
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
      bandwidth,
      barHeight,
      chartHeight,
      groupBarsAreaHeight,
      groupHeight,
      tallestXAxisLabel,
    };
  }, [
    bandwidth,
    chartDimensions,
    isSimple,
    isStacked,
    seriesLength,
    singleBarCount,
    tallestXAxisLabel,
  ]);
}
