import React, {useCallback, useState, useLayoutEffect, useMemo} from 'react';
import {useDebouncedCallback} from 'use-debounce';
import {scaleBand, scaleLinear} from 'd3-scale';
import {line} from 'd3-shape';
import {useTransition} from 'react-spring';

import {usePrefersReducedMotion, useResizeObserver} from '../../hooks';
import {BARS_TRANSITION_CONFIG} from '../../constants';
import {Color} from '../../types';
import {
  getColorValue,
  rgbToRgba,
  uniqueId,
  getAnimationTrail,
} from '../../utilities';
import {LinearGradient} from '../LinearGradient';

import {Bar} from './components';
import styles from './Sparkbar.scss';

const STROKE_WIDTH = 1.5;
const BAR_PADDING = 0.15;
const MARGIN = 8;
const ANIMATION_MARGIN = 17;

interface Coordinates {
  x: number;
  y: number;
}

export interface SparkbarProps {
  data: number[];
  comparison?: Coordinates[];
  color?: Color;
  accessibilityLabel?: string;
  isAnimated?: boolean;
  barFillStyle?: 'solid' | 'gradient';
}

function calculateRange(data: number[], height: number) {
  let hasNegatives;
  let hasPositives;
  for (const val of data) {
    if (val < 0) hasNegatives = true;
    else if (val > 0) hasPositives = true;

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
  color = 'colorTeal',
  accessibilityLabel,
  isAnimated = false,
  barFillStyle = 'solid',
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

  const yScale = scaleLinear()
    .range(calculateRange(data, height))
    .domain([Math.min(...data, 0), Math.max(...data, 0)]);

  const xScale = scaleBand()
    .range([0, width])
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

  const currentColor = getColorValue(color);

  const getBarHeight = useCallback(
    (rawValue: number) => {
      return Math.abs(yScale(rawValue) - yScale(0));
    },
    [yScale],
  );

  const dataWithIndex = data.map((value, index) => ({value, index}));

  const shouldAnimate = !prefersReducedMotion && isAnimated;

  const transitions = useTransition(dataWithIndex, ({index}) => index, {
    from: {height: 0},
    leave: {height: 0},
    enter: ({value}) => ({height: getBarHeight(value)}),
    update: ({value}) => ({height: getBarHeight(value)}),
    immediate: !shouldAnimate,
    trail: shouldAnimate ? getAnimationTrail(dataWithIndex.length) : 0,
    config: BARS_TRANSITION_CONFIG,
  });

  return (
    <div className={styles.Wrapper} ref={setContainerRef}>
      {accessibilityLabel ? (
        <span className={styles.VisuallyHidden}>{accessibilityLabel}</span>
      ) : null}

      <svg
        aria-hidden
        viewBox={`0 ${ANIMATION_MARGIN * -1} ${width} ${height +
          ANIMATION_MARGIN * 2}`}
        style={{
          transform: `translateY(${ANIMATION_MARGIN * -1}px)`,
        }}
        className={styles.Svg}
      >
        {barFillStyle === 'gradient' ? (
          <LinearGradient
            id={id}
            gradient={[
              {
                color: rgbToRgba({rgb: currentColor, alpha: 0.5}),
                offset: 0,
              },
              {
                color: rgbToRgba({rgb: currentColor, alpha: 1}),
                offset: 100,
              },
            ]}
          />
        ) : null}

        <g fill={barFillStyle === 'gradient' ? `url(#${id})` : currentColor}>
          {transitions.map(({item, props: {height: barHeight}}, index) => {
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
              stroke={currentColor}
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
