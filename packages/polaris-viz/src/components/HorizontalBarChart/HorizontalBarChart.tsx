import React, {ReactNode} from 'react';

import type {
  AnnotationLookupTable,
  RenderTooltipContentData,
  XAxisOptions,
} from '../BarChart';
import type {ChartType, DataSeries} from '../../types';
import {ChartContainer} from '../../components/ChartContainer';
import {usePrefersReducedMotion} from '../../hooks';

import {Chart} from './Chart';

export interface HorizontalBarChartProps {
  data: DataSeries[];
  renderTooltipContent: (data: RenderTooltipContentData) => ReactNode;
  showLegend: boolean;
  xAxisOptions: XAxisOptions;
  annotationsLookupTable?: AnnotationLookupTable;
  isAnimated?: boolean;
  theme?: string;
  type?: ChartType;
}

export function HorizontalBarChart({
  annotationsLookupTable = {},
  data,
  isAnimated = true,
  renderTooltipContent,
  showLegend,
  theme,
  type = 'default',
  xAxisOptions,
}: HorizontalBarChartProps) {
  const xAxisOptionsForChart: Required<XAxisOptions> = {
    labelFormatter: (value: string) => value,
    hide: false,
    wrapLabels: false,
    useMinimalLabels: false,
    ...xAxisOptions,
  };

  const {prefersReducedMotion} = usePrefersReducedMotion();

  return (
    <ChartContainer theme={theme}>
      <Chart
        annotationsLookupTable={annotationsLookupTable}
        data={data}
        isAnimated={isAnimated && !prefersReducedMotion}
        renderTooltipContent={renderTooltipContent}
        showLegend={showLegend}
        type={type}
        xAxisOptions={xAxisOptionsForChart}
      />
    </ChartContainer>
  );
}
