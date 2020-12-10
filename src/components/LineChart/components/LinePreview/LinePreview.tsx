import React from 'react';
import {Color} from 'types';

import {getColorValue} from '../../../../utilities';
import {LineStyle} from '../../types';

interface Props {
  color: Color;
  lineStyle: LineStyle;
}

export function LinePreview({color, lineStyle}: Props) {
  return (
    <div>
      <svg width="15px" height="5px">
        <defs>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f8f8f8" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#fc00ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#f8f8f8" stopOpacity="0.5" />
          </linearGradient>

          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#05a" />
            <stop offset="100%" stopColor="#0a5" />
          </linearGradient>
        </defs>
        <path
          fill="none"
          d="M0,0L100,0"
          stroke={'url(#gradient)'}
          strokeWidth="4px"
          paintOrder="stroke"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeDasharray={lineStyle === 'dashed' ? '3 2' : 'unset'}
        />
      </svg>
    </div>
  );
}
