import React from 'react';
import type {DataSeries} from '@shopify/polaris-viz-core';

import type {MetricWithTrend} from '../ComparisonMetric';
import {ChartContainer} from '../ChartContainer';

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
