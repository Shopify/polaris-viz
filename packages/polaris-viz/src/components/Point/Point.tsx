import {memo} from 'react';
import type {ActiveTooltip, DataType} from '@shopify/polaris-viz-core';
import {useTheme} from '@shopify/polaris-viz-core';
import type {Interpolation} from '@react-spring/web';
import {useSpring, animated} from '@react-spring/web';

import {classNames} from '../../utilities';
import {BASE_ANIMATION_DURATION} from '../../constants';

import styles from './Point.scss';

export interface PointProps {
  active: boolean;
  cx: number | Interpolation;
  cy: number | Interpolation;
  color: string;
  index: number;
  isAnimated: boolean;
  ariaHidden?: boolean;
  ariaLabelledby?: string;
  dataType?: DataType;
  onFocus?: ({index, x, y}: ActiveTooltip) => void;
  tabIndex?: number;
  visuallyHidden?: boolean;
}

const DEFAULT_RADIUS = 5;

export const Point = memo(function Point({
  dataType,
  cx,
  cy,
  active,
  color,
  onFocus,
  index,
  ariaLabelledby,
  tabIndex = -1,
  isAnimated,
  ariaHidden = false,
  visuallyHidden = false,
}: PointProps) {
  const selectedTheme = useTheme();

  const handleFocus = () => {
    if (onFocus != null) {
      return onFocus({
        index,
        x: typeof cx === 'number' ? cx : cx.get(),
        y: typeof cy === 'number' ? cy : cy.get(),
      });
    }
  };

  const radius = active ? DEFAULT_RADIUS : 0;

  // Add dependency array to useSpring to prevent re-initializing on every render
  const [{animatedRadius}] = useSpring(
    {
      animatedRadius: radius,
      from: {
        animatedRadius: 0,
      },
      config: {duration: BASE_ANIMATION_DURATION},
      default: {immediate: !isAnimated},
      // Only re-initialize the animation when these values change
    },
    [radius, isAnimated],
  );

  return (
    <animated.circle
      data-type={dataType}
      data-index={index}
      role={ariaLabelledby == null ? '' : 'image'}
      aria-labelledby={ariaLabelledby}
      tabIndex={tabIndex}
      cx={cx}
      cy={cy}
      r={isAnimated ? animatedRadius : radius}
      fill={color}
      stroke={selectedTheme.line.pointStroke}
      strokeWidth={2}
      onFocus={handleFocus}
      className={classNames(
        styles.Point,
        visuallyHidden ? styles.VisuallyHidden : null,
      )}
      aria-hidden={ariaHidden}
    />
  );
});
