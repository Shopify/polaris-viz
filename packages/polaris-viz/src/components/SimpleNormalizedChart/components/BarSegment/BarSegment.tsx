import React from 'react';
import {animated, useSpring} from '@react-spring/web';
import {
  COLOR_VISION_SINGLE_ITEM,
  getColorVisionEventAttrs,
  getColorVisionStylesForActiveIndex,
  useChartContext,
} from '@shopify/polaris-viz-core';
import type {Color, Direction} from '@shopify/polaris-viz-core';

import {getCSSBackgroundFromColor} from '../../../../utilities/getCSSBackgroundFromColor';
import {classNames} from '../../../../utilities';
import {useBarSpringConfig} from '../../../../hooks/useBarSpringConfig';
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

  const backgroundColor = getCSSBackgroundFromColor(color, angle);

  const springConfig = useBarSpringConfig({animationDelay: delay});

  const spring = useSpring({
    from: {[dimension]: `0%`},
    to: {[dimension]: `${safeScale}%`},
    ...springConfig,
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
