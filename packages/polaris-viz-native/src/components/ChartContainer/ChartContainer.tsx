import React, {useState, ReactElement, cloneElement} from 'react';
import {View} from 'react-native';
import {
  Dimensions,
  paddingStringToObject,
  useTheme,
} from '@shopify/polaris-viz-core';

interface Props {
  children: ReactElement;
  theme?: string;
  sparkChart?: boolean;
}

export function ChartContainer({theme, children, sparkChart = false}: Props) {
  const [chartDimensions, setChartDimensions] =
    useState<Dimensions | null>(null);

  const {chartContainer} = useTheme(theme);

  const handleOnLayout = (event) => {
    const {width, height} = event.nativeEvent.layout;

    setChartDimensions((previousDimensions) => {
      if (previousDimensions?.width === width) {
        return {
          width: previousDimensions?.width,
          height: previousDimensions?.height,
        };
      }
      return {width, height};
    });
  };

  return (
    <View
      onLayout={handleOnLayout}
      style={[
        {
          borderRadius: Number(parseInt(chartContainer.borderRadius, 10)),
          backgroundColor: chartContainer.backgroundColor,
          ...paddingStringToObject(chartContainer.padding),
        },
        {
          position: 'relative',
          width: '100%',
          height: '100%',
          minHeight: sparkChart
            ? chartContainer.sparkChartMinHeight
            : chartContainer.minHeight,
        },
      ]}
    >
      {chartDimensions == null
        ? null
        : cloneElement(children, {
            theme,
            dimensions: {
              width: chartDimensions.width,
              height: chartDimensions.height,
            },
          })}
    </View>
  );
}
