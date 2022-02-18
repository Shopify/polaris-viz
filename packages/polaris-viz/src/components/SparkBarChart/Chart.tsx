import React, {useMemo} from 'react';
import {useTransition} from '@react-spring/web';
import {
  LinearGradientWithStops,
  getSeriesColors,
  useTheme,
  Bar,
  useSparkBar,
  Dimensions,
  SparkBarChartProps,
  BARS_TRANSITION_CONFIG,
  getAnimationTrail,
  ANIMATION_MARGIN,
  STROKE_WIDTH,
  uniqueId,
} from '@shopify/polaris-viz-core';

import {usePrefersReducedMotion} from '../../hooks';
import {XMLNS} from '../../constants';

import styles from './SparkBarChart.scss';

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
  const [seriesColor] = getSeriesColors(1, selectedTheme);

  const {width, height} = dimensions ?? {width: 0, height: 0};
  const id = useMemo(() => uniqueId('sparkbar'), []);
  const clipId = useMemo(() => uniqueId('clip'), []);

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
                  hasRoundedCorners={selectedTheme.bar.hasRoundedCorners}
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
