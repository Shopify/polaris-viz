import React from 'react';

import {CROSSHAIR_WIDTH, DEFAULT_CROSSHAIR_COLOR} from '../../constants';

interface Props {
  x: number;
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
    <rect
      x={x - width / 2}
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
