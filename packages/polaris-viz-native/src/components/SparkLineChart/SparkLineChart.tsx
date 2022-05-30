import React from 'react';
import {View} from 'react-native';
import {scaleLinear} from 'd3-scale';
import {
  useTheme,
  useThemeSeriesColors,
  useSparkLine,
  LineSeries,
  usePolarisVizContext,
  DEFAULT_THEME_NAME,
  DEFAULT_CHART_PROPS,
} from '@shopify/polaris-viz-core';
import type {ChartProps, Dimensions} from '@shopify/polaris-viz-core';

import {usePrefersReducedMotion} from '../../hooks';
import {ChartContainer} from '../ChartContainer';

const SVG_MARGIN = 2;

export type SparkLineChartProps = {
  accessibilityLabel?: string;
  offsetLeft?: number;
  offsetRight?: number;
} & ChartProps;

export function SparkLineChart(props: SparkLineChartProps) {
  const {
    data,
    accessibilityLabel,
    isAnimated,
    offsetLeft = 0,
    offsetRight = 0,
    theme,
  } = {
    ...DEFAULT_CHART_PROPS,
    ...props,
  };

  const {prefersReducedMotion} = usePrefersReducedMotion();
  const shouldAnimate = !prefersReducedMotion && isAnimated;

  return (
    <ChartContainer sparkChart>
      <Chart
        data={data}
        accessibilityLabel={accessibilityLabel}
        isAnimated={shouldAnimate}
        offsetLeft={offsetLeft}
        offsetRight={offsetRight}
        theme={theme}
      />
    </ChartContainer>
  );
}

interface InnerChartProps extends SparkLineChartProps {
  dimensions?: Dimensions;
}

function Chart({
  data,
  accessibilityLabel,
  isAnimated = true,
  offsetLeft = 0,
  offsetRight = 0,
  theme = DEFAULT_THEME_NAME,
  dimensions = {width: 0, height: 0},
}: InnerChartProps) {
  const {width, height} = dimensions;
  const selectedTheme = useTheme(theme);
  const seriesColors = useThemeSeriesColors(data, selectedTheme);
  const {
    components: {Svg},
  } = usePolarisVizContext();

  const {minXDomain, maxXDomain, yScale} = useSparkLine({
    data,
    height,
  });

  return (
    <View accessibilityRole="image" accessibilityLabel={accessibilityLabel}>
      <Svg width={width} height={height}>
        {data.map((series, index) => {
          const singleOffsetLeft = series.isComparison ? 0 : offsetLeft;
          const singleOffsetRight = series.isComparison ? 0 : offsetRight;

          const xScale = scaleLinear()
            .range([
              singleOffsetLeft + SVG_MARGIN,
              width - singleOffsetRight - SVG_MARGIN,
            ])
            .domain([minXDomain, maxXDomain]);

          const seriesWithColor = {
            ...series,
            color: seriesColors[index],
          };

          return (
            <React.Fragment key={index}>
              <LineSeries
                key={index}
                index={index}
                xScale={xScale}
                yScale={yScale}
                data={seriesWithColor}
                isAnimated={isAnimated}
                svgDimensions={{height, width}}
                theme={theme}
                type="spark"
              />
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
}
