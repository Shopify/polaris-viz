import React from 'react';
import {View, StyleSheet} from 'react-native';
import {scaleLinear} from 'd3-scale';
import {
  SparkLineChartProps,
  useTheme,
  useThemeSeriesColors,
  useSparkLine,
  LineSeries,
  usePolarisVizContext,
} from '@shopify/polaris-viz-core';

const SVG_MARGIN = 2;
export function SparkLineChart({
  data,
  accessibilityLabel,
  isAnimated = false,
  offsetLeft = 0,
  offsetRight = 0,
  theme = 'Default',
}: SparkLineChartProps) {
  const selectedTheme = useTheme(theme);
  const seriesColors = useThemeSeriesColors(data, selectedTheme);
  const {
    components: {Svg},
  } = usePolarisVizContext();

  const width = 600;
  const height = 400;

  const {minXValues, maxXValues, yScale} = useSparkLine({
    data,
    height,
  });

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {alignItems: 'center', justifyContent: 'center'},
      ]}
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel}
    >
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
