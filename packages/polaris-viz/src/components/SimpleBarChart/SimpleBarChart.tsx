import React from 'react';
import type {
  ChartType,
  XAxisOptions,
  ChartProps,
} from '@shopify/polaris-viz-core';
import {DEFAULT_CHART_PROPS} from '@shopify/polaris-viz-core';

import {
  getXAxisOptionsWithDefaults,
  getYAxisOptionsWithDefaults,
} from '../../utilities';
import {ChartContainer} from '../../components/ChartContainer';

import {Chart} from './Chart';

export type SimpleBarChartProps = {
  showLegend?: boolean;
  type?: ChartType;
  xAxisOptions?: XAxisOptions;
} & ChartProps;

export function SimpleBarChart(props: SimpleBarChartProps) {
  const {
    isAnimated,
    data,
    showLegend = true,
    theme,
    type = 'default',
    xAxisOptions,
  }: SimpleBarChartProps = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };
  const xAxisOptionsWithDefaults = getXAxisOptionsWithDefaults(xAxisOptions);
  const yAxisOptionsWithDefaults = getYAxisOptionsWithDefaults();

  return (
    <ChartContainer theme={theme} isAnimated={isAnimated}>
      <Chart
        data={data}
        showLegend={showLegend}
        type={type}
        xAxisOptions={xAxisOptionsWithDefaults}
        yAxisOptions={yAxisOptionsWithDefaults}
      />
    </ChartContainer>
  );
}
