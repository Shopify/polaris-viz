import React from 'react';
import {colorSky} from '@shopify/polaris-tokens';

interface Props {
  x: number;
  height: number;
  opacity?: number;
}

const CROSSHAIR_WIDTH = 5;

export function Crosshair({x, height, opacity = 1}: Props) {
  return (
    <rect
      x={x - CROSSHAIR_WIDTH / 2}
      width={CROSSHAIR_WIDTH}
      height={height}
      fill={colorSky}
      style={{opacity}}
      stroke="none"
    />
  );
}
