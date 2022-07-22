import React, {useState, useMemo, ReactElement, cloneElement} from 'react';
import {View} from 'react-native';
import {
  DEFAULT_THEME_NAME,
  Dimensions,
  paddingStringToObject,
  useTheme,
  ChartContext,
  uniqueId,
  isLargeDataSet,
  InternalChartType,
} from '@shopify/polaris-viz-core';
import type {DataSeries} from '@shopify/polaris-viz-core';

import {usePrefersReducedMotion} from '../../hooks';

interface Props {
  children: ReactElement;
  isAnimated: boolean;
  data: DataSeries[];
  sparkChart?: boolean;
  theme?: string;
  type?: InternalChartType;
}

export function ChartContainer({
  data,
  theme = DEFAULT_THEME_NAME,
  children,
  sparkChart = false,
  isAnimated,
  type,
}: Props) {
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

  const {prefersReducedMotion} = usePrefersReducedMotion();

  const value = useMemo(() => {
    const id = uniqueId('chart');

    const tooBigToAnimate = isLargeDataSet(data, type);
    const shouldAnimate =
      isAnimated && !prefersReducedMotion && !tooBigToAnimate;

    return {
      characterWidths: {},
      characterWidthOffsets: {},
      id,
      shouldAnimate,
      theme,
      isPerformanceImpacted: tooBigToAnimate,
    };
  }, [prefersReducedMotion, data, isAnimated, theme, type]);

  return (
    <ChartContext.Provider value={value}>
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
    </ChartContext.Provider>
  );
}
