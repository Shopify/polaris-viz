import type {ScaleLinear} from 'd3-scale';

import {XAxis} from '../../XAxis';

interface XAxisLabelsProps {
  xLabels: string[];
  xAxisLabelWidth: number;
  chartPositions: {
    xAxisBounds: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  };
  dimensions: {width: number; height: number};
  xScale: ScaleLinear<number, number>;
  xAxisOptions: {
    hide?: boolean;
    label?: string;
  };
  Y_AXIS_LABEL_WIDTH: number;
  setXAxisHeight: (height: number) => void;
}

const X_AXIS_LABEL_OFFSET = 20;
export function XAxisLabels({
  xLabels,
  xAxisLabelWidth,
  chartPositions,
  dimensions,
  xScale,
  xAxisOptions,
  Y_AXIS_LABEL_WIDTH,
  setXAxisHeight,
}: XAxisLabelsProps) {
  return (
    <g opacity={xAxisOptions?.hide ? 0 : 1}>
      <XAxis
        allowLineWrap={false}
        labels={xLabels}
        labelWidth={xAxisLabelWidth}
        onHeightChange={setXAxisHeight}
        x={Y_AXIS_LABEL_WIDTH}
        y={chartPositions.xAxisBounds.y - X_AXIS_LABEL_OFFSET}
        xScale={xScale}
        ariaHidden
      />

      {xAxisOptions.label && (
        <text
          x={
            (chartPositions.xAxisBounds.x + chartPositions.xAxisBounds.width) /
            2
          }
          y={dimensions.height}
          fontSize="14"
          fill="#6b7177"
          textAnchor="middle"
        >
          {xAxisOptions.label}
        </text>
      )}
    </g>
  );
}
