import React, {useContext} from 'react';
import {estimateStringWidth, ChartContext} from '@shopify/polaris-viz-core';

import {useTheme} from '../../../hooks';
import {FONT_SIZE, HORIZONTAL_GROUP_LABEL_HEIGHT} from '../../../constants';

import styles from './GroupLabel.scss';

export interface GroupLabelProps {
  areAllNegative: boolean;
  containerWidth: number;
  label: string;
  zeroPosition: number;
  theme: string;
}

export function GroupLabel({
  areAllNegative,
  containerWidth,
  label,
  theme,
  zeroPosition,
}: GroupLabelProps) {
  const {characterWidths} = useContext(ChartContext);

  const labelWidth = estimateStringWidth(label, characterWidths);
  const selectedTheme = useTheme(theme);

  const maxWidth = areAllNegative
    ? labelWidth + HORIZONTAL_GROUP_LABEL_HEIGHT
    : containerWidth - zeroPosition;

  return (
    <foreignObject
      height={HORIZONTAL_GROUP_LABEL_HEIGHT}
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
          maxWidth,
          height: HORIZONTAL_GROUP_LABEL_HEIGHT,
          width: labelWidth + HORIZONTAL_GROUP_LABEL_HEIGHT,
        }}
      >
        {label}
      </div>
    </foreignObject>
  );
}
