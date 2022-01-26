import {Svg, Circle, Rect} from 'react-native-svg';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {scaleLinear} from 'd3-scale';

import {
  SparkLineChartProps,
  useTheme,
  useThemeSeriesColors,
  useSparkLine,
  LinearGradient,
} from '../../../../polaris-viz-core/src';

import {Series} from './components';

export function SparkLineChart({
  data,
  accessibilityLabel,
  isAnimated = false,
  offsetLeft = 0,
  offsetRight = 0,
  theme,
}: SparkLineChartProps) {
  const SVG_MARGIN = 2;
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
    >
      <Svg viewBox="0 0 100 100" width={width} height={height}>
        <LinearGradient
          native
          id="sampleGradient"
          gradientUnits="userSpaceOnUse"
          gradient={[
            {
              color: 'red',
              offset: 0,
            },
            {
              color: 'green',
              offset: 10,
            },
          ]}
        />
        <Rect
          x="0"
          y="0"
          width="500"
          height="500"
          fill="url(#sampleGradient)"
        />
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
              <LinearGradient
                native
                id="sampleGradient"
                gradient={[
                  {
                    color: 'red',
                    offset: 0,
                  },
                  {
                    color: 'purple',
                    offset: 50,
                  },
                  {
                    color: 'green',
                    offset: 100,
                  },
                ]}
              />
            </React.Fragment>
            // <Series
            //   key={index}
            //   xScale={xScale}
            //   yScale={yScale}
            //   data={seriesWithColor}
            //   isAnimated={isAnimated}
            //   svgDimensions={{height, width}}
            //   theme={selectedTheme}
            // />
          );
        })}
      </Svg>
    </View>
  );
}
