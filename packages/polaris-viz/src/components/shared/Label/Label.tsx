import {HORIZONTAL_BAR_LABEL_HEIGHT, FONT_SIZE} from '../../../constants';

export interface LabelProps {
  barHeight: number;
  color: string;
  label: string;
  labelWidth: number;
  y: number;
}

export function Label({barHeight, color, label, labelWidth, y}: LabelProps) {
  const labelYOffset = barHeight / 2;

  return (
    <text
      height={HORIZONTAL_BAR_LABEL_HEIGHT}
      width={labelWidth}
      aria-hidden="true"
      y={y + labelYOffset}
      fontSize={`${FONT_SIZE}px`}
      fill={color}
      dominantBaseline="central"
    >
      {label}
    </text>
  );
}
