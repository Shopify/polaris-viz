import type {
  ChartType,
  DataSeries,
  XAxisOptions,
  YAxisOptions,
  LabelFormatter,
} from '@shopify/polaris-viz-core';
import type {ReactNode} from 'react';

import type {
  AnnotationLookupTable,
  BottomOnlyLegendPosition,
  RenderAnnotationContentData,
  RenderLegendContent,
  RenderTooltipContentData,
} from '../../types';
import {useTheme, useThemeSeriesColors} from '../../hooks';

import {Chart} from './Chart';

export interface VerticalBarChartProps {
  data: DataSeries[];
  renderAnnotationContent?: (data: RenderAnnotationContentData) => ReactNode;
  renderTooltipContent(data: RenderTooltipContentData): ReactNode;
  showLegend: boolean;
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions: Required<YAxisOptions>;
  seriesNameFormatter: LabelFormatter;
  annotationsLookupTable?: AnnotationLookupTable;
  barOptions?: {isStacked: boolean};
  emptyStateText?: string;
  legendPosition?: BottomOnlyLegendPosition;
  renderLegendContent?: RenderLegendContent;
  type?: ChartType;
  renderHiddenLegendLabel?: (count: number) => string;
}

export function VerticalBarChart({
  annotationsLookupTable = {},
  data,
  emptyStateText,
  legendPosition,
  renderAnnotationContent,
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
      legendPosition={legendPosition}
      renderLegendContent={renderLegendContent}
      renderTooltipContent={renderTooltipContent}
      seriesNameFormatter={seriesNameFormatter}
      showLegend={showLegend}
      type={type}
      xAxisOptions={xAxisOptions}
      yAxisOptions={yAxisOptions}
      renderAnnotationContent={renderAnnotationContent}
      renderHiddenLegendLabel={renderHiddenLegendLabel}
    />
  );
}
