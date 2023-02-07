import {memo, useCallback} from 'react';
import {animated, useSpring} from '@react-spring/web';
import {
  getRoundedRectPath,
  COLOR_VISION_ACTIVE_OPACITY,
  COLOR_VISION_FADED_OPACITY,
  DataType,
  useTheme,
} from '@shopify/polaris-viz-core';

import {useBarSpringConfig} from '../../../hooks/useBarSpringConfig';
import {ZeroValueLine} from '../ZeroValueLine';

import styles from './Bar.scss';

export interface BarProps {
  color: string;
  height: number;
  width: number;
  x: number;
  y: number;
  animationDelay?: number;
  index?: number;
  isActive?: boolean;
  ariaLabel?: string;
  areAllNegative?: boolean;
  transform?: string;
}

export const Bar = memo(function Bar({
  animationDelay = 0,
  areAllNegative,
  ariaLabel,
  color,
  height,
  index,
  isActive = true,
  transform,
  width,
  x,
  y,
}: BarProps) {
  const selectedTheme = useTheme();
  const borderRadius = `0 ${selectedTheme.bar.borderRadius} ${selectedTheme.bar.borderRadius} 0`;

  const getPath = useCallback(
    (height = 0, width = 0) => {
      return getRoundedRectPath({height, width, borderRadius});
    },
    [borderRadius],
  );

  const springConfig = useBarSpringConfig({animationDelay});

  const spring = useSpring({
    from: {pathD: getPath(height, 1)},
    to: {pathD: getPath(height, width)},
    ...springConfig,
  });

  const ariaHidden = !ariaLabel;

  return (
    <g
      className={styles.Group}
      aria-hidden={ariaHidden}
      role="img"
      aria-label={ariaLabel}
      transform={`translate(${x}, ${y})`}
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
            transform,
            opacity: isActive
              ? COLOR_VISION_ACTIVE_OPACITY
              : COLOR_VISION_FADED_OPACITY,
          }}
          className={styles.Bar}
        />
      ) : (
        <animated.g style={{transform: `translate(${x}px, ${-y}px)`}}>
          <ZeroValueLine
            x={x}
            y={y + height / 2}
            direction="horizontal"
            areAllNegative={areAllNegative}
          />
        </animated.g>
      )}
    </g>
  );
});
