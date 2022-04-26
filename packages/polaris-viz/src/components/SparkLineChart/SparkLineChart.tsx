import React from 'react';
import {DataSeries, IS_ANIMATED_DEFAULT} from '@shopify/polaris-viz-core';

import {ChartContainer} from '../ChartContainer';

import {Chart} from './Chart';

export interface SparkLineChartProps {
  data: DataSeries[];
  accessibilityLabel?: string;
  isAnimated?: boolean;
  offsetLeft?: number;
  offsetRight?: number;
  theme?: string;
}

export function SparkLineChart({
  data,
  accessibilityLabel,
  isAnimated = IS_ANIMATED_DEFAULT,
  offsetLeft = 0,
  offsetRight = 0,
  theme,
}: SparkLineChartProps) {
  return (
    <ChartContainer theme={theme} sparkChart>
      <Chart
        data={data}
        accessibilityLabel={accessibilityLabel}
        isAnimated={isAnimated}
        offsetLeft={offsetLeft}
        offsetRight={offsetRight}
        theme={theme}
      />
    </ChartContainer>
  );
}
