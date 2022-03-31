import React, {useState, ReactElement, cloneElement} from 'react';
import {View} from 'react-native';
import type {Dimensions} from '@shopify/polaris-viz-core';
import {useTheme} from '@shopify/polaris-viz-core';

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

  const padding = (paddingString: string) => {
    const numberPattern = /\d+/g;

    const [top, right, bottom, left]: any = paddingString.match(numberPattern);

    const alternateLeft = right ? right : top;

    return {
      paddingTop: top,
      paddingRight: right ? right : top,
      paddingBottom: bottom ? bottom : top,
      paddingLeft: left ? left : alternateLeft,
    };
  };

  return (
    <View
      onLayout={handleOnLayout}
      style={[
        {
          borderRadius: Number(parseInt(chartContainer.borderRadius, 10)),
          ...padding(chartContainer.padding),
          backgroundColor: chartContainer.backgroundColor,
        },
        {
          position: 'relative',
          width: '100%',
          height: '100%',
          minHeight: sparkChart
            ? chartContainer.sparkChartMinHeight
            : chartContainer.chartMinHeight,
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
