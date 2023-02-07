import {estimateStringWidth, useChartContext} from '@shopify/polaris-viz-core';

import {useTheme} from '../../../hooks';
import {FONT_SIZE, HORIZONTAL_GROUP_LABEL_HEIGHT} from '../../../constants';

import styles from './GroupLabel.scss';

export interface GroupLabelProps {
  areAllNegative: boolean;
  containerWidth: number;
  label: string;
  zeroPosition: number;
}

const LABEL_RIGHT_PADDING = 15;

export function GroupLabel({
  areAllNegative,
  containerWidth,
  label,
  zeroPosition,
}: GroupLabelProps) {
  const {characterWidths} = useChartContext();

  const labelWidth = estimateStringWidth(label, characterWidths);
  const selectedTheme = useTheme();

  const maxWidth = areAllNegative ? labelWidth : containerWidth - zeroPosition;

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
          width: labelWidth + LABEL_RIGHT_PADDING,
        }}
      >
        {label}
      </div>
    </foreignObject>
  );
}
