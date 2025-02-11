import {Fragment, useMemo} from 'react';
import type {useTransition} from '@react-spring/core';

import type {DataSeries, TargetLine} from '../../types';
import {usePolarisVizContext, useSparkBar, useTheme} from '../../hooks';
import {LinearGradientWithStops} from '../LinearGradientWithStops';
import {getAnimationTrail, getSeriesColors, uniqueId} from '../../utilities';
import {Bar} from '../Bar';
import {
  BARS_TRANSITION_CONFIG,
  STROKE_WIDTH,
  STROKE_DOT_ARRAY_WIDTH,
} from '../../constants';

interface SparkBarSeriesProps {
  data: DataSeries[];
  height: number;
  shouldAnimate: boolean;
  useTransition: typeof useTransition;
  width: number;
  targetLine?: TargetLine;
  theme?: string;
}

export function SparkBarSeries({
  data,
  targetLine,
  height,
  shouldAnimate,
  useTransition,
  width,
  theme,
}: SparkBarSeriesProps) {
  const selectedTheme = useTheme(theme);
  const [seriesColor] = getSeriesColors(1, selectedTheme);

  const {
    // eslint-disable-next-line id-length
    components: {Defs, Mask, G, Rect, Line},
    animated,
  } = usePolarisVizContext();

  const AnimatedG = animated(G);

  const id = useMemo(() => uniqueId('sparkbar-series'), []);
  const clipId = useMemo(() => uniqueId('sparkbar-series-clip'), []);

  const {
    dataWithIndex,
    color,
    getBarHeight,
    strokeDashoffset,
    xScale,
    yScale,
    barWidth,
    targetLineYPosition,
    targetLineX1,
    targetLineX2,
  } = useSparkBar({
    data,
    height,
    width,
    seriesColor,
    targetLine,
  });

  const transitions = useTransition(dataWithIndex, {
    key: ({index}: {index: number}) => index,
    from: {height: 0},
    leave: {height: 0},
    enter: ({value: {value}}) => ({
      height: getBarHeight(value == null ? 0 : value),
    }),
    update: ({value: {value}}) => ({
      height: getBarHeight(value == null ? 0 : value),
    }),
    default: {immediate: !shouldAnimate},
    trail: shouldAnimate ? getAnimationTrail(dataWithIndex.length) : 0,
    config: BARS_TRANSITION_CONFIG,
  });

  const hasTargetLine = targetLine != null && targetLine.value != null;
  return (
    <Fragment>
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
        <AnimatedG opacity={hasTargetLine ? '0.9' : '1'}>
          {transitions(({height: barHeight}, item, _transition, index) => {
            const xPosition = xScale(index.toString());
            const height = shouldAnimate
              ? barHeight
              : getBarHeight(item.value.value ?? 0);

            return (
              <Bar
                borderRadius={selectedTheme.bar.borderRadius}
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
        </AnimatedG>
      </Mask>

      <Rect
        fill={`url(#${id})`}
        width={width}
        height={height}
        mask={`url(#${clipId})`}
      />

      {hasTargetLine ? (
        <Line
          stroke={selectedTheme.seriesColors.comparison}
          strokeWidth={STROKE_WIDTH}
          x1={targetLineX1}
          x2={targetLineX2}
          y1={targetLineYPosition}
          y2={targetLineYPosition}
          strokeLinecap="round"
          opacity="0.9"
          strokeDashoffset={strokeDashoffset}
          strokeDasharray={STROKE_DOT_ARRAY_WIDTH}
        />
      ) : null}
    </Fragment>
  );
}
