import React from 'react';
import {animated, useSpring} from 'react-spring';
import tokens from '@shopify/polaris-tokens';
import {Color} from 'types';
import {ScaleLinear} from 'd3-scale';
import {getColorValue} from 'utilities';
import {MIN_BAR_HEIGHT} from 'components/BarChart/constants';

interface Props {
  color: Color;
  highlightColor?: Color;
  isSelected: boolean;
  x: number;
  yScale: ScaleLinear<number, number>;
  rawValue: number;
  width: number;
}

export function Bar({
  color,
  highlightColor,
  isSelected,
  x,
  rawValue,
  yScale,
  width,
}: Props) {
  const currentColor =
    isSelected && highlightColor != null
      ? getColorValue(highlightColor)
      : getColorValue(color);

  const animation = useSpring({
    config: {duration: tokens.durationFast},
    immediate: highlightColor == null,
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

  return (
    <animated.rect
      x={x}
      y={yPosition}
      fill={animation.color}
      width={width}
      height={height}
    />
  );
}
