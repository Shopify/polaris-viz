import {useContext, useMemo} from 'react';

import {HORIZONTAL_LABEL_MIN_WIDTH} from '../constants';
import {estimateStringWidth, clamp} from '../utilities';
import type {DataSeries, LinearXAxisOptions} from '../types';
import {ChartContext} from '../components';

import {useLinearXScale} from './useLinearXScale';
import {useTheme} from './useTheme';
import {useMinimalLabelIndexes} from './useMinimalLabelIndexes';

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

  const labelWidth = useMemo(() => {
    if (data == null || data.length === 0) {
      return 0;
    }

    const longestLabelWidth = labels.reduce((prev, cur) => {
      const width = estimateStringWidth(cur, characterWidths);

      if (width > prev) {
        return width;
      }

      return prev;
      // Make the starting point 1px wider than the
      // minimum so we skip the diagonal line logic
    }, HORIZONTAL_LABEL_MIN_WIDTH + 1);

    return clamp({
      amount: Math.min(drawableWidth / data[0].data.length, longestLabelWidth),
      min: 0,
      max: drawableWidth,
    });
  }, [data, drawableWidth, characterWidths, labels]);

  const {minimalLabelIndexes} = useMinimalLabelIndexes({
    data,
    useMinimalLabels: xAxisOptions.useMinimalLabels,
  });

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
      minimalLabelIndexes,
    },
    xScale,
  };
}
