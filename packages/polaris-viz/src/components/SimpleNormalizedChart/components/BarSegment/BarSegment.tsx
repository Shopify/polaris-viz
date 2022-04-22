import React from 'react';
import {animated, useSpring} from '@react-spring/web';
import {
  COLOR_VISION_SINGLE_ITEM,
  getColorVisionEventAttrs,
  isGradientType,
  getColorVisionStylesForActiveIndex,
} from '@shopify/polaris-viz-core';
import type {Color, Direction} from '@shopify/polaris-viz-core';

import {BARS_TRANSITION_CONFIG} from '../../../../constants';
import {createCSSGradient, classNames} from '../../../../utilities';
import type {Size} from '../../types';
import {useHasTimeoutFinished} from '../../../../hooks';

import styles from './BarSegment.scss';

const DELAY = 150;

interface Props {
  activeIndex: number;
  isAnimated: boolean;
  index: number;
  scale: number;
  color: Color;
  size: Size;
  direction: Direction;
  roundedCorners: boolean;
}

export function BarSegment({
  activeIndex,
  color,
  index,
  isAnimated,
  scale,
  size,
  direction,
  roundedCorners,
}: Props) {
  const scaleNeedsRounding = scale > 0 && scale < 1.5;
  const safeScale = scaleNeedsRounding ? 1.5 : scale;

  const delay = index * DELAY;
  const angle = direction === 'horizontal' ? 90 : 180;
  const dimension = direction === 'horizontal' ? 'width' : 'height';

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
        roundedCorners && styles[`${direction}-RoundedCorners`],
        styles[`${direction}-${size}`],
      )}
      style={{
        [dimension]: isAnimated ? spring[dimension] : `${safeScale}%`,
        background: formattedColor,
        ...getColorVisionStylesForActiveIndex({activeIndex, index}),
      }}
      {...getColorVisionEventAttrs({
        type: COLOR_VISION_SINGLE_ITEM,
        index,
      })}
      tabIndex={0}
    />
  );
}
