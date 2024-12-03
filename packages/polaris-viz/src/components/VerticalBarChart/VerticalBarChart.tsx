import type {
  ChartType,
  DataSeries,
  XAxisOptions,
  YAxisOptions,
  LabelFormatter,
} from '@shopify/polaris-viz-core';
import type {ReactNode} from 'react';
import {useTheme, useThemeSeriesColors} from '@shopify/polaris-viz-core';

import type {
  AnnotationLookupTable,
  RenderLegendContent,
  RenderTooltipContentData,
} from '../../types';

import {Chart} from './Chart';

export interface VerticalBarChartProps {
  data: DataSeries[];
  renderTooltipContent(data: RenderTooltipContentData): ReactNode;
  showLegend: boolean;
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions: Required<YAxisOptions>;
  seriesNameFormatter: LabelFormatter;
  annotationsLookupTable?: AnnotationLookupTable;
  barOptions?: {isStacked: boolean};
  emptyStateText?: string;
  renderLegendContent?: RenderLegendContent;
  type?: ChartType;
  renderHiddenLegendLabel?: (count: number) => string;
}

export function VerticalBarChart({
  annotationsLookupTable = {},
  data,
  emptyStateText,
  renderLegendContent,
  renderTooltipContent,
  showLegend,
  type = 'default',
  xAxisOptions,
  yAxisOptions,
  renderHiddenLegendLabel,
  seriesNameFormatter,
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
      emptyStateText={emptyStateText}
      renderLegendContent={renderLegendContent}
      renderTooltipContent={renderTooltipContent}
      seriesNameFormatter={seriesNameFormatter}
      showLegend={showLegend}
      type={type}
      xAxisOptions={xAxisOptions}
      yAxisOptions={yAxisOptions}
      renderHiddenLegendLabel={renderHiddenLegendLabel}
    />
  );
}
