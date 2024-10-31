import React from 'react';

import {YAxis} from '../../YAxis';
import {Y_LABEL_OFFSET} from '../utilities/constants';

import styles from './YAxisLabels.scss';

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
    <React.Fragment>
      {yAxisOptions.label && (
        <foreignObject
          x={0}
          y={Y_AXIS_LABEL_WIDTH / 2 - Y_LABEL_OFFSET}
          width={Math.max(0, chartPositions.yAxisBounds.height)}
          height={Y_AXIS_LABEL_WIDTH}
          transform={`rotate(-90) translate(${-chartPositions.yAxisBounds
            .height}, 0)`}
        >
          <div className={styles.YAxisLabel}>{yAxisOptions.label}</div>
        </foreignObject>
      )}

      <YAxis
        ticks={yTicks}
        width={Y_AXIS_LABEL_WIDTH}
        textAlign="right"
        ariaHidden
        x={-10}
        y={0}
      />
    </React.Fragment>
  );
}
