import React, {useCallback} from 'react';
import {animated, useSpring} from '@react-spring/web';
import {
  getRoundedRectPath,
  COLOR_VISION_ACTIVE_OPACITY,
  COLOR_VISION_FADED_OPACITY,
  BARS_TRANSITION_CONFIG,
  DataType,
  useTheme,
} from '@shopify/polaris-viz-core';
import type {Direction} from '@shopify/polaris-viz-core';

import {ZeroValueLine} from '../ZeroValueLine';

import styles from './Bar.scss';

export interface BarProps {
  color: string;
  height: number;
  width: number;
  x: number;
  y: number;
  animationDelay?: number;
  animationDirection?: Direction;
  borderRadius?: number;
  index?: number;
  isActive?: boolean;
  isAnimated?: boolean;
  transform?: string;
  ariaLabel?: string;
  areAllNegative?: boolean;
}

export const Bar = React.memo(function Bar({
  animationDelay = 0,
  animationDirection = 'horizontal',
  borderRadius,
  color,
  height,
  index,
  isActive = true,
  isAnimated,
  transform = '',
  width,
  x,
  y,
  ariaLabel,
  areAllNegative,
}: BarProps) {
  const selectedTheme = useTheme();
  const selectedBorderRadius = `0 ${selectedTheme.bar.borderRadius} ${selectedTheme.bar.borderRadius} 0`;

  const getPath = useCallback(
    (height = 0, width = 0, borderRadius = selectedBorderRadius.toString()) => {
      return getRoundedRectPath({height, width, borderRadius});
    },
    [selectedBorderRadius],
  );

  const initialHeight = animationDirection === 'horizontal' ? height : 0;
  const initialWidth = animationDirection === 'horizontal' ? 0 : width;

  const spring = useSpring<{pathD: string}>({
    from: {pathD: getPath(initialHeight, initialWidth)},
    to: {pathD: getPath(height, width)},
    delay: isAnimated ? animationDelay : 0,
    config: BARS_TRANSITION_CONFIG,
    default: {immediate: !isAnimated},
  });

  const ariaHidden = !ariaLabel;

  return (
    <g
      className={styles.Group}
      aria-hidden={ariaHidden}
      role="img"
      aria-label={ariaLabel}
    >
      {width !== 0 ? (
        <animated.path
          d={spring.pathD}
          data-id={`bar-${index}`}
          data-index={index}
          data-type={DataType.Bar}
          fill={color}
          aria-hidden="true"
          style={{
            transform: `translate(${x}px, ${y}px) ${transform}`,
            opacity: isActive
              ? COLOR_VISION_ACTIVE_OPACITY
              : COLOR_VISION_FADED_OPACITY,
          }}
          className={styles.Bar}
        />
      ) : (
        <ZeroValueLine
          x={x}
          y={y + height / 2}
          direction={animationDirection}
          areAllNegative={areAllNegative}
        />
      )}
    </g>
  );
});
