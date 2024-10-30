import {YAxis} from '../../YAxis';
import {Y_LABEL_OFFSET} from '../utilities/constants';

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
  yAxisOptions: {
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
    <g>
      {yAxisOptions.label && (
        <text
          x={-chartPositions.yAxisBounds.height / 2}
          y={Y_AXIS_LABEL_WIDTH / 2 - Y_LABEL_OFFSET}
          textAnchor="middle"
          transform="rotate(-90)"
          fontSize="14"
          fill="#6b7177"
        >
          {yAxisOptions.label}
        </text>
      )}

      <YAxis
        ticks={yTicks}
        width={Y_AXIS_LABEL_WIDTH}
        textAlign="right"
        ariaHidden
        x={-10}
        y={0}
      />
    </g>
  );
}
