import {YAxis} from '../../YAxis';

import {AxisLabel} from './AxisLabel';

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
  };
  dimensions: {width: number; height: number};
  yAxisOptions: {
    hide?: boolean;
    label?: string;
    highLabel?: string;
    lowLabel?: string;
  };
  Y_AXIS_LABEL_WIDTH: number;
  Y_LABEL_OFFSET: number;
  LOW_HIGH_LABEL_OFFSET: number;
  xAxisHeight: number;
}

export function YAxisLabels({
  yTicks,
  chartPositions,
  dimensions,
  yAxisOptions,
  Y_AXIS_LABEL_WIDTH,
  Y_LABEL_OFFSET,
  LOW_HIGH_LABEL_OFFSET,
  xAxisHeight,
}: YAxisLabelsProps) {
  return (
    <g opacity={yAxisOptions?.hide ? 0 : 1}>
      {yAxisOptions.label && (
        <text
          x={chartPositions.yAxisBounds.x}
          y={chartPositions.yAxisBounds.x - Y_LABEL_OFFSET}
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
        x={0}
        y={0}
      />

      <AxisLabel
        x={LOW_HIGH_LABEL_OFFSET}
        y={0}
        textAnchor="end"
        dominantBaseline="hanging"
        label={yAxisOptions.highLabel ?? ''}
      />
      <AxisLabel
        x={LOW_HIGH_LABEL_OFFSET}
        y={dimensions.height + xAxisHeight / 2}
        textAnchor="end"
        dominantBaseline="bottom"
        label={yAxisOptions.lowLabel ?? ''}
      />
    </g>
  );
}
