import React from 'react';
import {
  ChartType,
  DataSeries,
  IS_ANIMATED_DEFAULT,
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
  isAnimated = IS_ANIMATED_DEFAULT,
  data,
  showLegend = true,
  theme,
  type = 'default',
  xAxisOptions,
}: SimpleBarChartProps) {
  const xAxisOptionsWithDefaults = getXAxisOptionsWithDefaults(xAxisOptions);
  const yAxisOptionsWithDefaults = getYAxisOptionsWithDefaults();

  const {prefersReducedMotion} = usePrefersReducedMotion();

  return (
    <ChartContainer theme={theme}>
      <Chart
        data={data}
        isAnimated={isAnimated && !prefersReducedMotion}
        showLegend={showLegend}
        type={type}
        xAxisOptions={xAxisOptionsWithDefaults}
        yAxisOptions={yAxisOptionsWithDefaults}
      />
    </ChartContainer>
  );
}
