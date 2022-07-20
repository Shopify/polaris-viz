import {useMemo} from 'react';
import {
  DataSeries,
  useTheme,
  LINEAR_LABELS_INNER_PADDING,
  estimateStringWidth,
  clamp,
  useChartContext,
} from '@shopify/polaris-viz-core';
import type {XAxisOptions} from '@shopify/polaris-viz-core';

import {HORIZONTAL_LABEL_MIN_WIDTH} from '../constants';

import {useLinearXScale} from './useLinearXScale';
import {useReducedLabelIndexes} from './useReducedLabelIndexes';

interface Props {
  data: DataSeries[];
  longestSeriesLength: number;
  width: number;
  labels: string[];
  xAxisOptions: Required<XAxisOptions>;
  yAxisLabelWidth: number;
  theme: string;
}

export function useLinearLabelsAndDimensions({
  data,
  longestSeriesLength,
  theme,
  labels,
  width,
  yAxisLabelWidth,
}: Props) {
  const selectedTheme = useTheme(theme);
  const {characterWidths} = useChartContext();

  const horizontalMargin = selectedTheme.grid.horizontalMargin;
  let chartXPosition = horizontalMargin + yAxisLabelWidth;

  let drawableWidth = width - chartXPosition - horizontalMargin;

  const longestSeriesLastIndex = useMemo(
    () =>
      data.reduce(
        (max, currentSeries) => Math.max(max, currentSeries.data.length),
        0,
      ),
    [data],
  );

  const longestLabelWidth = useMemo(() => {
    const longestLabelWidth =
      labels.reduce((prev, cur) => {
        const width = estimateStringWidth(cur, characterWidths);

        if (width > prev) {
          return width;
        }

        return prev;
      }, HORIZONTAL_LABEL_MIN_WIDTH) + LINEAR_LABELS_INNER_PADDING;

    return clamp({
      amount: longestLabelWidth,
      min: 0,
      max: 75,
    });
  }, [labels, characterWidths]);

  const numberOfLabelsThatFit = Math.floor(drawableWidth / longestLabelWidth);
  const skipEveryNthLabel = Math.ceil(labels.length / numberOfLabelsThatFit);

  const reducedLabelIndexes = useReducedLabelIndexes({
    dataLength: longestSeriesLastIndex,
    skipEveryNthLabel,
  });

  const visibleLabelsCount =
    reducedLabelIndexes.length > 0 ? reducedLabelIndexes.length : labels.length;

  const labelWidth = useMemo(() => {
    if (visibleLabelsCount === 0) {
      return 0;
    }

    return clamp({
      amount: Math.min(
        drawableWidth / visibleLabelsCount - LINEAR_LABELS_INNER_PADDING,
        longestLabelWidth,
      ),
      min: 0,
      max: drawableWidth,
    });
  }, [drawableWidth, visibleLabelsCount, longestLabelWidth]);

  drawableWidth -= labelWidth;
  chartXPosition += labelWidth / 2;

  const {xScale} = useLinearXScale({
    drawableWidth,
    longestSeriesLength,
  });

  return {
    chartXPosition,
    drawableWidth,
    xAxisDetails: {
      labelWidth,
      reducedLabelIndexes,
    },
    xScale,
    labels,
  };
}
