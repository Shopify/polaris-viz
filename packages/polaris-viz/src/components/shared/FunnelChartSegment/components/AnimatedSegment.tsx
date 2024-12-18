import {getRoundedRectPath, useChartContext} from '@shopify/polaris-viz-core';
import type {SpringValue} from '@react-spring/web';
import {animated} from '@react-spring/web';

import {FUNNEL_CHART_SEGMENT_FILL, BORDER_RADIUS} from '../constants';

interface AnimatedSegmentProps {
  animatedHeight: SpringValue<number>;
  ariaLabel: string;
  barWidth: number;
  isFirst: boolean;
  isLast: boolean;
  x: number;
}

export function AnimatedSegment({
  animatedHeight,
  ariaLabel,
  barWidth,
  isFirst,
  isLast,
  x,
}: AnimatedSegmentProps) {
  const {containerBounds} = useChartContext();
  const {height: drawableHeight} = containerBounds ?? {
    height: 0,
  };
  const borderRadius = `${isFirst ? BORDER_RADIUS : 0} ${
    isLast ? BORDER_RADIUS : 0
  } 0 0`;

  return (
    <animated.path
      aria-label={ariaLabel}
      d={animatedHeight.to((value: number) =>
        getRoundedRectPath({
          height: value,
          width: barWidth,
          borderRadius,
        }),
      )}
      fill={FUNNEL_CHART_SEGMENT_FILL}
      style={{
        transform: animatedHeight.to(
          (value: number) => `translate(${x}px, ${drawableHeight - value}px)`,
        ),
      }}
      width={barWidth}
    />
  );
}
