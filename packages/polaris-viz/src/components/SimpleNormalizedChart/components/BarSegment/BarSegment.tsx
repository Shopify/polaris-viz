import React, {useRef} from 'react';
import {animated, useSpring} from '@react-spring/web';
import {
  COLOR_VISION_SINGLE_ITEM,
  getColorVisionEventAttrs,
  getColorVisionStylesForActiveIndex,
  useChartContext,
} from '@shopify/polaris-viz-core';
import type {Color, Direction} from '@shopify/polaris-viz-core';

import {getCSSBackgroundFromColor} from '../../../../utilities/getCSSBackgroundFromColor';
import {
  BARS_TRANSITION_CONFIG,
  BARS_LOAD_ANIMATION_CONFIG,
} from '../../../../constants';
import {classNames} from '../../../../utilities';
import type {Size} from '../../types';

import styles from './BarSegment.scss';

const DELAY = 150;

interface Props {
  activeIndex: number;
  index: number;
  scale: number;
  color: Color;
  size: Size;
  direction: Direction;
  roundedCorners: number;
}

export function BarSegment({
  activeIndex,
  color,
  index,
  scale,
  size,
  direction,
  roundedCorners,
}: Props) {
  const {shouldAnimate} = useChartContext();
  const scaleNeedsRounding = scale > 0 && scale < 1.5;
  const safeScale = scaleNeedsRounding ? 1.5 : scale;
  const isMaxScale = scale >= 100;

  const delay = index * DELAY;
  const angle = direction === 'horizontal' ? 90 : 180;
  const dimension = direction === 'horizontal' ? 'width' : 'height';

  const isMounted = useRef(false);

  const backgroundColor = getCSSBackgroundFromColor(color, angle);

  const spring = useSpring({
    from: {[dimension]: `0%`},
    to: {[dimension]: `${safeScale}%`},
    config: isMounted.current
      ? BARS_TRANSITION_CONFIG
      : BARS_LOAD_ANIMATION_CONFIG,
    default: {immediate: !shouldAnimate},
    delay: isMounted.current ? 0 : delay,
    onRest: () => (isMounted.current = true),
  });

  return (
    <animated.div
      className={classNames(
        styles.Segment,
        roundedCorners && !isMaxScale && styles[`${direction}-RoundedCorners`],
        roundedCorners && isMaxScale && styles.RoundedCorners,
        styles[`${direction}-${size}`],
      )}
      style={{
        [dimension]: shouldAnimate ? spring[dimension] : `${safeScale}%`,
        background: backgroundColor,
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
