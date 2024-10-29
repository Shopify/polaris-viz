import type {ScaleLinear} from 'd3-scale';

interface GridBackgroundProps {
  rows: number;
  cols: number;
  cellWidth: number;
  cellHeight: number;
  xScale: ScaleLinear<number, number>;
}

export function GridBackground({
  rows,
  cols,
  cellWidth,
  cellHeight,
  xScale,
}: GridBackgroundProps) {
  const lines: JSX.Element[] = [];

  // Vertical lines
  for (let i = 0; i <= cols - 1; i++) {
    const x = xScale(i);
    lines.push(
      <line
        key={`v-${i}`}
        x1={x}
        y1={0}
        x2={x}
        y2={rows * cellHeight + 10}
        stroke="rgba(227, 227, 227, 1)"
        strokeWidth="1"
      />,
    );
  }

  // Horizontal lines
  for (let i = 1; i <= rows + 1; i++) {
    const y = i * cellHeight;
    lines.push(
      <line
        key={`h-${i}`}
        x1={-10}
        y1={y}
        x2={cols * cellWidth}
        y2={y}
        stroke="rgba(227, 227, 227, 1)"
        strokeWidth="1"
      />,
    );
  }

  return <g>{lines}</g>;
}
