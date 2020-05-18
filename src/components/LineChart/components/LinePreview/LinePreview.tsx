import React from 'react';
import tokens from '@shopify/polaris-tokens';
import {Color} from 'types';

import {LineStyle} from '../../types';

interface Props {
  color: Color;
  lineStyle: LineStyle;
}

export function LinePreview({color, lineStyle}: Props) {
  return (
    <div>
      <svg width="15px" height="5px">
        <path
          d="M0,0L100,0"
          stroke={tokens[color]}
          strokeWidth="4"
          strokeDasharray={lineStyle === 'dashed' ? '3 2' : 'unset'}
        />
      </svg>
    </div>
  );
}
