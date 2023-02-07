interface Props {
  height: number;
  width: number;
  fill: string;
  radius: number;
}

export function Shadow({height, width, fill, radius}: Props) {
  return (
    <rect
      height={height}
      width={width}
      fill={fill}
      ry={radius}
      y={3}
      x={3}
      opacity={0.5}
    />
  );
}
