import React from 'react';
import {Color} from 'types';

import {getColorValue} from '../../utilities';
import {LineStyle} from '../../types';

interface Props {
  color: Color;
  lineStyle: LineStyle;
}

export function LinePreview({color, lineStyle}: Props) {
  console.log(color);
  if (lineStyle === 'dashed') {
    return (
      <div>
        <svg width="23px" height="5px" style={{marginBottom: '2px'}}>
          <line
            x1="-5"
            x2="25"
            y1="3"
            y2="3"
            stroke={getColorValue(color)}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="0.1, 6"
          />
        </svg>
      </div>
    );
  } else {
    return (
      <div
        style={{
          width: '21px',
          height: '2px',
          borderRadius: '5px',
          background:
            'linear-gradient(146.97deg, #4BB591 21.77%, #6737FA 80.3%)',
        }}
      />
    );
  }
}
