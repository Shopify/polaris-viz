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
import type {LegendPosition} from '../../types';

import {Chart} from './Chart';
import type {Size} from './types';

export type SimpleNormalizedChartProps = {
  comparisonMetrics?: Omit<ComparisonMetricProps, 'theme'>[];
  labelFormatter?: LabelFormatter;
  legendPosition?: LegendPosition;
  direction?: Direction;
  size?: Size;
} & ChartProps;

export function SimpleNormalizedChart(props: SimpleNormalizedChartProps) {
  const {
    comparisonMetrics = [],
    data,
    labelFormatter = (value) => `${value}`,
    legendPosition = 'top-left',
    direction = 'horizontal',
    size = 'small',
    theme,
    isAnimated,
  }: WithRequired<SimpleNormalizedChartProps, 'theme'> = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };

  return (
    <ChartContainer theme={theme} isAnimated={isAnimated}>
      <Chart
        comparisonMetrics={comparisonMetrics}
        data={data}
        labelFormatter={labelFormatter}
        legendPosition={legendPosition}
        direction={direction}
        size={size}
      />
    </ChartContainer>
  );
}
