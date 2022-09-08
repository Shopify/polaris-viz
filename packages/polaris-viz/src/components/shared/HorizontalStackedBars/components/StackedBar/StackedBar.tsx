import {animated, useSpring} from '@react-spring/web';
import React, {Dispatch, SetStateAction} from 'react';
import {
  getColorVisionEventAttrs,
  STACKED_BAR_GAP,
  COLOR_VISION_SINGLE_ITEM,
  getColorVisionStylesForActiveIndex,
  getRoundedRectPath,
} from '@shopify/polaris-viz-core';

import {useBarSpringConfig} from '../../../../../hooks/useBarSpringConfig';

export interface StackedBarProps {
  zeroPosition: number;
  x: number;
  width: number;
  setActiveBarIndex: Dispatch<SetStateAction<number>>;
  seriesIndex: number;
  height: number;
  color: string;
  borderRadius: string;
  ariaLabel: string;
  animationDelay: number;
  activeBarIndex: number;
}

export function StackedBar({
  animationDelay,
  activeBarIndex,
  ariaLabel,
  borderRadius,
  color,
  height,
  seriesIndex,
  setActiveBarIndex,
  width,
  x,
  zeroPosition,
}: StackedBarProps) {
  const springConfig = useBarSpringConfig({animationDelay});
  const {transform} = useSpring({
    from: {transform: `scale(0, 1)`},
    to: {transform: `scale(1, 1)`},
    ...springConfig,
  });

  const pathD = getRoundedRectPath({
    height,
    width,
    borderRadius,
  });

  return (
    <animated.g style={{transform, transformOrigin: `${zeroPosition}px 0px`}}>
      <path
        d={pathD}
        fill={`url(#${color})`}
        height={height}
        style={{
          outline: 'none',
          transformOrigin: `${x}px 0px`,
          ...getColorVisionStylesForActiveIndex({
            activeIndex: activeBarIndex,
            index: seriesIndex,
          }),
        }}
        width={width}
        transform={`translate(${x},0)`}
        aria-hidden="true"
      />
      <rect
        fill="transparent"
        height={height}
        width={width + STACKED_BAR_GAP}
        x={x}
        {...getColorVisionEventAttrs({
          type: COLOR_VISION_SINGLE_ITEM,
          index: seriesIndex,
        })}
        aria-label={ariaLabel}
        role="img"
        tabIndex={-1}
        onMouseOver={() => setActiveBarIndex(seriesIndex)}
        onMouseLeave={() => setActiveBarIndex(-1)}
      />
    </animated.g>
  );
}
