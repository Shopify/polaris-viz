import type {ReactNode} from 'react';
import type {
  DataSeries,
  ChartType,
  XAxisOptions,
  YAxisOptions,
  LabelFormatter,
} from '@shopify/polaris-viz-core';

import type {
  AnnotationLookupTable,
  RenderTooltipContentData,
  RenderLegendContent,
  RenderAnnotationContentData,
} from '../../types';

import {Chart} from './Chart';

export interface HorizontalBarChartProps {
  data: DataSeries[];
  renderAnnotationContent?: (data: RenderAnnotationContentData) => ReactNode;
  renderTooltipContent: (data: RenderTooltipContentData) => ReactNode;
  seriesNameFormatter: LabelFormatter;
  showLegend: boolean;
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions: Required<YAxisOptions>;
  annotationsLookupTable?: AnnotationLookupTable;
  renderHiddenLegendLabel?: (count: number) => string;
  renderLegendContent?: RenderLegendContent;
  type?: ChartType;
}

export function HorizontalBarChart({
  annotationsLookupTable = {},
  data,
  renderAnnotationContent,
  renderHiddenLegendLabel,
  renderLegendContent,
  renderTooltipContent,
  seriesNameFormatter,
  showLegend,
  type = 'default',
  xAxisOptions,
  yAxisOptions,
}: HorizontalBarChartProps) {
  return (
    <Chart
      annotationsLookupTable={annotationsLookupTable}
      data={data}
      renderTooltipContent={renderTooltipContent}
      seriesNameFormatter={seriesNameFormatter}
      showLegend={showLegend}
      type={type}
      xAxisOptions={xAxisOptions}
      yAxisOptions={yAxisOptions}
      renderAnnotationContent={renderAnnotationContent}
      renderLegendContent={renderLegendContent}
      renderHiddenLegendLabel={renderHiddenLegendLabel}
    />
  );
}
