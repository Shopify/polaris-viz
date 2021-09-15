import React, {useCallback, useState, useLayoutEffect, useMemo} from 'react';
import {useDebouncedCallback} from 'use-debounce';
import {scaleBand, scaleLinear} from 'd3-scale';
import {line} from 'd3-shape';
import {useTransition} from '@react-spring/web';

import {getSeriesColorsFromCount} from 'hooks/use-theme-series-colors';
import {
  usePrefersReducedMotion,
  useResizeObserver,
  useTheme,
} from 'hooks';
import {BARS_TRANSITION_CONFIG, XMLNS} from 'consts';
import type {Color, SparkChartData} from 'types';
import {uniqueId, getAnimationTrail, isGradientType} from 'utilities';
import {LinearGradient} from 'components/LinearGradient';

import {Bar} from 'components/Sparkbar/components';
import styles from 'components/Sparkbar/Sparkbar.scss';

const STROKE_WIDTH = 1.5;
const BAR_PADDING = 0.3;
const MARGIN = 8;
const ANIMATION_MARGIN = 17;
const BAR_MIN_HEIGHT_RATIO = 0.5;

interface Coordinates {
  x: number;
  y: number;
}

export interface SparkbarProps {
  data: SparkChartData[];
  dataOffsetRight?: number;
  dataOffsetLeft?: number;
  comparison?: Coordinates[];
  accessibilityLabel?: string;
  isAnimated?: boolean;
  theme?: string;
  barColor?: Color;
}

function calculateRange(data: SparkChartData[], height: number) {
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

export function Sparkbar({
  data,
  comparison,
  accessibilityLabel,
  isAnimated = false,
  dataOffsetRight = 0,
  dataOffsetLeft = 0,
  theme,
  barColor,
}: SparkbarProps) {
  const {
    ref: containerRef,
    setRef: setContainerRef,
    entry,
  } = useResizeObserver();
  const [svgDimensions, setSvgDimensions] = useState({width: 0, height: 0});
  const {prefersReducedMotion} = usePrefersReducedMotion();
  const selectedTheme = useTheme(theme);
  const [seriesColor] = getSeriesColorsFromCount(1, selectedTheme);

  const [updateMeasurements] = useDebouncedCallback(() => {
    if (entry == null) return;

    setSvgDimensions({
      height: entry.contentRect.height,
      width: entry.contentRect.width,
    });
  }, 10);

  useLayoutEffect(() => {
    updateMeasurements();

    const isServer = typeof window === 'undefined';

    if (!isServer) {
      window.addEventListener('resize', () => updateMeasurements());
    }

    return () => {
      if (!isServer) {
        window.removeEventListener('resize', () => updateMeasurements());
      }
    };
  }, [entry, containerRef, updateMeasurements]);

  const {width, height} = svgDimensions;

  const filteredData = data
    .filter(({value}) => typeof value === 'number')
    .map(({value}) => value) as number[];

  const comparisonData = comparison == null ? [] : comparison.map(({y}) => y);

  const yScale = scaleLinear()
    .range(calculateRange(data, height))
    .domain([
      Math.min(...filteredData, ...comparisonData, 0),
      Math.max(...filteredData, ...comparisonData, 0),
    ]);

  const xScale = scaleBand()
    .range([dataOffsetLeft, width - dataOffsetRight])
    .paddingInner(BAR_PADDING)
    .domain(data.map((_, index) => index.toString()));

  const xScaleLinear = scaleLinear()
    .range([0, width])
    .domain([0, data.length - 1]);

  const lineGenerator = line<Coordinates>()
    .x(({x}) => xScaleLinear(x))
    .y(({y}) => yScale(y));

  const lineShape = comparison ? lineGenerator(comparison) : null;

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

  const dataWithIndex = data.map((value, index) => ({
    value,
    index,
  }));

  const shouldAnimate = !prefersReducedMotion && isAnimated;

  const colorToUse = barColor ?? seriesColor;

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
    <div
      className={styles.Wrapper}
      ref={setContainerRef}
      style={{
        background: selectedTheme.chartContainer.backgroundColor,
        padding: selectedTheme.chartContainer.padding,
        borderRadius: selectedTheme.chartContainer.borderRadius,
      }}
    >
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
          <LinearGradient
            id={id}
            gradient={color}
            gradientUnits="userSpaceOnUse"
            y1="100%"
            y2="0%"
          />
        </defs>

        <mask id={clipId}>
          <g opacity={comparison ? '0.9' : '1'}>
            {transitions(({height: barHeight}, item, _transition, index) => {
              const xPosition = xScale(index.toString());

              return (
                <Bar
                  key={index}
                  x={xPosition == null ? 0 : xPosition}
                  yScale={yScale}
                  value={item.value.value}
                  width={barWidth}
                  height={barHeight}
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

        {comparison == null ? null : (
          <path
            stroke={selectedTheme.line.dottedStrokeColor}
            strokeWidth={STROKE_WIDTH}
            d={lineShape!}
            className={styles.ComparisonLine}
            opacity="0.9"
            strokeDashoffset={strokeDashoffset}
            strokeDasharray={strokeDasharray}
          />
        )}
      </svg>
    </div>
  );
}
