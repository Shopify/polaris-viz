import {animated, useSpring} from '@react-spring/web';
import React, {Dispatch, SetStateAction} from 'react';
import {
  getColorVisionEventAttrs,
  STACKED_BAR_GAP,
  COLOR_VISION_SINGLE_ITEM,
  getColorVisionStylesForActiveIndex,
} from '@shopify/polaris-viz-core';
import type {RoundedBorder} from '@shopify/polaris-viz-core';

import {getRoundedRectPath} from '../../../../../utilities';

export interface StackedBarProps {
  activeBarIndex: number;
  ariaLabel: string;
  color: string;
  height: number;
  isAnimated: boolean;
  seriesIndex: number;
  roundedBorder: RoundedBorder;
  setActiveBarIndex: Dispatch<SetStateAction<number>>;
  width: number;
  x: number;
}

export function StackedBar({
  activeBarIndex,
  ariaLabel,
  color,
  height,
  isAnimated,
  roundedBorder,
  seriesIndex,
  setActiveBarIndex,
  width,
  x,
}: StackedBarProps) {
  const {transform} = useSpring({
    from: {transform: `scale(0.5, 1)`},
    to: {transform: `scale(1, 1)`},
    default: {immediate: !isAnimated},
  });

  const pathD = getRoundedRectPath({
    height,
    width,
    needsMinWidth: false,
    roundedBorder,
  });

  return (
    <animated.g style={{transform}}>
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
