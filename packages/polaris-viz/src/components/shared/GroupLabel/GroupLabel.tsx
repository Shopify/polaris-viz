import {useTheme} from '@shopify/polaris-viz-core';

import {estimateStringWidthWithOffset} from '../../../utilities/estimateStringWidthWithOffset';
import {getFontSize} from '../../../utilities/getFontSize';
import {HORIZONTAL_GROUP_LABEL_HEIGHT} from '../../../constants';

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
  const fontSize = getFontSize();

  const labelWidth = estimateStringWidthWithOffset(label, fontSize);
  const selectedTheme = useTheme();

  const maxWidth = areAllNegative
    ? labelWidth + LABEL_RIGHT_PADDING
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
          fontSize: `${fontSize}px`,
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
