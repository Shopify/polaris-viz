import React from 'react';
import {View} from 'react-native';
import {useTransition} from '@react-spring/native';
import type {Dimensions, ChartProps} from '@shopify/polaris-viz-core';
import {
  usePolarisVizContext,
  ANIMATION_MARGIN,
  SparkBarSeries,
  DEFAULT_THEME_NAME,
  DEFAULT_CHART_PROPS,
} from '@shopify/polaris-viz-core';

import {ChartContainer} from '../ChartContainer';

export type SparkBarChartProps = {
  dataOffsetRight?: number;
  dataOffsetLeft?: number;
  accessibilityLabel?: string;
  dimensions?: Dimensions;
} & ChartProps;

export function SparkBarChart(props: SparkBarChartProps) {
  const {
    data,
    accessibilityLabel,
    isAnimated,
    dataOffsetRight = 0,
    dataOffsetLeft = 0,
    theme,
  } = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };

  return (
    <ChartContainer theme={theme} sparkChart isAnimated={isAnimated}>
      <Chart
        data={data}
        accessibilityLabel={accessibilityLabel}
        dataOffsetLeft={dataOffsetLeft}
        dataOffsetRight={dataOffsetRight}
      />
    </ChartContainer>
  );
}

function Chart({
  data,
  dimensions,
  accessibilityLabel,
  dataOffsetRight = 0,
  dataOffsetLeft = 0,
  theme = DEFAULT_THEME_NAME,
  isAnimated = DEFAULT_CHART_PROPS.isAnimated,
}: SparkBarChartProps) {
  const {
    components: {Svg},
  } = usePolarisVizContext();

  const {width, height} = dimensions ?? {width: 0, height: 0};

  const viewboxHeight = height + ANIMATION_MARGIN * 2;

  return (
    <View accessibilityRole="image" accessibilityLabel={accessibilityLabel}>
      <Svg
        viewBox={`0 -${ANIMATION_MARGIN} ${width} ${viewboxHeight}`}
        height={height}
        width={width}
        transform={[{translateY: -1 * ANIMATION_MARGIN}] as any}
      >
        <SparkBarSeries
          data={data}
          dataOffsetLeft={dataOffsetLeft}
          dataOffsetRight={dataOffsetRight}
          height={height}
          shouldAnimate={isAnimated}
          theme={theme}
          useTransition={useTransition}
          width={width}
        />
      </Svg>
    </View>
  );
}
