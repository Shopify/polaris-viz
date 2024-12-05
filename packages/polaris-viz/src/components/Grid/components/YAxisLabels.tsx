import React from 'react';

import {YAxis} from '../../YAxis/YAxis';
import {Y_AXIS_LABEL_WIDTH, Y_LABEL_OFFSET} from '../utilities/constants';

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
    hide?: boolean;
  };
}

export function YAxisLabels({
  yTicks,
  chartPositions,
  yAxisOptions,
}: YAxisLabelsProps) {
  if (yAxisOptions.hide) {
    return null;
  }

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
        width={10}
        textAlign="left"
        ariaHidden
        x={30}
        y={0}
      />
    </React.Fragment>
  );
}
