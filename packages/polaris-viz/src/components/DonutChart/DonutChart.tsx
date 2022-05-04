import React from 'react';
import type {DataPoint} from '@shopify/polaris-viz-core';

import {ChartContainer} from '../ChartContainer';

import {Chart} from './Chart';

export interface DonutChartProps {
  data: DataPoint[];
  theme?: string;
}

export function DonutChart({data, theme}: DonutChartProps) {
  return (
    <ChartContainer theme={theme}>
      <Chart data={data} />
    </ChartContainer>
  );
}
