import React from 'react';
import {View, StyleSheet} from 'react-native';
import {scaleLinear} from 'd3-scale';

import {
  Svg,
  SparkLineChartProps,
  useTheme,
  useThemeSeriesColors,
  useSparkLine,
} from '../../../../polaris-viz-core/src';

import {Series} from './components';

const SVG_MARGIN = 2;
export function SparkLineChart({
  data,
  accessibilityLabel,
  isAnimated = false,
  offsetLeft = 0,
  offsetRight = 0,
  theme,
}: SparkLineChartProps) {
  const selectedTheme = useTheme(theme);
  const seriesColors = useThemeSeriesColors(data, selectedTheme);

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
      <Svg native width={width} height={height}>
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
            color: seriesColors[index],
            ...series,
          };

          return (
            <React.Fragment key={index}>
              <Series
                key={index}
                xScale={xScale}
                yScale={yScale}
                data={seriesWithColor}
                isAnimated={isAnimated}
                svgDimensions={{height, width}}
                theme={selectedTheme}
              />
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
}
