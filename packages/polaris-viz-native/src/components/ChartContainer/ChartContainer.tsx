import React, { useState, ReactElement, cloneElement } from 'react';
import { View } from 'react-native';
import type { Dimensions } from '@shopify/polaris-viz-core';
import { useTheme } from '@shopify/polaris-viz-core';

interface Props {
  children: ReactElement;
  theme?: string;
}

export function ChartContainer({ theme, children }: Props) {
  const [chartDimensions, setChartDimensions] =
    useState<Dimensions | null>(null);

  const { chartContainer } = useTheme(theme);

  const handleOnLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setChartDimensions({ width, height });
  };
  return (
    <View
      onLayout={handleOnLayout}
      style={[
        {
          borderRadius: Number(0),
          padding: Number(1),
          backgroundColor: chartContainer.backgroundColor,
        },
        {
          position: 'relative',
          width: '100%',
          height: '100%',
        },
      ]}
    >
      {chartDimensions == null
        ? null
        : cloneElement(children, {
          theme,
          dimensions: chartDimensions,
        })}
    </View>
  );
}
