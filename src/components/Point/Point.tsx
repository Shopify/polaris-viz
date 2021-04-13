import React from 'react';
import tokens from '@shopify/polaris-tokens';
import {Color, ActiveTooltip} from 'types';
import {useSpring, animated, OpaqueInterpolation} from 'react-spring';
import {classNames} from '@shopify/css-utilities';

import {getColorValue} from '../../utilities';

import styles from './Point.scss';

interface Props {
  active: boolean;
  cx: number | OpaqueInterpolation<number>;
  cy: number;
  color: Color;
  index: number;
  isAnimated: boolean;
  onFocus?: ({index, x, y}: ActiveTooltip) => void;
  tabIndex?: number;
  ariaLabelledby?: string;
  ariaHidden?: boolean;
  visuallyHidden?: boolean;
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
  isAnimated,
  ariaHidden = false,
  visuallyHidden = false,
}: Props) {
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
    config: {duration: tokens.durationBase},
    immediate: !isAnimated,
  });

  return (
    <animated.circle
      role={ariaLabelledby == null ? '' : 'image'}
      aria-labelledby={ariaLabelledby}
      tabIndex={tabIndex}
      cx={cx}
      cy={cy}
      r={radius}
      fill={getColorValue(color)}
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
