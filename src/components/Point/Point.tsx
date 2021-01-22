import React from 'react';
import tokens from '@shopify/polaris-tokens';
import type {Color} from 'types';

import {getColorValue} from '../../utilities';

interface Props {
  active: boolean;
  cx: number;
  cy: number;
  color: Color;
}

export function Point({cx, cy, active, color}: Props) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={active ? 5 : 0}
      fill={getColorValue(color)}
      stroke={tokens.colorWhite}
      strokeWidth={1.5}
    />
  );
}
