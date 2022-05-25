import {
  DEFAULT_CHART_PROPS,
  SparkBarChartProps,
} from '@shopify/polaris-viz-core';
import React from 'react';

import {ChartContainer} from '../ChartContainer';

import {Chart} from './Chart';

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
    <ChartContainer theme={theme} sparkChart>
      <Chart
        data={data}
        dataOffsetRight={dataOffsetRight}
        dataOffsetLeft={dataOffsetLeft}
        accessibilityLabel={accessibilityLabel}
        isAnimated={isAnimated}
        theme={theme}
      />
    </ChartContainer>
  );
}
