import React from 'react';
import tokens from '@shopify/polaris-tokens';
import {ActiveTooltip} from 'types';
import {useSpring, animated, Interpolation} from '@react-spring/web';
import {classNames} from '@shopify/css-utilities';

import styles from './Point.scss';

interface Props {
  active: boolean;
  cx: number | Interpolation;
  cy: number | Interpolation;
  color: string;
  index: number;
  isAnimated: boolean;
  onFocus?: ({index, x, y}: ActiveTooltip) => void;
  tabIndex?: number;
  ariaLabelledby?: string;
  ariaHidden?: boolean;
  visuallyHidden?: boolean;
}

const DEFAULT_RADIUS = 5;

export const Point = React.memo(function Point({
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
}: Props) {
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

  const {animatedRadius} = useSpring({
    animatedRadius: radius,
    from: {
      animatedRadius: 0,
    },
    config: {duration: tokens.durationBase},
    default: {immediate: !isAnimated},
  });

  return (
    <animated.circle
      role={ariaLabelledby == null ? '' : 'image'}
      aria-labelledby={ariaLabelledby}
      tabIndex={tabIndex}
      cx={cx}
      cy={cy}
      r={isAnimated ? animatedRadius : radius}
      fill={color}
      stroke={tokens.colorWhite}
      strokeWidth={1.5}
      onFocus={handleFocus}
      className={classNames(
        styles.Point,
        visuallyHidden ? styles.VisuallyHidden : null,
      )}
      aria-hidden={ariaHidden}
    />
  );
});
