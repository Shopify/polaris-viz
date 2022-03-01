import React from 'react';
import { View, StyleSheet } from 'react-native';

import {
  SparkBarChartProps,
  SparkBarSeries,
  usePolarisVizContext,
} from '@shopify/polaris-viz-core';
import { usePrefersReducedMotion } from '../../hooks';

export function SparkBarChart({
  data,
  accessibilityLabel,
  isAnimated = false,
  dataOffsetLeft = 0,
  dataOffsetRight = 0,
  theme = 'Default',
}: SparkBarChartProps) {
  const width = 600;
  const height = 400;

  const {
    components: { Svg },
  } = usePolarisVizContext();

  const { prefersReducedMotion } = usePrefersReducedMotion();


  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        { alignItems: 'center', justifyContent: 'center' },
      ]}
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel}
    >
      <Svg width={width} height={height}>
        <SparkBarSeries
          data={data}
          dimensions={{ height, width }}
          accessibilityLabel={accessibilityLabel}
          isAnimated={isAnimated}
          dataOffsetLeft={dataOffsetLeft}
          dataOffsetRight={dataOffsetRight}
          theme={theme}
          prefersReducedMotion={prefersReducedMotion}
        />
      </Svg>
    </View>
  );
}
