import {FONT_FAMILY} from '@shopify/polaris-viz-core';

import {HORIZONTAL_BAR_LABEL_HEIGHT} from '../../../constants';

export interface LabelProps {
  barHeight: number;
  color: string;
  fontSize: number;
  label: string;
  labelWidth: number;
  y: number;
}

export function Label({
  barHeight,
  color,
  fontSize,
  label,
  labelWidth,
  y,
}: LabelProps) {
  const labelYOffset = barHeight / 2;

  return (
    <text
      height={HORIZONTAL_BAR_LABEL_HEIGHT}
      width={labelWidth}
      aria-hidden="true"
      y={y + labelYOffset}
      fontSize={`${fontSize}px`}
      fontFamily={FONT_FAMILY}
      fill={color}
      dominantBaseline="central"
    >
      {label}
    </text>
  );
}
