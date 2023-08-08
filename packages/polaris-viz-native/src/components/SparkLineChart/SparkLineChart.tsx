import {Fragment} from 'react';
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
  STROKE_DOT_ARRAY_WIDTH,
} from '@shopify/polaris-viz-core';
import type {ChartProps, Dimensions} from '@shopify/polaris-viz-core';

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

  return (
    <ChartContainer
      data={data}
      sparkChart
      isAnimated={isAnimated}
      theme={theme}
    >
      <Chart
        data={data}
        accessibilityLabel={accessibilityLabel}
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
            strokeDasharray: series.isComparison
              ? STROKE_DOT_ARRAY_WIDTH
              : 'none',
          };

          return (
            <Fragment key={index}>
              <LineSeries
                key={index}
                index={index}
                xScale={xScale}
                yScale={yScale}
                data={seriesWithColor}
                svgDimensions={{height, width}}
                theme={theme}
                type="spark"
              />
            </Fragment>
          );
        })}
      </Svg>
    </View>
  );
}
