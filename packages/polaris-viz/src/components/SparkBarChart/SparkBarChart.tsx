import {
  DEFAULT_THEME_NAME,
  SparkBarChartProps,
} from '@shopify/polaris-viz-core';
import React from 'react';

import {ChartContainer} from '../ChartContainer';

import {Chart} from './Chart';

export function SparkBarChart({
  data,
  accessibilityLabel,
  isAnimated = false,
  dataOffsetRight = 0,
  dataOffsetLeft = 0,
  theme = DEFAULT_THEME_NAME,
}: SparkBarChartProps) {
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
