import React from 'react';
import {animated, useSpring} from 'react-spring';
import {ScaleLinear} from 'd3-scale';
import {
  MIN_BAR_HEIGHT,
  FULL_OPACITY,
  SUBDUED_OPACITY,
} from 'components/GroupedBarChart/constants';
import {Color} from 'types';
import tokens from '@shopify/polaris-tokens';

interface Props {
  x: number;
  yScale: ScaleLinear<number, number>;
  width: number;
  data: number[];
  colors: Color[];
  isActive: boolean;
  hasActiveGroup: boolean;
}

export function BarGroup({
  x,
  data,
  yScale,
  width,
  colors,
  isActive,
  hasActiveGroup,
}: Props) {
  const baseOpacity = hasActiveGroup ? SUBDUED_OPACITY : FULL_OPACITY;
  const opacity = isActive ? FULL_OPACITY : baseOpacity;

  const animation = useSpring({
    config: {duration: tokens.durationFast},
    opacity,
    from: {opacity: baseOpacity},
  });

  return (
    <React.Fragment>
      {data.map((value, index) => {
        const rawHeight = Math.abs(yScale(value) - yScale(0));
        const needsMinHeight = rawHeight < MIN_BAR_HEIGHT && rawHeight !== 0;
        const height = needsMinHeight ? MIN_BAR_HEIGHT : rawHeight;
        const modifiedYPosition =
          value > 0 ? yScale(0) - MIN_BAR_HEIGHT : yScale(0);
        const yPosition = needsMinHeight
          ? modifiedYPosition
          : yScale(Math.max(0, value));

        const barWidth = width / data.length;
        const xPosition = x + barWidth * index;

        return (
          <animated.rect
            key={index}
            x={xPosition}
            y={yPosition}
            fill={tokens[colors[index]]}
            opacity={animation.opacity}
            width={barWidth}
            height={height}
          />
        );
      })}
    </React.Fragment>
  );
}
