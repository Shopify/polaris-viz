import {BACKGROUND_GAP} from '../utilities/constants';

interface BackgroundProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  opacity: number;
}

export const Background = ({
  x,
  y,
  width,
  height,
  fill,
  opacity,
}: BackgroundProps) => {
  return (
    <rect
      x={x + BACKGROUND_GAP / 2}
      y={y + BACKGROUND_GAP / 2}
      width={Math.max(0, width - BACKGROUND_GAP)}
      height={Math.max(0, height - BACKGROUND_GAP)}
      fill={fill}
      strokeWidth="4"
      rx="4"
      ry="4"
      opacity={opacity}
    />
  );
};
