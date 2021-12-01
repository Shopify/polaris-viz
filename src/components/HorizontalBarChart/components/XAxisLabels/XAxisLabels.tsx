import React from 'react';
import type {ScaleLinear} from 'd3-scale';
import type {LabelFormatter} from 'types';

import {
  FONT_SIZE,
  HORIZONTAL_SPACE_BETWEEN_CHART_AND_AXIS,
  LINE_HEIGHT,
  MAX_X_AXIS_LINES,
} from '../../../../constants';

import styles from './XAxisLabels.scss';

interface XAxisLabelsProps {
  bandwidth: number;
  chartHeight: number;
  color: string;
  labelFormatter: LabelFormatter;
  tallestXAxisLabel: number;
  ticks: number[];
  xScale: ScaleLinear<number, number>;
}

function getTextAlign({isFirst, isLast}: {isFirst: boolean; isLast: boolean}) {
  if (isFirst) {
    return 'left';
  } else if (isLast) {
    return 'right';
  } else {
    return 'center';
  }
}

export const XAxisLabels = ({
  bandwidth,
  chartHeight,
  color,
  labelFormatter,
  tallestXAxisLabel,
  ticks,
  xScale,
}: XAxisLabelsProps) => {
  return (
    <g
      transform={`translate(0,${
        chartHeight + HORIZONTAL_SPACE_BETWEEN_CHART_AND_AXIS
      })`}
      aria-hidden="true"
    >
      {ticks.map((value, index) => {
        const label = labelFormatter(value);
        const isFirstItem = index === 0;
        const isLastItem = index === ticks.length - 1;
        const textOffset = bandwidth / 2;

        const width = isFirstItem || isLastItem ? bandwidth / 2 : bandwidth;

        return (
          <foreignObject
            transform={`translate(${
              isFirstItem ? 0 : xScale(value) - textOffset
            },0)`}
            height={tallestXAxisLabel}
            width={width}
            key={index}
          >
            <div
              className={styles.Text}
              style={{
                fontSize: `${FONT_SIZE}px`,
                color,
                textAlign: getTextAlign({
                  isFirst: isFirstItem,
                  isLast: isLastItem,
                }),
                maxHeight: LINE_HEIGHT * MAX_X_AXIS_LINES,
                padding: isFirstItem || isLastItem ? 0 : '0 10px',
              }}
            >
              {label}
            </div>
          </foreignObject>
        );
      })}
    </g>
  );
};
