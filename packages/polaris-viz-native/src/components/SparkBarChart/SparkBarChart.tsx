import React, {useMemo} from 'react';
import {View} from 'react-native';
import {useTransition} from '@react-spring/native';
import {
  DataSeries,
  getSeriesColors,
  LinearGradientWithStops,
  uniqueId,
  useTheme,
  Bar,
  usePolarisVizContext,
  useSparkBar,
} from '@shopify/polaris-viz-core';
import {usePrefersReducedMotion} from '../../hooks';

import {ChartContainer} from '../ChartContainer';

//cleanup dup
export interface SparkBarChartProps {
  data: DataSeries[];
  dataOffsetRight?: number;
  dataOffsetLeft?: number;
  accessibilityLabel?: string;
  isAnimated?: boolean;
  theme?: string;
}
function getAnimationTrail(dataLength: number) {
  return 500 / dataLength;
}

interface Dimensions {
  dimensions?: {width: number; height: number};
}
const BARS_TRANSITION_CONFIG = {mass: 1, tension: 150, friction: 16};
const STROKE_WIDTH = 1.5;
const ANIMATION_MARGIN = 17;
//

export function SparkBarChart({
  data,
  accessibilityLabel,
  isAnimated = false,
  dataOffsetRight = 0,
  dataOffsetLeft = 0,
  theme,
}: SparkBarChartProps) {
  return (
    <ChartContainer theme={theme}>
      <Chart
        data={data}
        accessibilityLabel={accessibilityLabel}
        isAnimated={isAnimated}
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
  theme,
  isAnimated,
}: SparkBarChartProps & Dimensions) {
  const {
    components: {Svg, Defs, Mask, G, Path, Rect},
    animated,
  } = usePolarisVizContext();

  const AnimatedG = animated(G);

  const {prefersReducedMotion} = usePrefersReducedMotion();
  const selectedTheme = useTheme(theme);
  const [seriesColor] = getSeriesColors(1, selectedTheme);
  const id = useMemo(() => uniqueId('sparkbar'), []);
  const clipId = useMemo(() => uniqueId('clip'), []);
  const {width, height} = dimensions ?? {width: 0, height: 0};
  const shouldAnimate = !prefersReducedMotion && isAnimated;

  const {
    dataWithIndex,
    color,
    getBarHeight,
    strokeDasharray,
    strokeDashoffset,
    lineShape,
    comparisonData,
    xScale,
    yScale,
    barWidth,
  } = useSparkBar({
    data,
    height,
    dataOffsetLeft,
    dataOffsetRight,
    width,
    seriesColor,
  });

  const transitions = useTransition(dataWithIndex, {
    key: ({index}: {index: number}) => index,
    from: {height: 0},
    leave: {height: 0},
    enter: ({value}) => ({height: getBarHeight(value == null ? 0 : value)}),
    update: ({value}) => ({height: getBarHeight(value == null ? 0 : value)}),
    default: {immediate: !shouldAnimate},
    trail: shouldAnimate ? getAnimationTrail(dataWithIndex.length) : 0,
    config: BARS_TRANSITION_CONFIG,
  });

  const viewboxHeight = height + ANIMATION_MARGIN * 2;

  return (
    <View accessibilityRole="image" accessibilityLabel={accessibilityLabel}>
      <Svg
        viewBox={`0 -${ANIMATION_MARGIN} ${width} ${viewboxHeight}`}
        height={viewboxHeight}
        width={width}
        transform={[{translateY: -1 * ANIMATION_MARGIN}] as any} //fix
      >
        <Defs>
          <LinearGradientWithStops
            id={id}
            gradient={color}
            gradientUnits="userSpaceOnUse"
            y1="100%"
            y2="0%"
          />
        </Defs>

        <Mask id={clipId}>
          <AnimatedG opacity={comparisonData ? '0.9' : '1'}>
            {transitions(({height: barHeight}, item, _transition, index) => {
              const xPosition = xScale(index.toString());
              const height = shouldAnimate
                ? barHeight
                : getBarHeight(item.value ?? 0);

              return (
                <Bar
                  key={index}
                  x={xPosition == null ? 0 : xPosition}
                  yScale={yScale}
                  value={item.value.value}
                  width={barWidth}
                  height={height as any} //fix
                  fill="white"
                  hasRoundedCorners={selectedTheme.bar.hasRoundedCorners}
                />
              );
            })}
          </AnimatedG>
        </Mask>

        <Rect
          fill={`url(#${id})`}
          width={width}
          height={height}
          mask={`url(#${clipId})`}
        />

        {comparisonData == null ? null : (
          <Path
            stroke={selectedTheme.seriesColors.comparison}
            strokeWidth={STROKE_WIDTH}
            d={lineShape!}
            //actually import
            // className={styles.ComparisonLine}
            opacity="0.9"
            strokeDashoffset={strokeDashoffset}
            strokeDasharray={strokeDasharray}
          />
        )}
      </Svg>
    </View>
  );
}
