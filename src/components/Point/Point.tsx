import React from 'react';
import tokens from '@shopify/polaris-tokens';
import {Color, ActiveTooltip} from 'types';
import {useSpring, animated} from 'react-spring';

import {getColorValue} from '../../utilities';
import {usePrefersReducedMotion} from '../../hooks';

import styles from './Point.scss';

interface Props {
  active: boolean;
  cx: number;
  cy: number;
  color: Color;
  index: number;
  isAnimated?: boolean;
  onFocus?: ({index, x, y}: ActiveTooltip) => void;
  tabIndex?: number;
  ariaLabelledby?: string;
}

export const Point = React.memo(function Point({
  cx,
  cy,
  active,
  color,
  onFocus,
  index,
  ariaLabelledby,
  tabIndex = -1,
  isAnimated = false,
}: Props) {
  const {prefersReducedMotion} = usePrefersReducedMotion();

  const handleFocus = () => {
    if (onFocus != null) {
      onFocus({index, x: cx, y: cy});
    }
  };

  const {radius} = useSpring({
    radius: active ? 5 : 0,
    from: {
      radius: 0,
    },
    config: {duration: tokens.durationBase, tension: 100},
    immediate: !isAnimated || prefersReducedMotion,
  });

  return (
    <animated.circle
      role={ariaLabelledby == null ? '' : 'image'}
      aria-labelledby={ariaLabelledby}
      tabIndex={tabIndex}
      cx={cx}
      cy={cy}
      r={radius as any}
      fill={getColorValue(color)}
      stroke={tokens.colorWhite}
      strokeWidth={1.5}
      onFocus={handleFocus}
      className={styles.Point}
    />
  );
});
