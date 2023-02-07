import type {ReactNode} from 'react';
import type {
  DataSeries,
  ChartType,
  XAxisOptions,
  YAxisOptions,
  Dimensions,
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
  showLegend: boolean;
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions: Required<YAxisOptions>;
  annotationsLookupTable?: AnnotationLookupTable;
  dimensions?: Dimensions;
  renderLegendContent?: RenderLegendContent;
  type?: ChartType;
}

export function HorizontalBarChart({
  annotationsLookupTable = {},
  data,
  dimensions,
  renderLegendContent,
  renderTooltipContent,
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
      showLegend={showLegend}
      type={type}
      xAxisOptions={xAxisOptions}
      yAxisOptions={yAxisOptions}
      renderLegendContent={renderLegendContent}
    />
  );
}
