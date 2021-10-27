import React from 'react';
import {animated, useSpring} from '@react-spring/web';

import {BARS_TRANSITION_CONFIG} from '../../../../constants';
import {
  createCSSGradient,
  isGradientType,
  classNames,
} from '../../../../utilities';
import type {Orientation, Size} from '../../types';
import type {Color} from '../../../../types';
import {useHasTimeoutFinished} from '../../../../hooks';

import styles from './BarSegment.scss';

const DELAY = 150;

interface Props {
  isAnimated: boolean;
  index: number;
  scale: number;
  color: Color;
  size: Size;
  orientation: Orientation;
  roundedCorners: boolean;
}

export function BarSegment({
  color,
  index,
  isAnimated,
  scale,
  size,
  orientation,
  roundedCorners,
}: Props) {
  const scaleNeedsRounding = scale > 0 && scale < 1.5;
  const safeScale = scaleNeedsRounding ? 1.5 : scale;

  const delay = index * DELAY;
  const angle = orientation === 'horizontal' ? 90 : 180;
  const dimension = orientation === 'horizontal' ? 'width' : 'height';

  const isMountDone = useHasTimeoutFinished(isAnimated ? delay : 0);

  const formattedColor = isGradientType(color)
    ? createCSSGradient(color, angle)
    : color;

  const spring = useSpring({
    from: {[dimension]: `0%`},
    to: {[dimension]: `${safeScale}%`},
    config: BARS_TRANSITION_CONFIG,
    default: {immediate: !isAnimated},
    delay: isMountDone ? 0 : delay,
  });

  return (
    <animated.div
      className={classNames(
        styles.Segment,
        roundedCorners && styles[`${orientation}-RoundedCorners`],
        styles[`${orientation}-${size}`],
      )}
      style={{
        [dimension]: isAnimated ? spring[dimension] : `${safeScale}%`,
        background: formattedColor,
      }}
    />
  );
}
