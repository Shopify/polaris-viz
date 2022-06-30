import React from 'react';
import {
  LabelFormatter,
  ChartProps,
  WithRequired,
  ChartState,
  DEFAULT_CHART_PROPS,
} from '@shopify/polaris-viz-core';

import {ChartContainer} from '../ChartContainer';
import {ChartSkeleton} from '../ChartSkeleton';
import type {ComparisonMetricProps} from '../ComparisonMetric';
import {usePrefersReducedMotion} from '../../hooks';

import {Chart} from './Chart';

export type DonutChartProps = {
  comparisonMetric?: Omit<ComparisonMetricProps, 'theme'>;
  showLegend?: boolean;
  labelFormatter?: LabelFormatter;
} & ChartProps;

export function DonutChart(props: DonutChartProps) {
  const {
    data,
    theme,
    comparisonMetric,
    showLegend,
    labelFormatter,
    isAnimated,
    state,
  }: WithRequired<DonutChartProps, 'theme'> = {
    ...DEFAULT_CHART_PROPS,
    labelFormatter: (value) => `${value}`,
    showLegend: true,
    ...props,
  };

  const {prefersReducedMotion} = usePrefersReducedMotion();
  const shouldAnimate = !prefersReducedMotion && isAnimated;

  return (
    <ChartContainer theme={theme}>
      {state === ChartState.Success ? (
        <Chart
          isAnimated={shouldAnimate}
          data={data}
          labelFormatter={labelFormatter}
          comparisonMetric={comparisonMetric}
          showLegend={showLegend}
          theme={theme}
        />
      ) : (
        <ChartSkeleton state={state} type="Donut" />
      )}
    </ChartContainer>
  );
}
