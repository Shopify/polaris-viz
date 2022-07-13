import React from 'react';
import {DEFAULT_CHART_PROPS} from '@shopify/polaris-viz-core';
import type {Dimensions, ChartProps} from '@shopify/polaris-viz-core';

import {ChartContainer} from '../ChartContainer';

import {Chart} from './Chart';

export type SparkBarChartProps = {
  dataOffsetRight?: number;
  dataOffsetLeft?: number;
  accessibilityLabel?: string;
  dimensions?: Dimensions;
} & ChartProps;

export function SparkBarChart(props: SparkBarChartProps) {
  const {
    data,
    accessibilityLabel,
    isAnimated,
    dataOffsetRight = 0,
    dataOffsetLeft = 0,
    theme,
  } = {
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
        dataOffsetRight={dataOffsetRight}
        dataOffsetLeft={dataOffsetLeft}
        accessibilityLabel={accessibilityLabel}
        theme={theme}
      />
    </ChartContainer>
  );
}
