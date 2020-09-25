import React from 'react';
import {colorSky} from '@shopify/polaris-tokens';
import {CROSSHAIR_WIDTH} from 'components/LineChart/constants';

interface Props {
  x: number;
  height: number;
}

export function Crosshair({x, height}: Props) {
  return (
    <rect
      x={x - CROSSHAIR_WIDTH / 2}
      width={CROSSHAIR_WIDTH}
      height={height}
      fill={colorSky}
      stroke="none"
    />
  );
}
