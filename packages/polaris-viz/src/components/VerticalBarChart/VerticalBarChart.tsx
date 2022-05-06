import React from 'react';
import type {
  ChartType,
  DataSeries,
  XAxisOptions,
  YAxisOptions,
  Dimensions,
} from '@shopify/polaris-viz-core';

import type {RenderTooltipContentData} from '../../types';
import {useTheme, useThemeSeriesColors} from '../../hooks';
import type {AnnotationLookupTable} from '../BarChart';

import {Chart} from './Chart';

export interface VerticalBarChartProps {
  data: DataSeries[];
  renderTooltipContent(data: RenderTooltipContentData): React.ReactNode;
  showLegend: boolean;
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions: Required<YAxisOptions>;
  annotationsLookupTable?: AnnotationLookupTable;
  barOptions?: {isStacked: boolean};
  emptyStateText?: string;
  isAnimated?: boolean;
  theme?: string;
  type?: ChartType;
  dimensions?: Dimensions;
}

export function VerticalBarChart({
  dimensions,
  annotationsLookupTable = {},
  data,
  emptyStateText,
  isAnimated = false,
  renderTooltipContent,
  showLegend,
  theme,
  type = 'default',
  xAxisOptions,
  yAxisOptions,
}: VerticalBarChartProps) {
  const selectedTheme = useTheme(theme);
  const seriesColors = useThemeSeriesColors(data, selectedTheme);

  const seriesWithDefaults = data.map((series, index) => ({
    color: seriesColors[index],
    ...series,
  }));

  return (
    <Chart
      dimensions={dimensions}
      theme={theme}
      annotationsLookupTable={annotationsLookupTable}
      data={seriesWithDefaults}
      emptyStateText={emptyStateText}
      isAnimated={isAnimated}
      renderTooltipContent={renderTooltipContent}
      showLegend={showLegend}
      type={type}
      xAxisOptions={xAxisOptions}
      yAxisOptions={yAxisOptions}
    />
  );
}
