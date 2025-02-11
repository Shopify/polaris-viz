import type {ReactElement} from 'react';
import {useState, useMemo, cloneElement} from 'react';
import {View} from 'react-native';
import {
  DEFAULT_THEME_NAME,
  paddingStringToObject,
  useTheme,
  ChartContext,
  uniqueId,
  isLargeDataSet,
} from '@shopify/polaris-viz-core';
import type {
  DataSeries,
  Dimensions,
  InternalChartType,
} from '@shopify/polaris-viz-core';

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

    const dataTooBigToAnimate = isLargeDataSet(data, type);
    const shouldAnimate =
      isAnimated && !prefersReducedMotion && !dataTooBigToAnimate;

    return {
      characterWidths: {},
      characterWidthOffsets: {
        fontSize: {},
        fontWeight: {},
      },
      id,
      shouldAnimate,
      theme,
      isTouchDevice: true,
      isPerformanceImpacted: dataTooBigToAnimate,
      containerBounds: {
        width: chartDimensions?.width ?? 0,
        height: chartDimensions?.height ?? 0,
        x: 0,
        y: 0,
      },
      comparisonIndexes: [],
      comparisonSeriesIndexes: [],
    };
  }, [prefersReducedMotion, data, isAnimated, theme, type, chartDimensions]);

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
