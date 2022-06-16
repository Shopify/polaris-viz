import React from 'react';
import {
  DataSeries,
  DEFAULT_THEME_NAME,
  LabelFormatter,
} from '@shopify/polaris-viz-core';

import {ChartContainer} from '../ChartContainer';
import type {ComparisonMetricProps} from '../ComparisonMetric';

import {Chart} from './Chart';

export interface DonutChartProps {
  data: DataSeries[];
  comparisonMetric?: Omit<ComparisonMetricProps, 'theme'>;
  showLegend?: boolean;
  theme?: string;
  labelFormatter?: LabelFormatter;
}

export function DonutChart({
  data,
  theme = DEFAULT_THEME_NAME,
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
        theme={theme}
      />
    </ChartContainer>
  );
}
