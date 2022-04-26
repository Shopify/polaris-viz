import React, {useMemo} from 'react';
import type {DataSeries} from 'types';

import {usePolarisVizContext, useSparkBar, useTheme} from '../../hooks';
import {LinearGradientWithStops} from '../LinearGradientWithStops';
import {getAnimationTrail, getSeriesColors, uniqueId} from '../../utilities';
import {Bar} from '../Bar';
import {
  BARS_TRANSITION_CONFIG,
  BORDER_RADIUS,
  STROKE_WIDTH,
} from '../../constants';

interface SparkBarSeriesProps {
  data: DataSeries[];
  dataOffsetLeft: number;
  dataOffsetRight: number;
  drawableHeight: number;
  shouldAnimate: boolean;
  width: number;
  theme?: string;
}

export function SparkBarSeries({
  data,
  dataOffsetLeft,
  dataOffsetRight,
  drawableHeight,
  shouldAnimate,
  theme,
  width,
}: SparkBarSeriesProps) {
  const selectedTheme = useTheme(theme);
  const [seriesColor] = getSeriesColors(1, selectedTheme);

  const {
    // eslint-disable-next-line id-length
    components: {Defs, Mask, G, Path, Rect},
    animated,
    useTransition,
  } = usePolarisVizContext();

  const AnimatedG = animated(G);

  const id = useMemo(() => uniqueId('sparkbar-series'), []);
  const clipId = useMemo(() => uniqueId('sparkbar-series-clip'), []);

  const {
    borderRadius,
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
    height: drawableHeight,
    dataOffsetLeft,
    dataOffsetRight,
    width,
    seriesColor,
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

  return (
    <React.Fragment>
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
              : getBarHeight(item.value.value ?? 0);

            return (
              <Bar
                borderRadius={
                  selectedTheme.bar.hasRoundedCorners
                    ? borderRadius
                    : BORDER_RADIUS.None
                }
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
        height={drawableHeight}
        mask={`url(#${clipId})`}
      />

      {comparisonData == null ? null : (
        <Path
          stroke={selectedTheme.seriesColors.comparison}
          strokeWidth={STROKE_WIDTH}
          d={lineShape!}
          strokeLinecap="round"
          opacity="0.9"
          strokeDashoffset={strokeDashoffset}
          strokeDasharray={strokeDasharray}
        />
      )}
    </React.Fragment>
  );
}
