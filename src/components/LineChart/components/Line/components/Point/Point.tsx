import React from 'react';
import tokens from '@shopify/polaris-tokens';
import {Color} from 'types';

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
      fill={tokens[color]}
      stroke={tokens.colorWhite}
      strokeWidth={1.5}
    />
  );
}
