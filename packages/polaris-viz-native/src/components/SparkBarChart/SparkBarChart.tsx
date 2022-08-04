import React from 'react';
import {View} from 'react-native';
import {useTransition} from '@react-spring/native';
import type {
  Dimensions,
  ChartProps,
  TargetLine,
} from '@shopify/polaris-viz-core';
import {
  usePolarisVizContext,
  ANIMATION_MARGIN,
  SparkBarSeries,
  DEFAULT_THEME_NAME,
  DEFAULT_CHART_PROPS,
} from '@shopify/polaris-viz-core';

import {ChartContainer} from '../ChartContainer';

export type SparkBarChartProps = {
  targetLine?: TargetLine;
  accessibilityLabel?: string;
  dimensions?: Dimensions;
} & ChartProps;

export function SparkBarChart(props: SparkBarChartProps) {
  const {data, accessibilityLabel, isAnimated, targetLine, theme} = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };

  return (
    <ChartContainer
      data={data}
      theme={theme}
      sparkChart
      isAnimated={isAnimated}
    >
      <Chart
        data={data}
        accessibilityLabel={accessibilityLabel}
        targetLine={targetLine}
      />
    </ChartContainer>
  );
}

function Chart({
  data,
  dimensions,
  accessibilityLabel,
  targetLine = {
    offsetLeft: 0,
    offsetRight: 0,
    value: 0,
  },
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
          targetLine={targetLine}
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
