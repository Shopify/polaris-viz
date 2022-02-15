import {useContext, useMemo} from 'react';

import {HORIZONTAL_LABEL_MIN_WIDTH} from '../../../constants';
import {useMinimalLabelIndexes} from '../../../hooks/useMinimalLabelIndexes';
import {estimateStringWidth} from '../../Labels/utilities';
import {clamp} from '../../../utilities';
import {useLinearXScale, useTheme} from '../../../hooks';
import type {DataSeries} from '../../../types';
import type {XAxisOptions} from '../types';
import {ChartContext} from '../../ChartContainer';

interface Props {
  data: DataSeries[];
  longestSeriesLength: number;
  width: number;
  labels: string[];
  xAxisOptions: XAxisOptions;
  yAxisLabelWidth: number;
  theme?: string;
}

export function useChartLabelsAndDimensions({
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

  const longestLabelWidth = useMemo(() => {
    return labels.reduce((prev, cur) => {
      const width = estimateStringWidth(cur, characterWidths);

      if (width > prev) {
        return width;
      }

      return prev;
      // Make the starting point 1px wider than the
      // minimum so we skip the diagonal line logic
    }, HORIZONTAL_LABEL_MIN_WIDTH + 1);
  }, [labels, characterWidths]);

  const horizontalMargin = selectedTheme.grid.horizontalMargin;
  let chartStartPosition = yAxisLabelWidth + horizontalMargin;

  let drawableWidth = width - chartStartPosition;

  const labelWidth = clamp({
    amount: Math.min(drawableWidth / data[0].data.length, longestLabelWidth),
    min: 0,
    max: drawableWidth,
  });

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
