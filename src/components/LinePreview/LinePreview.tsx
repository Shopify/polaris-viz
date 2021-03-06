import React from 'react';
import {Color} from 'types';

import {getColorValue} from '../../utilities';
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
          stroke={getColorValue(color)}
          strokeWidth="4"
          strokeDasharray={lineStyle === 'dashed' ? '3 2' : 'unset'}
        />
      </svg>
    </div>
  );
}
