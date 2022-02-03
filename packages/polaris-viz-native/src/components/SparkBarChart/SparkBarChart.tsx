import React from 'react';
import {View, StyleSheet} from 'react-native';

import {
  Svg,
  SparkBarChartProps,
  SparkBarSeries,
} from '../../../../polaris-viz-core/src';

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

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {alignItems: 'center', justifyContent: 'center'},
      ]}
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel}
    >
      <Svg native width={width} height={height}>
        <SparkBarSeries
          data={data}
          dimensions={{height, width}}
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
