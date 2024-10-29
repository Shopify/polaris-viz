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
}: BackgroundProps) => (
  <rect
    x={x + 4.5}
    y={y + 4.5}
    width={width - 9}
    height={height - 9}
    fill={fill}
    strokeWidth="4"
    rx="4"
    ry="4"
    opacity={opacity}
  />
);
