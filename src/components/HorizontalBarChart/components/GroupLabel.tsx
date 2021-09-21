import React from 'react';

import {FONT_SIZE, SPACING} from '../../../constants';
import {getTextWidth} from '../../../utilities';
import {LABEL_HEIGHT} from '../constants';

interface GroupLabelProps {
  areAllAllNegative: boolean;
  color: string;
  label: string;
}

export function GroupLabel({areAllAllNegative, color, label}: GroupLabelProps) {
  const labelWidth = getTextWidth({text: label, fontSize: FONT_SIZE});

  return (
    <foreignObject
      height={LABEL_HEIGHT}
      width="100%"
      x={areAllAllNegative ? -labelWidth : 0}
      aria-hidden="true"
    >
      <div
        style={{
          fontSize: `${FONT_SIZE}px`,
          color,
          lineHeight: `${SPACING}px`,
        }}
      >
        {label}
      </div>
    </foreignObject>
  );
}
