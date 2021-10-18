import {useMemo} from 'react';

import {clamp, getTextHeight} from '../../../utilities';
import {FONT_SIZE, LINE_HEIGHT} from '../../../constants';
import type {Dimensions} from '../../../types';
import {
  LABEL_HEIGHT,
  MAX_X_AXIS_LINES,
  MIN_BAR_HEIGHT,
  PADDING_UNDER_LAST_GROUP,
  SPACE_BETWEEN_SERIES_AND_LABELS,
  SPACE_BETWEEN_SETS,
} from '../constants';
import type {LabelFormatter} from '../types';

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
// HorizontalBarChart groups and individual bars
export function useBarSizes({
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
    const bottomPadding = isSimple ? 0 : PADDING_UNDER_LAST_GROUP;
    // Push the container taller to line up last bar
    const simpleHeight = chartDimensions.height + SPACE_BETWEEN_SETS;

    const containerHeight = isSimple ? simpleHeight : chartDimensions.height;

    const groupHeight =
      (containerHeight - tallestXAxisLabel - bottomPadding) / seriesLength;
    const chartHeight =
      groupHeight * seriesLength + tallestXAxisLabel + bottomPadding;
    const seriesAreaHeight =
      chartHeight -
      bottomPadding -
      SPACE_BETWEEN_SERIES_AND_LABELS -
      tallestXAxisLabel;

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

    return {
      bandwidth,
      barHeight,
      chartHeight,
      groupBarsAreaHeight,
      groupHeight,
      seriesAreaHeight,
      tallestXAxisLabel,
      totalChartHeight: chartHeight,
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
