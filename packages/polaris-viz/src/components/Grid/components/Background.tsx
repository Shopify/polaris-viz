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
    x={x}
    y={y}
    width={width}
    height={height}
    fill={fill}
    stroke="white"
    strokeWidth="4"
    rx="4"
    ry="4"
    opacity={opacity}
  />
);
