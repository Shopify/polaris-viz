import React from 'react';
import {useTheme} from '@shopify/polaris-viz-core';

import {ANNOTATION_Y_AXIS_LABEL_HEIGHT} from '../../constants';
import {useEstimateStringWidth} from '../../../../hooks/useEstimateStringWidth';

const FONT_SIZE = 10;

interface Props {
  label: string | number;
  y: number;
  x: number;
}

export function AnnotationYAxisLabel({label, x, y}: Props) {
  const selectedTheme = useTheme();
  const width = useEstimateStringWidth(`${label}`, FONT_SIZE);

  return (
    <text
      width={width}
      height={ANNOTATION_Y_AXIS_LABEL_HEIGHT}
      y={y}
      dominantBaseline="middle"
      fontSize={FONT_SIZE}
      x={x}
      fill={selectedTheme.annotations.axisLabelColor}
    >
      {label}
    </text>
  );
}
