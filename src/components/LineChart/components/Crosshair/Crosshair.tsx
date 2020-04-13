import React from 'react';
import {colorSky} from '@shopify/polaris-tokens';

import {CROSSHAIR_WIDTH, Margin} from '../../constants';

interface Props {
  x: number;
  dimensions: DOMRect;
}

export function Crosshair({x, dimensions}: Props) {
  const {height} = dimensions;

  return (
    <rect
      x={x - CROSSHAIR_WIDTH / 2}
      width={CROSSHAIR_WIDTH}
      height={height - Margin.Bottom - Margin.Top}
      fill={colorSky}
      stroke="none"
    />
  );
}
