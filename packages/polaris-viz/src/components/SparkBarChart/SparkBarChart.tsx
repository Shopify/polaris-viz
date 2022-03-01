import React from 'react';
import { View } from 'react-native';

import {
  SparkBarChartProps,
  SparkBarSeries,
  usePolarisVizContext
} from '@shopify/polaris-viz-core';

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

  return (
    <View
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
        />
      </Svg>
    </View>
  );
}
