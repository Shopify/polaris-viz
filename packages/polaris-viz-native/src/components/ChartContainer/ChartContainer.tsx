import React, {useState, ReactElement, cloneElement} from 'react';
import {View} from 'react-native';
import type {Dimensions} from '@shopify/polaris-viz-core';
import {useTheme} from '@shopify/polaris-viz-core';

interface Props {
  children: ReactElement;
  theme?: string;
}

export function ChartContainer({theme, children}: Props) {
  const [chartDimensions, setChartDimensions] =
    useState<Dimensions | null>(null);

  const {chartContainer} = useTheme(theme);

  const handleOnLayout = (event) => {
    const {width, height} = event.nativeEvent.layout;
    setChartDimensions({width, height});
  };
  return (
    <View
      onLayout={handleOnLayout}
      style={{
        ...chartContainer,
      }}
    >
      {chartDimensions == null
        ? null
        : cloneElement<{theme: string; dimensions: Dimensions}>(children, {
            theme,
            dimensions: chartDimensions,
          })}
    </View>
  );
}
