import {HORIZONTAL_BAR_LABEL_HEIGHT, FONT_SIZE} from '../../../../../constants';

export interface LabelProps {
  barHeight: number;
  color: string;
  label: string;
  labelWidth: number;
  y: number;
}

export function Label({barHeight, color, label, labelWidth, y}: LabelProps) {
  const labelYOffset = (barHeight - HORIZONTAL_BAR_LABEL_HEIGHT) / 2;

  return (
    <foreignObject
      height={FONT_SIZE}
      width={labelWidth}
      aria-hidden="true"
      y={y + labelYOffset}
    >
      <div
        style={{
          fontSize: `${FONT_SIZE}px`,
          color,
          lineHeight: `${HORIZONTAL_BAR_LABEL_HEIGHT}px`,
          height: HORIZONTAL_BAR_LABEL_HEIGHT,
        }}
      >
        {label}
      </div>
    </foreignObject>
  );
}
