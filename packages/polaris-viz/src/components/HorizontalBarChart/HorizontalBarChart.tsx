import React, {ReactNode} from 'react';
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
} from '../../types';

import {Chart} from './Chart';

export interface HorizontalBarChartProps {
  data: DataSeries[];
  renderTooltipContent: (data: RenderTooltipContentData) => ReactNode;
  showLegend: boolean;
  xAxisOptions: Required<XAxisOptions>;
  yAxisOptions: Required<YAxisOptions>;
  annotationsLookupTable?: AnnotationLookupTable;
  isAnimated?: boolean;
  theme: string;
  type?: ChartType;
  dimensions?: Dimensions;
}

export function HorizontalBarChart({
  annotationsLookupTable = {},
  data,
  isAnimated,
  renderTooltipContent,
  showLegend,
  theme,
  type = 'default',
  xAxisOptions,
  yAxisOptions,
  dimensions,
}: HorizontalBarChartProps) {
  return (
    <Chart
      dimensions={dimensions}
      theme={theme}
      annotationsLookupTable={annotationsLookupTable}
      data={data}
      renderTooltipContent={renderTooltipContent}
      showLegend={showLegend}
      type={type}
      xAxisOptions={xAxisOptions}
      yAxisOptions={yAxisOptions}
      isAnimated={isAnimated}
    />
  );
}
