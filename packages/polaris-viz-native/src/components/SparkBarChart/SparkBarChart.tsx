import React, {useCallback, useMemo} from 'react';
import {View} from 'react-native';
import {
  DataPoint,
  DataSeries,
  getSeriesColors,
  isGradientType,
  LinearGradientWithStops,
  uniqueId,
  useTheme,
  Bar,
  usePolarisVizContext,
} from '@shopify/polaris-viz-core';
import {scaleBand, scaleLinear} from 'd3-scale';
import {line} from 'd3-shape';
// import {usePrefersReducedMotion} from '../../hooks';

import {ChartContainer} from '../ChartContainer';
import {useTransition} from '@react-spring/native';

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

interface Dimensions {
  dimensions?: {width: number; height: number};
}

const STROKE_WIDTH = 1.5;
const BAR_PADDING = 0.3;
const MARGIN = 8;
const ANIMATION_MARGIN = 17;
const BAR_MIN_HEIGHT_RATIO = 0.5;

function Chart({
  data,
  dimensions,
  accessibilityLabel,
  dataOffsetRight = 0,
  dataOffsetLeft = 0,
  theme,
  isAnimated,
}: SparkBarChartProps & Dimensions) {
  // const {prefersReducedMotion} = usePrefersReducedMotion();
  const selectedTheme = useTheme(theme);
  const [seriesColor] = getSeriesColors(1, selectedTheme);
  const {
    components: {Svg, Defs, Mask, G, Path, Rect},
    animated,
  } = usePolarisVizContext();

  const AnimatedG = animated(G);

  const {width, height} = dimensions ?? {width: 0, height: 0};

  const [defaultData, comparisonData] = useMemo(() => {
    const defaultData = data.find(({isComparison}) => isComparison !== true);
    const comparisonData = data.find(({isComparison}) => isComparison === true);

    return [defaultData, comparisonData];
  }, [data]);

  const dataForChart = defaultData ?? comparisonData ?? {data: []};

  const filteredData = removeNullValues(defaultData);
  const filteredComparisonData = removeNullValues(comparisonData);

  const yScale = scaleLinear()
    .range(calculateRange(dataForChart.data, height))
    .domain([
      Math.min(...filteredData, ...filteredComparisonData, 0),
      Math.max(...filteredData, ...filteredComparisonData, 0),
    ]);

  const xScale = scaleBand()
    .range([dataOffsetLeft, width - dataOffsetRight])
    .paddingInner(BAR_PADDING)
    .domain(dataForChart.data.map((_, index) => index.toString()));

  const xScaleLinear = scaleLinear()
    .range([0, width])
    .domain([0, dataForChart.data.length - 1]);

  const lineGenerator = line<any>()
    .x(({key}) => xScaleLinear(key))
    .y(({value}) => yScale(value));

  const lineShape = comparisonData ? lineGenerator(comparisonData.data) : null;

  const barWidth = useMemo(() => xScale.bandwidth(), [xScale]);
  const barGap = useMemo(
    () => xScale.step() * xScale.paddingInner() + STROKE_WIDTH,
    [xScale],
  );

  const strokeDashoffset =
    dataOffsetLeft == null
      ? -(STROKE_WIDTH / 2)
      : -(STROKE_WIDTH / 2) - dataOffsetLeft;
  const strokeDasharray = `${barWidth - STROKE_WIDTH} ${barGap}`;

  const id = useMemo(() => uniqueId('sparkbar'), []);
  const clipId = useMemo(() => uniqueId('clip'), []);

  const getBarHeight = useCallback(
    ({value}) => {
      const height = Math.abs(yScale(value) - yScale(0));
      return Math.max(height, BAR_MIN_HEIGHT_RATIO * barWidth);
    },
    [barWidth, yScale],
  );

  const dataWithIndex = defaultData
    ? defaultData.data.map((value, index) => ({
        value,
        index,
      }))
    : [];

  // const shouldAnimate = !prefersReducedMotion && isAnimated;
  const shouldAnimate = isAnimated;
  const BARS_TRANSITION_CONFIG = {mass: 1, tension: 150, friction: 16};

  const colorToUse = defaultData?.color ?? seriesColor;

  const color = isGradientType(colorToUse)
    ? colorToUse
    : [
        {
          color: colorToUse,
          offset: 0,
        },
      ];

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
        // style={{
        //   transform: `translate(0 -${ANIMATION_MARGIN})`,
        // }}
        height={viewboxHeight}
        width={width}
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
                  height={height as any}
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

function calculateRange(data: DataPoint[], height: number) {
  let hasNegatives;
  let hasPositives;
  for (const {value} of data) {
    if (value != null && value < 0) hasNegatives = true;
    else if (value != null && value > 0) hasPositives = true;

    if (hasNegatives && hasPositives) break;
  }

  let range = [height, MARGIN];

  if (hasNegatives && hasPositives) {
    range = [height - MARGIN, MARGIN];
  } else if (hasNegatives) {
    range = [height - MARGIN, 0];
  }

  return range;
}

function removeNullValues(data: DataSeries | undefined) {
  if (data == null) {
    return [];
  }

  return data.data
    .filter(({value}) => typeof value === 'number')
    .map(({value}) => value) as number[];
}
