import React, {useCallback, useMemo} from 'react';
import {scaleBand, scaleLinear} from 'd3-scale';
import {line} from 'd3-shape';
import {useTransition} from '@react-spring/web';
import {
  LinearGradientWithStops,
  getSeriesColorsFromCount,
  useTheme,
} from '@shopify/polaris-viz-core';

import {usePrefersReducedMotion} from '../../hooks';
import {BARS_TRANSITION_CONFIG, XMLNS} from '../../constants';
import type {DataPoint, DataSeries, Dimensions} from '../../types';
import {uniqueId, getAnimationTrail, isGradientType} from '../../utilities';

import {Bar} from './components';
import styles from './SparkBarChart.scss';
import type {SparkBarChartProps} from './SparkBarChart';

const STROKE_WIDTH = 1.5;
const BAR_PADDING = 0.3;
const MARGIN = 8;
const ANIMATION_MARGIN = 17;
const BAR_MIN_HEIGHT_RATIO = 0.5;

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

interface Props extends SparkBarChartProps {
  dimensions?: Dimensions;
}

export function Chart({
  data,
  dimensions,
  accessibilityLabel,
  isAnimated = false,
  dataOffsetRight = 0,
  dataOffsetLeft = 0,
  theme,
}: Props) {
  const {prefersReducedMotion} = usePrefersReducedMotion();
  const selectedTheme = useTheme(theme);
  const [seriesColor] = getSeriesColorsFromCount(1, selectedTheme);

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

  const shouldAnimate = !prefersReducedMotion && isAnimated;

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
    <React.Fragment>
      {accessibilityLabel ? (
        <span className={styles.VisuallyHidden}>{accessibilityLabel}</span>
      ) : null}

      <svg
        xmlns={XMLNS}
        aria-hidden
        viewBox={`0 -${ANIMATION_MARGIN} ${width} ${viewboxHeight}`}
        style={{
          transform: `translateY(-${ANIMATION_MARGIN}px)`,
        }}
        className={styles.Svg}
        height={viewboxHeight}
        width={width}
      >
        <defs>
          <LinearGradientWithStops
            id={id}
            gradient={color}
            gradientUnits="userSpaceOnUse"
            y1="100%"
            y2="0%"
          />
        </defs>

        <mask id={clipId}>
          <g opacity={comparisonData ? '0.9' : '1'}>
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
                  height={height}
                  fill="white"
                />
              );
            })}
          </g>
        </mask>

        <rect
          fill={`url(#${id})`}
          width={width}
          height={height}
          mask={`url(#${clipId})`}
        />

        {comparisonData == null ? null : (
          <path
            stroke={selectedTheme.seriesColors.comparison}
            strokeWidth={STROKE_WIDTH}
            d={lineShape!}
            className={styles.ComparisonLine}
            opacity="0.9"
            strokeDashoffset={strokeDashoffset}
            strokeDasharray={strokeDasharray}
          />
        )}
      </svg>
    </React.Fragment>
  );
}
