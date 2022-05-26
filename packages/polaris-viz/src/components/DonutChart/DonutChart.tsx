import React from 'react';
import type {DataSeries} from '@shopify/polaris-viz-core';

import {ChartContainer} from '../ChartContainer';
import type {ComparisonMetricProps} from '../ComparisonMetric';

import {Chart} from './Chart';

export interface DonutChartProps {
  data: DataSeries[];
  comparisonMetric?: Omit<ComparisonMetricProps, 'theme'>;
  theme?: string;
}

export function DonutChart({data, theme, comparisonMetric}: DonutChartProps) {
  return (
    <ChartContainer theme={theme}>
      <Chart data={data} comparisonMetric={comparisonMetric} />
    </ChartContainer>
  );
}
