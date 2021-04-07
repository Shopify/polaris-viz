import React from 'react';
import {useSpring, animated} from 'react-spring';
import tokens from '@shopify/polaris-tokens';
import {Color, ActiveTooltip} from 'types';

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
  useGradientLine?: boolean;
  ariaHidden?: boolean;
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
  useGradientLine = false,
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
    <React.Fragment>
      <defs>
        <linearGradient
          id="gradient"
          x1="0"
          y1="0"
          x2="0"
          // to be replaced with actual height
          y2={250}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="rgb(75, 181, 145)" />
          <stop offset="100%" stopColor="rgb(143, 104, 255)" />
        </linearGradient>
      </defs>

      <animated.circle
        role={ariaLabelledby == null ? '' : 'image'}
        aria-labelledby={ariaLabelledby}
        tabIndex={tabIndex}
        cx={cx}
        cy={cy}
        r={radius}
        stroke={tokens.colorWhite}
        strokeWidth={1.5}
        fill={useGradientLine ? "url('#gradient')" : getColorValue(color)}
        onFocus={handleFocus}
        className={styles.Point}
      />
    </React.Fragment>
  );
});
