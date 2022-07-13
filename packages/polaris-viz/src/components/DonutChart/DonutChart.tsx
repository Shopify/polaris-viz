import React from 'react';
import {
  LabelFormatter,
  ChartProps,
  WithRequired,
  DEFAULT_CHART_PROPS,
} from '@shopify/polaris-viz-core';

import {ChartContainer} from '../ChartContainer';
import type {ComparisonMetricProps} from '../ComparisonMetric';
import type {LegendPosition} from '../../types';

import {Chart} from './Chart';

export type DonutChartProps = {
  comparisonMetric?: Omit<ComparisonMetricProps, 'theme'>;
  showLegend?: boolean;
  labelFormatter?: LabelFormatter;
  legendPosition?: LegendPosition;
} & ChartProps;

export function DonutChart(props: DonutChartProps) {
  const {
    data,
    theme,
    comparisonMetric,
    showLegend,
    labelFormatter,
    legendPosition,
    isAnimated,
    state,
    errorText,
  }: WithRequired<DonutChartProps, 'theme'> = {
    ...DEFAULT_CHART_PROPS,
    labelFormatter: (value) => `${value}`,
    showLegend: true,
    legendPosition: 'left',
    ...props,
  };

  return (
    <ChartContainer data={data} theme={theme} isAnimated={isAnimated}>
      <Chart
        errorText={errorText}
        state={state}
        data={data}
        labelFormatter={labelFormatter}
        comparisonMetric={comparisonMetric}
        showLegend={showLegend}
        legendPosition={legendPosition}
      />
    </ChartContainer>
  );
}
