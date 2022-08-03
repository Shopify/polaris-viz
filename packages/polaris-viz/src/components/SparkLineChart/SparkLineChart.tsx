import React from 'react';
import {
  ChartProps,
  DEFAULT_CHART_PROPS,
  ChartState,
} from '@shopify/polaris-viz-core';

import {ChartContainer} from '../ChartContainer';
import {ChartSkeleton} from '../ChartSkeleton';

import {Chart} from './Chart';

export type SparkLineChartProps = {
  accessibilityLabel?: string;
  offsetLeft?: number;
  offsetRight?: number;
} & ChartProps;

export function SparkLineChart(props: SparkLineChartProps) {
  const {
    data,
    accessibilityLabel,
    isAnimated,
    offsetLeft = 0,
    offsetRight = 0,
    theme,
    state,
    errorText,
  } = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };
  return (
    <ChartContainer
      isAnimated={isAnimated}
      data={data}
      theme={theme}
      sparkChart
    >
      {state !== ChartState.Success ? (
        <ChartSkeleton type="Spark" state={state} errorText={errorText} />
      ) : (
        <Chart
          data={data}
          accessibilityLabel={accessibilityLabel}
          offsetLeft={offsetLeft}
          offsetRight={offsetRight}
          theme={theme}
        />
      )}
    </ChartContainer>
  );
}
