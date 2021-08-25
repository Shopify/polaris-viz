import React, {useCallback, useState, useLayoutEffect, useMemo} from 'react';
import {useDebouncedCallback} from 'use-debounce';
import {scaleBand, scaleLinear} from 'd3-scale';
import {line} from 'd3-shape';
import {useTransition} from '@react-spring/web';

import {usePrefersReducedMotion, useResizeObserver} from '../../hooks';
import {BARS_TRANSITION_CONFIG, colorTeal} from '../../constants';
import type {SparkChartData} from '../../types';
import {rgbToRgba, uniqueId, getAnimationTrail} from '../../utilities';
import {LinearGradient} from '../LinearGradient';

import {Bar} from './components';
import styles from './Sparkbar.scss';

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
  color?: string;
  accessibilityLabel?: string;
  isAnimated?: boolean;
  barFillStyle?: 'solid' | 'gradient';
}

function calculateRange(data: SparkChartData[], height: number) {
  let hasNegatives;
  let hasPositives;
  for (const val of data) {
    if (val != null && val < 0) hasNegatives = true;
    else if (val != null && val > 0) hasPositives = true;

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
  color = colorTeal,
  accessibilityLabel,
  isAnimated = false,
  barFillStyle = 'solid',
  dataOffsetRight = 0,
  dataOffsetLeft = 0,
}: SparkbarProps) {
  const {
    ref: containerRef,
    setRef: setContainerRef,
    entry,
  } = useResizeObserver();
  const [svgDimensions, setSvgDimensions] = useState({width: 0, height: 0});
  const {prefersReducedMotion} = usePrefersReducedMotion();

  const [updateMeasurements] = useDebouncedCallback(() => {
    if (containerRef == null) return;

    setSvgDimensions({
      height: containerRef.clientHeight,
      width: containerRef.clientWidth,
    });
  }, 10);

  useLayoutEffect(() => {
    if (entry == null) return;

    if (containerRef == null) return;

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

  const filteredData = data.filter(
    (value) => typeof value === 'number',
  ) as number[];

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

  const id = useMemo(() => uniqueId('sparkbar'), []);

  const getBarHeight = useCallback(
    (rawValue: number) => {
      const height = Math.abs(yScale(rawValue) - yScale(0));
      return Math.max(height, BAR_MIN_HEIGHT_RATIO * barWidth);
    },
    [barWidth, yScale],
  );

  const dataWithIndex = data.map((value, index) => ({value, index}));

  const shouldAnimate = !prefersReducedMotion && isAnimated;

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
    <div className={styles.Wrapper} ref={setContainerRef}>
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
        {barFillStyle === 'gradient' ? (
          <LinearGradient
            id={id}
            gradient={[
              {
                color: rgbToRgba({rgb: color, alpha: 0.5}),
                offset: 0,
              },
              {
                color: rgbToRgba({rgb: color, alpha: 1}),
                offset: 100,
              },
            ]}
          />
        ) : null}

        <g fill={barFillStyle === 'gradient' ? `url(#${id})` : color}>
          {transitions(({height: barHeight}, item, _transition, index) => {
            const xPosition = xScale(index.toString());
            return (
              <g key={index} opacity={comparison ? '0.9' : '1'}>
                <Bar
                  key={index}
                  x={xPosition == null ? 0 : xPosition}
                  yScale={yScale}
                  rawValue={item.value}
                  width={barWidth}
                  height={barHeight}
                />
              </g>
            );
          })}
        </g>
        {comparison == null ? null : (
          <g>
            <path
              stroke={color}
              strokeWidth={STROKE_WIDTH}
              d={lineShape!}
              className={styles.ComparisonLine}
            />
          </g>
        )}
      </svg>
    </div>
  );
}
