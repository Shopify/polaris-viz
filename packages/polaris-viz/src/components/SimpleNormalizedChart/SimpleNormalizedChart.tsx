import React from 'react';
import type {
  DataPoint,
  Direction,
  LabelFormatter,
} from '@shopify/polaris-viz-core';

import type {ComparisonMetricProps} from '../ComparisonMetric';
import {ChartContainer} from '../ChartContainer';

import {Chart} from './Chart';
import type {Size, LabelPosition} from './types';

export interface SimpleNormalizedChartProps {
  data: DataPoint[];
  comparisonMetrics?: Omit<ComparisonMetricProps, 'theme'>[];
  labelFormatter?: LabelFormatter;
  labelPosition?: LabelPosition;
  direction?: Direction;
  size?: Size;
  theme?: string;
}

export function SimpleNormalizedChart({
  comparisonMetrics = [],
  data,
  labelFormatter = (value) => `${value}`,
  labelPosition = 'top-left',
  direction = 'horizontal',
  size = 'small',
  theme,
}: SimpleNormalizedChartProps) {
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
