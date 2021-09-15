import React from 'react';
import {animated, Interpolation} from '@react-spring/web';

import {useTheme} from 'hooks';

interface Props {
  x: number | Interpolation;
  height: number;

  opacity?: number;
  theme?: string;
}

export function Crosshair({x, height, opacity = 1, theme}: Props) {
  const selectedTheme = useTheme(theme);
  return (
    <animated.rect
      x={x}
      width={selectedTheme.crossHair.width}
      height={height}
      stroke="none"
      style={{
        opacity,
        fill: selectedTheme.crossHair.color,
      }}
    />
  );
}
