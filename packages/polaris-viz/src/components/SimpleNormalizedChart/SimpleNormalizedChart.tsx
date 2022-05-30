import React from 'react';
import {
  ChartProps,
  Direction,
  LabelFormatter,
  DEFAULT_CHART_PROPS,
} from '@shopify/polaris-viz-core';
import type {WithRequired} from '@shopify/polaris-viz-core';

import type {ComparisonMetricProps} from '../ComparisonMetric';
import {ChartContainer} from '../ChartContainer';

import {Chart} from './Chart';
import type {Size, LabelPosition} from './types';

export type SimpleNormalizedChartProps = {
  comparisonMetrics?: Omit<ComparisonMetricProps, 'theme'>[];
  labelFormatter?: LabelFormatter;
  labelPosition?: LabelPosition;
  direction?: Direction;
  size?: Size;
} & ChartProps;

export function SimpleNormalizedChart(props: SimpleNormalizedChartProps) {
  const {
    comparisonMetrics = [],
    data,
    labelFormatter = (value) => `${value}`,
    labelPosition = 'top-left',
    direction = 'horizontal',
    size = 'small',
    theme,
  }: WithRequired<SimpleNormalizedChartProps, 'theme'> = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };

  return (
    <ChartContainer theme={theme}>
      <Chart
        comparisonMetrics={comparisonMetrics}
        data={data}
        labelFormatter={labelFormatter}
        labelPosition={labelPosition}
        direction={direction}
        size={size}
      />
    </ChartContainer>
  );
}
