import React, {ReactNode} from 'react';

import type {ChartType, DataSeries} from '../../types';
import {ChartContainer} from '../../components/ChartContainer';
import {usePrefersReducedMotion} from '../../hooks';
import type {RenderTooltipContentData, XAxisOptions} from '../BarChart';

import {Chart} from './Chart';

export interface HorizontalBarChartProps {
  data: DataSeries[];
  renderTooltipContent: (data: RenderTooltipContentData) => ReactNode;
  xAxisOptions: XAxisOptions;
  isAnimated?: boolean;
  theme?: string;
  type?: ChartType;
}

export function HorizontalBarChart({
  data,
  isAnimated = true,
  renderTooltipContent,
  theme,
  type = 'default',
  xAxisOptions,
}: HorizontalBarChartProps) {
  const xAxisOptionsForChart: Required<XAxisOptions> = {
    labelFormatter: (value: string) => value,
    hide: false,
    wrapLabels: false,
    ...xAxisOptions,
  };

  const {prefersReducedMotion} = usePrefersReducedMotion();

  return (
    <ChartContainer theme={theme}>
      <Chart
        data={data}
        isAnimated={isAnimated && !prefersReducedMotion}
        renderTooltipContent={renderTooltipContent}
        type={type}
        xAxisOptions={xAxisOptionsForChart}
      />
    </ChartContainer>
  );
}
