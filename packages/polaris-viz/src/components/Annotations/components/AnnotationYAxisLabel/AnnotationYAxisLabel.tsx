import React from 'react';
import {useTheme} from '@shopify/polaris-viz-core';

import {ANNOTATION_Y_AXIS_LABEL_HEIGHT} from '../../constants';
import {useEstimateStringWidth} from '../../../../hooks/useEstimateStringWidth';

const FONT_SIZE = 10;
const Y_OFFSET = 13;

interface Props {
  label: string | number;
  y: number;
  theme: string;
}

export function AnnotationYAxisLabel({label, theme, y}: Props) {
  const selectedTheme = useTheme(theme);
  const width = useEstimateStringWidth(`${label}`, FONT_SIZE);

  return (
    <text
      width={width}
      height={ANNOTATION_Y_AXIS_LABEL_HEIGHT}
      y={y}
      dominantBaseline="middle"
      fontSize={FONT_SIZE}
      x={-width - Y_OFFSET}
      fill={selectedTheme.annotations.axisLabelColor}
    >
      {label}
    </text>
  );
}
