import {YAxis} from '../../YAxis';

interface YAxisLabelsProps {
  yTicks: {
    value: number;
    label: string;
    formattedValue: string;
    yOffset: number;
  }[];
  chartPositions: {
    yAxisBounds: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    xAxisBounds: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  };
  yAxisOptions: {
    hide?: boolean;
    label?: string;
  };
  Y_AXIS_LABEL_WIDTH: number;
}

export function YAxisLabels({
  yTicks,
  chartPositions,
  yAxisOptions,
  Y_AXIS_LABEL_WIDTH,
}: YAxisLabelsProps) {
  return (
    <g opacity={yAxisOptions?.hide ? 0 : 1}>
      {yAxisOptions.label && (
        <text
          x={chartPositions.yAxisBounds.x}
          y={chartPositions.yAxisBounds.x}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="14"
          fill="#6b7177"
          transform={`rotate(-90, ${chartPositions.yAxisBounds.x}, ${
            chartPositions.yAxisBounds.y + chartPositions.yAxisBounds.height / 2
          })`}
        >
          {yAxisOptions.label}
        </text>
      )}

      <YAxis
        ticks={yTicks}
        width={Y_AXIS_LABEL_WIDTH}
        textAlign="right"
        ariaHidden
        x={10}
        y={0}
      />
    </g>
  );
}
