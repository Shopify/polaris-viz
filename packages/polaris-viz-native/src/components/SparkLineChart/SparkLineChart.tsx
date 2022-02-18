import React from 'react';
import {View} from 'react-native';
import {scaleLinear} from 'd3-scale';
import {
  SparkLineChartProps,
  useTheme,
  useThemeSeriesColors,
  useSparkLine,
  LineSeries,
  usePolarisVizContext,
  Dimensions,
} from '@shopify/polaris-viz-core';

import {usePrefersReducedMotion} from '../../hooks';
import {ChartContainer} from '../ChartContainer';

const SVG_MARGIN = 2;

export function SparkLineChart({
  data,
  accessibilityLabel,
  isAnimated = true,
  offsetLeft = 0,
  offsetRight = 0,
  theme = 'Default',
}: SparkLineChartProps) {
  const {prefersReducedMotion} = usePrefersReducedMotion();
  const shouldAnimate = !prefersReducedMotion && isAnimated;

  return (
    <ChartContainer>
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

interface ChartProps extends SparkLineChartProps {
  dimensions?: Dimensions;
}

function Chart({
  data,
  accessibilityLabel,
  isAnimated = true,
  offsetLeft = 0,
  offsetRight = 0,
  theme = 'Default',
  dimensions = {width: 0, height: 0},
}: ChartProps) {
  const {width, height} = dimensions;
  const selectedTheme = useTheme(theme);
  const seriesColors = useThemeSeriesColors(data, selectedTheme);
  const {
    components: {Svg},
  } = usePolarisVizContext();

  const {minXValues, maxXValues, yScale} = useSparkLine({
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
            .domain([minXValues, maxXValues]);

          const seriesWithColor = {
            ...series,
            color: seriesColors[index],
          };

          return (
            <React.Fragment key={index}>
              <LineSeries
                native
                key={index}
                index={index}
                xScale={xScale}
                yScale={yScale}
                data={seriesWithColor}
                isAnimated={isAnimated}
                svgDimensions={{height, width}}
                theme={theme}
              />
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
}