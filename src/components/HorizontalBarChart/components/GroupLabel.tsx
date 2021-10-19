import React from 'react';

import {useTheme} from '../../../hooks';
import {FONT_SIZE} from '../../../constants';
import {getTextWidth} from '../../../utilities';
import {LABEL_HEIGHT} from '../constants';

interface GroupLabelProps {
  areAllAllNegative: boolean;
  label: string;
  theme?: string;
}

export function GroupLabel({areAllAllNegative, label, theme}: GroupLabelProps) {
  const labelWidth = getTextWidth({text: label, fontSize: FONT_SIZE});
  const selectedTheme = useTheme(theme);

  return (
    <foreignObject
      height={LABEL_HEIGHT}
      width="100%"
      x={areAllAllNegative ? -labelWidth : 0}
      aria-hidden="true"
    >
      <div
        style={{
          background: selectedTheme.chartContainer.backgroundColor,
          fontSize: `${FONT_SIZE}px`,
          color: selectedTheme.yAxis.labelColor,
          height: LABEL_HEIGHT,
          width: labelWidth + LABEL_HEIGHT,
        }}
      >
        {label}
      </div>
    </foreignObject>
  );
}
