import React, {useCallback} from 'react';
import {animated, to, useSpring} from '@react-spring/web';

import {DataType} from '../../../../types';
import {
  BARS_TRANSITION_CONFIG,
  DEFAULT_BORDER_RADIUS,
} from '../../../../constants';
import {clamp} from '../../../../utilities';

import styles from './Bar.scss';

export enum RoundedBorder {
  None,
  Top,
  Right,
  Bottom,
  Left,
}

type RoundedCorners = [number, number, number, number];

interface Borders {
  [RoundedBorder.None]: RoundedCorners;
  [RoundedBorder.Top]: RoundedCorners;
  [RoundedBorder.Right]: RoundedCorners;
  [RoundedBorder.Bottom]: RoundedCorners;
  [RoundedBorder.Left]: RoundedCorners;
}

interface BarProps {
  color: string;
  height: number;
  tabIndex: number;
  width: number;
  x: number;
  y: number;
  animationDelay?: number;
  ariaLabel?: string;
  borderRadius?: number;
  index?: number;
  isAnimated?: boolean;
  role?: string;
  roundedBorder?: RoundedBorder;
  transform?: string;
}

function keepValuePositive(amount: number): number {
  return clamp({amount, min: 0, max: Infinity});
}

function getBorderRadius(
  roundedCorner: RoundedBorder,
  radius: number,
): RoundedCorners {
  const borders: Borders = {
    [RoundedBorder.None]: [0, 0, 0, 0],
    [RoundedBorder.Top]: [radius, radius, 0, 0],
    [RoundedBorder.Right]: [0, radius, radius, 0],
    [RoundedBorder.Bottom]: [0, 0, radius, radius],
    [RoundedBorder.Left]: [radius, 0, 0, radius],
  };

  return borders[roundedCorner];
}

export const Bar = React.memo(function Bar({
  animationDelay = 0,
  ariaLabel,
  borderRadius = DEFAULT_BORDER_RADIUS,
  color,
  height,
  index,
  isAnimated,
  role,
  roundedBorder = RoundedBorder.None,
  tabIndex,
  transform,
  width,
  x,
  y,
}: BarProps) {
  const getPath = useCallback(
    (height: number, width: number) => {
      if (height == null || width == null) {
        return '';
      }

      const [topLeft, topRight, bottomRight, bottomLeft] = getBorderRadius(
        roundedBorder,
        borderRadius,
      );

      const top = topLeft + topRight;
      const right = topRight + bottomRight;
      const bottom = bottomRight + bottomLeft;
      const left = bottomLeft + topLeft;

      return `
      M${topLeft},0
      h${keepValuePositive(width - top)}
      a${topRight},${topRight} 0 0 1 ${topRight},${topRight}
      v${keepValuePositive(height - right)}
      a${bottomRight},${bottomRight} 0 0 1 -${bottomRight},${bottomRight}
      h-${keepValuePositive(width - bottom)}
      a${bottomLeft},${bottomLeft} 0 0 1 -${bottomLeft},-${bottomLeft}
      v-${keepValuePositive(height - left)}
      a${topLeft},${topLeft} 0 0 1 ${topLeft},-${topLeft}
      Z
    `;
    },
    [borderRadius, roundedBorder],
  );

  const spring = useSpring<{height: number; width: number}>({
    from: {width: 0},
    width,
    height,
    delay: isAnimated ? animationDelay : 0,
    config: BARS_TRANSITION_CONFIG,
    default: {immediate: !isAnimated},
  });

  return (
    <animated.path
      d={to([spring.height, spring.width], (_height, _width) =>
        getPath(_height, _width),
      )}
      data-id={`bar-${index}`}
      data-index={index}
      data-type={DataType.Bar}
      fill={color}
      aria-label={ariaLabel}
      tabIndex={tabIndex}
      role={role}
      style={{
        transform: `translate(${x}px, ${y}px) ${transform}`,
      }}
      className={styles.Bar}
    />
  );
});
