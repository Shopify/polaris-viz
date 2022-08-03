import React from 'react';
import {DEFAULT_CHART_PROPS} from '@shopify/polaris-viz-core';
import type {
  Dimensions,
  ChartProps,
  TargetLine,
} from '@shopify/polaris-viz-core';

import {ChartContainer} from '../ChartContainer';

import {Chart} from './Chart';

export type SparkBarChartProps = {
  targetLine: TargetLine;
  accessibilityLabel?: string;
  dimensions?: Dimensions;
} & ChartProps;

export function SparkBarChart(props: SparkBarChartProps) {
  const {data, accessibilityLabel, isAnimated, targetLine, theme} = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };
  return (
    <ChartContainer
      data={data}
      theme={theme}
      sparkChart
      isAnimated={isAnimated}
    >
      <Chart
        data={data}
        targetLine={targetLine}
        accessibilityLabel={accessibilityLabel}
        theme={theme}
      />
    </ChartContainer>
  );
}
