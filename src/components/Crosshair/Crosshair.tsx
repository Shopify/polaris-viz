import React from 'react';
import {animated, Interpolation} from '@react-spring/web';

import {DEFAULT_CROSSHAIR_COLOR} from '../../constants';

interface Props {
  x: number | Interpolation;
  height: number;
  width: number;
  opacity?: number;
  fill?: string;
}

export function Crosshair({
  x,
  height,
  opacity = 1,
  width,
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
