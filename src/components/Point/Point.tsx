import React from 'react';
import tokens from '@shopify/polaris-tokens';
import {ActiveTooltip} from 'types';
import {useSpring, animated, Interpolation} from 'react-spring';
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
      if (typeof cx === 'number' && typeof cy === 'number') {
        return onFocus({index, x: cx, y: cy});
      }
      if (typeof cx !== 'number' && typeof cy !== 'number') {
        return onFocus({
          index,
          x: cx.get(),
          y: cy.get(),
        });
      }
    }
  };

  const {radius} = useSpring({
    radius: active ? DEFAULT_RADIUS : 0,
    from: {
      radius: 0,
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
      r={isAnimated ? radius : DEFAULT_RADIUS}
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
