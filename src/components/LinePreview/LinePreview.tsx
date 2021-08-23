import React, {useRef} from 'react';
import type {Color} from 'types';

import {isGradientType, uniqueId} from '../../utilities';
import type {LineStyle} from '../../types';
import {LinearGradient} from '../LinearGradient';

import {
  DASHED_STROKE_DASHARRAY,
  DOTTED_LINE_PREVIEW_CY,
  DOTTED_LINE_PREVIEW_RADIUS,
  DOT_SPACING,
} from './constants';

interface Props {
  color: Color;
  lineStyle: LineStyle;
}

export function LinePreview({color, lineStyle}: Props) {
  const gradientId = useRef(uniqueId('linePreviewGradient'));

  const linePreviewColor = isGradientType(color)
    ? `url(#${gradientId.current})`
    : color;

  return (
    <div>
      <svg width="15px" height="5px">
        {isGradientType(color) ? (
          <defs>
            <LinearGradient
              id={gradientId.current}
              gradient={color}
              x1="0%"
              x2="100%"
              y1="0%"
              y2="0%"
              gradientUnits="userSpaceOnUse"
            />
          </defs>
        ) : null}
        {getLinePreview(linePreviewColor, lineStyle)}
      </svg>
    </div>
  );
}

function getLinePreview(color: string, lineStyle: LineStyle) {
  const solidLine = (
    <path
      d="M1,1L13.5,1"
      stroke={color}
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2"
    />
  );

  const dashedLine = (
    <path
      d="M0,1L15,1"
      stroke={color}
      strokeWidth="2"
      strokeDasharray={DASHED_STROKE_DASHARRAY}
    />
  );

  const dottedLine = (
    <g fill={color}>
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
