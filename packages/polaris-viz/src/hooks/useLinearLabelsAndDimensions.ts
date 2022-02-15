import {useContext, useMemo} from 'react';
import {DataSeries, useTheme} from '@shopify/polaris-viz-core';

import {
  HORIZONTAL_LABEL_MIN_WIDTH,
  VERTICAL_LABEL_MIN_WIDTH,
} from '../constants';
import {estimateStringWidth, clamp} from '../utilities';
import type {LinearXAxisOptions} from '../types';
import {ChartContext} from '../components';

import {useLinearXScale} from './useLinearXScale';
import {useReducedLabelIndexes} from './use-reduced-label-indexes';

interface Props {
  data: DataSeries[];
  longestSeriesLength: number;
  width: number;
  labels: string[];
  xAxisOptions: LinearXAxisOptions;
  yAxisLabelWidth: number;
  theme?: string;
}

export function useLinearLabelsAndDimensions({
  data,
  longestSeriesLength,
  theme,
  labels,
  width,
  xAxisOptions,
  yAxisLabelWidth,
}: Props) {
  const selectedTheme = useTheme(theme);
  const {characterWidths} = useContext(ChartContext);

  const horizontalMargin = selectedTheme.grid.horizontalMargin;
  let chartStartPosition = yAxisLabelWidth + horizontalMargin;

  let drawableWidth = width - chartStartPosition;

  const longestSeriesLastIndex = useMemo(
    () =>
      data.reduce(
        (max, currentSeries) => Math.max(max, currentSeries.data.length),
        0,
      ),
    [data],
  );

  const reducedLabelIndexes = useReducedLabelIndexes({
    dataLength: longestSeriesLastIndex,
    useMinimalLabels: xAxisOptions.useMinimalLabels,
    dropLabelsForWidth:
      drawableWidth < labels.length * VERTICAL_LABEL_MIN_WIDTH,
  });

  const visibleLabelsCount =
    reducedLabelIndexes.length > 0 ? reducedLabelIndexes.length : labels.length;

  const labelWidth = useMemo(() => {
    if (visibleLabelsCount === 0) {
      return 0;
    }

    const longestLabelWidth = labels.reduce((prev, cur) => {
      const width = estimateStringWidth(cur, characterWidths);

      if (width > prev) {
        return width;
      }

      return prev;
    }, HORIZONTAL_LABEL_MIN_WIDTH);

    return clamp({
      amount: Math.min(drawableWidth / visibleLabelsCount, longestLabelWidth),
      min: 0,
      max: drawableWidth,
    });
  }, [drawableWidth, characterWidths, labels, visibleLabelsCount]);

  drawableWidth -= labelWidth;
  chartStartPosition += labelWidth / 2;

  const {xScale} = useLinearXScale({
    drawableWidth,
    longestSeriesLength,
  });

  return {
    chartStartPosition,
    drawableWidth,
    xAxisDetails: {
      labelWidth,
      reducedLabelIndexes,
    },
    xScale,
    labels,
  };
}
