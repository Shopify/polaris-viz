import React from 'react';
import type {ScaleLinear} from 'd3-scale';

import {XAxis} from '../../XAxis';

import {AxisLabel} from './AxisLabel';

interface XAxisLabelsProps {
  xLabels: string[];
  xAxisLabelWidth: number;
  xAxisHeight: number;
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
    highLabel?: string;
  };
  Y_AXIS_LABEL_WIDTH: number;
  Y_LABEL_OFFSET: number;
  X_LABEL_OFFSET: number;
  setXAxisHeight: (height: number) => void;
}

export function XAxisLabels({
  xLabels,
  xAxisLabelWidth,
  xAxisHeight,
  chartPositions,
  dimensions,
  xScale,
  xAxisOptions,
  Y_AXIS_LABEL_WIDTH,
  Y_LABEL_OFFSET,
  X_LABEL_OFFSET,
  setXAxisHeight,
}: XAxisLabelsProps) {
  return (
    <g opacity={xAxisOptions?.hide ? 0 : 1}>
      <XAxis
        allowLineWrap={false}
        labels={xLabels}
        labelWidth={xAxisLabelWidth}
        onHeightChange={setXAxisHeight}
        x={Y_AXIS_LABEL_WIDTH + Y_LABEL_OFFSET}
        y={chartPositions.xAxisBounds.y + Y_LABEL_OFFSET}
        xScale={xScale}
        ariaHidden
      />

      <React.Fragment>
        <AxisLabel
          x={dimensions.width + Y_LABEL_OFFSET}
          y={dimensions.height + xAxisHeight / 2}
          textAnchor="end"
          dominantBaseline="bottom"
          label={xAxisOptions.highLabel ?? ''}
        />
      </React.Fragment>

      {xAxisOptions.label && (
        <text
          x={
            (chartPositions.xAxisBounds.x + chartPositions.xAxisBounds.width) /
            2
          }
          y={dimensions.height + X_LABEL_OFFSET}
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
