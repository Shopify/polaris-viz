import {
  IS_ANIMATED_DEFAULT,
  SparkBarChartProps,
} from '@shopify/polaris-viz-core';
import React from 'react';

import {ChartContainer} from '../ChartContainer';

import {Chart} from './Chart';

export function SparkBarChart({
  data,
  accessibilityLabel,
  isAnimated = IS_ANIMATED_DEFAULT,
  dataOffsetRight = 0,
  dataOffsetLeft = 0,
  theme,
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
