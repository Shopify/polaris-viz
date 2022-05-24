import React from 'react';
import type {DataSeries, LabelFormatter} from '@shopify/polaris-viz-core';

import {ChartContainer} from '../ChartContainer';

import {Chart} from './Chart';

export interface DonutChartProps {
  data: DataSeries[];
  theme?: string;
  labelFormatter?: LabelFormatter;
}

export function DonutChart({
  data,
  theme,
  labelFormatter = (value) => `${value}`,
}: DonutChartProps) {
  return (
    <ChartContainer theme={theme}>
      <Chart data={data} labelFormatter={labelFormatter} />
    </ChartContainer>
  );
}
