import React from 'react';
import type {
  ChartType,
  DataSeries,
  XAxisOptions,
} from '@shopify/polaris-viz-core';

import {
  getXAxisOptionsWithDefaults,
  getYAxisOptionsWithDefaults,
} from '../../utilities';
import {ChartContainer} from '../../components/ChartContainer';
import {usePrefersReducedMotion} from '../../hooks';

import {Chart} from './Chart';

export interface SimpleBarChartProps {
  data: DataSeries[];
  isAnimated?: boolean;
  showLegend?: boolean;
  theme?: string;
  type?: ChartType;
  xAxisOptions?: XAxisOptions;
}

export function SimpleBarChart({
  isAnimated = true,
  data,
  showLegend = true,
  theme,
  type = 'default',
  xAxisOptions,
}: SimpleBarChartProps) {
  const xAxisOptionsForChart = getXAxisOptionsWithDefaults(xAxisOptions);
  const yAxisOptionsForChart = getYAxisOptionsWithDefaults();

  const {prefersReducedMotion} = usePrefersReducedMotion();

  return (
    <ChartContainer theme={theme}>
      <Chart
        data={data}
        isAnimated={isAnimated && !prefersReducedMotion}
        showLegend={showLegend}
        type={type}
        xAxisOptions={xAxisOptionsForChart}
        yAxisOptions={yAxisOptionsForChart}
      />
    </ChartContainer>
  );
}
