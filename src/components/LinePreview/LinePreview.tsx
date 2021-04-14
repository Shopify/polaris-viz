import React from 'react';
import {Color} from 'types';

import {getColorValue} from '../../utilities';
import {LineStyle} from '../../types';

import {
  DOTTED_LINE_PREVIEW_CY,
  DOTTED_LINE_PREVIEW_RADIUS,
  DOT_SPACING,
} from './constants';

interface Props {
  color: Color;
  lineStyle: LineStyle;
}

export function LinePreview({color, lineStyle}: Props) {
  return (
    <div>
      <svg width="15px" height="5px">
        {getLinePreview(color, lineStyle)}
      </svg>
    </div>
  );
}

function getLinePreview(color: Color, lineStyle: LineStyle) {
  const linePreviewColor = getColorValue(color);
  const solidLine = (
    <path d="M0,0L100,0" stroke={linePreviewColor} strokeWidth="4" />
  );
  const dashedLine = (
    <path
      d="M0,0L100,0"
      stroke={linePreviewColor}
      strokeWidth="4"
      strokeDasharray="3 2"
    />
  );
  const dottedLine = (
    <g fill={linePreviewColor}>
      {[...Array(3)].map((_, index) => {
        return (
          <circle
            key={index}
            cx={1 + index * DOT_SPACING}
            cy={DOTTED_LINE_PREVIEW_CY}
            r={DOTTED_LINE_PREVIEW_RADIUS}
          />
        );
      })}
    </g>
  );

  switch (lineStyle) {
    case 'dashed':
      return dashedLine;
    case 'dotted':
      return dottedLine;
    default:
      return solidLine;
  }
}
