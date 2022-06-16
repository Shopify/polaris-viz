import React from 'react';
import type {DataSeries, LabelFormatter} from '@shopify/polaris-viz-core';

import {ChartContainer} from '../ChartContainer';
import type {ComparisonMetricProps} from '../ComparisonMetric';

import {Chart} from './Chart';

export interface DonutChartProps {
  data: DataSeries[];
  comparisonMetric?: Omit<ComparisonMetricProps, 'theme'>;
  showLegend?: boolean;
  theme: string;
  labelFormatter?: LabelFormatter;
}

export function DonutChart({
  data,
  theme,
  comparisonMetric,
  showLegend = true,
  labelFormatter = (value) => `${value}`,
}: DonutChartProps) {
  return (
    <ChartContainer theme={theme}>
      <Chart
        data={data}
        labelFormatter={labelFormatter}
        comparisonMetric={comparisonMetric}
        showLegend={showLegend}
      />
    </ChartContainer>
  );
}
