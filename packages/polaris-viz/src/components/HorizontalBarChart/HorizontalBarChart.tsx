import type {ReactNode} from 'react';
import type {
  DataSeries,
  ChartType,
  XAxisOptions,
  YAxisOptions,
  BoundingRect,
  LabelFormatter,
} from '@shopify/polaris-viz-core';

import type {
  AnnotationLookupTable,
  RenderTooltipContentData,
  RenderLegendContent,
} from '../../types';

import {Chart} from './Chart';

export interface HorizontalBarChartProps {
  data: DataSeries[];
  renderTooltipContent: (data: RenderTooltipContentData) => ReactNode;
  seriesNameFormatter: LabelFormatter;
  showLegend: boolean;
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions: Required<YAxisOptions>;
  annotationsLookupTable?: AnnotationLookupTable;
  dimensions?: BoundingRect;
  renderHiddenLegendLabel?: (count: number) => string;
  renderLegendContent?: RenderLegendContent;
  type?: ChartType;
}

export function HorizontalBarChart({
  annotationsLookupTable = {},
  data,
  dimensions,
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
      dimensions={dimensions}
      annotationsLookupTable={annotationsLookupTable}
      data={data}
      renderTooltipContent={renderTooltipContent}
      seriesNameFormatter={seriesNameFormatter}
      showLegend={showLegend}
      type={type}
      xAxisOptions={xAxisOptions}
      yAxisOptions={yAxisOptions}
      renderLegendContent={renderLegendContent}
      renderHiddenLegendLabel={renderHiddenLegendLabel}
    />
  );
}
