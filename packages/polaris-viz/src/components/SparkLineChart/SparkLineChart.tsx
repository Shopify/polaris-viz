import React from 'react';
import {ChartProps, DEFAULT_CHART_PROPS} from '@shopify/polaris-viz-core';

import {ChartContainer} from '../ChartContainer';

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
      <Chart
        data={data}
        accessibilityLabel={accessibilityLabel}
        offsetLeft={offsetLeft}
        offsetRight={offsetRight}
        theme={theme}
      />
    </ChartContainer>
  );
}
