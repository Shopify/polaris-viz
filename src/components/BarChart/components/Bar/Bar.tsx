import React from 'react';
import {animated, useSpring} from 'react-spring';
import tokens from '@shopify/polaris-tokens';
import {Color} from 'types';
import {ScaleLinear} from 'd3-scale';

import {getColorValue} from '../../../../utilities';
import {MIN_BAR_HEIGHT} from '../../constants';

interface Props {
  color: Color;
  highlightColor: Color;
  isSelected: boolean;
  x: number;
  yScale: ScaleLinear<number, number>;
  rawValue: number;
  width: number;
  index: number;
  onFocus: ({index, cx, cy}: {index: number; cx: number; cy: number}) => any;
  ariaLabel?: string;
}

export function Bar({
  color,
  highlightColor,
  isSelected,
  x,
  rawValue,
  yScale,
  width,
  onFocus,
  index,
  ariaLabel,
}: Props) {
  const currentColor = isSelected
    ? getColorValue(highlightColor)
    : getColorValue(color);

  const animation = useSpring({
    config: {duration: tokens.durationFast},
    immediate: color === highlightColor,
    color: currentColor,
    from: {color: getColorValue(color)},
  });

  const rawHeight = Math.abs(yScale(rawValue) - yScale(0));

  const needsMinHeight = rawHeight < MIN_BAR_HEIGHT && rawHeight !== 0;
  const height = needsMinHeight ? MIN_BAR_HEIGHT : rawHeight;
  const modifiedYPosition =
    rawValue > 0 ? yScale(0) - MIN_BAR_HEIGHT : yScale(0);
  const yPosition = needsMinHeight
    ? modifiedYPosition
    : yScale(Math.max(0, rawValue));

  const handleFocus = () => {
    onFocus({index, cx: x, cy: yPosition});
  };

  return (
    <animated.rect
      x={x}
      y={yPosition}
      fill={animation.color}
      width={width}
      height={height}
      aria-label={ariaLabel}
      onFocus={handleFocus}
      tabIndex={0}
      role="img"
    />
  );
}
