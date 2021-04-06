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
          d={`M0, ${lineStyle === 'dashed' ? 2 : 0} L100,0`}
          fill="none"
          strokeLinejoin="round"
          stroke={getColorValue(color)}
          strokeWidth={lineStyle === 'dashed' ? `${2}px` : `${4}px`}
          {...(lineStyle === 'dashed'
            ? {
                ...{
                  strokeLinecap: 'round',
                  strokeDasharray: '0.1, 5',
                },
              }
            : undefined)}
        />
      </svg>
    </div>
  );
}
