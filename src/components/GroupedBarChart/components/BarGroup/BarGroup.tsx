import React from 'react';
import {animated, useSpring} from 'react-spring';
import {ScaleLinear} from 'd3-scale';
import {Color} from 'types';
import tokens from '@shopify/polaris-tokens';

import {MIN_BAR_HEIGHT} from '../../../../constants';
import {FULL_OPACITY, SUBDUED_OPACITY, BAR_SPACING} from '../../constants';
import {getColorValue} from '../../../../utilities';

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

  const barWidth = width / data.length - BAR_SPACING;

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

        const xPosition = x + (barWidth + BAR_SPACING) * index;

        return (
          <animated.rect
            key={index}
            x={xPosition}
            y={yPosition}
            fill={getColorValue(colors[index])}
            opacity={animation.opacity}
            width={barWidth}
            height={height}
          />
        );
      })}
    </React.Fragment>
  );
}
