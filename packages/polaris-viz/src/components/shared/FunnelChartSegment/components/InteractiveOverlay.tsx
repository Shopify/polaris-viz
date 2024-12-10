interface InteractiveOverlayProps {
  width: number;
  height: number;
  index: number;
  onMouseEnter?: (index: number) => void;
  onMouseLeave?: () => void;
  x?: number;
  y?: number;
}

export function InteractiveOverlay({
  width,
  height,
  index,
  onMouseEnter,
  onMouseLeave,
  x = 0,
  y = 0,
}: InteractiveOverlayProps) {
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill="transparent"
      style={{outline: 'none'}}
      onMouseEnter={() => onMouseEnter?.(index)}
      onMouseLeave={onMouseLeave}
      onFocus={() => onMouseEnter?.(index)}
      tabIndex={0}
    />
  );
}
