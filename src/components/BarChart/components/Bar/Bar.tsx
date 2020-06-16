import React from 'react';
import {animated, useSpring} from 'react-spring';
import tokens from '@shopify/polaris-tokens';
import {Color} from 'types';

interface Props {
  color: Color;
  highlightColor?: Color;
  isSelected: boolean;
  onMove(): void;
  onEnd(): void;
  x?: number;
  y: number;
  width: number;
  height: number;
}

export function Bar({
  color,
  highlightColor,
  isSelected,
  onMove,
  onEnd,
  x,
  y,
  width,
  height,
}: Props) {
  const animation = useSpring({
    config: {duration: 300},
    immediate: highlightColor == null,
    color:
      isSelected && highlightColor != null
        ? tokens[highlightColor]
        : tokens[color],
    from: {color: tokens[color]},
  });

  return (
    <animated.rect
      onMouseMove={onMove}
      onTouchMove={onMove}
      onTouchEnd={onEnd}
      onMouseLeave={onEnd}
      x={x}
      y={y}
      fill={animation.color}
      width={width}
      height={height}
    />
  );
}
