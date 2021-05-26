import React from 'react';
import {animated, Interpolation} from '@react-spring/web';

import {CROSSHAIR_WIDTH, DEFAULT_CROSSHAIR_COLOR} from '../../constants';

interface Props {
  x: number | Interpolation;
  height: number;
  opacity?: number;
  fill?: string;
  width?: number;
}

export function Crosshair({
  x,
  height,
  opacity = 1,
  width = CROSSHAIR_WIDTH,
  fill = DEFAULT_CROSSHAIR_COLOR,
}: Props) {
  return (
    <animated.rect
      x={x}
      width={width}
      height={height}
      stroke="none"
      style={{
        opacity,
        fill,
      }}
    />
  );
}
