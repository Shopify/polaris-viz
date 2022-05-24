import React from 'react';
import type {DataSeries} from '@shopify/polaris-viz-core';

import {ChartContainer} from '../ChartContainer';
import type {MetricWithTrend} from '../../types';

import {Chart} from './Chart';

export interface DonutChartProps {
  data: DataSeries[];
  comparisonMetric: MetricWithTrend;
  theme?: string;
}

export function DonutChart({data, theme, comparisonMetric}: DonutChartProps) {
  return (
    <ChartContainer theme={theme}>
      <Chart data={data} comparisonMetric={comparisonMetric} />
    </ChartContainer>
  );
}
