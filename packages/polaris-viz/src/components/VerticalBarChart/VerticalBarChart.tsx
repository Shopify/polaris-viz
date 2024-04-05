import type {
  ChartType,
  DataSeries,
  XAxisOptions,
  YAxisOptions,
  BoundingRect,
  LabelFormatter,
} from '@shopify/polaris-viz-core';
import type {ReactNode} from 'react';

import type {
  AnnotationLookupTable,
  Formatters,
  RenderLegendContent,
  RenderTooltipContentData,
} from '../../types';
import {useTheme, useThemeSeriesColors} from '../../hooks';

import {Chart} from './Chart';

export interface VerticalBarChartProps {
  data: DataSeries[];
  formatters: Formatters;
  renderTooltipContent(data: RenderTooltipContentData): ReactNode;
  showLegend: boolean;
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions: Required<YAxisOptions>;
  annotationsLookupTable?: AnnotationLookupTable;
  barOptions?: {isStacked: boolean};
  dimensions?: BoundingRect;
  emptyStateText?: string;
  renderHiddenLegendLabel?: (count: number) => string;
  renderLegendContent?: RenderLegendContent;
  type?: ChartType;
}

export function VerticalBarChart({
  annotationsLookupTable = {},
  data,
  dimensions,
  emptyStateText,
  formatters,
  renderHiddenLegendLabel,
  renderLegendContent,
  renderTooltipContent,
  showLegend,
  type = 'default',
  xAxisOptions,
  yAxisOptions,
}: VerticalBarChartProps) {
  const selectedTheme = useTheme();
  const seriesColors = useThemeSeriesColors(data, selectedTheme);

  const seriesWithDefaults = data.map((series, index) => ({
    color: seriesColors[index],
    ...series,
  }));

  return (
    <Chart
      annotationsLookupTable={annotationsLookupTable}
      data={seriesWithDefaults}
      dimensions={dimensions}
      emptyStateText={emptyStateText}
      formatters={formatters}
      renderHiddenLegendLabel={renderHiddenLegendLabel}
      renderLegendContent={renderLegendContent}
      renderTooltipContent={renderTooltipContent}
      showLegend={showLegend}
      type={type}
      xAxisOptions={xAxisOptions}
      yAxisOptions={yAxisOptions}
    />
  );
}
