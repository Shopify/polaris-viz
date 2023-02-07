import {Fragment} from 'react';
import type {Direction} from '@shopify/polaris-viz-core';
import {useTheme} from '@shopify/polaris-viz-core';

import {ZERO_VALUE_LINE_HEIGHT} from '../../../constants';

export interface ZeroValueLineProps {
  x: number;
  y: number;
  areAllNegative?: boolean;
  theme?: string;
  direction?: Direction;
}

function getZeroValueLineCoords({
  x,
  y,
  direction,
  areAllNegative,
}: ZeroValueLineProps) {
  if (direction === 'vertical') {
    return {
      x1: x,
      x2: x,
      y1: y,
      y2: !areAllNegative
        ? y - ZERO_VALUE_LINE_HEIGHT
        : y + ZERO_VALUE_LINE_HEIGHT,
    };
  }

  return {
    x1: x,
    x2: !areAllNegative
      ? x + ZERO_VALUE_LINE_HEIGHT
      : x - ZERO_VALUE_LINE_HEIGHT,
    y1: y,
    y2: y,
  };
}

export function ZeroValueLine({
  x,
  y,
  theme,
  direction = 'vertical',
  areAllNegative,
}: ZeroValueLineProps) {
  const selectedTheme = useTheme(theme);

  return (
    <Fragment>
      <line
        stroke={selectedTheme.bar.zeroValueColor}
        strokeWidth="1"
        {...getZeroValueLineCoords({x, y, direction, areAllNegative})}
      />
    </Fragment>
  );
}
