import React from 'react';
import type {ScaleLinear} from 'd3-scale';

import {SPACE_BETWEEN_CHART_AND_AXIS} from '../../constants';
import {TextAlignment} from '../../../../types';
import {WrappedText} from '../../../WrappedText';
import type {LabelFormatter} from '../../types';

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
    return TextAlignment.Left;
  } else if (isLast) {
    return TextAlignment.Right;
  } else {
    return TextAlignment.Center;
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
      transform={`translate(0,${chartHeight + SPACE_BETWEEN_CHART_AND_AXIS})`}
      aria-hidden="true"
    >
      {ticks.map((value, index) => {
        const label = labelFormatter(value);
        const isFirst = index === 0;
        const isLast = index === ticks.length - 1;
        const textOffset = bandwidth / 2;

        const width = isFirst || isLast ? bandwidth / 2 : bandwidth;

        return (
          <WrappedText
            color={color}
            height={tallestXAxisLabel}
            key={index}
            text={label}
            transform={`translate(${
              isFirst ? 0 : xScale(value) - textOffset
            },0)`}
            width={width}
            align={getTextAlign({isFirst, isLast})}
          />
        );
      })}
    </g>
  );
};
