interface BackgroundProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
}

export const Background: React.FC<BackgroundProps> = ({
  x,
  y,
  width,
  height,
  fill,
}) => (
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
  />
);
