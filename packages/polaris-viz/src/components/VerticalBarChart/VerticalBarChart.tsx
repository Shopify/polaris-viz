import type {
  ChartType,
  DataSeries,
  XAxisOptions,
  YAxisOptions,
  Dimensions,
} from '@shopify/polaris-viz-core';
import type {ReactNode} from 'react';

import type {
  AnnotationLookupTable,
  RenderLegendContent,
  RenderTooltipContentData,
} from '../../types';
import {useTheme, useThemeSeriesColors} from '../../hooks';

import {Chart} from './Chart';

export interface VerticalBarChartProps {
  data: DataSeries[];
  renderTooltipContent(data: RenderTooltipContentData): ReactNode;
  showLegend: boolean;
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions: Required<YAxisOptions>;
  annotationsLookupTable?: AnnotationLookupTable;
  barOptions?: {isStacked: boolean};
  dimensions?: Dimensions;
  emptyStateText?: string;
  renderLegendContent?: RenderLegendContent;
  type?: ChartType;
}

export function VerticalBarChart({
  annotationsLookupTable = {},
  data,
  dimensions,
  emptyStateText,
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
      dimensions={dimensions}
      annotationsLookupTable={annotationsLookupTable}
      data={seriesWithDefaults}
      emptyStateText={emptyStateText}
      renderLegendContent={renderLegendContent}
      renderTooltipContent={renderTooltipContent}
      showLegend={showLegend}
      type={type}
      xAxisOptions={xAxisOptions}
      yAxisOptions={yAxisOptions}
    />
  );
}
