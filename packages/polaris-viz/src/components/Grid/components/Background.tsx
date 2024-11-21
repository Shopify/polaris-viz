import {BACKGROUND_GAP} from '../utilities/constants';

interface BackgroundProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  opacity: number;
  isDisabled?: boolean;
}

export const Background = ({
  x,
  y,
  width,
  height,
  fill,
  opacity,
  isDisabled,
}: BackgroundProps) => {
  const adjustedWidth = Math.max(0, width - BACKGROUND_GAP);
  const adjustedHeight = Math.max(0, height - BACKGROUND_GAP);

  return (
    <g>
      <rect
        x={x + BACKGROUND_GAP / 2}
        y={y + BACKGROUND_GAP / 2}
        width={adjustedWidth}
        height={adjustedHeight}
        fill={fill}
        rx="4"
        ry="4"
        opacity={opacity}
      />
      {isDisabled && (
        <rect
          x={x + BACKGROUND_GAP / 2 + 1}
          y={y + BACKGROUND_GAP / 2 + 1}
          width={adjustedWidth - 2}
          height={adjustedHeight - 2}
          fill="none"
          stroke="#E3E3E3"
          strokeWidth="1"
          strokeDasharray="4 4"
          rx="3"
          ry="3"
        />
      )}
    </g>
  );
};
