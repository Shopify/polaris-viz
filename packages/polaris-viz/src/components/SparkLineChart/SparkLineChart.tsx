import React from 'react';
import type {SparkLineChartProps} from '@shopify/polaris-viz-core';

import {ChartContainer} from '../ChartContainer';
import {usePrefersReducedMotion} from '../../hooks';

import {Chart} from './Chart';

export function SparkLineChart({
  data,
  accessibilityLabel,
  isAnimated = false,
  offsetLeft = 0,
  offsetRight = 0,
  theme,
}: SparkLineChartProps) {
  const {prefersReducedMotion} = usePrefersReducedMotion();
  const shouldAnimate = !prefersReducedMotion && isAnimated;

  return (
    <ChartContainer theme={theme}>
      <Chart
        data={data}
        accessibilityLabel={accessibilityLabel}
        isAnimated={shouldAnimate}
        offsetLeft={offsetLeft}
        offsetRight={offsetRight}
        theme={theme}
      />
    </ChartContainer>
  );
}
