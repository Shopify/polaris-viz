import React from 'react';

import {useTheme} from '../../../../hooks';
import {FONT_SIZE} from '../../../../constants';
import {getTextWidth} from '../../../../utilities';
import {LABEL_HEIGHT} from '../../constants';

import styles from './GroupLabel.scss';

interface GroupLabelProps {
  areAllNegative: boolean;
  containerWidth: number;
  label: string;
  zeroPosition: number;
  theme?: string;
}

export function GroupLabel({
  areAllNegative,
  containerWidth,
  label,
  theme,
  zeroPosition,
}: GroupLabelProps) {
  const labelWidth = getTextWidth({text: label, fontSize: FONT_SIZE});
  const selectedTheme = useTheme(theme);

  const maxWidth = areAllNegative
    ? labelWidth + LABEL_HEIGHT
    : containerWidth - zeroPosition;

  return (
    <foreignObject
      height={LABEL_HEIGHT}
      width="100%"
      x={zeroPosition + (areAllNegative ? labelWidth * -1 : 0)}
      aria-hidden="true"
    >
      <div
        className={styles.Label}
        style={{
          background: selectedTheme.chartContainer.backgroundColor,
          fontSize: `${FONT_SIZE}px`,
          color: selectedTheme.yAxis.labelColor,
          height: LABEL_HEIGHT,
          maxWidth,
        }}
      >
        {label}
      </div>
    </foreignObject>
  );
}
