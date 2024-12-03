import React from 'react';
import type {ScaleLinear} from 'd3-scale';

import {XAxis} from '../../XAxis/XAxis';
import {
  X_AXIS_HEIGHT,
  X_AXIS_LABEL_OFFSET,
  X_AXIS_LABEL_BOTTOM_OFFSET,
  Y_AXIS_LABEL_WIDTH,
} from '../utilities/constants';

import styles from './XAxisLabel.scss';

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
  setXAxisHeight: (height: number) => void;
}

export function XAxisLabels({
  xLabels,
  xAxisLabelWidth,
  chartPositions,
  dimensions,
  xScale,
  xAxisOptions,
  setXAxisHeight,
}: XAxisLabelsProps) {
  if (xAxisOptions.hide) {
    return null;
  }

  return (
    <React.Fragment>
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
        <foreignObject
          x={Y_AXIS_LABEL_WIDTH}
          y={
            dimensions.height
              ? dimensions.height - X_AXIS_LABEL_BOTTOM_OFFSET
              : 0
          }
          width={Math.max(0, chartPositions.xAxisBounds.width)}
          height={X_AXIS_HEIGHT}
        >
          <div className={styles.XAxisLabel} title={xAxisOptions.label}>
            {xAxisOptions.label}
          </div>
        </foreignObject>
      )}
    </React.Fragment>
  );
}
