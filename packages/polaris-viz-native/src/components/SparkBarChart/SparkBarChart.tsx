import React from 'react';

import {
  SparkBarChartProps,
  SparkBarSeries,
} from '@shopify/polaris-viz-core';
import { usePrefersReducedMotion } from '../../hooks';
import { ChartContainer } from '../ChartContainer';

export function SparkBarChart({
  data,
  accessibilityLabel,
  isAnimated = false,
  dataOffsetLeft = 0,
  dataOffsetRight = 0,
  theme = 'Default',
}: SparkBarChartProps) {
  const { prefersReducedMotion } = usePrefersReducedMotion();


  return (
    <ChartContainer>
      <SparkBarSeries
        data={data}
        accessibilityLabel={accessibilityLabel}
        isAnimated={isAnimated}
        dataOffsetLeft={dataOffsetLeft}
        dataOffsetRight={dataOffsetRight}
        theme={theme}
        prefersReducedMotion={prefersReducedMotion}
      />
    </ChartContainer>
  );
}
